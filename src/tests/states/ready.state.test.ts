import { describe, expect, it, vi } from 'vitest';
import StateManager from '../../core/stateManager';
import { Terminal } from '../../types/terminal';
import { createMockTerminal } from '../test.utils';
import ReadyState, { READY_STATE_QUESTION } from '../../states/ready.state';
import { Input1State } from '../../states/input1.state';
import { EndState } from '../../states/end.state';

describe('ReadyState', () => {
  it('should ask for continue', async () => {
    const mockTerminal: Terminal = createMockTerminal();
    const spy = vi.spyOn(mockTerminal, 'askQuestion');
    const sm = new StateManager();
    const readyState = new ReadyState(sm, mockTerminal);
    sm.setCurrentState(readyState);

    await sm.runState();

    expect(spy).toBeCalledWith(READY_STATE_QUESTION);
  });

  it('should move on to Input1 state on answer "i"', async () => {
    const sm = new StateManager();
    sm.setCurrentState(new ReadyState(sm, createMockTerminal({
      answer: 'i'
    })));

    await sm.runState();

    expect(sm.isCurrentState(Input1State)).toBeTruthy();
  });

  it('should move on to End state on answer "n"', async () => {
    const sm = new StateManager();
    sm.setCurrentState(new ReadyState(sm, createMockTerminal({
      answer: 'n'
    })));

    await sm.runState();

    expect(sm.isCurrentState(EndState)).toBeTruthy();
  });

  it('should stay on to Ready state on an invalid answer', async () => {
    const sm = new StateManager();
    sm.setCurrentState(new ReadyState(sm, createMockTerminal({
      answer: 'invalid-answer'
    })));

    await sm.runState();

    expect(sm.isCurrentState(ReadyState)).toBeTruthy();
  });
});
