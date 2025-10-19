export interface DemoUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'analyst' | 'viewer';
}

export const demoUsers: DemoUser[] = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: '2',
    email: 'analyst@example.com',
    password: 'analyst123',
    name: 'Analyst User',
    role: 'analyst'
  },
  {
    id: '3',
    email: 'viewer@example.com',
    password: 'viewer123',
    name: 'Viewer User',
    role: 'viewer'
  }
];