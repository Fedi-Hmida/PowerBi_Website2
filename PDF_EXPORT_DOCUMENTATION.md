# 📄 Fonctionnalité d'Export PDF

## Vue d'ensemble

La fonctionnalité d'export PDF permet de générer des rapports professionnels contenant les statistiques olympiques importantes au format PDF.

## 🎯 Fonctionnalités

### Rapport PDF Complet
Le rapport PDF généré inclut:

1. **En-tête stylisé** avec les couleurs olympiques
2. **Statistiques générales**
   - Nombre total d'athlètes
   - Pays participants
   - Disciplines sportives
   - Équipes inscrites
   - Entraîneurs
   - Ratio athlète/entraîneur

3. **Répartition par genre**
   - Pourcentage hommes/femmes
   - Nombre d'athlètes par genre

4. **Top 10 des pays** (optionnel)
   - Classement par nombre d'athlètes

5. **Top 10 des disciplines** (optionnel)
   - Classement par nombre de participants

6. **Pied de page** avec numérotation des pages

## 📍 Emplacements des Boutons d'Export

### 1. Page d'Accueil (Home)
- **Position**: En dessous des boutons principaux
- **Variant**: Bouton complet avec icône et texte
- **Données exportées**: Statistiques KPI principales

### 2. Tableau de Bord (Dashboard)
- **Position**: En-tête, à côté du bouton "Actualiser"
- **Variant**: Icône seule (compact)
- **Données exportées**: Données en temps réel du dashboard

## 🎨 Design

### Couleurs Olympiques
- **Bleu**: #0085C3
- **Jaune**: #FFD100
- **Vert**: #009F3D
- **Rose**: #FF6B9D
- **Noir**: #000000

### Animations
- Effet de survol avec élévation
- Animation de chargement pendant la génération
- Feedback visuel lors de l'export

## 💻 Utilisation du Code

### Importer le composant

```tsx
import ExportPDFButton from '../components/ExportPDFButton';
```

### Utilisation basique

```tsx
<ExportPDFButton
  stats={{
    totalAthletes: 11084,
    totalCountries: 93,
    totalDisciplines: 46,
    totalTeams: 743,
    totalCoaches: 743,
    athleteCoachRatio: 14.92,
    genderDistribution: {
      male: 52,
      female: 48
    }
  }}
/>
```

### Avec données supplémentaires

```tsx
<ExportPDFButton
  stats={olympicStats}
  topCountries={[
    { country: 'France', athletes: 573 },
    { country: 'USA', athletes: 532 },
    // ...
  ]}
  topDisciplines={[
    { discipline: 'Athlétisme', participants: 1200 },
    { discipline: 'Natation', participants: 950 },
    // ...
  ]}
  variant="icon" // Pour icône seule
/>
```

## 🔧 Service PDF

### Méthodes disponibles

#### `generateOlympicReport(stats, topCountries?, topDisciplines?)`
Génère un rapport PDF complet avec toutes les sections.

**Paramètres:**
- `stats`: OlympicStats (requis)
- `topCountries`: TopCountries[] (optionnel)
- `topDisciplines`: TopDisciplines[] (optionnel)

#### `generateQuickReport(stats)`
Génère un rapport rapide avec seulement les KPIs principaux.

**Paramètre:**
- `stats`: OlympicStats (requis)

## 📦 Dépendances

```json
{
  "jspdf": "^2.5.2",
  "jspdf-autotable": "^3.8.4"
}
```

## 🎯 Types TypeScript

```typescript
export interface OlympicStats {
  totalAthletes: number;
  totalCountries: number;
  totalDisciplines: number;
  totalTeams: number;
  totalCoaches: number;
  athleteCoachRatio: number;
  genderDistribution: {
    male: number;
    female: number;
  };
}

export type TopCountries = Array<{
  country: string;
  athletes: number;
}>;

export type TopDisciplines = Array<{
  discipline: string;
  participants: number;
}>;
```

## ✨ Améliorations Futures

- [ ] Ajouter des graphiques dans le PDF
- [ ] Options de personnalisation (langue, format)
- [ ] Export en Excel
- [ ] Planification d'exports automatiques
- [ ] Envoi par email
- [ ] Sauvegarde dans le cloud

## 🐛 Résolution des Problèmes

### Le PDF ne se télécharge pas
- Vérifiez que les données stats sont bien fournies
- Vérifiez la console pour les erreurs
- Assurez-vous que le navigateur autorise les téléchargements

### Les tableaux ne s'affichent pas correctement
- Vérifiez que jspdf-autotable est bien installé
- Vérifiez les données passées au service

### Erreur "autoTable is not a function"
- Assurez-vous d'importer autoTable: `import autoTable from 'jspdf-autotable'`
- Vérifiez l'extension de type dans le service

## 📝 Exemple de Rapport Généré

**Nom du fichier**: `rapport_olympique_[timestamp].pdf`

**Structure**:
1. Page 1: En-tête + Statistiques générales + Répartition par genre
2. Page 2: Top 10 pays + Top 10 disciplines (si fournis)
3. Toutes pages: Pied de page avec pagination

## 🎨 Personnalisation

Pour personnaliser le rapport, modifiez le fichier `src/services/pdfExportService.ts`:

- **Couleurs**: Modifier les valeurs RGB dans `addHeader()`
- **Mise en page**: Ajuster les positions Y dans `generateOlympicReport()`
- **Styles des tableaux**: Modifier les options dans `autoTable()`
