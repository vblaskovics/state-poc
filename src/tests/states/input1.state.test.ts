import { describe, expect, it } from 'vitest';
import StateManager from '../../core/stateManager';
import { Terminal } from '../../types/terminal';
import { createMockTerminal } from '../test.utils';
import { Input1State } from '../../states/input1.state';
import { Input2State } from '../../states/input2.state';

describe('Input1State', () => {
  it('should move to Input2 state after read a valid input text (a matrix)', async () => {
    const mockTerminal: Terminal = createMockTerminal({
      answer: '1,2;3,4'
    });
    const sm = new StateManager();
    const state = new Input1State(sm, mockTerminal);
    sm.setCurrentState(state);

    await sm.runState();

    expect(sm.isCurrentState(Input2State)).toBeTruthy();
  });
  
  it('should repeat Input1 state when read an invalid input text', async () => {
    const mockTerminal: Terminal = createMockTerminal({
      answer: '1,2;a,b'
    });
    const sm = new StateManager();
    const state = new Input1State(sm, mockTerminal);
    sm.setCurrentState(state);

    await sm.runState();

    expect(sm.isCurrentState(Input1State)).toBeTruthy();
  });


});
