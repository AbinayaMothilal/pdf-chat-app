import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { askResponse, uploadResponse } from '../models/api-data';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  http = inject(HttpClient);

  baseUrl = 'http://localhost:3000';

  uploadPdf(file: File): Observable<uploadResponse> {
    const formData = new FormData();

    formData.append('pdf', file);

    return this.http.post<uploadResponse>(`${this.baseUrl}/api/upload`, formData);
  }

  askQuestion(questionData: string, filepath: string): Observable<askResponse> {
    const body = {
      question: questionData,
      filePath: filepath,
    };

    return this.http.post<askResponse>(`${this.baseUrl}/api/ask`, body);
  }
}
