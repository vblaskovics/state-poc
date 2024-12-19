import { State, StateClass } from './state';
import { Store } from './store';
import { Terminal } from './terminal';

export type Manager = {
  getStore: () => Store;
  updateStore: (s:Partial<Store>) => Store;
  setCurrentState: (state: State) => void;
  isCurrentState: (stateClass: StateClass) => boolean;
  runState: () => Promise<void>;
  runUntilState: (stateClass: StateClass) => Promise<void>;
  getTerminal: () => Terminal;
};
