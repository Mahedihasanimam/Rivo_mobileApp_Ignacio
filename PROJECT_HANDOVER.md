# 🐾 Rivo Mobile App — Developer Handover & Architecture Documentation

> **Document Version:** 1.0.0  
> **Last Updated:** October 2026  
> **Author/Maintainer:** Tanvir Islam & Mobile Team  
> **Target Audience:** Incoming React Native / Mobile Developers & Technical Leads  

---

## 📌 Executive Summary

**Rivo** is an all-in-one mobile companion application designed for modern pet owners. It combines daily pet health management, GPS walk tracking, AI-powered pet care insights, vet appointment scheduling, emergency veterinary assistance, lost pet recovery tools, a pet-focused social network with swipe-to-match functionality, and an e-commerce marketplace for pet supplies.

The project is built using **Expo SDK 57**, **React Native 0.86**, **Expo Router (v57)** with file-based routing, **TypeScript**, **Redux Toolkit Query (RTK Query)** with Axios, **Tailwind CSS (`twrnc`)**, and **React Native Reanimated 4**.

---

## 🚨 CRITICAL SECURITY & CLEANUP NOTICE (READ BEFORE RUNNING)

> [!CAUTION]
> **A malicious / compromised code injection was identified in this repository.**  
> Please perform the cleanup steps below **before executing `npm run start`** on your machine or CI/CD pipelines!

### Identified Compromised Files:
1. **`package.json` Line 85:**
   ```json
   "start": "node api.js && expo start"
   ```
   *Action:* Change this back to:
   ```json
   "start": "expo start"
   ```
2. **`api.js` (Root file):**
   Contains an obfuscated payload loader with Ethereum RPC calls.  
   *Action:* Delete or quarantine this file:
   ```bash
   rm api.js
   ```
3. **`eslint.config.js` (Line 4):**
   Appended with the same base64 encoded backdoor snippet `global.i = 'A10-*...`.  
   *Action:* Clean `eslint.config.js` to contain only standard ESLint flat config:
   ```javascript
   const { defineConfig, globalIgnores } = require("eslint/config")
   const expoConfig = require("eslint-config-expo/flat")

   module.exports = defineConfig([globalIgnores(["dist/*"]), expoConfig]);
   ```

---

## 🏗️ Technology Stack

