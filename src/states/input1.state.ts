import StateManager from '../core/stateManager';
import Matrix, { createMatrixFromText } from '../math/matrix';
import { State } from '../types/state';
import { Terminal } from '../types/terminal';
import { BaseState } from './_base.state';
import { Input2State } from './input2.state';

const INPUT1_STATE_MSG = `Add meg az első mátrix értékét!
A mátrix elemeit egyesével add meg.
Kezd az első sor elemeivel, és a soron belül az elemeket vessző karakterrel (,) válaszd el.
Az egyes sorokat pedig pontosvessző (;) karakterrel válaszd el.
Pl: 1,2,3;4,5,6`;

export class Input1State extends BaseState {
  private terminal: Terminal;
  constructor(manager: StateManager, terminal: Terminal) {
    super(manager);
    this.terminal = terminal;
  }

  async next(): Promise<State> {
    const answer = await this.terminal.askQuestion(INPUT1_STATE_MSG);
    let matrix:Matrix;

    try {
      matrix = createMatrixFromText(answer);
    } catch (_) {
      return new Input1State(this.manager, this.terminal);
    }

    const nextState = new Input2State(this.manager, this.terminal);
    nextState.setMatrix1(matrix);
    return nextState;
  }

}
