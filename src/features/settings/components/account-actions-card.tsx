import { deleteAccount, logout } from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import tw from "@/lib/tailwind"
import { router } from "expo-router"
import { memo, useCallback } from "react"
import { FlatList, Pressable, View } from "react-native"
import { SvgXml } from "react-native-svg"

type AccountAction = {
  id: string
  title: string
  description: string
  icon: string
  action: "logout" | "delete-account"
  route: string
}

const ACCOUNT_ACTIONS: AccountAction[] = [
  {
    id: "logout",
    title: "Log Out",
    description: "Sign out of your account",
    icon: logout,
    action: "logout",
    route: "/log-out-modal",
  },
  {
    id: "delete-account",
    title: "Delete Account",
    description: "Permanently erase all data",
    icon: deleteAccount,
    action: "delete-account",
    route: "/delete-account-modal",
  },
]

type AccountActionItemProps = {
  item: AccountAction
  isLast: boolean
  onPress: (item: AccountAction) => void
}

const AccountActionItem = memo(
  ({ item, isLast, onPress }: AccountActionItemProps) => {
    const handlePress = useCallback(() => {
      onPress(item)
    }, [item, onPress])

    return (
      <View>
        <Pressable
          onPress={handlePress}
          style={({ pressed }) => [
            tw`flex-row items-center gap-3.5 px-4 py-3`,
            pressed && tw`opacity-60`,
          ]}
        >
          {/* Icon */}
          <View
            style={tw`items-center justify-center rounded-xl bg-red-500/10 p-2`}
          >
            <SvgXml xml={item?.icon} />
          </View>

          {/* Content */}
          <View style={tw`flex-1 gap-0.5`}>
            <AppText variant="body" tone="danger" style={tw`font-inter-medium`}>
              {item.title}
            </AppText>

            <AppText
              variant="caption"
              tone="gray"
              style={tw`font-inter-regular`}
            >
              {item.description}
            </AppText>
          </View>
        </Pressable>

        {!isLast && <View style={tw`ml-16 mr-4 border-b border-black/10`} />}
      </View>
    )
  }
)

AccountActionItem.displayName = "AccountActionItem"

type AccountActionsCardProps = {
  onLogout?: () => void
  onDeleteAccount?: () => void
}

export function AccountActionsCard({
  onLogout,
  onDeleteAccount,
}: AccountActionsCardProps) {
  const handleActionPress = useCallback(
    (item: AccountAction) => {
      if (item.action === "logout") {
        if (onLogout) {
          onLogout()
        } else {
          router.push(item.route as any)
        }
        return
      }

      if (item.action === "delete-account") {
        if (onDeleteAccount) {
          onDeleteAccount()
        } else {
          router.push(item.route as any)
        }
      }
    },
    [onLogout, onDeleteAccount]
  )

  const renderItem = useCallback(
    ({ item, index }: { item: AccountAction; index: number }) => (
      <AccountActionItem
        item={item}
        isLast={index === ACCOUNT_ACTIONS.length - 1}
        onPress={handleActionPress}
      />
    ),
    [handleActionPress]
  )

  const keyExtractor = useCallback((item: AccountAction) => item.id, [])

  return (
    <View style={tw`pt-2.5`}>
      <View style={tw`overflow-hidden rounded-2xl bg-white shadow-sm`}>
        <FlatList
          data={ACCOUNT_ACTIONS}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
        />
      </View>
    </View>
  )
}
