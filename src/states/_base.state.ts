import AppManager from '../core/appManager';
import { State } from '../types/state';

export abstract class BaseState implements State {
  protected manager: AppManager;
  constructor(manager: AppManager) {
    this.manager = manager;
  }
  abstract next(): Promise<State>;
}
