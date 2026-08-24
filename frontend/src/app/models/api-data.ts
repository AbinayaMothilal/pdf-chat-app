export interface uploadResponse {
  success: boolean;
  message: string;
  filePath?: string;
  fileName?: string;
  totalChunks?: number;
  error?: string;
}

export interface askResponse {
  success: boolean;
  message: string;
  question?: string;
  answer?: string;
  error?: string;
  filePath?: string;
}
