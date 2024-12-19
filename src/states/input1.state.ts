import AppManager from '../core/appManager';
import Matrix, { createMatrixFromText } from '../math/matrix';
import { State } from '../types/state';
import { Terminal } from '../types/terminal';
import { BaseState } from './_base.state';
import { Input2State } from './input2.state';

const INPUT1_STATE_MSG = `Add meg az első mátrix értékét!
A mátrix elemeit egyesével add meg.
Kezd az első sor elemeivel, és a soron belül az elemeket vessző karakterrel (,) válaszd el.
Az egyes sorokat pedig pontosvessző (;) karakterrel válaszd el.
Pl: 1,2,3;4,5,6\n`;

export class Input1State extends BaseState {
  private terminal: Terminal;
  constructor(manager: AppManager) {
    super(manager);
    this.terminal = manager.getTerminal();
  }

  async next(): Promise<State> {
    const answer = await this.terminal.askQuestion(INPUT1_STATE_MSG);
    let matrix: Matrix;

    try {
      matrix = createMatrixFromText(answer);
      this.manager.updateStore({ m1: matrix });
    } catch (_) {
      return new Input1State(this.manager);
    }

    const nextState = new Input2State(this.manager);
    return nextState;
  }
}
