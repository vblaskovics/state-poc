import { describe, expect, it } from 'vitest';
import AppManager from '../../core/appManager';
import { Terminal } from '../../types/terminal';
import { createMockTerminal } from '../test.utils';
import { Input2State } from '../../states/input2.state';
import Matrix from '../../math/matrix';
import { ResultState } from '../../states/result.state';

describe('Input2State', () => {
  it('should move to Result state after read a valid input text (a matrix)', async () => {
    const mockTerminal: Terminal = createMockTerminal({
      answer: '1,2;3,4'
    });
    const am = new AppManager(mockTerminal);
    const state = new Input2State(am);
    am.setCurrentState(state);

    await am.runState();

    expect(am.isCurrentState(ResultState)).toBeTruthy();
  });
  
  it('should repeat Input2 state when read an invalid input text', async () => {
    const mockTerminal: Terminal = createMockTerminal({
      answer: '1,2;a,b'
    });
    const am = new AppManager(mockTerminal);
    const state = new Input2State(am);
    am.setCurrentState(state);

    await am.runState();

    expect(am.isCurrentState(Input2State)).toBeTruthy();
  });

  it('should update the store with the new matrix', async () => {
    const mockTerminal: Terminal = createMockTerminal({
      answer: '1,2;3,4'
    });
    const am = new AppManager(mockTerminal);
    const state = new Input2State(am);
    am.setCurrentState(state);

    await am.runState();

    const storedMatrix = am.getStore().m2;
    expect(storedMatrix).toBeInstanceOf(Matrix);
    expect(storedMatrix?.values[0][0]).toBe(1);
    expect(storedMatrix?.values[1][1]).toBe(4);

  });


});
