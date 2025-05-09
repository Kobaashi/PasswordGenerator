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
    const params = {
      length: this.length.toString(),
      numbers: this.includeNumbers.toString(),
      special: this.includeSymbols.toString()
    };
    const headers = new HttpHeaders({
      'X-Api-Key': 'c1DagfGo2ACjtdlvnrzSFw==GFmxxx26xDrAQHhI'
    });

    this.http.get<any>(apiUrl, { params, headers }).subscribe({
      next: (data) => {
        this.password = data.random_password;
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
