import { Routes } from '@angular/router';
import { Login } from './pages/authentification/login/login';
import { SignUp } from './pages/authentification/sign-up/sign-up';
import { FormQuestion } from './pages/formulaire/form-questions/form';
import { ListFormulaires } from './pages/formulaire/list-formulaires/list-formulaires';
import { FormulaireReponse } from './pages/formulaire/formulaire-reponse/formulaire-reponse';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'sign-up', component: SignUp },
  { path: 'formQuestion', component: FormQuestion },
  { path: 'list-formulaires', component: ListFormulaires },
  { path: 'formulaire-reponse/:id', component: FormulaireReponse }
];
