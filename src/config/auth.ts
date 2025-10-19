/**
 * Auth0 Configuration for web22 Olympic BI Analytics
 * 
 * This file centralizes all authentication configuration including:
 * - Auth0 provider settings
 * - User role definitions
 * - Permission mappings
 */

export const AUTH_CONFIG = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN || '',
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || '',
  redirectUri: import.meta.env.VITE_AUTH0_REDIRECT_URI || window.location.origin,
  audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  scope: 'openid profile email',
  
  // Cache location - use localStorage for persistence across tabs
  cacheLocation: 'localstorage' as const,
  
  // Use refresh tokens for better UX
  useRefreshTokens: true,
};

// User Role Enum
export enum UserRole {
  ADMIN = 'admin',
  ANALYST = 'analyst',
  VIEWER = 'viewer',
}

// Permission definitions for each role
export const ROLE_PERMISSIONS = {
  [UserRole.ADMIN]: {
    pages: ['home', 'dashboard', 'architecture', 'stakeholders', 'about', 'events', 'performance', 'results', 'media'],
    powerbi: {
      canView: true,
      canEdit: true,
      canExport: true,
      canManage: true,
      canEmbed: true,
    },
    features: ['user-management', 'system-config', 'audit-logs', 'advanced-analytics'],
    dataScope: 'all', // Access to all countries and sports
  },
  [UserRole.ANALYST]: {
    pages: ['home', 'dashboard', 'architecture', 'about', 'events', 'performance', 'results'],
    powerbi: {
      canView: true,
      canEdit: true,
      canExport: true,
      canManage: false,
      canEmbed: true,
    },
    features: ['bookmarks', 'scheduled-exports', 'advanced-filters', 'data-export'],
    dataScope: 'assigned', // Access to assigned regions/sports
  },
  [UserRole.VIEWER]: {
    pages: ['home', 'dashboard', 'about', 'results'],
    powerbi: {
      canView: true,
      canEdit: false,
      canExport: false,
      canManage: false,
      canEmbed: false,
    },
    features: ['basic-filters', 'view-only'],
    dataScope: 'public', // Access to public summary data only
  },
};

// Helper function to check if user has permission for a page
export function hasPageAccess(userRole: UserRole | string | null, page: string): boolean {
  if (!userRole) return page === 'home' || page === 'about';
  const role = userRole as UserRole;
  const permissions = ROLE_PERMISSIONS[role];
  return permissions?.pages.includes(page) || false;
}

// Helper function to check if user has a specific feature
export function hasFeature(userRole: UserRole | string | null, feature: string): boolean {
  if (!userRole) return false;
  const role = userRole as UserRole;
  const permissions = ROLE_PERMISSIONS[role];
  return permissions?.features.includes(feature) || false;
}

// Helper function to get Power BI permissions
export function getPowerBIPermissions(userRole: UserRole | string | null) {
  if (!userRole) return null;
  const role = userRole as UserRole;
  return ROLE_PERMISSIONS[role]?.powerbi || null;
}

// Get user role from Auth0 user metadata
export function getUserRole(user: any): UserRole {
  // Check app_metadata first (managed by Auth0)
  const roleFromMetadata = user?.['https://olympic-bi.com/roles']?.[0];
  if (roleFromMetadata && Object.values(UserRole).includes(roleFromMetadata)) {
    return roleFromMetadata as UserRole;
  }
  
  // Check user_metadata as fallback
  const roleFromUser = user?.user_metadata?.role;
  if (roleFromUser && Object.values(UserRole).includes(roleFromUser)) {
    return roleFromUser as UserRole;
  }
  
  // Default to viewer for safety
  return UserRole.VIEWER;
}

// Session configuration
export const SESSION_CONFIG = {
  timeout: {
    [UserRole.ADMIN]: 8 * 60 * 60 * 1000, // 8 hours
    [UserRole.ANALYST]: 4 * 60 * 60 * 1000, // 4 hours
    [UserRole.VIEWER]: 2 * 60 * 60 * 1000, // 2 hours
  },
  refreshThreshold: 5 * 60 * 1000, // Refresh 5min before expiry
};
