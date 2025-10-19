# 🔐 Demo Authentication - Role-Based Access Control

## Demo User Credentials

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| **Admin** | admin@example.com | admin123 | Full access to all pages |
| **Analyst** | analyst@example.com | analyst123 | Limited access (no Stakeholders) |
| **Viewer** | viewer@example.com | viewer123 | View-only access |

## Page Access by Role

| Page | Admin | Analyst | Viewer |
|------|-------|---------|--------|
| **Accueil (Home)** | ✅ | ✅ | ✅ |
| **Tableau de bord (Dashboard)** | ✅ Full | ✅ Full | ✅ Limited |
| **Architecture** | ✅ | ✅ | ❌ |
| **Parties prenantes (Stakeholders)** | ✅ | ❌ | ❌ |
| **À propos (About)** | ✅ | ✅ | ✅ |

## Features by Role

### Admin (Full Access)
- ✅ View all pages
- ✅ Edit Power BI dashboards
- ✅ Export data
- ✅ Manage system settings
- ✅ Access all data (no filters)

### Analyst (Standard Access)
- ✅ View Dashboard, Architecture, Home, About
- ✅ Edit Power BI reports
- ✅ Export data
- ❌ Cannot access Stakeholders page
- ⚠️ Data filtered by assigned regions/sports

### Viewer (Read-Only)
- ✅ View Dashboard (limited), Home, About
- ❌ Cannot access Architecture
- ❌ Cannot access Stakeholders
- ❌ Cannot edit or export
- ⚠️ Public summary data only

## How to Test

1. **Start the dev server:**
   ```powershell
   npm run dev
   ```

2. **Test Admin:**
   - Login: `admin@example.com` / `admin123`
   - Check navigation: Should see all 5 menu items
   - Try accessing all pages: All should work

3. **Test Analyst:**
   - Logout, then login: `analyst@example.com` / `analyst123`
   - Check navigation: Should see 4 items (no "Parties prenantes")
   - Try navigating to Stakeholders manually: Should show "Page Non Accessible"

4. **Test Viewer:**
   - Logout, then login: `viewer@example.com` / `viewer123`
   - Check navigation: Should see only 3 items (Home, Dashboard, About)
   - Try navigating to Architecture or Stakeholders: Should show "Page Non Accessible"

## What Happens When Unauthorized

If a user tries to access a page they don't have permission for:
- **Navigation menu:** The page link is automatically hidden
- **Direct access:** Shows "Page Non Accessible" message with orange alert icon
- **User stays logged in:** Can navigate back to allowed pages

## Demo Features

✅ **Automatic role detection** from demo users file  
✅ **Navigation filtering** based on permissions  
✅ **Route protection** with ProtectedRoute component  
✅ **Graceful access denial** with user-friendly messages  
✅ **Persistent login** across page refreshes (localStorage)

---

**Note:** This is a demo system for testing and presentation. Passwords are visible in source code and stored only for demo purposes. Not suitable for production use.
