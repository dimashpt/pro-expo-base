# Configuration

This document covers environment variables, app configuration, and platform-specific settings for the Expo Base Template.

## Environment Variables

Environment variables are managed using `.env.local` file in the root directory. This file is gitignored for security.

### Required Variables

Create a `.env.local` file with the following variables:

```env
# App Configuration
APP_NAME=YourAppName
APP_BUNDLE_ID=com.yourcompany.app
APP_VARIANT=dev  # dev | preview | production
APP_SCHEME=yourapp

# Expo Configuration
EXPO_SLUG=your-app-slug
EXPO_PROJECT_ID=your-expo-project-id
EXPO_OWNER=your-expo-username

# Optional: Add your API keys and service configurations
# EXPO_PUBLIC_API_URL=https://api.yourapp.com
# EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Environment Variable Types

#### Public Variables (Client-side)
Variables prefixed with `EXPO_PUBLIC_` are embedded in the client bundle and accessible at runtime:

```typescript
// Accessible in the app
const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
```

#### Build-time Variables
Variables without the prefix are only available during build time:

```javascript
// Only available in app.config.ts
const googleServicesJson = process.env.GOOGLE_SERVICES_JSON;
```

### Security Best Practices

**❌ NEVER:**
- Commit `.env.local` to version control
- Share API keys in public channels
- Include secrets in the client bundle unnecessarily

**✅ ALWAYS:**
- Use `.env.local` for local development
- Set environment variables in your CI/CD pipeline
- Use different API keys for development/production
- Rotate API keys regularly

### Optional: Third-Party Services

Depending on your app requirements, you may need to configure:

#### Google Maps (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Maps SDK for Android/iOS
4. Create API credentials
5. Add to `.env.local`:
   ```env
   EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...
   ```

#### Firebase (Optional)
1. Create a Firebase project
2. Download `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)
3. Place in the root directory
4. Configure in `app.config.ts`

#### Sentry (Optional)
Error tracking is pre-configured. To enable:
1. Create a Sentry account
2. Add your auth token to environment variables
3. Update organization and project in `app.config.ts`

## App Configuration

The main app configuration is in `app.config.ts`. This file is TypeScript-based for better type safety and dynamic configuration.

### Version Management

```typescript
// app.config.ts
const APP_VERSION = '0.1.0';        // App version (semver)
const APP_BUILD_NUMBER = 1;         // Incremental build number

export default {
  version: APP_VERSION,
  ios: {
    buildNumber: APP_BUILD_NUMBER.toString(),
  },
  android: {
    versionCode: APP_BUILD_NUMBER,
  },
};
```

**Notes:**
- `VERSION` is the semantic version shown to users (e.g., "2.3.0")
- `BUILD_NUMBER` is an integer that must increment with each release
- iOS uses `buildNumber` (string), Android uses `versionCode` (integer)
- Both use the same `BUILD_NUMBER` constant for consistency

### App Variants

The app supports three variants for different environments:

```typescript
const APP_VARIANT = process.env.APP_VARIANT || 'dev';

const variants = {
  dev: {
    name: 'YourApp Dev',
    bundleIdentifier: 'com.yourcompany.app.dev',
    icon: './src/assets/images/icon-ios-dev.icon',
  },
  preview: {
    name: 'YourApp Preview',
    bundleIdentifier: 'com.yourcompany.app.preview',
    icon: './src/assets/images/icon-ios-preview.icon',
  },
  production: {
    name: 'YourApp',
    bundleIdentifier: 'com.yourcompany.app',
    icon: './src/assets/images/icon-ios.icon',
  },
};
```

Each variant has:
- Unique display name
- Distinct bundle identifier/package name
- Custom app icons
- Separate configurations

### Platform-Specific Settings

#### iOS Configuration

```typescript
ios: {
  buildNumber: BUILD_NUMBER.toString(),
  bundleIdentifier: getBundleIdentifier(),
  supportsTablet: true,
  infoPlist: {
    NSCameraUsageDescription: 'Camera access is required for profile photos',
    NSPhotoLibraryUsageDescription: 'Photo library access for selecting images',
    // Add other permissions as needed
  },
  associatedDomains: [
    'applinks:yourapp.com',
  ],
}
```

**Key Settings:**
- **buildNumber**: Build version number (string)
- **bundleIdentifier**: Unique app identifier (reverse domain)
- **supportsTablet**: Enable iPad support
- **infoPlist**: iOS-specific permissions and settings
- **associatedDomains**: Universal Links configuration

#### Android Configuration

```typescript
android: {
  versionCode: BUILD_NUMBER,
  package: getPackageName(),
  edgeToEdgeEnabled: true,
  adaptiveIcon: {
    foregroundImage: './src/assets/images/icon-android.png',
    backgroundColor: '#FFFFFF',
  },
  permissions: [
    // Add required permissions for your app
  ],
  intentFilters: [
    {
      action: 'VIEW',
      autoVerify: true,
      data: [
        {
          scheme: 'https',
          host: 'yourapp.com',
          pathPrefix: '/auth/reset-password',
        },
      ],
      category: ['BROWSABLE', 'DEFAULT'],
    },
  ],
}
```

