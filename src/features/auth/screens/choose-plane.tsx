import React from "react"
import { Pressable, View } from "react-native"

import {
  darkTick,
  freePlane,
  freePlaneTick,
  onlyTick,
  planePlus,
  planePlusButton,
  planePro,
  planeProButton,
  plusPlaneTick,
  plusPlaneTickThor,
  proPlaneTick,
  proPlaneTickThor,
} from "@/assets/icons/icons"
import { AppText } from "@/components/ui/app-text"
import TopBackButton from "@/components/ui/app-top-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { HeroPanel } from "@/components/ui/hero-panel"
import { LoadingIndicator } from "@/components/ui/loading-indicator"
import { Screen } from "@/components/ui/screen"
import tw from "@/lib/tailwind"
import { useAppTheme } from "@/theme/theme-provider"
import { router } from "expo-router"
import { SvgXml } from "react-native-svg"
import { useGetPlansQuery } from "../api/auth-api"

type BillingPeriod = "monthly" | "annual"

type FreePlanCardProps = {
  onPress?: () => void
}

type PlanType = "free" | "plus" | "pro"

type PlanCardProps = {
  type: "plus" | "pro"
  title: string
  description: string
  price: string
  priceSuffix?: string
  priceDescription?: string
  features: string[]
  buttonLabel: string
  onPress?: () => void
  active?: boolean
  badge?: string
}

const freeFeatures = [
  "1 pet profile",
  "Basic walk tracking",
  "Basic training lessons",
  "Appointments",
  "Matching and messages",
  "Marketplace access",
]

const plusFeatures = [
  "Everything in Free",
  "Up to 2 pet profiles",
  "RivoCare AI access",
  "Weight tracking",
  "Vaccination records",
  "Advanced recommendations",
  "Improved pet-health insights",
]

const proFeatures = [
  "Everything in Rivo Plus",
  "Up to 3 pet profiles",
  "Health Vault access",
  "Advanced AI analysis",
  "Expanded health history",
  "Premium profile customization",
  "Pro badge and priority support",
]

const PLAN_STYLES = {
  plus: {
    border: "border-[rgba(47,156,143,0.73)]",
    accent: "bg-[#2f9c8f]",
    iconBorder: "border-[rgba(47,156,143,0.19)]",
    iconBackground: "bg-[rgba(47,156,143,0.14)]",
    checkBackground: "bg-[rgba(47,156,143,0.09)]",
    button: "bg-[#2f9c8f]",
  },
  pro: {
    border: "border-[#ffe696]",
    accent: "bg-[#d4af37]",
    iconBorder: "border-[rgba(212,175,55,0.19)]",
    iconBackground: "bg-[rgba(212,175,55,0.14)]",
    checkBackground: "bg-[rgba(212,175,55,0.09)]",
    button: "bg-[#d4af37]",
  },
} as const

