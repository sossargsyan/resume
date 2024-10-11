import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

import {
  Education,
  Experience,
  Language,
  Resume,
  TechItem,
  Technology,
} from '../types';

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
  private pageHeight = 297; // A4 page height in mm
  private marginTop = 10;
  private marginBottom = 10;
  private lineHeight = 10;
  private currentY = this.marginTop;

  constructor() {}

  private checkPageSpace(doc: jsPDF, additionalSpace: number = 0) {
    if (
      this.currentY + this.lineHeight + additionalSpace >=
      this.pageHeight - this.marginBottom
    ) {
      doc.addPage();
      this.currentY = this.marginTop; // Reset Y position for new page
    }
  }

  generateResume(data: Resume) {
    const doc = new jsPDF();

    // About Section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold'); // Set font to bold for the title
    doc.text(data.about.fullName, 10, this.currentY);
    this.currentY += this.lineHeight;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal'); // Back to normal font
    doc.text(data.about.profession, 10, this.currentY);
    this.currentY += this.lineHeight;
    doc.text(`Email: ${data.about.email}`, 10, this.currentY);
    this.currentY += this.lineHeight;
    doc.text(`Phone: ${data.about.phone}`, 10, this.currentY);
    this.currentY += this.lineHeight;
    doc.text(`Address: ${data.about.addresses.join(', ')}`, 10, this.currentY);
    this.currentY += this.lineHeight * 2;

    // Summary
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Summary', 10, this.currentY);
    this.currentY += this.lineHeight;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    const splitSummary = doc.splitTextToSize(data.about.summary, 190);
    splitSummary.forEach((line: string) => {
      doc.text(line, 10, this.currentY);
      this.currentY += this.lineHeight;
      this.checkPageSpace(doc);
    });

    // Technologies Section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Technologies', 10, this.currentY);
    this.currentY += this.lineHeight;
    data.technologies.forEach((tech: Technology) => {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`${tech.name}:`, 10, this.currentY);
      this.currentY += this.lineHeight;
      this.checkPageSpace(doc);

      doc.setFont('helvetica', 'normal');
      tech.items.forEach((item: TechItem) => {
        doc.text(`- ${item.name}`, 20, this.currentY);
        this.currentY += this.lineHeight;
        this.checkPageSpace(doc);
      });
    });

    // Experience Section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Experience', 10, this.currentY);
    this.currentY += this.lineHeight;
    data.experience.forEach((exp: Experience) => {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`${exp.title}`, 10, this.currentY);
      this.currentY += this.lineHeight;

      doc.setFont('helvetica', 'normal');
      doc.text(`Dates: ${exp.startDate} - ${exp.endDate}`, 10, this.currentY);
      this.currentY += this.lineHeight;

      const splitDesc = doc.splitTextToSize(exp.description, 190);
      splitDesc.forEach((line: string) => {
        doc.text(line, 10, this.currentY);
        this.currentY += this.lineHeight;
        this.checkPageSpace(doc);
      });
      this.currentY += this.lineHeight; // Extra space after each experience
    });

    // Education Section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Education', 10, this.currentY);
    this.currentY += this.lineHeight;
    data.education.forEach((edu: Education) => {
      this.checkPageSpace(doc, this.lineHeight * 2); // Ensure space before starting new education entry

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`${edu.degree} in ${edu.major}`, 10, this.currentY);
      this.currentY += this.lineHeight;

      this.checkPageSpace(doc, this.lineHeight); // Ensure space before school entry
      doc.setFont('helvetica', 'normal');
      doc.text(
        `${edu.school} (${edu.startDate} - ${edu.endDate})`,
        10,
        this.currentY
      );
      this.currentY += this.lineHeight;
      this.checkPageSpace(doc);
    });

    // Languages Section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Languages', 10, this.currentY);
    this.currentY += this.lineHeight;
    data.languages.forEach((lang: Language) => {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`${lang.name} - ${lang.level}`, 10, this.currentY);
      this.currentY += this.lineHeight;
      this.checkPageSpace(doc);
    });

    // Save the PDF
    doc.save(`${data.title}.pdf`);
  }
}
