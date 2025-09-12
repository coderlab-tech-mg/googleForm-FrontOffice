import { Component, OnInit, Input } from '@angular/core';
import { ReponseService, SubmitFormulaireRequest, ReponseQuestionRequest } from '../../services/reponse.service';
import { Formulaire, Question, FormulaireService } from '../../services/formulaire.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulaire-reponse',
  standalone: true,
  imports: [CommonModule, FormsModule , RouterModule],
  templateUrl: './formulaire-reponse.html',
  styleUrls: ['./formulaire-reponse.css']
})
export class FormulaireReponse implements OnInit {
  @Input() formulaire!: Formulaire;

  reponseMap: { [questionId: number]: string | string[] } = {};

  constructor(
    private reponseService: ReponseService,
    private router: Router,
    private route: ActivatedRoute,
    private formulaireService: FormulaireService
  ) {}

  ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  if (id) {
    this.formulaireService.getFormulaireById(id).subscribe({
      next: (data) => {
        this.formulaire = data;
        this.formulaire.questions.forEach(q => {
          this.reponseMap[q.id!] = q.type === 'checkbox' ? [] : '';
        });
      },
      error: (err) => console.error(err)
    });
  }
}

  toggleCheckbox(qId: number, option: string) {
    const arr = this.reponseMap[qId] as string[];
    const index = arr.indexOf(option);
    if (index === -1) arr.push(option);
    else arr.splice(index, 1);
  }

  submit() {
  const reponses: ReponseQuestionRequest[] = this.formulaire.questions.map(q => ({
    questionId: q.id!,
    questionText: q.questionText,
    answer: this.reponseMap[q.id!]
  }));

  if (!this.formulaire.id) {
    console.error("Formulaire ID non défini !");
    return;
  }

  const payload: SubmitFormulaireRequest = {
    formulaireId: this.formulaire.id,
    reponses: reponses
  };

  console.log("Payload envoyé :", JSON.stringify(payload, null, 2));

  this.reponseService.submitReponse(payload).subscribe({
    next: () => alert('Réponses envoyées !'),
    error: err => console.error(err)
  });
}
}
