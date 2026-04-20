import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly notificationService = inject(NotificationService);

  protected isSubmitting = false;
  protected readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)]
    }),
    accessCode: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4)]
    })
  });

  protected async login(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notificationService.pushToast({
        type: 'warning',
        title: 'Faltan datos',
        body: 'Escribe tu nombre y el codigo compartido para entrar.'
      });
      return;
    }

    try {
      this.isSubmitting = true;
      await this.authService.loginWithAccess(
        this.form.controls.name.getRawValue(),
        this.form.controls.accessCode.getRawValue()
      );
    } catch (error) {
      this.notificationService.pushToast({
        type: 'warning',
        title: 'No se pudo entrar',
        body: error instanceof Error ? error.message : 'No fue posible iniciar sesion.'
      });
    } finally {
      this.isSubmitting = false;
    }
  }
}
