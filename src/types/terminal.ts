export type Terminal = {
  displayText(text: string): void;
  askQuestion(question: string): Promise<string>;
};