# 🔐 Authentication Flow Diagram

## 📊 Visual Authentication Flow

```
╔═══════════════════════════════════════════════════════════════════╗
║                    WEB22 AUTHENTICATION FLOW                       ║
╚═══════════════════════════════════════════════════════════════════╝

┌──────────────┐
│              │
│    USER      │
│  (Browser)   │
│              │
└──────┬───────┘
       │
       │ 1. Visits http://localhost:5173
       ↓
┌──────────────────────────────┐
│   web22 Home Page            │
│   ┌────────────────────┐    │
│   │ 🔐 Se connecter   │ ←── Click
│   └────────────────────┘    │
└──────┬───────────────────────┘
       │
       │ 2. Redirects to Auth0
       ↓
┌──────────────────────────────┐
│      Auth0 Login Page        │
│   (auth0.com/login)          │
│                              │
│   Email: _______________     │
│   Password: ___________     │
│   [Login Button]             │
└──────┬───────────────────────┘
       │
       │ 3. User enters credentials
       │    Auth0 validates
       ↓
┌──────────────────────────────┐
│    Auth0 Token Generation    │
│                              │
│   ✅ User authenticated      │
│   📝 Generate tokens          │
│   🎫 Add role claims          │
│      (admin/analyst/viewer)  │
└──────┬───────────────────────┘
       │
       │ 4. Redirect back with token
       ↓
┌──────────────────────────────┐
│   web22 App (Callback)       │
│                              │
│   Auth0Provider receives:    │
│   - Access Token             │
│   - ID Token (with role)     │
│   - User Info                │
└──────┬───────────────────────┘
       │
       │ 5. Parse user & role
       ↓
┌──────────────────────────────┐
│    useAuth() Hook            │
│                              │
│  {                           │
│    user: {                   │
│      id: "auth0|123"         │
│      email: "user@email.com" │
│      name: "Jean Martin"     │
│      role: "analyst"         │
│    },                        │
│    isAuthenticated: true     │
│  }                           │
└──────┬───────────────────────┘
       │
       │ 6. Update UI
       ↓
┌──────────────────────────────┐
│    Navbar Component          │
│                              │
│  ┌────────────────────┐     │
│  │ 👤 Jean Martin     │     │
│  │ 📊 Analyste       │ ←── Role Badge
│  └────────────────────┘     │
│                              │
│  Navigation:                 │
│  ✅ Accueil                  │
│  ✅ Tableau de bord          │
│  ✅ Architecture             │
│  ❌ Admin (hidden)           │
└──────┬───────────────────────┘
       │
       │ 7. Navigate to Dashboard
       ↓
┌──────────────────────────────┐
│   ProtectedRoute Wrapper     │
│                              │
│   Check:                     │
│   ✅ isAuthenticated = true  │
│   ✅ hasPageAccess("dash...  │
│   ✅ role = "analyst"        │
│                              │
│   Result: ✅ ALLOW ACCESS    │
└──────┬───────────────────────┘
       │
       │ 8. Render protected content
       ↓
┌──────────────────────────────┐
│   Dashboard Page             │
│                              │
│   Power BI Embed (filtered)  │
│   - Region: Europe           │
│   - Sports: Assigned         │
│                              │
│   Controls:                  │
│   ✅ Export Button           │
│   ✅ Refresh Button          │
│   ❌ Admin Settings (hidden) │
└──────────────────────────────┘


═══════════════════════════════════════════════════════════════════

```

## 🎯 Role-Based Rendering

