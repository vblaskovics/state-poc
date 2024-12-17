import { State, StateClass } from '../types/state';

export default class StateManager {
  private currentState: State;

  setCurrentState(state: State): void {
    this.currentState = state;
  }

  isCurrentState(stateClass: StateClass): boolean {
    return this.currentState instanceof stateClass;
  }

  async runState() {
    this.setCurrentState(await this.currentState.next());
  }
  
  async runUntilState(state: StateClass) {
    while (!this.isCurrentState(state)) {
      await this.runState();
    }
  }
}