export default function FreePlanCard({ onPress }: FreePlanCardProps) {
  const [billingPeriod, setBillingPeriod] =
    React.useState<BillingPeriod>("monthly")

  const { colors, resolvedTheme } = useAppTheme()

  const isDark = resolvedTheme === "dark"

  const { data: plans, isLoading } = useGetPlansQuery()

  const freePlan = plans?.data?.find(
    (p: any) => p.name.toLowerCase() === "free" || p.id === 1
  )
  const plusPlan = plans?.data?.find(
    (p: any) => p.name.toLowerCase().includes("plus") || p.id === 2
  )
  const proPlan = plans?.data?.find(
    (p: any) => p.name.toLowerCase().includes("pro") || p.id === 3
  )

  const isAnnual = billingPeriod === "annual"

  // Pricing calculations (with -29% discount for annual)
  const plusMonthly = Number(plusPlan?.price ?? "4.97")
  const plusDisplayPrice = isAnnual
    ? `$${(plusMonthly * 0.71).toFixed(2)}`
    : `$${plusMonthly.toFixed(2)}`

  const proMonthly = Number(proPlan?.price ?? "7.97")
  const proDisplayPrice = isAnnual
    ? `$${(proMonthly * 0.71).toFixed(2)}`
    : `$${proMonthly.toFixed(2)}`

  return (
    <Screen>
      <TopBackButton hidden={true} newTopBarExtra={false} />

      <HeroPanel
        title="Choose the best plan ."
        body="All plan include core features tokeep your pet happy and healthy"
        rivo
      />

      <BillingTabs value={billingPeriod} onChange={setBillingPeriod} />

      {isLoading ? (
        <LoadingIndicator label="Loading subscription plans..." />
      ) : (
        <>
          {/* Free Plan */}
          <FreePlanCardItem
            isDark={isDark}
            features={freePlan?.features || freeFeatures}
            onPress={onPress}
          />

          {/* Rivo Plus */}
          <PlanCard
            type="plus"
            title={plusPlan?.name || "Rivo Plus"}
            description="For dedicated pet parents"
            price={plusDisplayPrice}
            priceSuffix="/ month"
            priceDescription={
              isAnnual
                ? `Billed annually ($${(plusMonthly * 0.71 * 12).toFixed(2)}/yr)`
                : "Best for most pet owners"
            }
            features={plusPlan?.features || plusFeatures}
            buttonLabel={`Get ${plusPlan?.name || "Rivo Plus"}`}
            badge="Most Popular"
            onPress={onPress}
          />

          {/* Rivo Pro */}
          <PlanCard
            type="pro"
            title={proPlan?.name || "Rivo Pro"}
            description="The complete pet care platform"
            price={proDisplayPrice}
            priceSuffix="/ month"
            priceDescription={
              isAnnual
                ? `Billed annually ($${(proMonthly * 0.71 * 12).toFixed(2)}/yr)`
                : "For serious pet enthusiasts"
            }
            features={proPlan?.features || proFeatures}
            buttonLabel={`Get ${proPlan?.name || "Rivo Pro"}`}
            onPress={onPress}
          />
        </>
      )}
    </Screen>
  )
}

/* -------------------------------------------------------------------------- */
/* Billing Tabs                                                               */
/* -------------------------------------------------------------------------- */

type BillingTabsProps = {
  value: BillingPeriod
  onChange: (value: BillingPeriod) => void
}

function BillingTabs({ value, onChange }: BillingTabsProps) {
  const { colors, resolvedTheme } = useAppTheme()

  const isDark = resolvedTheme === "dark"
  return (
    <View
      style={tw`w-full flex-row items-center rounded-full border border-[rgba(0,0,0,0.08)] ${isDark ? `bg-[${colors.ghostBg}]` : "bg-[rgba(0,0,0,0.06)]"} p-1`}
    >
      <BillingTab
        label="Monthly"
        active={value === "monthly"}
        onPress={() => onChange("monthly")}
      />

      <BillingTab
        label="Annual"
        active={value === "annual"}
        discount="-29%"
        onPress={() => onChange("annual")}
      />
    </View>
  )
}

type BillingTabProps = {
  label: string
  active: boolean
  discount?: string
  onPress: () => void
}

function BillingTab({ label, active, discount, onPress }: BillingTabProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        tw`flex-1 flex-row items-center justify-center rounded-full px-5 py-2`,
        active && tw`bg-[#0d1117]`,
        pressed && tw`opacity-80`,
      ]}
    >
      <AppText
        variant="body"
        tone={active ? "textWhite" : "gray"}
        style={tw`font-inter-semibold text-center`}
      >
        {label}
      </AppText>

      {discount && (
        <View style={tw`ml-2 rounded-full bg-[#22C55E33] px-2 py-0.5`}>
          <AppText
            variant="caption"
            tone="success"
            style={tw`text-[10px] font-inter-bold text-[#22C55E]`}
          >
            {discount}
          </AppText>
        </View>
      )}
    </Pressable>
  )
}

/* -------------------------------------------------------------------------- */
/* Free Plan                                                                  */
/* -------------------------------------------------------------------------- */

