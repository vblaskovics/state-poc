import AppManager from '../core/appManager';
import Matrix from '../math/matrix';
import { BaseState } from '../states/_base.state';
import { State, StateClass } from '../types/state';
import { Terminal } from '../types/terminal';

export class MockState extends BaseState {
  do(): void {}
  next(): Promise<State> {
    return Promise.resolve(this);
  }
}

type createMockStateOptions = {
  nextFn?: () => Promise<State>;
  stateClass?: StateClass;
};

export function createMockState(sm: AppManager, options?: createMockStateOptions): State {
  const mockState = options?.stateClass ? new options.stateClass(sm) : new MockState(sm);
  mockState.next = options?.nextFn || mockState.next;
  return mockState;
}

type createMockTerminalOptions = {
  answer?: string;
  displayTextFn?: Terminal['displayText'];
};
export function createMockTerminal(options?: createMockTerminalOptions): Terminal {
  const answer = options?.answer ?? 'mock-answer';
  const displayTextFn = options?.displayTextFn ?? (() => {});
  return {
    askQuestion: (_: string) => {
      return Promise.resolve(answer);
    },
    displayText: displayTextFn,
  };
}

export function createMockMatrix(): Matrix {
  return new Matrix([
    [0, 0],
    [0, 0],
  ]);
}
