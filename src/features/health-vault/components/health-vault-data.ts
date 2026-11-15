import type { HealthCard } from "./types"

export const HEALTH_CARDS: HealthCard[] = [
  {
    id: "vaccinations",
    title: "Vaccinations",
    subtitle: "2 Upcoming",
    icon: require("@/assets/health-vault/vaccinations.png"),
    route: "/vaccinations",
    tone: "success",
  },
  {
    id: "weight",
    title: "Weight Tracking",
    subtitle: "Upcoming",
    icon: require("@/assets/health-vault/weight-tracking.png"),
    route: "/weight-tracking",
    tone: "primary",
  },
  {
    id: "documents",
    title: "Health Documents",
    subtitle: "2 Files",
    icon: require("@/assets/health-vault/health-documents.png"),
    route: "/health-documents",
    tone: "primary",
  },
  {
    id: "care",
    title: "Care",
    subtitle: "Care Tasks Pending",
    icon: require("@/assets/health-vault/care.png"),
    route: "/care",
    tone: "success",
  },
]
