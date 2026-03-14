export interface ExplainRequest {
  topic: string;
}

export interface ExplainResponse {
  explanation: string;
}

export interface ExplainError {
  error: string;
}
