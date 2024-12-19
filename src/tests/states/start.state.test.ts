import { describe, expect, it, vi } from 'vitest';
import AppManager from '../../core/appManager';
import { Terminal } from '../../types/terminal';
import { createMockTerminal } from '../test.utils';
import { StartState, START_STATE_INITIAL_MSG } from '../../states/start.state';
import { ReadyState } from '../../states/ready.state';

describe('StartState', () => {
  it('should write an initial message to the terminal', () => {
    const mockTerminal: Terminal = createMockTerminal();
    const spy = vi.spyOn(mockTerminal, 'displayText');
    const am = new AppManager(mockTerminal);
    const startState = new StartState(am);
    am.setCurrentState(startState);

    am.runState();

    expect(spy).toBeCalledWith(START_STATE_INITIAL_MSG);
  });

  it('should move on to Ready state on next', async () => {
    const am = new AppManager(createMockTerminal());
    am.setCurrentState(new StartState(am));

    await am.runState();

    expect(am.isCurrentState(ReadyState)).toBeTruthy();
  });
});
