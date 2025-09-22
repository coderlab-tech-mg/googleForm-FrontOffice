import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReponseService, SubmitFormulaireRequest, ReponseQuestionRequest } from '../../services/reponse.service';
import { Formulaire, FormulaireService, Question } from '../../services/formulaire.service';

@Component({
  selector: 'app-formulaire-reponse',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './formulaire-reponse.html',
  styleUrls: ['./formulaire-reponse.css']
})
export class FormulaireReponse implements OnInit {
  formulaire!: Formulaire;
  reponseMap: { [questionId: number]: string | string[] } = {};
  studentInfos: { std: string; nom: string; prenom: string } = { std: '', nom: '', prenom: '' };
  alreadyAnswered = false;
  submitting = false;
  showAlert = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formulaireService: FormulaireService,
    private reponseService: ReponseService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.formulaireService.getFormulaireById(id).subscribe({
        next: data => {
          this.formulaire = data;
          this.formulaire.questions.forEach(q => {
            this.reponseMap[q.id!] = q.type === 'checkbox' ? [] : '';
          });
        },
        error: err => console.error(err)
      });
    }
  }

  checkAlreadyAnswered() {
    if (this.studentInfos.std && this.formulaire.id !== undefined) {
      this.reponseService
        .hasAlreadyAnswered(this.studentInfos.std, this.formulaire.id)
        .subscribe(res => this.alreadyAnswered = res);
    }
  }

  toggleCheckbox(qId: number, option: string) {
    const arr = this.reponseMap[qId] as string[];
    const index = arr.indexOf(option);
    if (index === -1) arr.push(option);
    else arr.splice(index, 1);
  }

  submit(event: Event) {
    this.showAlert = true;
    if (!this.studentInfos.std || !this.studentInfos.nom || !this.studentInfos.prenom){
      this.showAlert = true;
      event.preventDefault();
      return;
    }
    if (!this.formulaire.id) return;

    const reponses: ReponseQuestionRequest[] = this.formulaire.questions.map(q => ({
      questionId: q.id!,
      questionText: q.questionText,
      answer: this.reponseMap[q.id!]
    }));

    const payload: SubmitFormulaireRequest = {
      formulaireId: this.formulaire.id!,
      studentInfos: this.studentInfos,
      reponses
    };

    this.submitting = true;
    this.reponseService.submitReponse(payload).subscribe({
      next: () => {
        alert('Réponses envoyées!');
        this.alreadyAnswered = true;
        this.submitting = false;
      },
      error: err => {
        console.error(err);
        this.submitting = false;
      }
    });
  }
}
