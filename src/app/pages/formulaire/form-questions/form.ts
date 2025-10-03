import { Component, ViewChild , ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as Papa from 'papaparse';
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router';
import { FormulaireService, Question, Formulaire, QuestionOption } from '../../services/formulaire.service';

@Component({
  selector: 'app-create-formulaire',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule], 
  templateUrl: './form.html',
  styleUrls: ['./form.css']
})
export class FormQuestion {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  titre: string = '';
  active: boolean = false;
  questions: Question[] = [];
  sections: any[] = [];
  selectedFile: File | null = null;

  questionTypes: { value: Question['type']; label: string }[] = [
  { value: 'text', label: 'Réponse courte' },
  { value: 'radio', label: 'Choix unique' },
  { value: 'checkbox', label: 'Choix multiples' },
  { value: 'select', label: 'Liste déroulante' }
];

  constructor(
    private service: FormulaireService,
    private router: Router
  ) {}

  addQuestionToSection(section: any) {
  if (!section.questions) {
    section.questions = [];
  }
  section.questions.push({
    type: 'text',
    questionText: '',
    options: [],
    reponsesCorrectes: [],
    note: 0
  });
}

  deleteQuestion(section: any, index: number) {
    section.questions.splice(index, 1);
  }

  addOption(q: Question) {
    if (!q.options) q.options = [];
    q.options?.push('');
  }

  deleteOption(q: Question, i: number) {
    q.options?.splice(i, 1);
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  addSection() {
    this.sections.push({
      titre: '',
      questions: []
    });
  }

  deleteSection(index: number) {
    this.sections.splice(index, 1);
  }

  onFileSelected(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      console.log('CSV parsed:', results.data);

      const sectionMap: { [key: string]: any } = {};
      this.sections = [];

      results.data.forEach((row: any) => {
        const sectionTitle = row['Section']?.trim() || 'Sans section';
        let section = sectionMap[sectionTitle];
        if (!section) {
          section = { titre: sectionTitle, questions: [] };
          sectionMap[sectionTitle] = section;
          this.sections.push(section);
        }

        const options = [
          row['Option1'], row['Option2'], row['Option3'], row['Option4'], row['Option5']
        ].filter((v: string) => v && v.trim() !== '');

        const reponsesCorrectes: string[] = [];
        ['Correct1','Correct2','Correct3','Correct4','Correct5'].forEach((key, index) => {
          if (row[key]?.toLowerCase() === 'true' && options[index]) {
            reponsesCorrectes.push(options[index]);
          }
        });

        const question: Question = {
          questionText: row['Question']?.trim() || '',
          note: Number(row['Points']) || 0,
          type: row['Type']?.trim() || 'text',
          options,
          reponsesCorrectes
        };

        section.questions.push(question);
      });

      console.log('Sections créées avec questions :', this.sections);
    }
  });
}


submit() {
  console.log('Formulaire à envoyer :', {
    titre: this.titre,
    active: this.active,
    sections: this.sections
  });
  this.sections.forEach((section, sIndex) => {
    console.log(`Section ${sIndex + 1}:`, section.titre);
    if (section.questions) {
      section.questions.forEach((q: Question, qIndex: number) => {
        console.log(`  Question ${qIndex + 1}:`, q.questionText, 'Type:', q.type, 'Options:', q.options, 'Réponses correctes:', q.reponsesCorrectes);
      });
    }
  });
  const formulaire: Formulaire = {
    titre: this.titre,
    active: this.active,
    sections: this.sections
  };

  this.service.createFormulaire(formulaire).subscribe({
    next: () => {
      alert('Formulaire créé !');
      this.router.navigate(['/list-formulaires']);
    },
    error: (err) => console.error(err)
  });
}
}
