import { test, describe } from "node:test";
import { expect } from "chai";
import type { CommonStrictProps } from "../src/index.ts";

describe("CommonStrictProps", () => {
  test("should handle two types with strict matching", () => {
    interface Cat { name: string; type: 'cat'; }
    interface Dog { name: string; type: 'dog'; }
    
    type Result = CommonStrictProps<[Cat, Dog]>;
    const result: Result = {
      name: "buddy"
      // type excluded due to 'cat' !== 'dog'
    };
    
    expect(result.name).to.equal("buddy");
  });

  test("should handle three types with strict matching", () => {
    interface Cat { name: string; type: 'cat'; legs: 4; }
    interface Dog { name: string; type: 'dog'; legs: 4; }
    interface Bird { name: string; type: 'bird'; legs: 2; }
    
    type Result = CommonStrictProps<[Cat, Dog, Bird]>;
    const result: Result = {
      name: "animal"
      // type excluded: 'cat' !== 'dog' !== 'bird'
      // legs excluded: 4 !== 2
    };
    
    expect(result.name).to.equal("animal");
  });

  test("should handle four types with strict matching", () => {
    interface TypeA { id: string; priority: 1; active: true; }
    interface TypeB { id: string; priority: 1; active: false; }
    interface TypeC { id: string; priority: 2; active: true; }
    interface TypeD { id: string; priority: 1; active: true; }
    
    type Result = CommonStrictProps<[TypeA, TypeB, TypeC, TypeD]>;
    const result: Result = {
      id: "test"
      // priority excluded: not all have same value
      // active excluded: not all have same value
    };
    
    expect(result.id).to.equal("test");
  });

  test("should return all properties when types are identical", () => {
    interface User { name: string; age: number; active: true; }
    
    type Result = CommonStrictProps<[User, User, User]>;
    const result: Result = {
      name: "john",
      age: 30,
      active: true
    };
    
    expect(result.name).to.equal("john");
    expect(result.age).to.equal(30);
    expect(result.active).to.equal(true);
  });

  test("should handle single type in array", () => {
    interface Person { name: string; age: number; city: string; }
    
    type Result = CommonStrictProps<[Person]>;
    const result: Result = {
      name: "alice",
      age: 25,
      city: "nyc"
    };
    
    expect(result.name).to.equal("alice");
    expect(result.age).to.equal(25);
    expect(result.city).to.equal("nyc");
  });

  test("should return empty object for empty array", () => {
    type Result = CommonStrictProps<[]>;
    const result: Result = {};
    
    expect(Object.keys(result)).to.have.length(0);
  });

  test("should use custom empty type for empty array", () => {
    type Result = CommonStrictProps<[], null>;
    const result: Result = null;
    
    expect(result).to.be.null;
  });

  test("should handle complex nested structures", () => {
    interface ServiceA { 
      name: string; 
      config: { port: 3000; ssl: true };
      metadata: { version: '1.0' };
    }
    interface ServiceB { 
      name: string; 
      config: { port: 8080; ssl: true };
      metadata: { version: '2.0' };
    }
    interface ServiceC { 
      name: string; 
      config: { port: 3000; ssl: false };
      tags: string[];
    }
    
    type Result = CommonStrictProps<[ServiceA, ServiceB, ServiceC]>;
    const result: Result = {
      name: "service"
      // config excluded: different port/ssl values
      // metadata excluded: not in ServiceC
      // tags excluded: not in ServiceA/ServiceB
    };
    
    expect(result.name).to.equal("service");
  });

  test("should handle no common properties", () => {
    interface TypeA { propA: string; valueA: 1; }
    interface TypeB { propB: number; valueB: 2; }
    interface TypeC { propC: boolean; valueC: 3; }
    
    type Result = CommonStrictProps<[TypeA, TypeB, TypeC]>;
    const result: Result = {};
    
    expect(Object.keys(result)).to.have.length(0);
  });
});