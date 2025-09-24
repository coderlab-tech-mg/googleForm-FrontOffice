import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReponseService } from '../services/reponse.service';
import * as  XLSX from 'xlsx';

@Component({
  selector: 'app-note',
  imports: [CommonModule],
  templateUrl: './note.html',
  styleUrl: './note.css'
})
export class Note implements OnInit {
  formulaireId!: string;
  formulaireTitre = '';
  notes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reponseService: ReponseService
  ) {}

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');

  if (!id) {
    console.error('FormulaireId manquant dans l’URL');
    return;
  }

  this.formulaireId = id;
  this.reponseService.getNotes(this.formulaireId).subscribe({
  next: (data) => {
    this.notes = data.map((n: any) => {
      n.reponses = n.reponses.map((r: any) => {
        const q = n.formulaire.questions.find((qq: any) => qq.id === r.questionId);
        return {
          ...r,
          questionText: q ? q.questionText : '',
          reponseCorrecte: q ? q.reponseCorrecte : ''
        };
      });
      return n;
    });
    console.log('Notes:', this.notes);
  },
  error: (err) => console.error(err)
});

}

  exportExcel(): void {
  const exportData: any[] = [];
  this.notes.forEach(n => {
    if (n.reponses && n.reponses.length > 0) {
      n.reponses.forEach((r: any) => {
      exportData.push({
        STD: n.student?.std,
        Nom: n.student?.nom,
        Prénom: n.student?.prenom,
        Question: r.questionText,
        'Réponse Correcte': r.reponseCorrecte,
        'Réponse Étudiant': r.reponseUtilisateur,
        'Points Obtenus': n.totalPoints
      });
    });
    } else {
      exportData.push({
        STD: n.student?.std,
        Nom: n.student?.nom,
        Prénom: n.student?.prenom,
        Question: '',
        'Réponse Étudiant': '',
        'Réponse Correcte': '',
        'Points Obtenus': n.totalPoints
      });
    }
  });

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Notes');
  XLSX.writeFile(workbook, `${this.formulaireTitre || 'notes'}-export.xlsx`);
}

  
  goHome() { this.router.navigate(['/home']);}
}
