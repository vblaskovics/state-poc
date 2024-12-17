import { describe, expect, it, vi } from 'vitest';
import StateManager from '../../core/stateManager';
import { Terminal } from '../../types/terminal';
import { createMockTerminal } from '../test.utils';
import StartState, { START_STATE_INITIAL_MSG } from '../../states/start.state';
import ReadyState from '../../states/ready.state';

describe('StartState', () => {
  it('should write an initial message to the terminal', () => {
    const mockTerminal: Terminal = createMockTerminal('answer', () => START_STATE_INITIAL_MSG);
    const spy = vi.spyOn(mockTerminal, 'displayText');
    const sm = new StateManager();
    const startState = new StartState(sm, mockTerminal);
    sm.setCurrentState(startState);

    sm.runState();

    expect(spy).toBeCalledWith(START_STATE_INITIAL_MSG);
  });

  it('should move on to Ready state on next', () => {
    const sm = new StateManager();
    sm.setCurrentState(new StartState(sm, createMockTerminal()));

    sm.runState();

    expect(sm.isCurrentState(ReadyState)).toBeTruthy();
  });
});
