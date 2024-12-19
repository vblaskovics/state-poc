import { describe, expect, it } from 'vitest';
import AppManager from '../../core/appManager';
import { State } from '../../types/state';
import { createMockState, createMockTerminal, MockState } from '../test.utils';
import Matrix from '../../math/matrix';

describe('StateManager', () => {
  it('should execute states sequentially until the specified state is reached', async () => {
    let am = new AppManager(createMockTerminal());
    let counter = 0;
    let mockState1: State;
    let mockState2: State;
    let mockState3: State;
    class MockState2 extends MockState {}
    class MockState3 extends MockState {}

    mockState1 = createMockState(am, {
      nextFn: () => {
        counter++;
        return Promise.resolve(mockState2);
      },
      stateClass: MockState,
    });

    mockState2 = createMockState(am, {
      nextFn: () => {
        counter++;
        return Promise.resolve(mockState3);
      },
      stateClass: MockState2,
    });

    mockState3 = createMockState(am, {
      nextFn: () => {
        counter++;
        return Promise.resolve(mockState1);
      },
      stateClass: MockState3,
    });

    am.setCurrentState(mockState1);
    await am.runUntilState(MockState3);

    expect(counter).toBe(2);
  });

  it('should throw an error if runState is called without a current state', async () => {
    let am = new AppManager(createMockTerminal());

    await expect(am.runState()).rejects.toThrowError(
      'Current state is undefined. Ensure that a valid state is set before calling runState.'
    );
  });

  it('should correctly update the store with the provided partial data', () => {
    let am = new AppManager(createMockTerminal());
    const initialStore = { m1: new Matrix([[0,0],[0,0]]) };
    const partialUpdate = { m2: new Matrix([[2,2],[2,2]]) };
    const expectedStore = { m1: new Matrix([[0,0],[0,0]]), m2: new Matrix([[2,2],[2,2]]) };
  
    am.updateStore(initialStore);
    const updatedStore = am.updateStore(partialUpdate);
  
    expect(updatedStore).toEqual(expectedStore);
    expect(am.getStore()).toEqual(expectedStore);
  });
});
