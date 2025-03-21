
// This is a helper file to provide Jest globals for tests
// In a real project, you would use Jest's actual globals

export const describe = (description: string, fn: () => void) => {
  // This would be provided by Jest in a real test environment
  console.log(`Test suite: ${description}`);
  fn();
};

export const it = (description: string, fn: () => void) => {
  // This would be provided by Jest in a real test environment
  console.log(`Test case: ${description}`);
  try {
    fn();
    console.log('  ✓ Passed');
  } catch (error) {
    console.error('  ✗ Failed:', error);
  }
};

export const expect = (actual: any) => {
  return {
    toBe: (expected: any) => {
      if (actual !== expected) {
        throw new Error(`Expected ${actual} to be ${expected}`);
      }
    },
    toEqual: (expected: any) => {
      const isEqual = JSON.stringify(actual) === JSON.stringify(expected);
      if (!isEqual) {
        throw new Error(`Expected ${JSON.stringify(actual)} to equal ${JSON.stringify(expected)}`);
      }
    },
    toBeNull: () => {
      if (actual !== null) {
        throw new Error(`Expected ${actual} to be null`);
      }
    },
    toBeTruthy: () => {
      if (!actual) {
        throw new Error(`Expected ${actual} to be truthy`);
      }
    },
    toBeFalsy: () => {
      if (actual) {
        throw new Error(`Expected ${actual} to be falsy`);
      }
    },
    toContain: (substring: string) => {
      if (typeof actual !== 'string' || !actual.includes(substring)) {
        throw new Error(`Expected "${actual}" to contain "${substring}"`);
      }
    },
    toHaveBeenCalled: () => {
      if (!actual.mock || actual.mock.calls.length === 0) {
        throw new Error('Expected function to have been called');
      }
    },
    toHaveBeenCalledWith: (...args: any[]) => {
      if (!actual.mock) {
        throw new Error('Expected function to be a mock');
      }
      const wasCalled = actual.mock.calls.some((call: any[]) => 
        JSON.stringify(call) === JSON.stringify(args)
      );
      if (!wasCalled) {
        throw new Error(`Expected function to have been called with ${JSON.stringify(args)}`);
      }
    },
    toHaveBeenCalledTimes: (times: number) => {
      if (!actual.mock || actual.mock.calls.length !== times) {
        throw new Error(`Expected function to have been called ${times} times`);
      }
    },
    toMatchObject: (expected: object) => {
      for (const key in expected) {
        if (actual[key] !== expected[key]) {
          throw new Error(`Expected object to match at ${key}`);
        }
      }
    },
  };
};

export const beforeEach = (fn: () => void) => {
  // This would be provided by Jest in a real test environment
  fn();
};

export const afterEach = (fn: () => void) => {
  // This would be provided by Jest in a real test environment
  fn();
};

export const jest = {
  fn: () => {
    const mockFn = (...args: any[]) => {
      mockFn.mock.calls.push(args);
      return mockFn.mockReturnValue;
    };
    mockFn.mock = {
      calls: [],
      instances: [],
      invocationCallOrder: [],
      results: [],
    };
    mockFn.mockReturnValue = undefined;
    mockFn.mockReturnValueOnce = (val: any) => {
      const originalReturnValue = mockFn.mockReturnValue;
      mockFn.mockReturnValue = val;
      const restoreFn = (...args: any[]) => {
        mockFn.mockReturnValue = originalReturnValue;
        return mockFn(...args);
      };
      return { ...mockFn, ...restoreFn };
    };
    mockFn.mockResolvedValue = (val: any) => {
      mockFn.mockReturnValue = Promise.resolve(val);
      return mockFn;
    };
    mockFn.mockRejectedValue = (val: any) => {
      mockFn.mockReturnValue = Promise.reject(val);
      return mockFn;
    };
    mockFn.mockImplementation = (implementation: (...args: any[]) => any) => {
      const originalMockFn = mockFn;
      const newMockFn = (...args: any[]) => {
        originalMockFn.mock.calls.push(args);
        return implementation(...args);
      };
      newMockFn.mock = originalMockFn.mock;
      Object.assign(newMockFn, originalMockFn);
      return newMockFn;
    };
    mockFn.mockClear = () => {
      mockFn.mock.calls = [];
      mockFn.mock.instances = [];
      return mockFn;
    };
    return mockFn;
  },
  clearAllMocks: () => {
    // This would clear all mocks in a real Jest environment
  },
  mock: (path: string) => {
    // This would be provided by Jest in a real test environment
    return {
      mockReturnValue: (val: any) => {},
      mockImplementation: (fn: any) => {},
    };
  },
  spyOn: (obj: any, method: string) => {
    const original = obj[method];
    const mockFn = jest.fn();
    obj[method] = mockFn;
    return {
      mockImplementation: (fn: any) => {
        obj[method] = (...args: any[]) => {
          mockFn(...args);
          return fn(...args);
        };
        return {
          mockRestore: () => {
            obj[method] = original;
          }
        };
      },
      mockReturnValue: (val: any) => {
        obj[method] = (...args: any[]) => {
          mockFn(...args);
          return val;
        };
        return {
          mockRestore: () => {
            obj[method] = original;
          }
        };
      },
      mockRestore: () => {
        obj[method] = original;
      }
    };
  }
};
