# 🔥 Firebase Setup Instructions

## 1. Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Name it: `web22-auth`
4. Disable Google Analytics (optional)
5. Click "Create project"

## 2. Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click "Get started"
3. Enable **Email/Password** sign-in method
4. Click "Save"

## 3. Create Firestore Database

1. Go to **Firestore Database**
2. Click "Create database"
3. Choose **Start in production mode**
4. Select location closest to you
5. Click "Enable"

## 4. Set Firestore Rules

Go to **Rules** tab and paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Click "Publish"

## 5. Get Firebase Config

1. Go to Project Settings (⚙️ icon)
2. Scroll to "Your apps"
3. Click **Web** icon `</>`
4. Register app name: `web22`
5. Copy the config object

## 6. Update .env File

Replace values in `.env`:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=web22-auth.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=web22-auth
VITE_FIREBASE_STORAGE_BUCKET=web22-auth.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

## 7. Start App

```powershell
npm run dev
```

Visit: http://localhost:5173

## 8. Test Authentication

1. Click "Se connecter"
2. Toggle to "S'inscrire" 
3. Create account:
   - Name: John Doe
   - Email: john@test.com
   - Password: test123
   - Role: Analyste
4. Click "Créer mon compte"
5. Should redirect to Dashboard!

## ✅ Done!

No backend server needed! Firebase handles:
- ✅ User authentication
- ✅ Password hashing
- ✅ Database storage
- ✅ Security rules
- ✅ Session management

**Much simpler than PostgreSQL!** 🎉
