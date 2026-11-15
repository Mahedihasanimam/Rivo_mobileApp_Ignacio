import { UpdateBanner } from "@/features/updates/components/update-banner"
import { UpdateModal } from "@/features/updates/components/update-modal"
import { UpdateProvider } from "@/features/updates/providers/update-provider"
import { SessionProvider } from "@/features/auth/auth-session"
import { WorkspaceProvider } from "@/features/workspace/workspace-store"
import { I18nProvider } from "@/i18n"
import { AppThemeProvider } from "@/theme/theme-provider"

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppThemeProvider>
      <I18nProvider>
        <SessionProvider>
          <WorkspaceProvider>
            <UpdateProvider>
              {children}
              <UpdateBanner />
              <UpdateModal />
            </UpdateProvider>
          </WorkspaceProvider>
        </SessionProvider>
      </I18nProvider>
    </AppThemeProvider>
  )
}
