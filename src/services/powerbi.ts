import * as powerbi from 'powerbi-client';

export interface PowerBIConfig {
  type: 'report' | 'dashboard' | 'tile';
  id: string;
  embedUrl: string;
  accessToken: string;
  tokenType: powerbi.models.TokenType;
  settings?: powerbi.IEmbedSettings;
}

export class PowerBIService {
  private static instance: PowerBIService;
  private powerbi: any;

  constructor() {
    this.powerbi = powerbi;
  }

  static getInstance(): PowerBIService {
    if (!PowerBIService.instance) {
      PowerBIService.instance = new PowerBIService();
    }
    return PowerBIService.instance;
  }

  async getAccessToken(): Promise<string> {
    try {
      // In a real implementation, this would call your backend API
      // For now, we'll use a mock token for development
      const response = await fetch('/api/powerbi/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Add any required parameters for your Power BI authentication
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get Power BI access token');
      }

      const data = await response.json();
      return data.accessToken;
    } catch (error) {
      console.warn('Power BI authentication failed, using mock token:', error);
      // Return a mock token for development
      return 'mock-access-token';
    }
  }

  async getEmbedConfig(reportId: string): Promise<PowerBIConfig> {
    const accessToken = await this.getAccessToken();
    
    return {
      type: 'report',
      id: reportId,
      embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${reportId}`,
      accessToken,
      tokenType: powerbi.models.TokenType.Embed,
      settings: {
        filterPaneEnabled: true,
        navContentPaneEnabled: true,
        background: powerbi.models.BackgroundType.Transparent,
        layoutType: powerbi.models.LayoutType.Custom,
        customLayout: {
          displayOption: powerbi.models.DisplayOption.FitToPage,
        },
      },
    };
  }

  createEmbedElement(container: HTMLElement, config: PowerBIConfig): any {
    try {
      return this.powerbi.embed(container, config);
    } catch (error) {
      console.error('Failed to embed Power BI report:', error);
      throw error;
    }
  }

  // Mock data for development when Power BI is not available
  getMockOlympicData() {
    return {
      medals: [
        { country: 'United States', gold: 39, silver: 41, bronze: 33, total: 113 },
        { country: 'China', gold: 38, silver: 32, bronze: 18, total: 88 },
        { country: 'Japan', gold: 27, silver: 14, bronze: 17, total: 58 },
        { country: 'Great Britain', gold: 22, silver: 21, bronze: 22, total: 65 },
        { country: 'ROC', gold: 20, silver: 28, bronze: 23, total: 71 },
        { country: 'Australia', gold: 17, silver: 7, bronze: 22, total: 46 },
        { country: 'Netherlands', gold: 10, silver: 12, bronze: 14, total: 36 },
        { country: 'France', gold: 10, silver: 12, bronze: 11, total: 33 },
        { country: 'Germany', gold: 10, silver: 11, bronze: 16, total: 37 },
        { country: 'Italy', gold: 10, silver: 10, bronze: 20, total: 40 },
      ],
      participation: [
        { discipline: 'Athletics', male: 1072, female: 969, total: 2041 },
        { discipline: 'Swimming', male: 400, female: 400, total: 800 },
        { discipline: 'Gymnastics', male: 98, female: 98, total: 196 },
        { discipline: 'Cycling', male: 200, female: 200, total: 400 },
        { discipline: 'Football', male: 288, female: 216, total: 504 },
        { discipline: 'Basketball', male: 144, female: 144, total: 288 },
        { discipline: 'Volleyball', male: 144, female: 144, total: 288 },
        { discipline: 'Tennis', male: 64, female: 64, total: 128 },
        { discipline: 'Boxing', male: 186, female: 100, total: 286 },
        { discipline: 'Judo', male: 200, female: 200, total: 400 },
      ],
      genderParity: [
        { discipline: 'Artistic Swimming', female: 105, male: 0, parity: 100 },
        { discipline: 'Athletics', female: 969, male: 1072, parity: 47.5 },
        { discipline: 'Swimming', female: 400, male: 400, parity: 50 },
        { discipline: 'Gymnastics', female: 98, male: 98, parity: 50 },
        { discipline: 'Cycling', female: 200, male: 200, parity: 50 },
        { discipline: 'Football', female: 216, male: 288, parity: 42.9 },
        { discipline: 'Basketball', female: 144, male: 144, parity: 50 },
        { discipline: 'Volleyball', female: 144, male: 144, parity: 50 },
        { discipline: 'Tennis', female: 64, male: 64, parity: 50 },
        { discipline: 'Boxing', female: 100, male: 186, parity: 35.0 },
      ],
      performance: [
        { country: 'United States', efficiency: 0.85, athletes: 133, medals: 113 },
        { country: 'China', efficiency: 0.92, athletes: 96, medals: 88 },
        { country: 'Japan', efficiency: 0.78, athletes: 74, medals: 58 },
        { country: 'Great Britain', efficiency: 0.88, athletes: 74, medals: 65 },
        { country: 'ROC', efficiency: 0.82, athletes: 87, medals: 71 },
        { country: 'Australia', efficiency: 0.76, athletes: 61, medals: 46 },
        { country: 'Netherlands', efficiency: 0.83, athletes: 43, medals: 36 },
        { country: 'France', efficiency: 0.79, athletes: 42, medals: 33 },
        { country: 'Germany', efficiency: 0.81, athletes: 46, medals: 37 },
        { country: 'Italy', efficiency: 0.80, athletes: 50, medals: 40 },
      ],
    };
  }
}

export default PowerBIService;

