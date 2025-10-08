import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { PasswordResetService } from '../../core/services/password-reset.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reset-password-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, TranslateModule],
  templateUrl: './password-reset-dialog.component.html',
  styleUrls: ['./password-reset-dialog.component.css']
})
export class ResetPasswordDialogComponent {
  dialogRef = inject(MatDialogRef<ResetPasswordDialogComponent>);
  private fb = inject(FormBuilder);
  private snack = inject(MatSnackBar);
  private passwordReset = inject(PasswordResetService);
  private translate = inject(TranslateService);

  loading = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  async send() {
    if (this.form.invalid) return;
    this.loading = true;
    try {
      await firstValueFrom(this.passwordReset.requestReset(this.form.value.email!));
      // TODO: Generic message (same for success/failure)?
      // TODO: translations
      this.snack.open(this.translate.instant('EMAIL_SENT'), 'OK', { duration: 5000 });
      this.dialogRef.close();
    } catch {
      this.snack.open(this.translate.instant('EMAIL_SENT'), 'OK', { duration: 5000 });
      this.dialogRef.close();
    } finally {
      this.loading = false;
    }
  }
}