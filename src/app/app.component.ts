import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from './core/services/auth.service';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatButtonToggleModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Composed Cloud Castle';
  currentYear = new Date().getFullYear();
  currentLang: string;

  constructor(
    public auth: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {
    const savedLang = localStorage.getItem("appLanguage");
    this.currentLang = savedLang ? savedLang : 'en';
    translate.setDefaultLang(this.currentLang);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('appLanguage', lang);
  }

}
