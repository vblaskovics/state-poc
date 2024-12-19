import AppManager from "../core/appManager";
import { State } from "../types/state";
import { BaseState } from "./_base.state";

export class EndState extends BaseState {
  
    constructor(manager: AppManager) {
      super(manager);
    }
    
    async next(): Promise<State> {
      throw new Error('Application error: end state reached');
    }
}