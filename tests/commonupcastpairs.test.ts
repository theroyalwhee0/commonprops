import { test, describe } from "node:test";
import { expect } from "chai";
import type { CommonUpcastPairs } from "../src/index.ts";

describe("CommonUpcastPairs", () => {
  test("should find exact type matches", () => {
    interface TypeA { 
      name: string; 
      age: number; 
      active: boolean;
    }
    interface TypeB { 
      name: string; 
      age: number; 
      active: boolean;
    }
    
    type Result = CommonUpcastPairs<TypeA, TypeB>;
    const result: Result = {
      name: "test",
      age: 25,
      active: true
    };
    
    expect(result.name).to.equal("test");
    expect(result.age).to.equal(25);
    expect(result.active).to.equal(true);
  });

  test("should upcast string literals to string", () => {
    interface Cat { 
      name: string; 
      type: 'cat'; 
      sound: 'meow';
    }
    interface Dog { 
      name: string; 
      type: 'dog'; 
      sound: 'bark';
    }
    
    type Result = CommonUpcastPairs<Cat, Dog>;
    const result: Result = {
      name: "buddy",
      type: "any string", // 'cat' | 'dog' → string
      sound: "any sound" // 'meow' | 'bark' → string
    };
    
    expect(result.name).to.equal("buddy");
    expect(typeof result.type).to.equal("string");
    expect(typeof result.sound).to.equal("string");
  });

  test("should upcast number literals to number", () => {
    interface ItemA { 
      id: string;
      priority: 1;
      version: 2;
    }
    interface ItemB { 
      id: string;
      priority: 3;
      version: 4;
    }
    
    type Result = CommonUpcastPairs<ItemA, ItemB>;
    const result: Result = {
      id: "test",
      priority: 999, // 1 | 3 → number
      version: 888  // 2 | 4 → number
    };
    
    expect(result.id).to.equal("test");
    expect(typeof result.priority).to.equal("number");
    expect(typeof result.version).to.equal("number");
  });

  test("should upcast boolean literals to boolean", () => {
    interface StateA { 
      name: string;
      enabled: true;
      visible: false;
    }
    interface StateB { 
      name: string;
      enabled: false;
      visible: true;
    }
    
    type Result = CommonUpcastPairs<StateA, StateB>;
    const result: Result = {
      name: "test",
      enabled: false, // true | false → boolean
      visible: true   // false | true → boolean
    };
    
    expect(result.name).to.equal("test");
    expect(typeof result.enabled).to.equal("boolean");
    expect(typeof result.visible).to.equal("boolean");
  });

  test("should handle mixed primitive types", () => {
    interface ConfigA { 
      name: string;
      count: 10;
      active: true;
      mode: 'dev';
    }
    interface ConfigB { 
      name: string;
      count: 20;
      active: false;
      mode: 'prod';
    }
    
    type Result = CommonUpcastPairs<ConfigA, ConfigB>;
    const result: Result = {
      name: "config",
      count: 100,    // 10 | 20 → number
      active: true,  // true | false → boolean
      mode: "test"   // 'dev' | 'prod' → string
    };
    
    expect(result.name).to.equal("config");
    expect(typeof result.count).to.equal("number");
    expect(typeof result.active).to.equal("boolean");
    expect(typeof result.mode).to.equal("string");
  });

  test("should exclude non-upcastable mismatched types", () => {
    interface TypeA { 
      name: string;
      data: { type: 'object' };
      list: string[];
    }
    interface TypeB { 
      name: string;
      data: { type: 'different' };
      list: number[];
    }
    
    type Result = CommonUpcastPairs<TypeA, TypeB>;
    const result: Result = {
      name: "test"
      // data excluded: different object structures
      // list excluded: string[] vs number[] - not upcastable
    };
    
    expect(result.name).to.equal("test");
  });

  test("should handle primitive base types with literals", () => {
    interface TypeA { 
      name: string;        // primitive
      status: 'active';    // literal
      count: number;       // primitive
    }
    interface TypeB { 
      name: string;        // primitive
      status: 'inactive';  // literal
      count: 5;            // literal
    }
    
    type Result = CommonUpcastPairs<TypeA, TypeB>;
    const result: Result = {
      name: "test",
      status: "any status", // string + 'inactive' → string
      count: 999           // number + 5 → number
    };
    
    expect(result.name).to.equal("test");
    expect(typeof result.status).to.equal("string");
    expect(typeof result.count).to.equal("number");
  });
});