# 🔐 Auth0 Authentication Implementation for web22

## 📋 Overview

This implementation provides a **production-ready authentication system** for the Olympic Games BI Analytics platform using **Auth0** with role-based access control supporting three user roles: **Admin**, **Analyst**, and **Viewer**.

---

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 18+ installed
- Auth0 account ([Create free account](https://auth0.com/signup))
- Basic understanding of React and authentication concepts

### 2. Auth0 Setup

#### Create an Auth0 Application

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Click **Applications** → **Create Application**
3. Choose **Single Page Web Application**
4. Select **React** as the technology
5. Note down:
   - **Domain** (e.g., `dev-abc123.us.auth0.com`)
   - **Client ID** (e.g., `aBcDeFg123456`)

#### Configure Application Settings

In your Auth0 application settings:

1. **Allowed Callback URLs**: `http://localhost:5173, https://your-production-domain.com`
2. **Allowed Logout URLs**: `http://localhost:5173, https://your-production-domain.com`
3. **Allowed Web Origins**: `http://localhost:5173, https://your-production-domain.com`
4. **Allowed Origins (CORS)**: `http://localhost:5173, https://your-production-domain.com`

Click **Save Changes**.

#### Setup User Roles in Auth0

1. Navigate to **User Management** → **Roles**
2. Create three roles:
   - **admin** - Full system access
   - **analyst** - Dashboard and analytics access
   - **viewer** - Read-only access

3. Navigate to **Auth Pipeline** → **Rules** → **Create Rule**
4. Choose **Empty Rule** and add this code:

```javascript
function addRolesToToken(user, context, callback) {
  const namespace = 'https://olympic-bi.com';
  const assignedRoles = (context.authorization || {}).roles || [];
  
  // Add roles to the ID token
  context.idToken[`${namespace}/roles`] = assignedRoles;
  context.accessToken[`${namespace}/roles`] = assignedRoles;
  
  callback(null, user, context);
}
```

5. Click **Save Changes**

#### Assign Roles to Users

1. Go to **User Management** → **Users**
2. Select a user
3. Click **Roles** tab
4. Assign appropriate role (admin/analyst/viewer)

---

### 3. Project Setup

#### Clone and Install

```bash
cd c:\Users\Fedih\Desktop\BI\web22\project
npm install
```

#### Configure Environment Variables

1. Copy the example environment file:

```bash
copy .env.example .env
```

2. Edit `.env` and update with your Auth0 credentials:

```env
VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_REDIRECT_URI=http://localhost:5173
VITE_AUTH0_AUDIENCE=https://your-api-identifier
```

#### Start Development Server

```bash
npm run dev
```

Navigate to `http://localhost:5173`

---

## 👥 User Roles & Permissions

### Role Comparison Table

| Feature | 🔧 Admin | 📊 Analyst | 👁️ Viewer |
|---------|----------|------------|-----------|
| **Dashboard Access** | ✅ Full | ✅ Full | ✅ Limited |
| **Power BI Edit** | ✅ Yes | ✅ Yes | ❌ No |
| **Data Export** | ✅ Yes | ✅ Yes | ❌ No |
| **User Management** | ✅ Yes | ❌ No | ❌ No |
| **System Config** | ✅ Yes | ❌ No | ❌ No |
| **Advanced Filters** | ✅ Yes | ✅ Yes | ⚠️ Basic |
| **Data Scope** | All countries/sports | Assigned regions | Public data only |

### Detailed Permissions

#### 🔧 **Admin Role**
- **Pages**: Home, Dashboard, Architecture, Stakeholders, About, Admin Panel, User Management, Settings
- **Power BI**: Full access (view, edit, export, manage, embed)
- **Features**: User management, system configuration, audit logs, advanced analytics
- **Data Scope**: All Olympic data (all countries, all sports)
- **Session Timeout**: 8 hours

#### 📊 **Analyst Role**
- **Pages**: Home, Dashboard, Architecture, About
- **Power BI**: Read/write dashboards, export data, create bookmarks
- **Features**: Bookmarks, scheduled exports, advanced filters, data export
- **Data Scope**: Assigned regions/sports only (RLS filtered)
- **Session Timeout**: 4 hours

#### 👁️ **Viewer Role**
- **Pages**: Home, Dashboard (public), About
- **Power BI**: Read-only access to published reports
- **Features**: Basic filters, view-only mode
- **Data Scope**: Public summary data only
- **Session Timeout**: 2 hours

---

## 🎬 User Access Scenarios

### Scenario 1: Admin Login

```
1. Marie (Olympic Committee Director) visits the site
2. Clicks "Se connecter" button
3. Redirected to Auth0 login page
4. Enters credentials: marie.dubois@olympics.com
5. Auth0 validates and returns with admin role
6. Redirected to dashboard with full navigation menu visible
7. Can access admin panel, manage users, configure system
8. Power BI dashboard shows all data (no RLS filtering)
```

### Scenario 2: Analyst Workflow

```
1. Jean (Performance Analyst) logs in
2. Sees personalized navigation (no admin options)
3. Accesses dashboard filtered to assigned regions (Europe)
4. Can create custom reports and bookmarks
5. Exports data to Excel for offline analysis
6. Attempts to access /admin → Shows "Access Denied" message
7. Session auto-extends during active use
```

### Scenario 3: Viewer Experience

```
1. Public user clicks "Se connecter"
2. Limited auth flow (email verification only)
3. Loads public dashboard with summary metrics
4. Sees medal counts and top countries (aggregated data)
5. Cannot access detailed athlete performance
6. Export buttons disabled (read-only mode)
7. Session expires after 2 hours
```

---

## 🔧 Implementation Details

### Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginButton.tsx          # Animated login button
│   │   ├── LogoutButton.tsx         # Logout with confirmation
│   │   ├── UserProfile.tsx          # User menu with role badge
│   │   ├── ProtectedRoute.tsx       # Route protection wrapper
│   │   └── index.ts                 # Exports
│   ├── Navbar.tsx                   # Updated with auth UI
│   └── ...
├── config/
│   └── auth.ts                      # Auth0 config & role permissions
├── hooks/
│   └── useAuth.ts                   # Custom auth hook
└── main.tsx                         # Auth0Provider wrapper
```

### Key Files

#### `src/config/auth.ts`
- Auth0 configuration
- Role definitions (Admin, Analyst, Viewer)
- Permission mappings
- Helper functions for access control

#### `src/hooks/useAuth.ts`
- Custom authentication hook
- Wraps Auth0's `useAuth0`
- Provides application-specific user object
- Login/logout utilities

#### `src/components/auth/ProtectedRoute.tsx`
- Wrapper component for protected pages
- Checks authentication status
- Validates user roles
- Shows appropriate fallback UI

---

## 🛠️ Usage Examples

### Protecting a Page

```typescript
// In App.tsx
import { ProtectedRoute } from './components/auth';

function App() {
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <ProtectedRoute requirePage="dashboard">
            <Dashboard />
          </ProtectedRoute>
        );
      case 'admin':
        return (
          <ProtectedRoute requireRole={UserRole.ADMIN}>
            <AdminPanel />
          </ProtectedRoute>
        );
      default:
        return <Home />;
    }
  };
}
```

### Checking Permissions in Components

```typescript
import { useAuth } from '../hooks/useAuth';
import { getPowerBIPermissions } from '../config/auth';

