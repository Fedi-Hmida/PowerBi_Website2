# Power BI Integration Guide

## Overview
This project includes comprehensive Power BI integration with interactive Olympic Games analytics dashboard. The implementation includes both Power BI embedded reports and custom interactive charts using Recharts.

## Features Implemented

### 1. Power BI Service Integration
- **PowerBIService**: Centralized service for Power BI authentication and configuration
- **PowerBIEmbed Component**: React component for embedding Power BI reports
- **Mock Data**: Olympic Games data for development and testing

### 2. Interactive Charts
- **MedalDistributionChart**: Stacked bar chart showing medal distribution by country
- **ParticipationChart**: Pie chart showing athlete participation by discipline
- **GenderParityChart**: Diverging bar chart for gender parity analysis
- **PerformanceScatterChart**: Scatter plot for performance efficiency analysis

### 3. Dashboard Features
- **Tabbed Interface**: Switch between Power BI reports and interactive charts
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode Support**: Full dark/light theme support
- **Real-time Updates**: Simulated real-time data updates

## Setup Instructions

### 1. Install Dependencies
```bash
npm install recharts powerbi-client-react chart.js react-chartjs-2
```

### 2. Power BI Configuration

#### For Development (Mock Mode)
The current implementation uses mock data and doesn't require Power BI credentials.

#### For Production
1. **Set up Power BI Service**:
   - Create a Power BI workspace
   - Upload your Olympic Games report
   - Note the report ID

2. **Configure Authentication**:
   ```typescript
   // Update src/services/powerbi.ts
   async getAccessToken(): Promise<string> {
     const response = await fetch('/api/powerbi/auth', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         // Your Power BI authentication parameters
       }),
     });
     return response.json().accessToken;
   }
   ```

3. **Update Report ID**:
   ```typescript
   // In Dashboard.tsx
   <PowerBIEmbed 
     reportId="your-actual-report-id" 
     height={700}
   />
   ```

### 3. Backend API Setup

Create a backend endpoint for Power BI authentication:

```javascript
// Example Express.js endpoint
app.post('/api/powerbi/auth', async (req, res) => {
  try {
    // Implement Power BI authentication logic
    const accessToken = await getPowerBIAccessToken();
    const embedUrl = await getPowerBIEmbedUrl();
    
    res.json({ 
      accessToken, 
      embedUrl,
      expiresIn: 3600 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Data Structure

### Olympic Data Format
```typescript
interface OlympicData {
  medals: Array<{
    country: string;
    gold: number;
    silver: number;
    bronze: number;
    total: number;
  }>;
  participation: Array<{
    discipline: string;
    male: number;
    female: number;
    total: number;
  }>;
  genderParity: Array<{
    discipline: string;
    female: number;
    male: number;
    parity: number;
  }>;
  performance: Array<{
    country: string;
    efficiency: number;
    athletes: number;
    medals: number;
  }>;
}
```

## Chart Components

### MedalDistributionChart
- **Type**: Stacked Bar Chart
- **Data**: Medal counts by country
- **Features**: Interactive tooltips, legend, responsive design

### ParticipationChart
- **Type**: Pie Chart
- **Data**: Athlete participation by discipline
- **Features**: Custom colors, percentage labels, responsive design

### GenderParityChart
- **Type**: Diverging Bar Chart
- **Data**: Gender distribution by discipline
- **Features**: Horizontal layout, percentage display, color coding

### PerformanceScatterChart
- **Type**: Scatter Plot
- **Data**: Performance efficiency vs athlete count
- **Features**: Interactive tooltips, custom colors, axis labels

## Customization

### Adding New Charts
1. Create a new component in `src/components/charts/`
2. Follow the existing pattern with Recharts
3. Add to the Dashboard component

### Styling
- Uses Tailwind CSS for styling
- Dark mode support via `dark:` classes
- Responsive design with grid layouts

### Data Sources
- Currently uses mock data from PowerBIService
- Can be easily connected to real APIs
- Supports real-time updates via WebSocket

## Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm run preview
```

### Environment Variables
```env
POWERBI_CLIENT_ID=your_client_id
POWERBI_CLIENT_SECRET=your_client_secret
POWERBI_TENANT_ID=your_tenant_id
POWERBI_WORKSPACE_ID=your_workspace_id
```

## Troubleshooting

### Common Issues

1. **Power BI Authentication Fails**
   - Check your Power BI service credentials
   - Ensure the report is published and accessible
   - Verify the report ID is correct

2. **Charts Not Rendering**
   - Check browser console for errors
   - Ensure data is in the correct format
   - Verify Recharts is properly installed

3. **Responsive Issues**
   - Check Tailwind CSS classes
   - Test on different screen sizes
   - Verify container dimensions

### Debug Mode
Enable debug logging by setting:
```typescript
const DEBUG = true; // In PowerBIService
```

## Next Steps

1. **Real Power BI Integration**: Replace mock authentication with real Power BI service
2. **Database Integration**: Connect to a real database for Olympic data
3. **Real-time Updates**: Implement WebSocket for live data updates
4. **Advanced Analytics**: Add machine learning predictions
5. **Export Features**: Implement PDF/Excel export functionality

## Resources

- [Power BI Embedded Documentation](https://docs.microsoft.com/power-bi/developer/embedded/)
- [Recharts Documentation](https://recharts.org/)
- [React Power BI Client](https://github.com/microsoft/PowerBI-React)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

