import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Генератор паролів';
  length: number = 12;
  includeNumbers: boolean = true;
  includeSymbols: boolean = true;
  password: string = '';
  copied: boolean = false;

  constructor(private http: HttpClient) {}

  generatePassword() {
    const apiUrl = 'https://api.api-ninjas.com/v1/passwordgenerator';
    const headers = new HttpHeaders({
      'X-Api-Key': 'c1DagfGo2ACjtdlvnrzSFw==GFmxxx26xDrAQHhI'
    });

    const params = {
      length: this.length.toString(),
      numbers: 'true',
      special: 'true',
      letters: 'true'
    };

    this.http.get<any>(apiUrl, { params, headers }).subscribe({
      next: (data) => {
        let rawPassword = data.random_password;

        if (!this.includeSymbols && this.includeNumbers) {
          rawPassword = rawPassword.replace(/[^0-9]/g, '');
        }

        else if (!this.includeNumbers) {
          rawPassword = rawPassword.replace(/[0-9]/g, '');
        }

        if (!this.includeNumbers && !this.includeSymbols) {
          rawPassword = rawPassword.replace(/[^a-zA-Z]/g, '');
        }

        if (rawPassword.length > this.length) {
          this.password = rawPassword.slice(0, this.length);
        } else {

          while (rawPassword.length < this.length) {
            if (!this.includeSymbols && this.includeNumbers) {
              rawPassword += Math.floor(Math.random() * 10).toString(); 
            } else {
              rawPassword += 'x'; 
            }
          }
          this.password = rawPassword;
        }

        this.copied = false;
      },
      error: (err) => {
        console.error('Помилка при запиті:', err);
        this.password = 'Помилка генерації.';
      }
    });
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.password).then(() => {
      this.copied = true;
      setTimeout(() => (this.copied = false), 2000);
    });
  }
}
