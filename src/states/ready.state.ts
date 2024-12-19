import AppManager from '../core/appManager';
import { State } from '../types/state';
import { BaseState } from './_base.state';
import { Terminal } from '../types/terminal';
import { EndState } from './end.state';
import { Input1State } from './input1.state';

export const READY_STATE_QUESTION = 'Indulhat a mátrix szorzás? i/n\n';
export const READY_STATE_ANSWER_YES = 'i';
export const READY_STATE_ANSWER_NO = 'n';

export class ReadyState extends BaseState {
  private terminal: Terminal;
  constructor(manager: AppManager) {
    super(manager);
    this.terminal = manager.getTerminal();
  }

  async next(): Promise<State> {
    const answer: string = await this.terminal.askQuestion(READY_STATE_QUESTION);

    switch (answer) {
      case READY_STATE_ANSWER_NO:
        return new EndState(this.manager);
      case READY_STATE_ANSWER_YES:
        return new Input1State(this.manager);
      default:
        return new ReadyState(this.manager);
    }

  }
}