function DashboardControls() {
  const { user } = useAuth();
  const permissions = getPowerBIPermissions(user?.role || null);

  return (
    <div>
      {permissions?.canExport && (
        <button>Export to Excel</button>
      )}
      {permissions?.canEdit && (
        <button>Edit Dashboard</button>
      )}
    </div>
  );
}
```

### Conditional Navigation

```typescript
import { hasPageAccess } from '../config/auth';

// Navigation items automatically filtered by role
const visibleNavItems = navItems.filter(item => 
  hasPageAccess(user?.role || null, item.page)
);
```

---

## 🔒 Security Best Practices

### ✅ Implemented

- **Secure token storage**: Tokens stored in localStorage with httpOnly consideration
- **Token refresh**: Automatic silent authentication with refresh tokens
- **Role-based access**: Server-side role verification via Auth0 Rules
- **Protected routes**: All sensitive pages wrapped with authentication guards
- **Session management**: Role-specific session timeouts
- **HTTPS enforcement**: Required for production deployment

### 🔐 Recommendations

1. **Use environment-specific configs**:
   ```env
   # Development
   VITE_AUTH0_DOMAIN=dev-abc123.us.auth0.com
   
   # Production
   VITE_AUTH0_DOMAIN=prod-xyz789.us.auth0.com
   ```

2. **Enable MFA for admin users** in Auth0 dashboard

3. **Monitor auth logs** via Auth0 Logs section

4. **Implement rate limiting** for login attempts

5. **Regular security audits** of user permissions

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] User can log in with valid credentials
- [ ] User is redirected after successful login
- [ ] User role is correctly identified and displayed
- [ ] Navigation menu shows role-appropriate items
- [ ] Protected pages require authentication
- [ ] Admin-only pages reject non-admin users
- [ ] Logout works and clears session
- [ ] Session persists across page refreshes
- [ ] Token refresh works before expiration

### Test User Accounts

Create test users in Auth0:

```
Admin:    admin@test-olympics.com    (role: admin)
Analyst:  analyst@test-olympics.com  (role: analyst)
Viewer:   viewer@test-olympics.com   (role: viewer)
```

---

## 🚀 Deployment

### Environment Variables for Production

```env
VITE_AUTH0_DOMAIN=your-production-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-production-client-id
VITE_AUTH0_REDIRECT_URI=https://your-app.com
VITE_AUTH0_AUDIENCE=https://your-api.com
```

### Build for Production

```bash
npm run build
```

### Deploy to Vercel/Netlify

Update Auth0 application settings with production URLs before deploying.

---

## 📊 Power BI Integration (Future)

To secure Power BI embed tokens with user authentication:

```typescript
// api/powerbi-token.ts (backend)
export async function generateEmbedToken(req: Request) {
  const user = await validateAuth0Token(req);
  
  const embedToken = await powerbi.generateToken({
    reportId: REPORT_ID,
    identities: [{
      username: user.email,
      roles: [user.role],
      customData: JSON.stringify({
        region: user.region,
        allowedSports: user.sports
      })
    }]
  });
  
  return { accessToken: embedToken };
}
```

---

## 🐛 Troubleshooting

### "Auth0Provider: missing domain or clientId"

**Solution**: Check your `.env` file has correct values and restart dev server.

### "Callback URL mismatch"

**Solution**: Ensure `http://localhost:5173` is added to Auth0's Allowed Callback URLs.

