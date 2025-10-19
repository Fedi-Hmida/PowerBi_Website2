// Temporary Mock Auth for Testing (REMOVE LATER!)
// This allows you to test the app without Auth0 setup

export const MOCK_USER = {
  id: 'mock-user-123',
  email: 'test@example.com',
  name: 'Test User',
  role: 'analyst' as const,
  picture: 'https://ui-avatars.com/api/?name=Test+User&background=0085C3&color=fff',
};

export const USE_MOCK_AUTH = true; // Set to false when Auth0 is ready
