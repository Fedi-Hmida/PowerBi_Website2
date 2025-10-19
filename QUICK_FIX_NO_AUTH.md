# 🚀 Quick Fix: Test Without Auth0

## Problem
You're getting an error when clicking "Se connecter" because Auth0 isn't configured yet.

## Two Solutions

### ✅ Solution 1: Temporarily Disable Authentication (Quick Test)

This lets you test the app immediately without Auth0.

**Step 1: Comment out Auth0Provider in main.tsx**

I can help you modify the code to make authentication optional for testing.

### ✅ Solution 2: Set Up Auth0 (Recommended - 10 minutes)

Follow these steps to fix it properly:

#### 1. Create Auth0 Account
- Go to: https://auth0.com/signup
- Sign up for FREE account
- Choose region closest to you

#### 2. Create Application
- In Auth0 Dashboard, go to **Applications** > **Create Application**
- Name: `web22 Olympic BI`
- Type: **Single Page Application**
- Click **Create**

#### 3. Get Your Credentials
After creating the application, you'll see:
- **Domain**: `dev-xxxxxxxxx.us.auth0.com`
- **Client ID**: `abc123xyz...`

#### 4. Configure Callback URLs
In the same application settings:
- **Allowed Callback URLs**: `http://localhost:5173`
- **Allowed Logout URLs**: `http://localhost:5173`
- **Allowed Web Origins**: `http://localhost:5173`
- Click **Save Changes**

#### 5. Create .env File
In the project folder, create `.env` file:

```bash
VITE_AUTH0_DOMAIN=dev-xxxxxxxxx.us.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id-here
VITE_AUTH0_REDIRECT_URI=http://localhost:5173
```

Replace with YOUR actual values from Auth0!

#### 6. Restart Server
```powershell
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

#### 7. Create Test User
- In Auth0 Dashboard, go to **User Management** > **Users**
- Click **Create User**
- Email: `test@example.com`
- Password: `Test123!@#`
- Click **Create**

#### 8. Assign Role
- Click on the user you just created
- Go to **Roles** tab
- Click **Assign Roles**
- First, create roles if not exists:
  - Go to **User Management** > **Roles**
  - Create: `admin`, `analyst`, `viewer`
  - Go back to user and assign `analyst` role

#### 9. Test Login
- Go to http://localhost:5173
- Click "Se connecter"
- Login with `test@example.com` / `Test123!@#`
- You should see your profile!

---

## Which Solution Should You Choose?

**Choose Solution 1** if:
- ✅ You just want to see the app quickly
- ✅ You'll set up Auth0 later

**Choose Solution 2** if:
- ✅ You want the full authentication working
- ✅ You have 10 minutes now
- ✅ You want to test real login flow

---

**Let me know which solution you prefer and I'll help you implement it!**
