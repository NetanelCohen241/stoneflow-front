# Stoneflow Frontend

This project uses Vite and React. API requests are made to the backend defined by
the `VITE_API_URL` environment variable. During local development it defaults to
`http://localhost:8000`.

## Packaging for iOS

The project is configured with [Capacitor](https://capacitorjs.com) so the web
build can run inside a native iOS wrapper.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Add the iOS platform and copy the built web assets:

   ```bash
   npx cap add ios
   npm run ios
   ```

3. Open the iOS project in Xcode to build and deploy to a device:

   ```bash
   npx cap open ios
   ```

After building the app in Xcode you can install the resulting `.ipa` on your
iOS device using TestFlight or a provisioning profile.
