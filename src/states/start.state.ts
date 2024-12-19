import AppManager from '../core/appManager';
import { State } from '../types/state';
import { Terminal } from '../types/terminal';
import { BaseState } from './_base.state';
import { ReadyState } from './ready.state';

export const START_STATE_INITIAL_MSG = 'MÁTRIX SZORZÓ';

export class StartState extends BaseState {
  private terminal: Terminal;

  constructor(manager: AppManager) {
    super(manager);
    this.terminal = manager.getTerminal();
  }
  
  async next(): Promise<State> {
    this.terminal.displayText(START_STATE_INITIAL_MSG);
    return new ReadyState(this.manager);
  }
}
