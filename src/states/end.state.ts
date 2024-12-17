import { State } from "../types/state";
import { BaseState } from "./_base.state";

export class EndState extends BaseState {
  next(): Promise<State> {
    throw new Error("Method not implemented.");
  }

}