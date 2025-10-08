import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PasswordResetService } from '../../core/services/password-reset.service';
import { minUniqueChars, matchFields } from '../../shared/validators/password.validators';

@Component({
  selector: 'app-password-reset-page',
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './password-reset-page.component.html',
  styleUrl: './password-reset-page.component.css'
})
export class PasswordResetPageComponent {
  resetForm: FormGroup;
  showPassword = false;
  showConfirm = false;
  token?: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private passwordReset: PasswordResetService,
    private translate: TranslateService,
    private route: ActivatedRoute) {
    this.resetForm = this.fb.group({
      email:     ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, minUniqueChars(8)]],
      confirm: ['', [Validators.required]],
    },
    {
      validators: [matchFields('password', 'confirm')]
    });

    this.route.paramMap.subscribe(params => {
      this.token = params.get('token') ?? undefined;
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmVisibility() {
    this.showConfirm = !this.showConfirm;
  }

  onSubmit(): void {
    if (!this.token || !this.resetForm.valid) return;

    const { email, password } = this.resetForm.value;
    this.passwordReset.confirmReset(email, this.token, password).subscribe((success: any) => {
      if (success) {
        this.router.navigate(['/']);
      } else {
        this.snackBar.open(this.translate.instant('PASSWORD_RESET_FAILED'), 'OK', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  naviageToLogin() {
    this.router.navigateByUrl("/login");
  }
}
