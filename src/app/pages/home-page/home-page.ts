import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Formulaire, FormulaireService } from '../services/formulaire.service';

@Component({
  selector: 'app-acceuil',
  imports: [CommonModule],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css']
})
export class HomePage implements OnInit {
  formulaires: Formulaire[] = [];

  constructor(
    private router: Router,
    private formulaireService: FormulaireService
  ) {}

  ngOnInit(): void {
    this.formulaireService.getActiveFormulaires().subscribe({
      next: (data) => this.formulaires = data,
      error: (err) => console.error(err)
    });
  }

  creerFormulaire() {
    this.router.navigate(['/formQuestion']);
  }

  voirNotes(formulaireId: string) {
    this.router.navigate(['/notes', formulaireId]);
  }
}
