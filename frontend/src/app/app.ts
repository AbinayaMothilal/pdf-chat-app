import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Upload } from './components/upload/upload';
import { Chat } from './components/chat/chat';

@Component({
  selector: 'app-root',
  imports: [Upload, Chat],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  pdfUpload: boolean = false;
  filePath: string = '';

  pdfUploaded(event: { filepath: string }): void {
    this.pdfUpload = true;
    this.filePath = event.filepath;
  }

  pdfRemoved(event: boolean): void {
    this.pdfUpload = false;
    this.filePath = '';
  }
}
