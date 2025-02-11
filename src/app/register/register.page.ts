import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  users: any[] = [];

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Validar que ingrese este campo y que sea un correo válido
      fullName: ['', [Validators.required]], // Validar que ingrese este campo
      user: ['', [Validators.required, Validators.pattern(/^\S*$/)]], // Validar que no tenga espacios
      password: ['', [Validators.required, Validators.minLength(6)]], // Validar que tenga al menos 6 carácteres
      confirmPassword: ['', [Validators.required]], // Validar que ingrese este campo
      birthDate: ['', [Validators.required]], // Validar que ingrese este campo
    }, { validators: this.matchPasswords });
  }

  ngOnInit() {
  }

  matchPasswords(group: FormGroup) {
    const password = group.get('password')?.value; // Obtenemos el password del campo
    const confirmPassword = group.get('confirmPassword')?.value; // Obtenemos el segundo password
    return password === confirmPassword ? null : { passwordsMismatch: true }; // Comparamos ambos que sean exactamente iguaes
  }

  toUpperCase() {
    const fullName = this.registerForm.get('fullName'); // Obtenemos el nombre del campo
    if (fullName) {
      fullName.setValue(fullName.value.toUpperCase(), { emitEvent: false }); // Lo converttimos a mayúsculas
    }
  }

  get passwordsDoNotMatch() {
    return this.registerForm.hasError('passwordsMismatch') &&
           this.registerForm.get('confirmPassword')?.touched;
  }

  get email() { return this.registerForm.get('email'); }
  get user() { return this.registerForm.get('user'); }

  register() {
    if (this.registerForm.valid) {
      this.users.push(this.registerForm.value); // Aqui se guarda en el arreglo
      console.log('Datos del usuario:', this.registerForm.value);
      alert('Registro exitoso');

      this.registerForm.reset();
    }
  }
}
