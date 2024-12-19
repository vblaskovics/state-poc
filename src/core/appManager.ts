import { Manager } from '../types/manager';
import { State, StateClass } from '../types/state';
import { Store } from '../types/store';
import { Terminal } from '../types/terminal';

export default class AppManager implements Manager {
  private currentState?: State;
  private terminal: Terminal;
  private store: Store = {};

  constructor(terminal: Terminal) {
    this.terminal = terminal;
  }

  getStore(): Store {
    return this.store;
  }

  updateStore(s: Partial<Store>): Store {
    this.store = {
      ...this.store,
      ...s,
    };
    return this.store;
  }

  getTerminal(): Terminal {
    return this.terminal;
  }

  setCurrentState(state: State): void {
    this.currentState = state;
  }

  isCurrentState(stateClass: StateClass): boolean {
    return this.currentState instanceof stateClass;
  }

  async runState() {
    if (!this.currentState) {
      throw new Error('Current state is undefined. Ensure that a valid state is set before calling runState.');
    }
    this.setCurrentState(await this.currentState.next());
  }

  async runUntilState(state: StateClass) {
    while (!this.isCurrentState(state)) {
      await this.runState();
    }
  }
}
