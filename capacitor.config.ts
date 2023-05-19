import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.walkoclock.app',
  appName: 'walk-o-clock',
  webDir: "dist/walk-o-clock",
  server: {
    androidScheme: 'https'
  }
};

export default config;
