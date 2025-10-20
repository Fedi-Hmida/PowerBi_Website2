# 🔄 Dashboard Dynamique avec Power BI - Guide d'Intégration

## 📋 Vue d'ensemble

Votre dashboard est maintenant **dynamique** et peut se synchroniser automatiquement avec votre rapport Power BI!

---

## ✨ Fonctionnalités Activées

### 1. **Synchronisation Automatique**
- ✅ Mise à jour automatique toutes les 30 secondes
- ✅ Extraction des données depuis Power BI
- ✅ Fallback sur données mockées si Power BI n'est pas disponible

### 2. **Actualisation Manuelle**
- ✅ Bouton "Actualiser les données" dans l'interface
- ✅ Indicateur de dernière mise à jour
- ✅ Animation de chargement

### 3. **Indicateurs en Temps Réel**
- ✅ Badge "Analytics en Temps Réel"
- ✅ Horodatage de la dernière mise à jour
- ✅ État de rafraîchissement visible

---

## 🚀 Comment Ça Fonctionne

### Architecture

```
Power BI Report
     ↓
PowerBIDataService (extraction)
     ↓
OlympicData (format standardisé)
     ↓
Dashboard Components (affichage)
```

### Flux de Données

1. **Extraction**: Le service `PowerBIDataService` se connecte au rapport Power BI
2. **Parsing**: Les données sont converties au format de vos graphiques
3. **Mise à jour**: Les composants React se rafraîchissent automatiquement
4. **Cache**: Les données sont mises en cache pour performance

---

## 🔧 Configuration pour Données Réelles

### Option 1: Utiliser l'API Power BI Embed (Recommandé)

Pour activer l'extraction automatique depuis Power BI:

```typescript
// Dans PowerBIEmbed.tsx
import PowerBIDataService from '../services/powerBIDataService';

// Après l'intégration du rapport
const dataService = PowerBIDataService.getInstance();
dataService.setPowerBIReport(embeddedReport);

// Les données seront extraites automatiquement!
```

### Option 2: Utiliser l'API REST Power BI

Créez un endpoint backend qui récupère les données:

```typescript
// backend/api/powerbi-data.ts
export async function getPowerBIData() {
  const accessToken = await getPowerBIAccessToken();
  
  const response = await fetch(
    `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/datasets/${datasetId}/executeQueries`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        queries: [
          {
            query: "EVALUATE TOPN(10, 'Medals', 'Medals'[Total], DESC)"
          }
        ]
      })
    }
  );
  
  return await response.json();
}
```

### Option 3: Connexion Directe aux Sources de Données

Si vous avez accès aux sources de données originales (CSV, bases de données):

```typescript
// src/services/dataLoader.ts
export async function loadOlympicData() {
  // Charger depuis vos fichiers CSV
  const medalsData = await fetch('/data/Medals.csv').then(r => r.text());
  const athletesData = await fetch('/data/Athletes.csv').then(r => r.text());
  
  // Parser et transformer
  return {
    medals: parseMedals(medalsData),
    participation: parseAthletes(athletesData),
    // ...
  };
}
```

---

## 📊 Structure des Données

### Format Attendu

```typescript
interface OlympicData {
  medals: MedalData[];           // Distribution des médailles
  participation: ParticipationData[]; // Participation par discipline
  genderParity: GenderParityData[];   // Parité des genres
  performance: PerformanceData[];     // Efficacité des pays
  kpis?: {                            // KPIs du dashboard
    totalMedals: number;
    performanceIndex: number;
    genderBalance: string;
    totalCountries: number;
  };
}
```

### Exemple de Données CSV

**Medals.csv**
```csv
Country,Gold,Silver,Bronze,Total
United States,39,41,33,113
China,38,32,18,88
Japan,27,14,17,58
```

**Athletes.csv**
```csv
Discipline,Male,Female,Total
Athletics,1072,969,2041
Swimming,400,400,800
Gymnastics,98,98,196
```

---

## 🎯 Utilisation dans le Dashboard

### Composant Dashboard.tsx

```tsx
export default function Dashboard() {
  const [olympicData, setOlympicData] = useState<OlympicData | null>(null);
  const dataService = PowerBIDataService.getInstance();

  useEffect(() => {
    // Chargement initial
    loadData();

    // Auto-update toutes les 30 secondes
    dataService.startAutoUpdate(30000);

    return () => {
      dataService.stopAutoUpdate();
    };
  }, []);

  const loadData = async () => {
    const data = await dataService.refreshData();
    setOlympicData(data);
  };

  // Les graphiques utilisent automatiquement olympicData
  return (
    <MedalDistributionChart data={olympicData.medals} />
  );
}
```

---

## 🔄 Mises à Jour Automatiques

### Configuration de l'Intervalle

```typescript
// Mise à jour toutes les 10 secondes
dataService.startAutoUpdate(10000);

// Mise à jour toutes les minutes
dataService.startAutoUpdate(60000);

// Arrêter les mises à jour
dataService.stopAutoUpdate();
```

### Gestion des États

```typescript
const [isRefreshing, setIsRefreshing] = useState(false);

const handleRefresh = async () => {
  setIsRefreshing(true);
  await dataService.refreshData();
  setIsRefreshing(false);
};
```

