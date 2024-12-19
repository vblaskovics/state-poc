import { describe, expect, it, vi } from 'vitest';
import AppManager from '../../core/appManager';
import { Terminal } from '../../types/terminal';
import { createMockMatrix, createMockTerminal } from '../test.utils';
import { ResultState } from '../../states/result.state';
import { EndState } from '../../states/end.state';

describe('ResultState', () => {
  it('should calc the result of the dot product', async () => {
    const mockTerminal: Terminal = createMockTerminal();
    const am = new AppManager(mockTerminal);
    const state = new ResultState(am);
    am.setCurrentState(state);
    const m1 = createMockMatrix();
    const spy = vi.spyOn(m1, 'dotProduct');
    am.updateStore({ m1, m2: createMockMatrix() });

    await am.runState();

    expect(spy).toHaveBeenCalled();
  });

  it('should display the result of the dot product', async () => {
    const mockTerminal: Terminal = createMockTerminal();
    const spy = vi.spyOn(mockTerminal, 'displayText');
    const am = new AppManager(mockTerminal);
    const state = new ResultState(am);
    am.setCurrentState(state);

    am.updateStore({ m1: createMockMatrix(), m2: createMockMatrix() });

    await am.runState();

    expect(spy).toHaveBeenCalledWith('Az eredmény:\n0,0\n0,0');
  });

  it('should move on to End state on next', async () => {
    const am = new AppManager(createMockTerminal());
    am.setCurrentState(new ResultState(am));
    am.updateStore({ m1: createMockMatrix(), m2: createMockMatrix() });
    
    await am.runState();

    expect(am.isCurrentState(EndState)).toBeTruthy();
  });
});
