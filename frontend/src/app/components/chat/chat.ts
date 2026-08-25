import { CommonModule } from '@angular/common';
import { Component, inject, input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { askResponse } from '../../models/api-data';
import { FormsModule } from '@angular/forms';
import { marked } from 'marked';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat implements OnInit, OnChanges {
  pdfUpload = input<boolean>();
  filePath = input<string>();

  question: string = '';

  apiService = inject(ApiService);

  isLoading: boolean = false;
  messages = signal<
    {
      question: string;
      answer: string;
      loading: boolean;
    }[]
  >([]);

  ngOnInit() {
    // console.log(
    //   'Chat component initialized with pdfUpload:',
    //   this.pdfUpload,
    //   'and filePath:',
    //   this.filePath,
    // );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pdfUpload'] || changes['filePath']) {
      // Clear messages
      this.messages.set([]);
    }
  }

  onEnter(event: Event) {
    event.preventDefault();

    if (!this.question.trim() || !this.pdfUpload() || this.isLoading) {
      return;
    }

    this.askQuestion();
  }

  askSuggestedQuestion(question: string) {
    if (!this.pdfUpload() || this.isLoading) {
      return;
    }

    this.askQuestion();
  }

  askQuestion(suggestedQuestion?: string) {
    if (this.isLoading) {
      return;
    }

    const questionToAsk = (suggestedQuestion ?? this.question).trim();

    if (!questionToAsk) {
      return;
    }

    const filePath = this.filePath();

    if (!this.pdfUpload() || !filePath) {
      return;
    }

    this.isLoading = true;

    this.messages.update((messages) => [
      ...messages,
      {
        question: questionToAsk,
        answer: '',
        loading: true,
      },
    ]);

    this.question = '';

    const messageIndex = this.messages().length - 1;

    this.apiService.askQuestion(questionToAsk, filePath).subscribe({
      next: async (response: askResponse) => {
        const ans = response.answer;
        const answer = ans ? await marked.parse(ans) : '';

        if (response.success && answer) {
          this.messages.update((messages) =>
            messages.map((message, index) =>
              index === messageIndex
                ? {
                    ...message,
                    answer,
                    loading: false,
                  }
                : message,
            ),
          );
        }

        this.isLoading = false;
      },

      error: (error) => {
        console.error('Error sending question:', error);

        this.messages.update((messages) =>
          messages.map((message, index) =>
            index === messageIndex
              ? {
                  ...message,
                  answer: 'Sorry, I could not get an answer. Please try again.',
                  loading: false,
                }
              : message,
          ),
        );

        this.isLoading = false;
      },
    });
  }
}
