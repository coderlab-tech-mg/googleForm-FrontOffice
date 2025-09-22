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
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const payload: SignUpRequest = {
      email: this.email,
      password: this.password,
    };

    this.authService.signUp(payload).subscribe({
      next: (res) => {
        alert(res);
        this.router.navigate(['/formQuestion']);
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de l’inscription');
      }
    });
  }
}

