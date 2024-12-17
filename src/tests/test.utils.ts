import StateManager from '../core/stateManager';
import { BaseState } from '../states/_base.state';
import { State, StateClass } from '../types/state';
import { Terminal } from '../types/terminal';

export class MockState extends BaseState {
  do(): void {}
  next(): State {
    return this;
  }
}

type createMockStateOptions = {
  nextFn?: () => State;
  doFn?: State['do'];
  stateClass?: StateClass;
};

export function createMockState(sm: StateManager, options?: createMockStateOptions): State {
  const mockState = options?.stateClass ? new options.stateClass(sm) : new MockState(sm);
  mockState.do = options?.doFn || mockState.do;
  mockState.next = options?.nextFn || mockState.next;
  return mockState;
}

export function createMockTerminal(answer: string = '', displayTextFn: Terminal['displayText'] = () => {}): Terminal {
  return {
    askQuestion: (_: string) => {
      return Promise.resolve(answer);
    },
    displayText: displayTextFn,
  };
}