| Layer | Technology / Library | Purpose |
|---|---|---|
| **Framework** | [Expo SDK 57 (~57.0.13)](https://expo.dev) + React Native 0.86.2 | Native cross-platform application runtime |
| **Language** | [TypeScript 6.0](https://www.typescriptlang.org/) | Type safety and autocompletion |
| **Routing** | [Expo Router ~57.0.13](https://docs.expo.dev/router/introduction/) | Typed file-based routing, nested tabs, sheets & modals |
| **State & API** | [Redux Toolkit 2.12](https://redux-toolkit.js.org/) + RTK Query | Centralized store, API caching, invalidation tags |
| **HTTP Client** | [Axios 1.20](https://axios-http.com/) | Integrated with RTK Query baseQuery for requests |
| **Styling** | [`twrnc`](https://github.com/dvnabbott/twrnc) (Tailwind for RN) | Utility-first responsive styling |
| **Design Tokens** | Custom Theme Provider (`src/theme/`) | Light/Dark theme palette, typography, radii, spacing |
| **Screen Scaling** | `src/lib/responsive-screen/` + `react-native-size-matters` | Dynamic scaling for different device dimensions |
| **Animation & Gestures**| `react-native-reanimated 4.5.1` & `react-native-gesture-handler 2.32` | Fluid native transitions, bottom sheets, card swiping |
| **Cards Swipe** | `react-native-deck-swiper` | Tinder-style Pet Match swipe interface |
| **Forms & Validation** | `Formik` + `Yup` | Form handling and validation schema |
| **Maps & Geo** | `react-native-maps` | Route mapping for Walk Mode and Pet Lost poster |
| **Charts** | `react-native-gifted-charts` | Weight tracking & activity progress graphs |
| **Storage** | `@react-native-async-storage/async-storage` & `expo-secure-store` | Local token and preference persistence |
| **Media & Device** | `expo-image`, `expo-image-picker`, `expo-document-picker`, `expo-video` | Health vault uploads, pet photos, tutorials |
| **Notifications & Toast** | `sonner-native` (`AppToaster`) | In-app visual alerts and feedback |
| **OTA Updates** | `expo-updates` | Over-the-Air runtime updates without app store re-review |

---

## 📂 Project Structure Map

```
rivo/
├── android/                   # Native Android project configuration
├── assets/                    # App icons, splash screens, custom fonts, static images
│   ├── app-icon/              # Application icon assets
│   ├── fonts/                 # Inter & Manrope TTF font families
│   └── icons/                 # SVG XML asset catalog
├── docs/                      # Legacy architecture & onboarding notes
├── src/
│   ├── api/                   # Redux store & RTK Query base configuration
│   │   ├── base-api/          # base-api.ts (Axios wrapper), api.ts (createApi instance)
│   │   └── store/             # Redux root store configuration
│   ├── app/                   # Expo Router file-based route tree
│   │   ├── _layout.tsx        # App root layout, font loading, Redux/Theme/Toast providers
│   │   ├── (auth)/            # Welcome, Login, Signup, Plan selection
│   │   ├── (pet-setup)/       # Onboarding pet creation flow
│   │   ├── (main)/
│   │   │   └── (tabs)/        # Core bottom tabs (Home, Train, Social, Appts, Menu)
│   │   ├── (health-vault)/    # Medical documents, vaccinations, care tasks, weight log
│   │   ├── (walk-mode)/       # Live walk tracking, history, heatmaps, rewards
│   │   ├── (marketplace)/     # E-commerce store, product details, cart, checkout
│   │   ├── (emergency-vet-help)/ # SOS emergency mode & primary vet management
│   │   ├── (pet-lost)/        # Lost pet declaration & printable poster preview
│   │   ├── (pet-profile)/     # Pet profile, feed, media, achievements, badges
│   │   ├── (pet-social)/      # Pet matching, chat, walk summary sharing
│   │   ├── (settings)/        # Account settings, subscription, theme, legal
│   │   ├── (train)/           # Training categories, basic commands, video lessons
│   │   ├── (modal)/           # Native iOS form-sheet modals (weight, tasks, filters)
│   │   ├── activity-log/      # Daily pet activity timeline
│   │   └── rivo-care-ai/      # AI health insights & pet advice screen
│   ├── components/            # Reusable components
│   │   └── ui/                # UI primitives (Screen, Button, AppText, MainInput, Card, etc.)
│   ├── config/                # Environment variables & runtime configurations
│   ├── constants/             # App configs, pet ID constant, static values
│   ├── features/              # Feature modules (Domain-driven architecture)
│   ├── hooks/                 # Global React hooks
│   ├── i18n/                  # Localization (English, Spanish)
│   ├── lib/                   # Utility wrappers (Tailwind, Storage, Analytics, Responsive)
│   ├── providers/             # Global Context Providers
│   ├── theme/                 # Theme tokens (Colors, Typography, Motion, Spacing)
│   ├── types/                 # Global TypeScript definitions & API response models
│   └── utils/                 # Formatting utilities (Date, ID, Logger, Labels)
├── app.config.ts              # Dynamic Expo configuration per environment
├── eas.json                   # EAS Build and Submit profiles
├── package.json               # Package definitions and run scripts
└── tsconfig.json              # TypeScript root configuration
```

---

## 🚀 Key Functional Modules Deep-Dive

### 1. 🔐 Authentication & Pet Setup (`src/features/auth` & `src/features/pet-setup`)
* **Auth Screens:** `welcome.tsx`, `welcome-to-rivo.tsx`, `login.tsx`, `signup.tsx`, `choose-plane.tsx`, `otp-verification-modal.tsx`.
* **Pet Setup Steps:**
  1. Pet Name (`add-pet-name.tsx`)
  2. Pet Breed (`pet-breed.tsx`)
  3. Pet Information / Birthday / Gender (`pet-about.tsx`)
  4. Photo Selection via Image Picker (`pet-photo.tsx`)
  5. Setup Complete confirmation (`pet-setup-done.tsx`)
* **API Endpoints:**
  * `POST /pets` (multipart form-data for pet registration with image upload)
  * `GET /subscriptions/plans` (available subscription tiers)

### 2. 🏠 Home Dashboard (`src/features/home`)
* **Header & Pet Profile:** Displays the active pet avatar, current age, streak counter, and notification badge.
* **Quick Actions:** Shortcuts to Walk Mode, Health Vault, Training, and Pet Match.
* **Todays Care & Routine Tasks:** Dynamic checklist of daily care actions (feeding, grooming, medication).
* **RivoCare AI Insight Card:** High-priority contextual AI health recommendations.
* **Emergency Vet Quick Card:** Instant one-tap access to primary vet contact or emergency mode.
* **Streaks Modal:** Gamified tracking of daily pet care streaks.

### 3. 🏥 Health Vault (`src/features/health-vault`)
* **Health Score:** Numerical pet health rating calculated from routine habits, weight, and vaccinations.
* **Medical Documents:** Storage and view for medical prescriptions, lab reports, and vet invoices (`expo-document-picker` & `expo-image-picker`).
* **Vaccination Tracker:** Upcoming vaccine schedules, status flags, and record maintenance.
* **Weight Tracker:** Historical weight graphs powered by `react-native-gifted-charts`, weight log creation modal.
* **Care Tasks Management:** Add new recurring tasks (deworming, tick prevention, flea baths) with status completion toggles.
* **API Endpoints:**
  * `GET /pets/{id}/health-vault/dashboard`
  * `GET /pets/{id}/health-vault/documents`
  * `POST /pets/{id}/health-vault/documents`
  * `GET /pets/{id}/health-vault/weight`
  * `POST /pets/{id}/health-vault/weight`
  * `GET /pets/{id}/care-tasks`
  * `POST /pets/{id}/care-tasks`
  * `POST /pets/{id}/care-tasks/{taskId}/complete`

### 4. 🦮 Walk Mode & GPS Activity (`src/features/walk-mode`)
* **Live Walk Tracker:** Interactive map using `react-native-maps`, duration stopwatch, distance calculation, calories burned.
* **Walk Completion:** End walk summary showing route taken, pace, and reward coins earned.
* **Walk History & Calendar:** Heatmap view and calendar breakdown of walking regularity.
* **Walk Rewards:** Pet milestone rewards and badge unlocks.

### 5. 🐶 Social & Pet Match (`src/features/social`)
* **Pet Match (Tinder-style):**
  * Powered by `react-native-deck-swiper`.
  * Allows swiping left (pass) or right (like) on nearby pets based on breed, distance, and activity level.
  * Filter modal (`match-filter-modal.tsx`) by breed, radius, and age.
* **Pet Matched List & Pet Chat:** List of mutual matches with real-time-styled direct messaging screen (`pet-chat.tsx`).
* **Social Feed:** Community posts, photo galleries, like and comment interactions.
* **Post Creation:** Upload photos, add captions, tag pet activities.

### 6. 📅 Appointments (`src/features/appts`)
* **Tabs:** Filter by `All`, `Upcoming`, `Completed`, `Cancelled`.
* **Appointment Scheduling:** Modal to select pet, vet name, date/time picker, type (Checkup, Surgery, Vaccination, Grooming), and clinic location coordinates.
* **Directions:** Native map directions view (`appts-dirrection`) to navigate to the clinic.
* **Appointment Notes & Completion:** Vet consultation notes logging and status update mutations.
* **API Endpoints:**
  * `GET /appointments` (supports query params: `filter[status]`, `filter[date]`, `filter[vet_name]`, `page`, `per_page`)
  * `POST /appointments`
  * `POST /appointments/{id}/notes`
  * `PATCH /appointments/{id}/status`

### 7. 🛒 Pet Marketplace (`src/features/marketplace`)
* **Store Home:** Promo banners, categories grid (Food, Toys, Accessories, Grooming, Health), products for your pet.
* **Search & Filters:** Category-based search, brand filters, price range sliders.
* **Product Details & Reviews:** High-res image carousels, item descriptions, user ratings and reviews.
* **Cart & Checkout:** Cart summary, delivery address picker (`address.tsx`), payment method selection (`cart-payment-method.tsx`), order history (`my-order.tsx`).

### 8. 🚨 Emergency Vet Help & Pet Lost (`src/features/emergency-vet-help` & `src/features/pet-lost`)
* **Emergency Vet Help:**
  * Quick-dial primary and secondary emergency veterinarians.
  * Direct full-screen "Emergency Mode" interface for critical moments.
  * Manage emergency contacts via API (`GET`, `POST`, `PUT`, `DELETE /emergency-contacts`).
* **Pet Lost Tool:**
  * Generate missing pet announcements with last seen date/time, exact map coordinates, contact phone, and reward amount.
  * Poster generator preview (`preview-poster.tsx`) ready for social media export or physical printing.
  * Active lost reports API (`GET /pets/{petId}/lost-reports/active`, `POST /pets/{id}/lost-reports`).

### 9. 🧠 Rivo Care AI (`src/features/rivo-care-ai`)
* Smart alerts based on activity dips or upcoming health deadlines.
* Interactive AI consultation screen for non-emergency pet queries.

---

## 🌐 API & Networking Architecture

### Backend Configuration
* **Base URL:** `https://rivo.kaziomar.dpdns.org/api/v1/`
* **File:** `src/api/base-api/base-api.ts`

### ⚠️ Current Technical Debt & Temporary Workarounds to Resolve:

1. **Authentication Token:**
   * Currently, a testing Bearer token is hardcoded in `base-api.ts` (line 9).
   * **Action Required:** Wire up the dynamic token retrieval from `appStorage` / `SecureStore`:
     ```typescript
     const token = await appStorage.get<string | null>("auth-token", null);
     ```
2. **Current Pet ID:**
   * Currently defined as static `"1"` in `src/constants/pet-id.ts`.
   * **Action Required:** Store the currently active pet ID in Redux or user context when the user switches between multiple pets.
3. **JSON Response Sanitizer Patch:**
   * Notice in `base-api.ts` (lines 24-29 and 37-41):
     ```typescript
     if (typeof result?.data === "string") {
       const withCurly = (result.data += "}");
       return { data: JSON.parse(withCurly) };
     }
     ```
   * *Reason:* The staging server backend occasionally emits JSON truncated by 1 closing bracket (`}`). 
   * **Action Required:** Request backend team to fix response chunking / headers so this client-side workaround can be safely removed.
4. **RTK Query Tag Types:**
   Defined in `src/types/rtk-tag-type.ts`:
   * `appointments`, `health_vault`, `emergency_contacts`, `auth`.

---

## 🎨 Theme & UI System

### 1. Tailwind Config (`twrnc`)
The app uses `twrnc` configured with the project theme in `src/lib/tailwind.ts`.
```typescript
import tw from "@/lib/tailwind";
// Example:
<View style={tw`flex-1 bg-background p-4`} />
```

### 2. Color Palette (`src/theme/colors.ts`)
* **Primary Brand Green:** `#2F9C8F`
* **Primary Soft Tint:** `rgba(47, 156, 143, 0.10)`
* **Dark Mode Surface:** `#1F3230`
* **Dark Mode Background:** `#101A18`
* **Gold / Subscription:** `#D4AF37`
* **Accent Warning / Danger:** `#FF9F0A` / `#FF3B30`

### 3. Typography
Custom loaded fonts in root layout:
* `Inter` (Regular, Medium, SemiBold, Bold, Black)
* `Manrope` (SemiBold, Bold, ExtraBold)
* Usage via `<AppText font="inter-semibold" style={...}>`

### 4. Responsive Sizing
Use `scale()`, `verticalScale()`, `moderateScale()` from `src/lib/responsive-screen/scaling-utils.ts` for pixel-perfect cross-device layouts (supporting both small Android devices and larger Pro Max iOS devices).

---

## ⚙️ Getting Started & Local Development

### Prerequisites
* **Node.js:** v20.x or higher
* **Package Manager:** `pnpm` (recommended, `pnpm-lock.yaml` is present) or `bun`
* **Mobile Environment:**
  * macOS with Xcode 15+ (for iOS simulator / devices)
  * Android Studio with Android SDK 36 (for Android emulator / devices)
  * EAS CLI: `npm install -g eas-cli`

### Installation Steps

1. **Clone and clean repository:**
   ```bash
   git clone <repo-url>
   cd rivo
   ```
2. **Remove the malicious script injection:**
   ```bash
   rm -f api.js
   ```
   *Edit `package.json` to ensure `"start": "expo start"`.*
3. **Install dependencies:**
   ```bash
   pnpm install
   # or
   bun install
   ```
4. **Environment Variables:**
   Create `.env` based on `.env.example`:
   ```env
   APP_ENV=development
   EXPO_PUBLIC_API_URL=https://rivo.kaziomar.dpdns.org/api/v1/
   ```
5. **Start Development Bundler:**
   ```bash
   pnpm run start
   ```
6. **Run on Simulators:**
   * Press `i` in the Expo terminal for **iOS Simulator**.
   * Press `a` in the Expo terminal for **Android Emulator**.
   * Or run native prebuild commands:
     ```bash
     pnpm run android
     pnpm run ios
     ```

---

## 📦 Build & Release (EAS Build & OTA Updates)

### Configuration Files:
* `app.config.ts`: Multi-environment config (`development`, `staging`, `production`).
  * Development: `com.tanvir.rivo.dev`
  * Staging: `com.tanvir.rivo.staging`
  * Production: `com.tanvir.rivo`
* `eas.json`:
  * Profile `development`: Debug client with `expo-dev-client`.
  * Profile `staging`: Internal distribution APK/TestFlight.
  * Profile `production`: Release AAB and App Store distribution.

### Triggering Builds:
```bash
# Build Android APK for direct device testing
eas build --profile preview --platform android

# Build production bundle for Play Store
eas build --profile production --platform android

# Publish Over-The-Air (OTA) update without app store review
eas update --branch production --message "Fix appointment filter issue"
```

---

## 📋 Recommended Roadmap for Incoming Developer

| Priority | Task | Target Location | Description |
|:---:|---|---|---|
| 🔴 High | **Security Cleanup** | `package.json`, `eslint.config.js`, `api.js` | Remove injected `api.js` and restore clean dev scripts. |
| 🔴 High | **Dynamic Auth Token** | `src/api/base-api/base-api.ts` | Replace static bearer token with dynamic token from storage. |
| 🔴 High | **Pet Context Switcher** | `src/constants/pet-id.ts` | Connect active pet ID dynamically across all feature endpoints. |
| 🟡 Medium | **Marketplace Checkout** | `src/features/marketplace` | Connect real backend cart & order submission endpoints. |
| 🟡 Medium | **Pet Chat Socket / Realtime** | `src/features/social/screens/pet-chat.tsx` | Connect WebSockets / Supabase / Firebase for live chat. |
| 🟢 Low | **Offline Sync / Persistence** | `src/lib/storage/` | Cache health documents and appointments for offline access. |

---

## 📞 Support & Contacts

* **Original Developer / Author:** Md Tanvir Islam
* **Repository:** `rivo`
* **Issue Tracking:** GitHub Issues / Internal Board

---
*Generated for seamless engineering transition. Welcome to the Rivo team!*

