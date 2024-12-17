import { describe } from 'node:test';
import { expect, it, vi } from 'vitest';
import { ConsoleTerminal } from '../../core/consoleTerminal';

let terminal: ConsoleTerminal;

describe('Terminal', () => {
  terminal = new ConsoleTerminal();

  it('should be able to write a message to the console', () => {
    terminal = new ConsoleTerminal();
    const spy = vi.spyOn(console, 'log');

    terminal.displayText('hello');

    expect(spy).toHaveBeenCalledWith('hello');
  });

  it('should ask a question to the user and wait for their answer', async () => {
    const mockReader = {
      question: async (_: string) => {
        return Promise.resolve('test-answer');
      },
    };
    terminal = new ConsoleTerminal(mockReader);

    const answer = await terminal.askQuestion('test-question');

    expect(answer).toBe('test-answer');
  });

});
