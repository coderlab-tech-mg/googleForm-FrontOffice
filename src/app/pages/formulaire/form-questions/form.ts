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

  addQuestion() {
    this.questions.push({ 
      type: 'text', 
      questionText: '', 
      options: [], 
      reponseCorrecte: '',
      note: 0
    });
  }

  deleteQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  addOption(q: Question) {
    if (!q.options) q.options = [];
    q.options?.push('');
  }

  deleteOption(q: Question, i: number) {
    q.options?.splice(i, 1);
  }

  trackByIndex(index: number): number {
    return index;
  }

  onFileSelected(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  Papa.parse(file, {
  header: true,
  skipEmptyLines: true,
  delimiter: ',',
  complete: (results) => {
    console.log('CSV parsed:', results.data);

    this.questions = results.data.map((row: any) => ({
      questionText: row['Question']?.trim() || '',
      note: Number(row['Points']) || 0,
      type: row['Type']?.trim() || 'text',
      options: [
        row['Option1'], row['Option2'], row['Option3'], row['Option4'], row['Option5']
      ].filter((v: string) => v && v.trim() !== ''),
      reponsesCorrectes: [
        row['Correct1'], row['Correct2'], row['Correct3'], row['Correct4'], row['Correct5']
      ].map((v: string) => v?.toLowerCase() === 'true')
    }));

    console.log('Questions créées:', this.questions);
  }
});

}

  submit() {
    const formulaire: Formulaire = {
      titre: this.titre,
      active: this.active,
      questions: this.questions
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
