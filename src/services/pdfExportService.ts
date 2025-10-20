import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: typeof autoTable;
  }
}

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

class PDFExportService {
  /**
   * Génère un rapport PDF avec les statistiques olympiques
   */
  async generateOlympicReport(
    stats: OlympicStats,
    topCountries?: TopCountries,
    topDisciplines?: TopDisciplines
  ): Promise<void> {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    let yPosition = 20;

    // En-tête avec logo olympique stylisé
    this.addHeader(doc, yPosition);
    yPosition += 30;

    // Titre principal
    doc.setFontSize(24);
    doc.setTextColor(0, 133, 195); // Bleu olympique
    doc.text('Rapport Statistiques Olympiques', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Date de génération
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const currentDate = new Date().toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    doc.text(`Généré le ${currentDate}`, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;

    // Section 1: Statistiques générales
    this.addSectionTitle(doc, 'Statistiques Générales', yPosition);
    yPosition += 10;

    const generalStats = [
      ['Nombre total d\'athlètes', stats.totalAthletes.toLocaleString('fr-FR')],
      ['Pays participants', stats.totalCountries.toString()],
      ['Disciplines sportives', stats.totalDisciplines.toString()],
      ['Équipes inscrites', stats.totalTeams.toString()],
      ['Entraîneurs', stats.totalCoaches.toString()],
      ['Ratio athlète/entraîneur', stats.athleteCoachRatio.toFixed(2)]
    ];

    autoTable(doc, {
      startY: yPosition,
      head: [['Indicateur', 'Valeur']],
      body: generalStats,
      theme: 'grid',
      headStyles: {
        fillColor: [0, 133, 195],
        fontSize: 11,
        fontStyle: 'bold'
      },
      bodyStyles: {
        fontSize: 10
      },
      alternateRowStyles: {
        fillColor: [240, 248, 255]
      },
      margin: { left: 15, right: 15 }
    });

    yPosition = (doc as any).lastAutoTable.finalY + 15;

    // Section 2: Répartition par genre
    if (yPosition > 230) {
      doc.addPage();
      yPosition = 20;
    }

    this.addSectionTitle(doc, 'Répartition par Genre', yPosition);
    yPosition += 10;

    const genderStats = [
      ['Hommes', `${stats.genderDistribution.male}%`, `${Math.round(stats.totalAthletes * stats.genderDistribution.male / 100).toLocaleString('fr-FR')} athlètes`],
      ['Femmes', `${stats.genderDistribution.female}%`, `${Math.round(stats.totalAthletes * stats.genderDistribution.female / 100).toLocaleString('fr-FR')} athlètes`]
    ];

    autoTable(doc, {
      startY: yPosition,
      head: [['Genre', 'Pourcentage', 'Nombre']],
      body: genderStats,
      theme: 'grid',
      headStyles: {
        fillColor: [255, 107, 157], // Rose olympique
        fontSize: 11,
        fontStyle: 'bold'
      },
      bodyStyles: {
        fontSize: 10
      },
      alternateRowStyles: {
        fillColor: [255, 240, 245]
      },
      margin: { left: 15, right: 15 }
    });

    yPosition = (doc as any).lastAutoTable.finalY + 15;

    // Section 3: Top 10 des pays (si fourni)
    if (topCountries && topCountries.length > 0) {
      if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
      }

      this.addSectionTitle(doc, 'Top 10 des Pays par Nombre d\'Athlètes', yPosition);
      yPosition += 10;

      const countryData = topCountries.slice(0, 10).map((country, index) => [
        (index + 1).toString(),
        country.country,
        country.athletes.toLocaleString('fr-FR')
      ]);

      autoTable(doc, {
        startY: yPosition,
        head: [['Rang', 'Pays', 'Nombre d\'athlètes']],
        body: countryData,
        theme: 'grid',
        headStyles: {
          fillColor: [0, 159, 61], // Vert olympique
          fontSize: 11,
          fontStyle: 'bold'
        },
        bodyStyles: {
          fontSize: 10
        },
        alternateRowStyles: {
          fillColor: [240, 255, 244]
        },
        margin: { left: 15, right: 15 }
      });

      yPosition = (doc as any).lastAutoTable.finalY + 15;
    }

    // Section 4: Top 10 des disciplines (si fourni)
    if (topDisciplines && topDisciplines.length > 0) {
      if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
      }

      this.addSectionTitle(doc, 'Top 10 des Disciplines par Participation', yPosition);
      yPosition += 10;

      const disciplineData = topDisciplines.slice(0, 10).map((discipline, index) => [
        (index + 1).toString(),
        discipline.discipline,
        discipline.participants.toLocaleString('fr-FR')
      ]);

      autoTable(doc, {
        startY: yPosition,
        head: [['Rang', 'Discipline', 'Participants']],
        body: disciplineData,
        theme: 'grid',
        headStyles: {
          fillColor: [255, 209, 0], // Jaune olympique
          textColor: [0, 0, 0],
          fontSize: 11,
          fontStyle: 'bold'
        },
        bodyStyles: {
          fontSize: 10
        },
        alternateRowStyles: {
          fillColor: [255, 252, 230]
        },
        margin: { left: 15, right: 15 }
      });
    }

    // Pied de page sur toutes les pages
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      this.addFooter(doc, i, pageCount);
    }

    // Téléchargement du PDF
    const fileName = `rapport_olympique_${new Date().getTime()}.pdf`;
    doc.save(fileName);
  }

  /**
   * Ajoute l'en-tête avec anneaux olympiques stylisés
   */
  private addHeader(doc: jsPDF, y: number): void {
    const pageWidth = doc.internal.pageSize.width;
    
    // Rectangles colorés stylisés (représentant les couleurs olympiques)
    const colors = [
      [0, 133, 195],    // Bleu
      [255, 209, 0],    // Jaune
      [0, 0, 0],        // Noir
      [0, 159, 61],     // Vert
      [255, 107, 157]   // Rose
    ];

    const spacing = 12;
    const startX = (pageWidth - (colors.length * spacing)) / 2;

    colors.forEach((color, index) => {
      doc.setFillColor(color[0], color[1], color[2]);
      doc.circle(startX + (index * spacing), y, 3, 'F');
    });

    // Ligne de séparation
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(20, y + 8, pageWidth - 20, y + 8);
  }

  /**
   * Ajoute un titre de section
   */
  private addSectionTitle(doc: jsPDF, title: string, y: number): void {
    doc.setFontSize(14);
    doc.setTextColor(0, 133, 195);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 15, y);
    doc.setFont('helvetica', 'normal');
  }

  /**
   * Ajoute le pied de page
   */
  private addFooter(doc: jsPDF, currentPage: number, totalPages: number): void {
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Ligne de séparation
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(20, pageHeight - 15, pageWidth - 20, pageHeight - 15);

    // Texte du pied de page
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(
      'Tableau de Bord Analytics Olympiques - Rapport confidentiel',
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );

    // Numéro de page
    doc.text(
      `Page ${currentPage} sur ${totalPages}`,
      pageWidth - 20,
      pageHeight - 10,
      { align: 'right' }
    );
  }

  /**
   * Génère un rapport rapide avec les KPIs principaux
   */
  async generateQuickReport(stats: OlympicStats): Promise<void> {
    await this.generateOlympicReport(stats);
  }
}

export default new PDFExportService();
