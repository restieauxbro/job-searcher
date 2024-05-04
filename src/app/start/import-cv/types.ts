export type ProcessingState =
  | "idle"
  | "uploading"
  | "processing with ai"
  | "error"
  | "done";

export type Message = {
  id: string;
  type: "text" | "code input" | "code output";
  content: string;
};

export type StreamState = {
  state: ProcessingState;
  messages: Message[];
  documentText?: string;
};