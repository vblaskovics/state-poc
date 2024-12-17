import { State, StateClass } from '../types/state';

export default class StateManager {
  private currentState: State;

  setCurrentState(state: State): void {
    this.currentState = state;
  }

  isCurrentState(stateClass: StateClass): boolean {
    return this.currentState instanceof stateClass;
  }

  runState() {
    this.setCurrentState(this.currentState.next());
  }
  
  runUntilState(state: StateClass) {
    while (!this.isCurrentState(state)) {
      this.runState();
    }
  }
}
