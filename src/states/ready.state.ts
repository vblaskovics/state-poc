import StateManager from '../core/stateManager';
import { State } from '../types/state';
import { BaseState } from './_base.state';
import { Terminal } from '../types/terminal';

export const READY_STATE_QUESTION = 'Átlagszámításhoz meg kell adnod egy számsort. Folytatod?';

export default class ReadyState extends BaseState {
  private terminal: Terminal;
  constructor(manager: StateManager, terminal: Terminal) {
    super(manager);
    this.terminal = terminal;
  }

  do(): void {}

  next(): State {
    return this;
  }
}
