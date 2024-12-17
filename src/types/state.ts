export type State = {
  next: () => State;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StateClass = new (...args: any[]) => State;
