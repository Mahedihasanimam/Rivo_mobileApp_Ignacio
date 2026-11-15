import { PET_ID } from "@/constants/pet-id"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useLazyGetAppointmentsQuery } from "../api/appts-api"

// ── Filter types ──
export type AppointmentStatus = "upcoming" | "completed" | "cancelled"
export type AppointmentType =
  | "vaccination"
  | "vet_visit"
  | "grooming"
  | "surgery"

export type AppointmentFilters = {
  date?: string
  status?: AppointmentStatus
  type?: AppointmentType
  vet_name?: string
}

export type AppointmentStats = {
  upcoming: number
  completed: number
  this_month: number
}

// ── Default values ──
const DEFAULT_PER_PAGE = 15
const DEFAULT_SORT = "-created_at"
const DEFAULT_INCLUDE = "pet,notes"

export type UseAppointmentsOptions = {
  petId?: string
  status?: AppointmentStatus
  filters?: AppointmentFilters
  perPage?: number
}

export const useAppointments = (
  optionsOrPetId?: string | UseAppointmentsOptions
) => {
  const options: UseAppointmentsOptions = useMemo(() => {
    if (typeof optionsOrPetId === "string") {
      return { petId: optionsOrPetId }
    }
    return optionsOrPetId ?? {}
  }, [optionsOrPetId])

  const petId = options.petId ?? PET_ID
  const perPage = options.perPage ?? DEFAULT_PER_PAGE
  const statusProp =
    typeof optionsOrPetId === "object" ? optionsOrPetId?.status : undefined

  // ── RTK lazy query ──
  const [triggerGetAppointments, { isFetching }] =
    useLazyGetAppointmentsQuery()

  // ── State ──
  const [appointments, setAppointments] = useState<any[]>([])
  const [stats, setStats] = useState<AppointmentStats>({
    upcoming: 0,
    completed: 0,
    this_month: 0,
  })
  const [isLocalLoading, setIsLocalLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  // Current active filters
  const [filters, setFilters] = useState<AppointmentFilters>(() => ({
    ...(options.filters ?? {}),
    ...(statusProp !== undefined ? { status: statusProp } : {}),
  }))

  const filtersRef = useRef<AppointmentFilters>(filters)
  filtersRef.current = filters

  // Ref to cancel/supersede stale responses
  const fetchIdRef = useRef(0)
  const isFetchingRef = useRef(false)

  // ── Build query params ──
  const buildParams = useCallback(
    (page: number, currentFilters: AppointmentFilters) => ({
      id: petId,
      page,
      per_page: perPage,
      sort: DEFAULT_SORT,
      include: DEFAULT_INCLUDE,
      filter: {
        ...(currentFilters.date && { date: currentFilters.date }),
        ...(currentFilters.status && { status: currentFilters.status }),
        ...(currentFilters.type && { type: currentFilters.type }),
        ...(currentFilters.vet_name && { vet_name: currentFilters.vet_name }),
      },
    }),
    [petId, perPage]
  )

  // ── Fetch appointments (core) ──
  const fetchAppointments = useCallback(
    async (
      page: number,
      resetList: boolean = false,
      filterOverride?: AppointmentFilters
    ) => {
      // For loadMore, guard against concurrent requests
      if (!resetList && (isFetchingRef.current || isLoadingMore)) return

      const fetchId = ++fetchIdRef.current
      isFetchingRef.current = true

      const activeFilters = filterOverride ?? filtersRef.current

      if (resetList) {
        setIsLocalLoading(true)
      } else {
        setIsLoadingMore(true)
      }

      try {
        // Pass false so RTK Query forces a network call and never serves stale empty cache
        const result = await triggerGetAppointments(
          buildParams(page, activeFilters),
          false
        ).unwrap()

        // Discard stale response if a newer fetch was started
        if (fetchId !== fetchIdRef.current) return

        const responseData = result?.data
        const newData = responseData?.appointments?.data ?? []
        const meta = responseData?.appointments?.meta

        // Update stats
        if (responseData?.stats) {
          setStats(responseData.stats)
        }

        if (resetList) {
          setAppointments(newData)
        } else {
          setAppointments((prev) => [...prev, ...newData])
        }

        // Update pagination meta
        if (meta) {
          const lastPage = meta.last_page ?? 1
          setTotalPages(lastPage)
          setTotal(meta.total ?? 0)
          setHasMore(page < lastPage)
        } else {
          setHasMore(newData.length >= perPage)
        }

        setCurrentPage(page)
      } catch (error) {
        if (fetchId === fetchIdRef.current) {
          console.error("Failed to fetch appointments:", error)
        }
      } finally {
        if (fetchId === fetchIdRef.current) {
          isFetchingRef.current = false
          setIsLocalLoading(false)
          setIsLoadingMore(false)
          setIsRefreshing(false)
        }
      }
    },
    [triggerGetAppointments, buildParams, perPage, isLoadingMore]
  )

  const fetchAppointmentsRef = useRef(fetchAppointments)
  fetchAppointmentsRef.current = fetchAppointments

  // ── Synchronize statusProp and trigger fetch ──
  useEffect(() => {
    const updatedFilters = {
      ...filtersRef.current,
      ...(statusProp !== undefined ? { status: statusProp } : {}),
    }
    if (statusProp === undefined) {
      delete updatedFilters.status
    }
    setFilters(updatedFilters)
    filtersRef.current = updatedFilters
    fetchAppointmentsRef.current(1, true, updatedFilters)
  }, [statusProp])

  // ── Initial fetch / refresh (reset to page 1) ──
  const fetchInitial = useCallback(() => {
    setIsRefreshing(true)
    setHasMore(true)
    fetchAppointments(1, true, filtersRef.current)
  }, [fetchAppointments])

  // ── Load next page ──
  const loadMore = useCallback(() => {
    if (!hasMore || isFetchingRef.current) return
    fetchAppointments(currentPage + 1, false, filtersRef.current)
  }, [hasMore, currentPage, fetchAppointments])

  // ── Pull-to-refresh handler ──
  const onRefresh = useCallback(() => {
    fetchInitial()
  }, [fetchInitial])

  // ── Filter setters with instant re-fetch ──
  const setFilterDate = useCallback(
    (date?: string) => {
      const updated = { ...filtersRef.current, date }
      setFilters(updated)
      filtersRef.current = updated
      fetchAppointments(1, true, updated)
    },
    [fetchAppointments]
  )

  const setFilterStatus = useCallback(
    (status?: AppointmentStatus) => {
      const updated = { ...filtersRef.current }
      if (status !== undefined) {
        updated.status = status
      } else {
        delete updated.status
      }
      setFilters(updated)
      filtersRef.current = updated
      fetchAppointments(1, true, updated)
    },
    [fetchAppointments]
  )

  const setFilterType = useCallback(
    (type?: AppointmentType) => {
      const updated = { ...filtersRef.current, type }
      setFilters(updated)
      filtersRef.current = updated
      fetchAppointments(1, true, updated)
    },
    [fetchAppointments]
  )

  const setFilterVetName = useCallback(
    (vet_name?: string) => {
      const updated = { ...filtersRef.current, vet_name }
      setFilters(updated)
      filtersRef.current = updated
      fetchAppointments(1, true, updated)
    },
    [fetchAppointments]
  )

  const clearFilters = useCallback(() => {
    const updated: AppointmentFilters = {}
    setFilters(updated)
    filtersRef.current = updated
    fetchAppointments(1, true, updated)
  }, [fetchAppointments])

  const applyFilters = useCallback(
    (newFilters: AppointmentFilters) => {
      setFilters(newFilters)
      filtersRef.current = newFilters
      fetchAppointments(1, true, newFilters)
    },
    [fetchAppointments]
  )

  // ── Derived state ──
  const isLoading = isLocalLoading || (isFetching && !isLoadingMore)
  const isEmpty = !isLoading && appointments.length === 0
  const activeFilterCount = useMemo(() => {
    return Object.values(filters).filter(Boolean).length
  }, [filters])
  const hasActiveFilters = activeFilterCount > 0

  return {
    // Data
    appointments,
    stats,

    // Pagination
    currentPage,
    totalPages,
    total,
    hasMore,
    loadMore,
    perPage,

    // Loading states
    isLoading,
    isFetching,
    isLoadingMore,
    isRefreshing,
    isEmpty,

    // Actions
    fetchInitial,
    onRefresh,

    // Filters
    filters,
    setFilters: applyFilters,
    setFilterDate,
    setFilterStatus,
    setFilterType,
    setFilterVetName,
    clearFilters,
    activeFilterCount,
    hasActiveFilters,
  }
}
