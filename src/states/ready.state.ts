import StateManager from '../core/stateManager';
import { State } from '../types/state';
import { BaseState } from './_base.state';
import { Terminal } from '../types/terminal';
import { EndState } from './end.state';
import { Input1State } from './input1.state';

export const READY_STATE_QUESTION = 'Indulhat a mátrix szorzás?';
export const READY_STATE_ANSWER_YES = 'i';
export const READY_STATE_ANSWER_NO = 'n';

export default class ReadyState extends BaseState {
  private terminal: Terminal;
  constructor(manager: StateManager, terminal: Terminal) {
    super(manager);
    this.terminal = terminal;
  }

  async next(): Promise<State> {
    const answer: string = await this.terminal.askQuestion(READY_STATE_QUESTION);

    switch (answer) {
      case READY_STATE_ANSWER_NO:
        return new EndState(this.manager);
      case READY_STATE_ANSWER_YES:
        return new Input1State(this.manager, this.terminal);
      default:
        return new ReadyState(this.manager, this.terminal);
    }

  }
}
