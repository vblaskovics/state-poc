import { describe, expect, it, vi } from 'vitest';
import AppManager from '../../core/appManager';
import { Terminal } from '../../types/terminal';
import { createMockTerminal } from '../test.utils';
import { ReadyState, READY_STATE_QUESTION } from '../../states/ready.state';
import { Input1State } from '../../states/input1.state';
import { EndState } from '../../states/end.state';

describe('ReadyState', () => {
  it('should ask for continue', async () => {
    const mockTerminal: Terminal = createMockTerminal();
    const spy = vi.spyOn(mockTerminal, 'askQuestion');
    const am = new AppManager(mockTerminal);
    const readyState = new ReadyState(am);
    am.setCurrentState(readyState);

    await am.runState();

    expect(spy).toBeCalledWith(READY_STATE_QUESTION);
  });

  it('should move on to Input1 state on answer "i"', async () => {
    const am = new AppManager(
      createMockTerminal({
        answer: 'i',
      })
    );
    am.setCurrentState(new ReadyState(am));

    await am.runState();

    expect(am.isCurrentState(Input1State)).toBeTruthy();
  });

  it('should move on to End state on answer "n"', async () => {
    const am = new AppManager(
      createMockTerminal({
        answer: 'n',
      })
    );
    am.setCurrentState(new ReadyState(am));

    await am.runState();

    expect(am.isCurrentState(EndState)).toBeTruthy();
  });

  it('should stay on to Ready state on an invalid answer', async () => {
    const am = new AppManager(
      createMockTerminal({
        answer: 'invalid-answer',
      })
    );
    am.setCurrentState(new ReadyState(am));

    await am.runState();

    expect(am.isCurrentState(ReadyState)).toBeTruthy();
  });
});
