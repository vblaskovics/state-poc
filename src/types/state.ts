export type State = {
  next: () => Promise<State>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StateClass = new (...args: any[]) => State;