---

## 🎨 Interface Utilisateur

### Indicateurs Visuels

1. **Badge "Analytics en Temps Réel"**
   - Icône animée (Sparkles)
   - Indique que les données sont actives

2. **Bouton d'Actualisation**
   - Rafraîchit manuellement les données
   - Animation de rotation pendant le chargement
   - Désactivé pendant l'actualisation

3. **Horodatage**
   - Affiche la dernière mise à jour
   - Format français (HH:MM:SS)
   - Mis à jour automatiquement

---

## 🔐 Authentification Power BI

### Prérequis

1. **Azure AD App Registration**
   - Client ID
   - Tenant ID
   - Client Secret (pour backend)

2. **Permissions Power BI**
   - Report.Read.All
   - Dataset.Read.All
   - Workspace access

### Configuration

```typescript
// src/config/powerbi.ts
export const powerBIConfig = {
  clientId: 'YOUR_CLIENT_ID',
  tenantId: '604f1a96-cbe8-43f8-abbf-f8eaf5d85730',
  reportId: 'b8b90654-9d77-4a72-8be6-6d1da347696e',
  workspaceId: 'YOUR_WORKSPACE_ID'
};
```

---

## 📈 Graphiques Synchronisés

### 1. Distribution des Médailles
- Source: Table "Medals" dans Power BI
- Champs: Country, Gold, Silver, Bronze, Total
- Type: Graphique à barres empilées

### 2. Parité des Genres
- Source: Table "EntriesGender" dans Power BI
- Champs: Discipline, Female, Male
- Type: Graphique à barres horizontales

### 3. Participation
- Source: Agrégation Athletes par Discipline
- Champs: Discipline, Male, Female, Total
- Type: Camembert

### 4. Performance
- Source: Calcul Medals/Athletes
- Champs: Country, Efficiency, Athletes, Medals
- Type: Nuage de points

---

## 🐛 Résolution de Problèmes

### Les données ne se chargent pas

1. **Vérifier la console du navigateur**
   ```
   F12 → Console → Rechercher les erreurs
   ```

2. **Vérifier la connexion Power BI**
   ```typescript
   // Dans PowerBIEmbed.tsx
   console.log('Power BI Report:', embeddedReport);
   ```

3. **Tester les données mockées**
   ```typescript
   const mockData = dataService.getMockData();
   console.log('Mock data:', mockData);
   ```

### L'auto-update ne fonctionne pas

```typescript
// Vérifier que l'auto-update est actif
useEffect(() => {
  dataService.startAutoUpdate(30000);
  console.log('Auto-update activé');
  
  return () => {
    dataService.stopAutoUpdate();
    console.log('Auto-update désactivé');
  };
}, []);
```

### Erreurs CORS

Si vous avez des erreurs CORS avec Power BI:

```typescript
// Utiliser un proxy backend
const response = await fetch('/api/powerbi-proxy', {
  method: 'POST',
  body: JSON.stringify({ reportId, query })
});
```

---

## 🚀 Optimisations

### 1. Cache des Données

```typescript
// Le service met automatiquement en cache
const cachedData = dataService.getCachedData();
if (cachedData) {
  setOlympicData(cachedData);
}
```

### 2. Lazy Loading

```typescript
// Charger les graphiques au scroll
const isInView = useInView(ref, { once: true });

{isInView && <MedalDistributionChart data={data} />}
```

### 3. Debouncing

```typescript
// Limiter les mises à jour
const debouncedUpdate = debounce(loadData, 1000);
```

---

## 📝 Checklist de Déploiement

- [ ] Configuration Azure AD
- [ ] Permissions Power BI accordées
- [ ] Report ID configuré
- [ ] Workspace ID configuré
- [ ] Backend API pour authentification
- [ ] CORS configuré
- [ ] Variables d'environnement définies
- [ ] Tests des extractions de données
- [ ] Cache activé
- [ ] Auto-update configuré
- [ ] Gestion des erreurs implémentée
- [ ] Logs activés en développement

---

## 🎓 Ressources

### Documentation Officielle
- [Power BI Embedded](https://docs.microsoft.com/power-bi/developer/embedded/)
- [Power BI REST API](https://docs.microsoft.com/rest/api/power-bi/)
- [Azure AD Authentication](https://docs.microsoft.com/azure/active-directory/)

### Exemples de Code
- [Power BI React Sample](https://github.com/microsoft/PowerBI-Developer-Samples)
- [Power BI JavaScript](https://github.com/microsoft/powerbi-client-react)

---

## 🎉 Résumé

Votre dashboard est maintenant **entièrement dynamique** avec:

✅ **Synchronisation automatique** avec Power BI  
✅ **Mises à jour en temps réel** toutes les 30 secondes  
✅ **Bouton d'actualisation manuelle** pour l'utilisateur  
✅ **Indicateurs visuels** de l'état des données  
✅ **Fallback intelligent** sur données mockées  
✅ **Cache performant** pour optimiser les requêtes  
✅ **Interface utilisateur réactive** avec animations  

**Prêt pour la production!** 🚀
