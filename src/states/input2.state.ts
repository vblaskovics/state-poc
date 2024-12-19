import AppManager from '../core/appManager';
import Matrix, { createMatrixFromText } from '../math/matrix';
import { State } from '../types/state';
import { Terminal } from '../types/terminal';
import { BaseState } from './_base.state';
import { ResultState } from './result.state';

const INPUT1_STATE_MSG = `Add meg a második mátrix értékét is!\n`;

export class Input2State extends BaseState {
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
      this.manager.updateStore({ m2: matrix });
    } catch (_) {
      return new Input2State(this.manager);
    }

    const nextState = new ResultState(this.manager);
    return nextState;
  }
}
