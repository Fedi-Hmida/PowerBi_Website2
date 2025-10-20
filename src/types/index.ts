export type PageType = 'home' | 'login' | 'dashboard' | 'stakeholders' | 'about' | 'athletes' | 'results' | 'teams' | 'genre' | 'coaches';

export interface KPICardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  delay?: number;
}

export interface StakeholderGroup {
  title: string;
  icon: React.ReactNode;
  kpis: string[];
  goals: string;
  color: string;
}

export interface DeploymentPhase {
  number: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
}
