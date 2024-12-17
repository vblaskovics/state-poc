import StateManager from '../core/stateManager';
import Matrix from '../math/matrix';
import { State } from '../types/state';
import { Terminal } from '../types/terminal';
import { BaseState } from './_base.state';

export class Input2State extends BaseState {
  private terminal: Terminal;

  matrix1:Matrix;

  constructor(manager: StateManager, terminal: Terminal) {
    super(manager);
    this.terminal = terminal;
  }

  setMatrix1(matrix:Matrix){
    this.matrix1 = matrix;
  }
  
  async next(): Promise<State> {
    throw new Error('Method not implemented.');
  }
}
