import { Component, OnInit } from '@angular/core';
import { FormulaireService, Formulaire, Question } from '../../services/formulaire.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-formulaires',
  imports: [CommonModule,RouterModule],
  templateUrl: './list-formulaires.html',
  styleUrl: './list-formulaires.css'
})
export class ListFormulaires implements OnInit  {
  formulaires: Formulaire[] = [];

  constructor(private service: FormulaireService, private router: Router) { }

  ngOnInit(): void {
    this.loadFormulaires();
  }

  loadFormulaires() {
    this.service.getActiveFormulaires().subscribe({
      next: (data) => this.formulaires = data,
      error: (err) => console.error(err)
    });
  }

  openFormulaire(id: string) {
    this.router.navigate(['/formulaire-reponse', id]);
  }
}
