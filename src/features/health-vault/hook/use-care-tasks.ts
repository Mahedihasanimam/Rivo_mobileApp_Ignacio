import { PET_ID } from "@/constants/pet-id"
import { appToast } from "@/lib/toast/app-toast"
import { useCallback, useEffect, useMemo, useState } from "react"
import {
  useCompleteCareTaskMutation,
  useGetCareTasksQuery,
} from "../api/health-vault-api"

export type CareTask = {
  id: string
  title: string
  description: string
  xp: number
  completed: boolean
}

export const useCareTasks = (petId: string = PET_ID) => {
  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetCareTasksQuery(petId)

  const [completeCareTaskMutation, { isLoading: isCompleting }] =
    useCompleteCareTaskMutation()

  const careData = response?.data
  const summary = careData?.summary
  const apiTasks = careData?.tasks

  const [tasks, setTasks] = useState<CareTask[]>([])
  const [hasInteracted, setHasInteracted] = useState(false)

  // Sync tasks from server
  useEffect(() => {
    if (apiTasks) {
      setTasks(
        apiTasks.map((task) => ({
          id: String(task.id),
          title: task.title ?? "",
          description: task.description ?? "",
          xp: task.xp_reward ?? 0,
          completed: Boolean(task.is_completed_today),
        }))
      )
      setHasInteracted(false)
    }
  }, [apiTasks])

  // Complete task handler with optimistic update
  const completeTask = useCallback(
    async (taskId: string | number) => {
      const idStr = String(taskId)
      const target = tasks.find((t) => t.id === idStr)
      if (!target || target.completed) return

      // Optimistic update
      setHasInteracted(true)
      setTasks((prev) =>
        prev.map((t) => (t.id === idStr ? { ...t, completed: true } : t))
      )

      try {
        const res = await completeCareTaskMutation({
          id: petId,
          task_id: idStr,
        }).unwrap()

        if (res?.message) {
          appToast.success(res.message)
        }
      } catch (err: any) {
        // Revert on error
        setTasks((prev) =>
          prev.map((t) => (t.id === idStr ? { ...t, completed: false } : t))
        )
        const errorMessage =
          err?.data?.message || err?.message || "Failed to complete care task"
        appToast.error(errorMessage)
      }
    },
    [completeCareTaskMutation, petId, tasks]
  )

  const initialCompletedTasks = useMemo(() => {
    if (!apiTasks) return 0
    return apiTasks.filter((t) => t.is_completed_today).length
  }, [apiTasks])

  const initialCompletedXP = useMemo(() => {
    if (!apiTasks) return 0
    return apiTasks
      .filter((t) => t.is_completed_today)
      .reduce((sum, t) => sum + (t.xp_reward || 0), 0)
  }, [apiTasks])

  const tasksCompletedCount = useMemo(() => {
    return tasks.filter((t) => t.completed).length
  }, [tasks])

  const tasksTotalXP = useMemo(() => {
    return tasks.reduce((total, t) => (t.completed ? total + t.xp : total), 0)
  }, [tasks])

  const completedTasks = useMemo(() => {
    if (summary?.completed_tasks !== undefined) {
      if (hasInteracted) {
        return Math.max(
          0,
          summary.completed_tasks + (tasksCompletedCount - initialCompletedTasks)
        )
      }
      return summary.completed_tasks
    }
    return tasksCompletedCount
  }, [
    summary?.completed_tasks,
    hasInteracted,
    tasksCompletedCount,
    initialCompletedTasks,
  ])

  const totalTasks = useMemo(() => {
    if (summary?.total_tasks !== undefined) return summary.total_tasks
    return tasks.length
  }, [summary?.total_tasks, tasks.length])

  const earnedXP = useMemo(() => {
    if (summary?.xp_earned_today !== undefined) {
      if (hasInteracted) {
        return Math.max(
          0,
          summary.xp_earned_today + (tasksTotalXP - initialCompletedXP)
        )
      }
      return summary.xp_earned_today
    }
    return tasksTotalXP
  }, [
    summary?.xp_earned_today,
    hasInteracted,
    tasksTotalXP,
    initialCompletedXP,
  ])

  const progressPercentage = useMemo(() => {
    if (hasInteracted) {
      if (totalTasks <= 0) return 0
      return Math.min(Math.round((completedTasks / totalTasks) * 100), 100)
    }
    return (
      summary?.progress_percentage ??
      (totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0)
    )
  }, [hasInteracted, totalTasks, completedTasks, summary?.progress_percentage])

  const streakDays = summary?.streak_days ?? 0

  return {
    summary,
    tasks,
    completedTasks,
    totalTasks,
    earnedXP,
    progressPercentage,
    streakDays,
    completeTask,
    isLoading,
    isFetching,
    isCompleting,
    isError,
    error,
    refetch,
  }
}
