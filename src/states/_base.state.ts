import StateManager from '../core/stateManager';
import { State } from '../types/state';

export abstract class BaseState implements State {
  protected manager: StateManager;
  constructor(manager: StateManager) {
    this.manager = manager;
  }
  abstract next(): State;
}
