import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  mensaje: boolean = false;

  constructor(private router: Router) {}

  info() {
    this.mensaje = true;
    setTimeout(() => {
      this.mensaje = false;
    }, 5000);
  }

  login(){
    this.router.navigate(['/login']);
  }

  registro(){
    this.router.navigate(['/register']);
  }

}
