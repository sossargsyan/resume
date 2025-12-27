import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../../environments/environment';
import { Resume } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AiResumeService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI(environment.geminiApiKey);
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: `
        You are an elite Resume Designer. Your task is to take resume data and transform it into a stunning, modern, and professional HTML/CSS document.
        
        Rules:
        1. Output a <style> tag followed by a <div class="resume-container">. DO NOT include <html>, <head>, or <body> tags.
        2. Use the .resume-container class as the root for all your styles.
        3. Use internal <style> tags. No external dependencies or fonts (use standard web-safe fonts or include Google Fonts imports).
        4. Design should be premium: use elegant typography, subtle accents, and a clean grid layout.
        5. The layout MUST be optimized for A4 paper printing.
        6. Use a sophisticated color palette (e.g., Deep Navy, Slate Gray, or minimalist Black/White with a single accent color).
        7. Include all sections: About, Experience, Education, Technologies, Languages, and Interests.
        8. Ensure the design feels balanced and utilizes whitespace effectively.
        9. DO NOT include any interactive elements (JS) or markdown backticks in the final output.
      `,
    });
  }

  async designResume(data: Resume): Promise<string> {
    const prompt = `
      Design a professional resume for the following person:
      ${JSON.stringify(data, null, 2)}
      
      Return the HTML code (style + div) for a single-page A4 resume.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      let html = response.text();

      // Cleanup in case Gemini surrounds it with markdown
      html = html.replace(/```html|```/g, '').trim();

      return html;
    } catch (error) {
      console.error('Gemini Design Error:', error);
      throw new Error('Failed to design resume with AI.');
    }
  }
}
