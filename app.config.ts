import type { ConfigContext, ExpoConfig } from "expo/config"

// ---------------------------------------------------------------------------
// Environment detection (build-time only — reads from .env which is gitignored)
// ---------------------------------------------------------------------------

type AppEnv = "development" | "staging" | "production"

const APP_ENV = (process.env.APP_ENV ?? "development") as AppEnv

const IS_DEV = APP_ENV === "development"
const IS_PROD = APP_ENV === "production"

//eas init --id 4fd8e84d-30e5-4365-afae-53213d5f420e

// ---------------------------------------------------------------------------
// Per-environment native identifiers
// ---------------------------------------------------------------------------

const APP_NAMES: Record<AppEnv, string> = {
  development: "Rivo (Dev)",
  staging: "Rivo (Staging)",
  production: "Rivo",
}

const BUNDLE_IDS: Record<AppEnv, string> = {
  development: "com.tanvir.rivo.dev",
  staging: "com.tanvir.rivo.staging",
  production: "com.tanvir.rivo",
}

// ---------------------------------------------------------------------------
// Main config export
// Anything sensitive lives in .env (gitignored) and is read via process.env.
// The `extra` block only contains non-secret, runtime-safe values.
// ---------------------------------------------------------------------------

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,

  // ── Identity ──────────────────────────────────────────────────────────────
  name: APP_NAMES[APP_ENV],
  slug: "test-ci-cd",
  version: "1.0.0",
  owner: "yaxovex780s-team",

  // ── Appearance ────────────────────────────────────────────────────────────
  orientation: "portrait",
  icon: "./assets/app-icon/app-icon.png",
  scheme: "rivo",
  userInterfaceStyle: "automatic",

  // ── iOS ───────────────────────────────────────────────────────────────────
  ios: {
    ...config.ios,
    bundleIdentifier: BUNDLE_IDS[APP_ENV],
    icon: "./assets/expo.icon",
    supportsTablet: false,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },

  // ── Android ───────────────────────────────────────────────────────────────
  android: {
    ...config.android,
    package: BUNDLE_IDS[APP_ENV],
    adaptiveIcon: {
      backgroundColor: "#F3F4F6",
    },
    predictiveBackGestureEnabled: false,
  },

  // ── OTA Updates ───────────────────────────────────────────────────────────
  updates: {
    enabled: !IS_DEV,
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/4fd8e84d-30e5-4365-afae-53213d5f420e",
    checkAutomatically: IS_PROD ? "ON_LOAD" : "ON_ERROR_RECOVERY",
    requestHeaders: {
      "expo-channel-name": APP_ENV,
    },
  },

  runtimeVersion: {
    policy: "appVersion",
  },

  // ── Plugins ───────────────────────────────────────────────────────────────
  plugins: [
    "expo-router",
    "expo-secure-store",
    "expo-font",
    "expo-image",
    "expo-status-bar",
    "@react-native-community/datetimepicker",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#2F9C8F",
        image: "./assets/app-icon/app-icon.png",
        imageWidth: 200,
      },
    ],
    [
      "expo-localization",
      {
        supportedLocales: {
          ios: ["en", "es"],
          android: ["en", "es"],
        },
      },
    ],
    [
      "expo-build-properties",
      {
        ios: {
          deploymentTarget: "16.4",
        },
        android: {
          compileSdkVersion: 36,
          targetSdkVersion: 36,
          buildToolsVersion: "36.0.0",
        },
      },
    ],
    [
      "expo-image-picker",
      {
        photosPermission:
          "The app accesses your photos to let you share them with your friends.",
        colors: {
          cropToolbarColor: "#FFf",
        },
        dark: {
          colors: {
            cropToolbarColor: "#fff",
          },
        },
      },
    ],
    [
      "react-native-maps",
      {
        iosGoogleMapsApiKey: "",
        androidGoogleMapsApiKey: "",
      },
    ],
    [
      "expo-document-picker",
      {
        iCloudContainerEnvironment: "Production",
      },
    ],
  ],

  // ── Experiments ───────────────────────────────────────────────────────────
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },

  // ── Extra (runtime values → Constants.expoConfig.extra → src/config/env.ts)
  // ⚠️  Rule: NO secrets here. Everything in `extra` is visible in the JS bundle.
  //    API keys, tokens, passwords → server-side only.
  extra: {
    appEnvironment: APP_ENV,
    // All other runtime defaults live in src/config/app-env.ts
    // and are read by src/config/env.ts via Constants.expoConfig.extra
    eas: {
      projectId: "4fd8e84d-30e5-4365-afae-53213d5f420e",
    },
  },
})
