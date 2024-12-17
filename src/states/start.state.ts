import StateManager from '../core/stateManager';
import { State } from '../types/state';
import { Terminal } from '../types/terminal';
import { BaseState } from './_base.state';
import ReadyState from './ready.state';

export const START_STATE_INITIAL_MSG = 'MÁTRIX SZÁMÍTÓ';

export default class StartState extends BaseState {
  private terminal: Terminal;

  constructor(manager: StateManager, terminal: Terminal) {
    super(manager);
    this.terminal = terminal;
  }
  
  next(): State {
    this.terminal.displayText(START_STATE_INITIAL_MSG);
    return new ReadyState(this.manager, this.terminal);
  }
}
