import { describe, expect, it } from 'vitest';
import AppManager from '../../core/appManager';
import { Terminal } from '../../types/terminal';
import { createMockTerminal } from '../test.utils';
import { Input1State } from '../../states/input1.state';
import { Input2State } from '../../states/input2.state';
import Matrix from '../../math/matrix';

describe('Input1State', () => {
  it('should move to Input2 state after read a valid input text (a matrix)', async () => {
    const mockTerminal: Terminal = createMockTerminal({
      answer: '1,2;3,4'
    });
    const am = new AppManager(mockTerminal);
    const state = new Input1State(am);
    am.setCurrentState(state);

    await am.runState();

    expect(am.isCurrentState(Input2State)).toBeTruthy();
  });
  
  it('should repeat Input1 state when read an invalid input text', async () => {
    const mockTerminal: Terminal = createMockTerminal({
      answer: '1,2;a,b'
    });
    const am = new AppManager(mockTerminal);
    const state = new Input1State(am);
    am.setCurrentState(state);

    await am.runState();

    expect(am.isCurrentState(Input1State)).toBeTruthy();
  });

  it('should update the store with the new matrix', async () => {
    const mockTerminal: Terminal = createMockTerminal({
      answer: '1,2;3,4'
    });
    const am = new AppManager(mockTerminal);
    const state = new Input1State(am);
    am.setCurrentState(state);

    await am.runState();

    const storedMatrix = am.getStore().m1;
    expect(storedMatrix).toBeInstanceOf(Matrix);
    expect(storedMatrix?.values[0][0]).toBe(1);
    expect(storedMatrix?.values[1][1]).toBe(4);

  });


});
