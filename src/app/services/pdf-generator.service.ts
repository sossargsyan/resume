import { Injectable, inject } from '@angular/core';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';

import {
  Education,
  Experience,
  Language,
  Resume,
  TechItem,
  Technology,
} from '../types';
import { AiResumeService } from './ai-resume.service';

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
  private aiResumeService = inject(AiResumeService);
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

  async generateAiResume(data: Resume): Promise<void> {
    const htmlContent = await this.aiResumeService.designResume(data);

    // Create a temporary container
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '0';
    container.style.top = '0';
    container.style.zIndex = '-1';
    container.style.opacity = '0.01'; // Not hidden but virtually invisible
    container.style.pointerEvents = 'none';
    container.style.width = '210mm'; // A4 width

    // Ensure the content has a white background (crucial for some PDF engines)
    const wrapper = document.createElement('div');
    wrapper.style.backgroundColor = 'white';
    wrapper.innerHTML = htmlContent;
    container.appendChild(wrapper);
    document.body.appendChild(container);

    const opt = {
      margin: 0,
      filename: `${data.title}_AI.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: true,
        letterRendering: true,
      },
      jsPDF: {
        unit: 'mm' as const,
        format: 'a4' as const,
        orientation: 'portrait' as const,
      },
    };

    try {
      // Small delay to ensure any CSS/Fonts/Layout are settled
      await new Promise((resolve) => setTimeout(resolve, 800));
      await html2pdf().from(wrapper).set(opt).save();
    } catch (error) {
      console.error('html2pdf error:', error);
      throw error;
    } finally {
      document.body.removeChild(container);
    }
  }

  generateResume(data: Resume) {
    const doc = new jsPDF();
    this.currentY = this.marginTop;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(data.about.fullName, 10, this.currentY);
    this.currentY += this.lineHeight;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(data.about.profession, 10, this.currentY);
    this.currentY += this.lineHeight;
    doc.text(`Email: ${data.about.email}`, 10, this.currentY);
    this.currentY += this.lineHeight;
    doc.text(`Phone: ${data.about.phone}`, 10, this.currentY);
    this.currentY += this.lineHeight;
    doc.text(`Address: ${data.about.addresses.join(', ')}`, 10, this.currentY);
    this.currentY += this.lineHeight * 2;

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

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Technologies', 10, this.currentY);
    this.currentY += this.lineHeight;
    data.technologies.forEach((tech: Technology) => {
      this.checkPageSpace(doc, this.lineHeight * 2);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`${tech.name}:`, 10, this.currentY);
      this.currentY += this.lineHeight;

      doc.setFont('helvetica', 'normal');
      tech.items.forEach((item: TechItem) => {
        doc.text(`- ${item.name}`, 20, this.currentY);
        this.currentY += this.lineHeight;
        this.checkPageSpace(doc);
      });
    });

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Experience', 10, this.currentY);
    this.currentY += this.lineHeight;
    data.experience.forEach((exp: Experience) => {
      this.checkPageSpace(doc, this.lineHeight * 2);
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
      this.currentY += this.lineHeight;
    });

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Education', 10, this.currentY);
    this.currentY += this.lineHeight;
    data.education.forEach((edu: Education) => {
      this.checkPageSpace(doc, this.lineHeight * 2);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`${edu.degree} in ${edu.major}`, 10, this.currentY);
      this.currentY += this.lineHeight;

      doc.setFont('helvetica', 'normal');
      doc.text(
        `${edu.school} (${edu.startDate} - ${edu.endDate})`,
        10,
        this.currentY
      );
      this.currentY += this.lineHeight;
    });

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Languages', 10, this.currentY);
    this.currentY += this.lineHeight;
    data.languages.forEach((lang: Language) => {
      this.checkPageSpace(doc, this.lineHeight);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`${lang.name} - ${lang.level}`, 10, this.currentY);
      this.currentY += this.lineHeight;
    });

    doc.save(`${data.title}.pdf`);
  }
}
