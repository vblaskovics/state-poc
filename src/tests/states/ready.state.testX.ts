import { describe, expect, it, vi } from 'vitest';
import StateManager from '../../core/stateManager';
import { Terminal } from '../../types/terminal';
import { createMockTerminal } from '../test.utils';
import ReadyState, { READY_STATE_QUESTION } from '../../states/ready.state';

describe('ReadyState', () => {
  it('should ask for continue', () => {
    const mockTerminal: Terminal = createMockTerminal('answer', () => READY_STATE_QUESTION);
    const spy = vi.spyOn(mockTerminal, 'displayText');
    const sm = new StateManager();
    const readyState = new ReadyState(sm, mockTerminal);
    sm.setCurrentState(readyState);

    // sm.runState();

    expect(spy).toBeCalledWith(READY_STATE_QUESTION);
  });

  it('should move on to Ready state on next', () => {
    const sm = new StateManager();
    sm.setCurrentState(new ReadyState(sm, createMockTerminal()));

    // sm.runState();

    expect(sm.isCurrentState(ReadyState)).toBeTruthy();
  });
});
