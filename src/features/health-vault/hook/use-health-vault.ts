import { useCallback, useMemo } from "react"
import { useGetHealthVaultPlansQuery } from "../api/health-vault-api"
import { HEALTH_CARDS } from "../components/health-vault-data"
import { IHealthVaultData } from "../type"

export const useHealthVault = (petId: string = "1") => {
  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetHealthVaultPlansQuery(petId)

  const dashboardData: IHealthVaultData | undefined = response?.data

  const healthCards = useMemo(() => {
    if (!dashboardData) return HEALTH_CARDS

    return HEALTH_CARDS.map((card) => {
      switch (card.id) {
        case "vaccinations": {
          const count = dashboardData.vaccinations?.upcoming_count ?? 0
          return {
            ...card,
            subtitle: `${count} Upcoming`,
          }
        }
        case "weight": {
          const currentWeight = dashboardData.weight_tracking?.current_weight_kg
          return {
            ...card,
            subtitle: currentWeight ? `${currentWeight} kg` : card.subtitle,
          }
        }
        case "documents": {
          const totalFiles = dashboardData.health_documents?.total_files ?? 0
          return {
            ...card,
            subtitle: `${totalFiles} ${totalFiles === 1 ? "File" : "Files"}`,
          }
        }
        case "care": {
          const careScore = dashboardData.health_score?.breakdown?.care
          return {
            ...card,
            subtitle:
              careScore !== undefined && careScore > 0
                ? `${careScore}% Completed`
                : "Care Tasks Pending",
          }
        }
        default:
          return card
      }
    })
  }, [dashboardData])

  const refreshDashboard = useCallback(async () => {
    return refetch()
  }, [refetch])

  return {
    dashboardData,
    healthCards,
    healthScore: dashboardData?.health_score,
    vaccinations: dashboardData?.vaccinations,
    weightTracking: dashboardData?.weight_tracking,
    healthDocuments: dashboardData?.health_documents,
    aiInsight: dashboardData?.ai_insight,
    isLoading,
    isFetching,
    isError,
    error,
    refreshDashboard,
    refetch,
  }
}