function FreePlanCardItem({
  isDark,
  features = freeFeatures,
  onPress,
}: {
  isDark: boolean
  features?: string[]
  onPress?: () => void
}) {
  return (
    <Card>
      <View style={tw`w-full items-start`}>
        <PlanHeader
          type="free"
          title="Free"
          description="Essential pet care, always free"
          active
        />

        <PlanPrice price="Free" suffix="forever" />

        <FeatureList isDark={isDark} features={features} type="free" />

        <Button
          label="Get Free Plan"
          onPress={
            onPress ? onPress : () => router.push("/(auth)/welcome-to-rivo")
          }
          style={[
            tw`mt-6`,
            {
              boxShadow: "0px 8px 24px rgba(47, 156, 143, 0.25)",
              elevation: 24,
            },
          ]}
        />
      </View>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/* Reusable Paid Plan Card                                                    */
/* -------------------------------------------------------------------------- */

function PlanCard({
  type,
  title,
  description,
  price,
  priceSuffix,
  priceDescription,
  features,
  buttonLabel,
  badge,
  onPress,
}: PlanCardProps) {
  const styles = PLAN_STYLES[type]

  const { colors, resolvedTheme } = useAppTheme()

  const isDark = resolvedTheme === "dark"

  return (
    <View
      style={[
        tw`w-full overflow-hidden rounded-3xl border-2 ${isDark ? `bg-[${colors.ghostBg}]` : "bg-white"} ${styles.border}`,
        {
          boxShadow:
            type === "plus"
              ? "0px 8px 24px rgba(47, 156, 143, 0.25)"
              : "0px 8px 24px rgba(212, 175, 55, 0.25)",
          elevation: 24,
        },
      ]}
    >
      {/* Top Accent */}
      <View style={tw`w-full ${styles.accent} py-0.5`} />

      <View style={tw`w-full p-6`}>
        <PlanHeader
          type={type}
          title={title}
          description={description}
          badge={badge}
        />

        <PlanPrice
          price={price}
          suffix={priceSuffix}
          description={priceDescription}
        />

        <FeatureList features={features} type={type} />

        <PlanButton type={type} label={buttonLabel} onPress={onPress} />

        <AppText variant="caption" tone="gray" style={tw`mt-2 text-center`}>
          Cancel anytime · No hidden fees
        </AppText>
      </View>
    </View>
  )
}

/* -------------------------------------------------------------------------- */
/* Plan Header                                                                */
/* -------------------------------------------------------------------------- */

type PlanHeaderProps = {
  type: PlanType
  title: string
  description: string
  active?: boolean
  badge?: string
}

function PlanHeader({
  type,
  title,
  description,
  active,
  badge,
}: PlanHeaderProps) {
  if (type === "free") {
    return (
      <View style={tw`w-full flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center gap-3`}>
          <PlanIcon type="free" />

          <View style={tw`gap-2`}>
            <View style={tw`flex-row items-center gap-2`}>
              <AppText
                variant="subtitle"
                tone="blackish"
                style={tw`font-extrabold`}
              >
                {title}
              </AppText>

              {active && (
                <View
                  style={tw`flex-row items-center gap-1 rounded-full bg-[rgba(139,147,168,0.13)] px-2.5 py-0.5`}
                >
                  <SvgXml xml={onlyTick} />

                  <AppText
                    variant="caption"
                    tone="grayish"
                    style={tw`text-[10px] font-bold`}
                  >
                    Active
                  </AppText>
                </View>
              )}
            </View>

            <AppText variant="caption" tone="gray" style={tw`text-[12px]`}>
              {description}
            </AppText>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={tw`w-full flex-row items-start justify-between`}>
      <View style={tw`flex-row items-center gap-3`}>
        <PlanIcon type={type} />

        <View style={tw`flex-1 items-start gap-1`}>
          <View style={tw`flex-row flex-wrap items-center gap-2`}>
            <AppText
              variant="subtitle"
              tone="blackish"
              style={tw`font-inter-bold`}
            >
              {title}
            </AppText>

            {badge && (
              <View style={tw`rounded-full bg-primary px-2.5 py-0.5`}>
                <AppText
                  variant="caption"
                  tone="textWhite"
                  style={tw` font-inter-bold`}
                >
                  {badge}
                </AppText>
              </View>
            )}
          </View>

          <AppText variant="caption" tone="gray">
            {description}
          </AppText>
        </View>
      </View>
    </View>
  )
}

/* -------------------------------------------------------------------------- */
/* Plan Icon                                                                  */
/* -------------------------------------------------------------------------- */

function PlanIcon({ type }: { type: PlanType }) {
  if (type === "free") {
    return (
      <View>
        <SvgXml xml={freePlane} />
      </View>
    )
  }

  return (
    <View>
      {type === "plus" ? <SvgXml xml={planePlus} /> : <SvgXml xml={planePro} />}
    </View>
  )
}

/* -------------------------------------------------------------------------- */
/* Plan Price                                                                 */
/* -------------------------------------------------------------------------- */

type PlanPriceProps = {
  price: string
  suffix?: string
  description?: string
}

function PlanPrice({ price, suffix, description }: PlanPriceProps) {
  return (
    <View style={tw`w-full pt-4`}>
      <View style={tw`flex-row items-baseline`}>
        <AppText variant="hero" tone="blackish" style={tw`font-inter-black`}>
          {price}
        </AppText>

        {suffix && (
          <AppText variant="body" tone="grayish" style={tw`ml-1`}>
            {suffix}
          </AppText>
        )}
      </View>

      {description && (
        <AppText variant="caption" tone="grayish" style={tw`pt-0.5`}>
          {description}
        </AppText>
      )}
    </View>
  )
}

/* -------------------------------------------------------------------------- */
/* Feature List                                                               */
/* -------------------------------------------------------------------------- */

function FeatureList({
  features,
  type,
  isDark,
}: {
  features: string[]
  type: PlanType
  isDark?: boolean
}) {
  return (
    <View style={tw`w-full gap-2.5 pt-5`}>
      {features.map((feature, index) => {
        const isInheritedFeature =
          (type === "plus" || type === "pro") && index === 0

        let tone: React.ComponentProps<typeof AppText>["tone"] = "blackish"
        let textColorStyle = tw`flex-1 text-sm font-inter-regular`

        if (isInheritedFeature) {
          if (type === "plus") {
            tone = "primary"
            textColorStyle = tw`flex-1 text-sm font-inter-semibold`
          } else if (type === "pro") {
            tone = undefined
            textColorStyle = tw`flex-1 text-sm font-inter-semibold text-[#d4af37]`
          }
        }

        return (
          <View
            key={`${type}-${feature}`}
            style={tw`w-full flex-row items-center gap-3`}
          >
            <FeatureCheck isDark={isDark} type={type} index={index} />

            <AppText variant="body" tone={tone} style={textColorStyle}>
              {feature}
            </AppText>
          </View>
        )
      })}
    </View>
  )
}

/* -------------------------------------------------------------------------- */
/* Feature Check                                                              */
/* -------------------------------------------------------------------------- */

function FeatureCheck({
  isDark,
  type,
  index,
}: {
  isDark?: boolean
  type: PlanType
  index: number
}) {
  if (type === "free") {
    return (
      <View>
        <SvgXml xml={isDark ? darkTick : freePlaneTick} />
      </View>
    )
  }

  if (type === "plus") {
    if (index === 0) {
      return (
        <View>
          <SvgXml xml={plusPlaneTickThor} />
        </View>
      )
    }
    return (
      <View>
        <SvgXml xml={plusPlaneTick} />
      </View>
    )
  }

  if (type === "pro") {
    if (index === 0) {
      return (
        <View>
          <SvgXml xml={proPlaneTickThor} />
        </View>
      )
    }
    return (
      <View>
        <SvgXml xml={proPlaneTick} />
      </View>
    )
  }

  return null
}

/* -------------------------------------------------------------------------- */
/* Plan Button                                                                */
/* -------------------------------------------------------------------------- */

function PlanButton({
  type,
  label,
  onPress,
}: {
  type: Exclude<PlanType, "free">
  label: string
  onPress?: () => void
}) {
  const styles = PLAN_STYLES[type]

  return (
    <View style={[tw`w-full pt-6`, {}]}>
      <Pressable
        onPress={
          onPress ? onPress : () => router.push("/(auth)/welcome-to-rivo")
        }
        style={({ pressed }) => [
          tw`w-full flex-row items-center justify-center gap-2 rounded-full px-4 py-3.5 ${styles.button}`,
          pressed && tw`opacity-80`,
          {
            boxShadow:
              type === "plus"
                ? "0px 8px 24px rgba(47, 156, 143, 0.25)"
                : "0px 8px 24px rgba(212, 175, 55, 0.25)",
            elevation: 10,
          },
        ]}
      >
        {type === "plus" ? (
          <SvgXml xml={planePlusButton} />
        ) : (
          <SvgXml xml={planeProButton} />
        )}

        <AppText variant="body" tone="textWhite" style={tw`font-bold`}>
          {label}
        </AppText>
      </Pressable>
    </View>
  )
}
