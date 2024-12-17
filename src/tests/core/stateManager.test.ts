import { describe, expect, it } from 'vitest';
import StateManager from '../../core/stateManager';
import { State } from '../../types/state';
import { createMockState, MockState } from '../test.utils';

describe('StateManager', () => {
  it('should execute states sequentially until the specified state is reached', () => {
    let sm = new StateManager();
    let counter = 0;
    let mockState1: State;
    let mockState2: State;
    let mockState3: State;
    class MockState2 extends MockState {}
    class MockState3 extends MockState {}

    mockState1 = createMockState(sm, {
      nextFn: () => {
        counter++;
        return mockState2;
      },
      stateClass: MockState,
    });

    mockState2 = createMockState(sm, {
      nextFn: () => {
        counter++;
        return mockState3;
      },
      stateClass: MockState2,
    });

    mockState3 = createMockState(sm, {
      nextFn: () => {
        counter++;
        return mockState1;
      },
      stateClass: MockState3,
    });

    sm.setCurrentState(mockState1);
    sm.runUntilState(MockState3);

    expect(counter).toBe(2);
  });
});
