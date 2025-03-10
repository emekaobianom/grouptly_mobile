import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.grouptly.app',
  appName: 'Grouptly',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'  // Optional for Android
  },
  plugins: {
    App: {
      preferNative: true
    },
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      launchFadeOutDuration: 2000,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,
    },
  },
  cordova: {
    preferences: {
      'AndroidLaunchMode': 'singleTask' // Ensures deep linking works properly
    }
  }
};

export default config;
