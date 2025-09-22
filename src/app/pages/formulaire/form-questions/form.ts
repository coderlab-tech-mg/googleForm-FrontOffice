import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  titre: string = '';
  active: boolean = false;
  questions: Question[] = [];

  questionTypes: Question['type'][] = ['text', 'radio', 'checkbox', 'select'];

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


  supprimerQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  ajouterOption(q: Question) {
    if (!q.options) q.options = [];
    q.options?.push('');
  }

  supprimerOption(q: Question, i: number) {
    q.options?.splice(i, 1);
  }

  trackByIndex(index: number): number {
    return index;
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
