import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api-service';
import { CommonModule } from '@angular/common';
import { uploadResponse } from '../../models/api-data';

@Component({
  selector: 'app-upload',
  imports: [FormsModule, CommonModule],
  templateUrl: './upload.html',
  styleUrl: './upload.css',
})
export class Upload {
  apiService = inject(ApiService);

  fileUploadError = false;

  selectedFile: File | null = null;
  uploadedFile: File | null = null;

  pdfUploading = false;
  // pdfUploaded = false;

  responseMessage: string | null = null;

  pdfUploadedEvent = output<{ filepath: string }>();
  pdfRemovedEvent = output<boolean>();

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    // Reset previous file validation error
    this.fileUploadError = false;

    if (!file) {
      return;
    }

    // Validate PDF
    if (file.type !== 'application/pdf') {
      this.fileUploadError = true;

      this.selectedFile = null;
      this.uploadedFile = null;

      return;
    }

    // Valid PDF
    this.selectedFile = file;
    this.responseMessage = null;
  }

  uploadPdf(): void {
    // Safety check
    if (!this.selectedFile || this.pdfUploading) {
      return;
    }

    this.pdfUploading = true;
    // this.pdfUploaded = false;
    this.responseMessage = null;

    this.apiService.uploadPdf(this.selectedFile).subscribe({
      next: (response: uploadResponse) => {
        this.pdfUploading = false;
        // this.pdfUploaded = true;

        // Keep the selected file so filename can be displayed
        this.uploadedFile = this.selectedFile;

        this.responseMessage = response.message || 'PDF uploaded successfully.';
        const filePath = response.filePath || '';

        this.pdfUploadedEvent.emit({ filepath: filePath });
      },

      error: (error) => {
        this.pdfUploading = false;
        // this.pdfUploaded = false;

        // Upload failed → clear file
        this.selectedFile = null;
        this.uploadedFile = null;

        this.responseMessage = null;

        console.error('Error uploading PDF:', error);
      },
    });
  }

  removePdf(): void {
    this.selectedFile = null;
    this.uploadedFile = null;

    this.pdfUploading = false;
    // this.pdfUploaded = false;

    this.fileUploadError = false;
    this.responseMessage = null;
    this.pdfRemovedEvent.emit(true);
  }
}