**Key Settings:**
- **versionCode**: Build version number (integer)
- **package**: Unique app identifier (reverse domain)
- **edgeToEdgeEnabled**: Enable edge-to-edge display
- **adaptiveIcon**: Adaptive icon for Android 8+
- **permissions**: Required Android permissions
- **intentFilters**: App Links configuration

### Expo Configuration

```typescript
{
  name: getAppName(),
  slug: process.env.EXPO_SLUG,
  scheme: process.env.APP_SCHEME,
  owner: process.env.EXPO_OWNER,
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './src/assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  experiments: {
    reactCompiler: true,
    typedRoutes: true,
  },
}
```

**Key Features Enabled:**
- **React Compiler**: Experimental React Compiler for better performance
- **Typed Routes**: Type-safe navigation with Expo Router
- **New Architecture**: React Native's new architecture (Fabric & Bridgeless) enabled via build properties

### Plugin Configuration

The app uses various Expo and community plugins:

```typescript
plugins: [
  'expo-router',
  'expo-font',
  'expo-localization',
  'expo-secure-store',
  [
    'expo-camera',
    {
      cameraPermission: 'Allow camera access for attendance check-in',
    },
  ],
  [
    'expo-location',
    {
      locationAlwaysAndWhenInUsePermission: 'Allow location access for attendance tracking',
    },
  ],
  // ... more plugins
]
```

## Google Services Configuration

### Android - google-services.json

1. Download `google-services.json` from Firebase Console
2. Place it in the root directory: `./google-services.json`
3. The file is referenced in `app.config.ts`:
   ```typescript
   googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
   ```

**Note**: This file contains Firebase configuration and should not be committed to version control if it contains sensitive data.

### iOS - GoogleService-Info.plist

For iOS, the Google Services configuration is handled automatically by Expo during the build process using the same Firebase project.

## Sentry Configuration

Error tracking is configured in `app.config.ts`:

```typescript
{
  hooks: {
    postPublish: [
      {
        file: 'sentry-expo/upload-sourcemaps',
        config: {
          organization: 'your-org',
          project: 'mobile-app',
          authToken: process.env.SENTRY_AUTH_TOKEN,
        },
      },
    ],
  },
}
```

**Setup:**
1. Create a Sentry account and project
2. Get your auth token from Sentry
3. Add to your environment:
   ```env
   SENTRY_AUTH_TOKEN=your_token_here
   ```

## Deep Linking Configuration

### Universal Links (iOS) and App Links (Android)

The app supports deep linking for features like password reset:

**iOS (Associated Domains):**
```typescript
associatedDomains: [
  'applinks:app.example.com',
  'applinks:*.app.example.com',
]
```

**Android (Intent Filters):**
```typescript
intentFilters: [
  {
    action: 'VIEW',
    autoVerify: true,
    data: [
      {
        scheme: 'https',
        host: 'mobile-app.app',
        pathPrefix: '/reset-password',
      },
    ],
    category: ['BROWSABLE', 'DEFAULT'],
  },
]
```

**Example URLs:**
- `https://app.example.com/reset-password?token=abc123`
- `app://reset-password?token=abc123` (custom scheme)

## Environment-Specific Configuration

### Development

```env
APP_VARIANT=development
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_dev_api_key
```

### Preview/Staging

```env
APP_VARIANT=preview
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_preview_api_key
```

### Production

```env
APP_VARIANT=production
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_prod_api_key
```

## CI/CD Configuration

For continuous integration and deployment, set environment variables in your CI/CD platform:

**GitHub Actions:**
```yaml
env:
  EXPO_PUBLIC_GOOGLE_MAPS_API_KEY: ${{ secrets.GOOGLE_MAPS_API_KEY }}
  APP_VARIANT: production
```

**EAS Build Secrets:**
```bash
# Set secrets for EAS builds
eas secret:create --scope project --name GOOGLE_MAPS_API_KEY --value "your_key"
```

## Troubleshooting

### Environment Variables Not Working

1. Restart the development server after changing `.env.local`
2. Clear Metro cache: `bun start --clear`
3. Ensure variable names are correct (case-sensitive)
4. For public variables, ensure they start with `EXPO_PUBLIC_`

### Google Maps Not Showing

1. Verify API key is correct
2. Check API key restrictions (bundle ID/package name)
3. Ensure Maps SDK is enabled in Google Cloud Console
4. Check network connectivity and API quotas

### Build Configuration Issues

1. Run `bun prebuild --clean` to regenerate native projects
2. Check `app.config.ts` for syntax errors
3. Verify all required environment variables are set
4. Review native project files after prebuild

## Next Steps

- Review [Building](./BUILDING.md) for build configuration
- See [Development](./DEVELOPMENT.md) for development workflow
- Check [Getting Started](./GETTING_STARTED.md) for initial setup
