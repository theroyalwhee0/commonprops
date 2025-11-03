import { test, describe } from "vitest";
import { expect } from "chai";
import type { CommonUpcastProps } from "../src/index.ts";

describe("CommonUpcastProps", () => {
  test("should handle two types with upcast matching", () => {
    interface Cat { name: string; type: "cat"; active: true; }
    interface Dog { name: string; type: "dog"; active: false; }
    
    type Result = CommonUpcastProps<[Cat, Dog]>;
    const result: Result = {
      name: "buddy",
      type: "any string",  // 'cat' | 'dog' → string
      active: true         // true | false → boolean
    };
    
    expect(result.name).to.equal("buddy");
    expect(typeof result.type).to.equal("string");
    expect(typeof result.active).to.equal("boolean");
  });

  test("should handle three types with upcast matching", () => {
    interface Cat { name: string; type: "cat"; priority: 1; }
    interface Dog { name: string; type: "dog"; priority: 2; }
    interface Bird { name: string; type: "bird"; priority: 3; }
    
    type Result = CommonUpcastProps<[Cat, Dog, Bird]>;
    const result: Result = {
      name: "animal",
      type: "any type",    // 'cat' | 'dog' | 'bird' → string
      priority: 999        // 1 | 2 | 3 → number
    };
    
    expect(result.name).to.equal("animal");
    expect(typeof result.type).to.equal("string");
    expect(typeof result.priority).to.equal("number");
  });

  test("should handle four types with mixed literals", () => {
    interface TypeA { id: string; flag: true; count: 10; mode: "dev"; }
    interface TypeB { id: string; flag: false; count: 20; mode: "test"; }
    interface TypeC { id: string; flag: true; count: 30; mode: "prod"; }
    interface TypeD { id: string; flag: false; count: 40; mode: "staging"; }
    
    type Result = CommonUpcastProps<[TypeA, TypeB, TypeC, TypeD]>;
    const result: Result = {
      id: "test",
      flag: true,          // true | false → boolean
      count: 999,          // 10 | 20 | 30 | 40 → number
      mode: "any mode"     // 'dev' | 'test' | 'prod' | 'staging' → string
    };
    
    expect(result.id).to.equal("test");
    expect(typeof result.flag).to.equal("boolean");
    expect(typeof result.count).to.equal("number");
    expect(typeof result.mode).to.equal("string");
  });

  test("should return all properties when types are identical", () => {
    interface Config { name: string; version: 2; enabled: true; }
    
    type Result = CommonUpcastProps<[Config, Config, Config]>;
    const result: Result = {
      name: "config",
      version: 2,
      enabled: true
    };
    
    expect(result.name).to.equal("config");
    expect(result.version).to.equal(2);
    expect(result.enabled).to.equal(true);
  });

  test("should handle single type in array", () => {
    interface Service { name: string; port: 3000; ssl: true; }
    
    type Result = CommonUpcastProps<[Service]>;
    const result: Result = {
      name: "api",
      port: 3000,
      ssl: true
    };
    
    expect(result.name).to.equal("api");
    expect(result.port).to.equal(3000);
    expect(result.ssl).to.equal(true);
  });

  test("should return empty object for empty array", () => {
    type Result = CommonUpcastProps<[]>;
    const result: Result = {};
    
    expect(Object.keys(result)).to.have.length(0);
  });

  test("should use custom empty type for empty array", () => {
    type Result = CommonUpcastProps<[], { default: true }>;
    const result: Result = { default: true };
    
    expect(result.default).to.equal(true);
  });

  test("should handle mixed primitive and literal types", () => {
    interface TypeA { 
      name: string;        // primitive
      count: 5;            // literal
      active: boolean;     // primitive
    }
    interface TypeB { 
      name: string;        // primitive
      count: 10;           // literal
      active: boolean;     // primitive
    }
    
    type Result = CommonUpcastProps<[TypeA, TypeB]>;
    const result: Result = {
      name: "test",
      count: 999,          // 5 | 10 → number
      active: false
    };
    
    expect(result.name).to.equal("test");
    expect(typeof result.count).to.equal("number");
    expect(typeof result.active).to.equal("boolean");
  });

  test("should exclude non-upcastable different types", () => {
    interface TypeA { 
      name: string;
      data: { structure: "A" };
      items: string[];
    }
    interface TypeB { 
      name: string;
      data: { structure: "B" };
      items: number[];
    }
    interface TypeC {
      name: string;
      metadata: object;
      tags: boolean[];
    }
    
    type Result = CommonUpcastProps<[TypeA, TypeB, TypeC]>;
    const result: Result = {
      name: "common"
      // data excluded: different object structures
      // items excluded: string[] vs number[] vs not present
      // metadata/tags excluded: not in all types
    };
    
    expect(result.name).to.equal("common");
  });

  test("should handle complex realistic scenario", () => {
    interface DatabaseConnection { 
      host: string; 
      port: 5432; 
      ssl: true; 
      timeout: 30000;
      database: "users";
    }
    interface CacheConnection { 
      host: string; 
      port: 6379; 
      ssl: false; 
      timeout: 5000;
      database: "cache";
    }
    interface ApiConnection { 
      host: string; 
      port: 3000; 
      ssl: true; 
      timeout: 10000;
      database: "api";
    }
    
    type Result = CommonUpcastProps<[DatabaseConnection, CacheConnection, ApiConnection]>;
    const result: Result = {
      host: "localhost",
      port: 8080,          // 5432 | 6379 | 3000 → number
      ssl: true,           // true | false | true → boolean
      timeout: 15000,      // 30000 | 5000 | 10000 → number
      database: "test"     // 'users' | 'cache' | 'api' → string
    };
    
    expect(result.host).to.equal("localhost");
    expect(typeof result.port).to.equal("number");
    expect(typeof result.ssl).to.equal("boolean");
    expect(typeof result.timeout).to.equal("number");
    expect(typeof result.database).to.equal("string");
  });
});