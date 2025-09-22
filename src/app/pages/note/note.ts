import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReponseService } from '../services/reponse.service';

@Component({
  selector: 'app-note',
  imports: [CommonModule],
  templateUrl: './note.html',
  styleUrl: './note.css'
})
export class Note implements OnInit {
  formulaireId!: number;
  formulaireTitre = '';
  notes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private reponseService: ReponseService
  ) {}

  ngOnInit(): void {
    this.formulaireId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.formulaireId) {
      this.reponseService.getNotes(this.formulaireId).subscribe({
        next: (data) => {
          console.log('Notes reçues:', data);
          this.notes = data;
        },
        error: (err) => console.error(err)
      });
    }
  }
}
