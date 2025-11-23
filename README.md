# 520Mart

A simple but clean mini-mart mobile app built with Expo & React Native. This project was mainnly for practice but I still tried to keep things neat and realistic. If you go through the folders, you’ll notice the layout follows a real mobile app structure even though the whole thing is still fairly small.

Sometimes we build things just so we can learn something new and that’s kinda what 520Mart is.

---

## What the App Does

520Mart is a lightweight mobile shopping demo. It has a home screen, some basic screens, a few components and utilities and a structure that’s easy to extend into a full store app later.

It’s built using Expo’s file based routing and Tailwind style utilities. Nothing too crazy but clean enough to grow.

---

## Features

* Product listing UI (cards, layouts, etc)
* Screens powered by Expo Router
* Tailwind-style classes for quick styling
* Components folder for reusable UI pieces
* Basic utilities + hooks folder
* Easy to extend (add cart, auth, payment, etc)

---

## Tech Stack

* **Expoo (React Native)**
* **Expo Router** for navigation
* **Tailwind-like styling**
* **JavaScript**
* **Yarn** (npm is fine too)

---

## Project Structure

```
520Mart/
├─ app/                
│  ├─ (tabs)/_layout.js
│  ├─ home.js
│  ├─ index.js
│  ├─ sign-in.js
│  └─ sign-up.js
├─ assets/               # Images, icons
├─ components/           # UI pices
├─ config/               # Firebase & other configs
├─ constants/            # Constant values
├─ hooks/                # Custom hooks
├─ utils/                # Helper functions
├─ global.css            # Tailwind-like styling
├─ tailwind.config.js
├─ package.json
└─ README.md
```

---

## Getting Started

### Requirements

* Node.js (LTS recommended)
* Expo CLI (`npx expo` works too)
* A phone with Expo Go OR an emulator(Andoid Studio/ Xcode)

### Install Dependencies

```bash
git clone https://github.com/Oluwamarcellus/520Mart.git
cd 520Mart
yarn install # or npm install
```

### Run the App

```bash
npx expo start
```

Scan the QR code with Expo Go or pick your emulator.

---

## Environment Setup(in your .env file)

#### Cloudinary configuration

```env
EXPO_PUBLIC_CLOUDINARY_API_KEY=(your cloudinary api key)
EXPO_PUBLIC_CLOUDINARY_API_SECRET=(your cloudinary api secret)
EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME=(your cloud name)
EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET=(your upload preset)
```

If you add Firebase or any service later:

```env
FIREBASE_API_KEY=yourKeyHere
FIREBASE_PROJECT_ID=yourProjectId
```
Import them in your config files.

---

## Building for Production (EAS)

```bash
npm install -g eas-cli
eas login
eas init
eas build --platform android
eas build --platform ios
```
Make sure your `app.json` or `app.config.js` has your bundle IDs & scheme.

---

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/new-thing`
3. Commit: `git commit -m "feat: add new thing"`
4. Push & create PR