```
┌─────────────────────────────────────────────────────────────┐
│                  USER ROLE: ADMIN 🔧                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Navigation Menu:                                           │
│  ✅ Accueil                                                 │
│  ✅ Tableau de bord                                         │
│  ✅ Architecture                                            │
│  ✅ Parties prenantes                                       │
│  ✅ À propos                                                │
│  ✅ Admin Panel (exclusive)                                 │
│  ✅ User Management (exclusive)                             │
│                                                             │
│  Power BI Dashboard:                                        │
│  📊 All Data (No RLS filtering)                            │
│  🌍 All Countries                                           │
│  🏅 All Sports                                              │
│                                                             │
│  Actions Available:                                         │
│  ✅ View  ✅ Edit  ✅ Export  ✅ Manage  ✅ Configure       │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                 USER ROLE: ANALYST 📊                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Navigation Menu:                                           │
│  ✅ Accueil                                                 │
│  ✅ Tableau de bord                                         │
│  ✅ Architecture                                            │
│  ❌ Parties prenantes (hidden)                             │
│  ✅ À propos                                                │
│  ❌ Admin Panel (hidden)                                    │
│  ❌ User Management (hidden)                                │
│                                                             │
│  Power BI Dashboard:                                        │
│  📊 Filtered Data (RLS applied)                            │
│  🌍 Assigned Regions: Europe                                │
│  🏅 Assigned Sports: Athletics, Swimming                    │
│                                                             │
│  Actions Available:                                         │
│  ✅ View  ✅ Edit  ✅ Export  ❌ Manage  ❌ Configure       │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  USER ROLE: VIEWER 👁️                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Navigation Menu:                                           │
│  ✅ Accueil                                                 │
│  ✅ Tableau de bord (limited)                               │
│  ❌ Architecture (hidden)                                   │
│  ❌ Parties prenantes (hidden)                             │
│  ✅ À propos                                                │
│  ❌ Admin Panel (hidden)                                    │
│  ❌ User Management (hidden)                                │
│                                                             │
│  Power BI Dashboard:                                        │
│  📊 Public Data Only                                        │
│  🌍 Summary Statistics                                      │
│  🏅 Medal Counts (Aggregated)                               │
│                                                             │
│  Actions Available:                                         │
│  ✅ View  ❌ Edit  ❌ Export  ❌ Manage  ❌ Configure       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Component Interaction Diagram

```
App.tsx
  │
  ├─→ Auth0Provider (main.tsx)
  │     │
  │     └─→ Manages authentication state
  │
  ├─→ Navbar
  │     │
  │     ├─→ useAuth() hook
  │     │     └─→ Gets user, isAuthenticated
  │     │
  │     ├─→ LoginButton (if not auth)
  │     │
  │     └─→ UserProfile (if authenticated)
  │           ├─→ Shows user.name
  │           ├─→ Shows user.role badge
  │           └─→ LogoutButton
  │
  └─→ Route Rendering
        │
        ├─→ Home (public)
        │
        ├─→ Dashboard
        │     │
        │     └─→ <ProtectedRoute requirePage="dashboard">
        │           │
        │           ├─→ Check isAuthenticated
        │           ├─→ Check hasPageAccess(role, "dashboard")
        │           │
        │           ├─→ ✅ Pass → Render Dashboard
        │           │
        │           └─→ ❌ Fail → Show Login Screen
        │
        ├─→ Architecture (public or protected)
        │
        └─→ About (public)
```

## 🛡️ Security Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                           │
└─────────────────────────────────────────────────────────────┘

Layer 1: Auth0 Authentication
  ↓
  ✓ Industry-standard OAuth 2.0
  ✓ Secure token generation
  ✓ MFA support available
  ✓ Brute-force protection

Layer 2: Token Validation
  ↓
  ✓ JWT token verification
  ✓ Token expiration checking
  ✓ Automatic token refresh
  ✓ Secure storage (localStorage)

Layer 3: Role-Based Access Control
  ↓
  ✓ Role in token claims
  ✓ Server-side role verification
  ✓ Client-side permission checks
  ✓ Dynamic UI rendering

Layer 4: Route Protection
  ↓
  ✓ ProtectedRoute wrapper
  ✓ Page-level access control
  ✓ Redirect unauthorized users
  ✓ Graceful error handling

Layer 5: Feature-Level Permissions
  ↓
  ✓ Button/action visibility
  ✓ Data filtering (RLS)
  ✓ Export restrictions
  ✓ Edit mode control
```

## 📱 Mobile vs Desktop Flow

```
╔═══════════════════════════════════════════════════════════╗
║                    DESKTOP VIEW                            ║
╚═══════════════════════════════════════════════════════════╝

┌───────────────────────────────────────────────────────────┐
│ [O] Analytics   Home  Dashboard  Architecture  About      │
│                                                   👤 User ▼│
└───────────────────────────────────────────────────────────┘
                                                      │
                                              ┌───────┴──────┐
                                              │ Jean Martin  │
                                              │ analyst@...  │
                                              │ 📊 Analyste  │
                                              ├──────────────┤
                                              │ 🚪 Logout    │
                                              └──────────────┘

╔═══════════════════════════════════════════════════════════╗
║                    MOBILE VIEW                             ║
╚═══════════════════════════════════════════════════════════╝

┌────────────────────────────────────┐
│ [O] Analytics          ☾  ☰       │
└────────────────────────────────────┘
                               │
                        ┌──────┴───────────┐
                        │ Home             │
                        │ Dashboard        │
                        │ Architecture     │
                        │ About            │
                        ├──────────────────┤
                        │ 👤 Jean Martin   │
                        │ 📊 Analyste      │
                        │ 🚪 Logout        │
                        └──────────────────┘
```

---

**End of Visual Flow Documentation**
