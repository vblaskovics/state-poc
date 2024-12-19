import AppManager from '../core/appManager';
import { State } from '../types/state';
import { BaseState } from './_base.state';
import { EndState } from './end.state';
import { ReadyState } from './ready.state';

export const RESULT_STATE_MSG = 'Az eredmény:';

export class ResultState extends BaseState {

  constructor(manager: AppManager) {
    super(manager);
  }
  
  async next(): Promise<State> {
    const store = this.manager.getStore(); 
    if (!store.m1 || !store.m2) {
      throw new Error('Application error: Missing required matrices');
    }

    store.result = store.m1.dotProduct(store.m2);

    this.manager.getTerminal().displayText(`${RESULT_STATE_MSG}\n${store.result.toString()}`);

    return new ReadyState(this.manager);
  }
}
