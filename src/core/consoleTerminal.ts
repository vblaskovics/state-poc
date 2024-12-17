import readlinePromises, { Interface } from 'readline/promises';
import { Terminal } from '../types/terminal';

export class ConsoleTerminal implements Terminal {
  private reader: Pick<Interface, 'question'>;

  /**
   * Represents a terminal interface for reading input from the user.
   * Initializes the reader with process.stdin and process.stdout,
   * or uses the provided reader if specified.
   * 
   * @param reader - An optional custom reader interface with the `question` method.
   */
  constructor(reader?: Pick<Interface, 'question'>) {
    this.reader =
      reader ??
      readlinePromises.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
  }

  displayText(text: string) {
    console.log(text);
  }

  async askQuestion(question: string): Promise<string> {
    return this.reader.question(question);
  }
}
