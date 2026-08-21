import { CommonModule } from '@angular/common';
import { Component, inject, input, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-chat',
  imports: [CommonModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  pdfUpload = input<boolean>();
  filePath = input<string>();

  question: string = '';
  enableSendButton: boolean = false;

  apiService = inject(ApiService);

  ngOnInit() {
    console.log(
      'Chat component initialized with pdfUpload:',
      this.pdfUpload,
      'and filePath:',
      this.filePath,
    );
  }

  ngOnchanges(changes: SimpleChanges) {
    if (changes['pdfUpload']) {
      console.log('pdfUpload changed:', changes['pdfUpload'].currentValue);
    }
    if (changes['filePath']) {
      console.log('filePath changed:', changes['filePath'].currentValue);
    }
  }

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.question = input.value;
    console.log('Question changed:', this.question);
    if (this.question.trim() === '') {
      console.log('Question is empty. Disable Send button.');
      this.enableSendButton = false;
    } else {
      console.log('Question is not empty. Enable Send button.');
      this.enableSendButton = true;
    }
  }

  askQuestion() {
    if (!this.question.trim()) {
      console.log('Question is empty. Not sending.');
      return;
    }
    const filePath = this.filePath();
    if (this.pdfUpload() === false || !filePath) {
      console.log('PDF not uploaded or filePath is empty. Cannot send question.');
      return;
    }

    console.log('Sending question:', this.question);
    this.apiService.askQuestion(this.question, filePath).subscribe({
      next: (response) => {
        console.log('Received response:', response);
      },
      error: (error) => {
        console.error('Error sending question:', error);
      },
    });
  }
}