### User has no role assigned

**Solution**: 
1. Check Auth0 Rule is active
2. Assign role to user in Auth0 dashboard
3. Clear browser cache and re-login

### Token expiration issues

**Solution**: Auth0 automatically refreshes tokens. Check `useRefreshTokens: true` in config.

---

## 📚 Additional Resources

- [Auth0 React SDK Documentation](https://auth0.com/docs/quickstart/spa/react)
- [Auth0 Rules Documentation](https://auth0.com/docs/customize/rules)
- [Power BI Embedded with Auth](https://learn.microsoft.com/en-us/power-bi/developer/embedded/embed-sample-for-customers)
- [RBAC Best Practices](https://auth0.com/docs/manage-users/access-control/rbac)

---

## 🆘 Support

For issues or questions:
- Check Auth0 Logs in dashboard
- Review browser console for errors
- Verify environment variables are loaded
- Test with incognito mode to rule out cache issues

---

## ✅ Next Steps

1. ✅ Auth0 setup complete
2. ✅ Role-based access implemented
3. ✅ UI components created
4. 🔄 **TODO**: Connect Power BI with secure tokens
5. 🔄 **TODO**: Implement user management admin panel
6. 🔄 **TODO**: Add audit logging
7. 🔄 **TODO**: Setup production environment

---

**Version**: 1.0.0  
**Last Updated**: October 18, 2025  
**Author**: Senior Full-Stack Team
