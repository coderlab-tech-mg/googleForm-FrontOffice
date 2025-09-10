import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService, SignUpRequest } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
    imports: [RouterModule,FormsModule],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.css']
  
})
export class SignUp {
  nom: string = '';
  prenom: string = '';
  email: string = '';
  password: string = '';
  std: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const payload: SignUpRequest = {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      password: this.password,
      std: this.std
    };

    this.authService.signUp(payload).subscribe({
      next: (res) => {
        alert(res);
        this.router.navigate(['/form']);
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de l’inscription');
      }
    });
  }
}

