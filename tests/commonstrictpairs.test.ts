import { test, describe } from "node:test";
import { expect } from "chai";
import type { CommonStrictPairs } from "../src/index.ts";

describe("CommonStrictPairs", () => {
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
    
    type Result = CommonStrictPairs<TypeA, TypeB>;
    const result: Result = {
      name: "test",
      age: 25,
      active: true
    };
    
    expect(result.name).to.equal("test");
    expect(result.age).to.equal(25);
    expect(result.active).to.equal(true);
  });

  test("should exclude properties with different literal types", () => {
    interface Cat { 
      name: string; 
      type: 'cat'; 
      active: true;
    }
    interface Dog { 
      name: string; 
      type: 'dog'; 
      active: false;
    }
    
    type Result = CommonStrictPairs<Cat, Dog>;
    const result: Result = {
      name: "buddy",
      // @ts-expect-error type becomes never due to 'cat' !== 'dog'  
      type: "should fail",
      // @ts-expect-error active becomes never due to true !== false
      active: "should fail"
    };
    
    expect(result.name).to.equal("buddy");
  });

  test("should handle partial property overlap", () => {
    interface PersonA { 
      name: string; 
      age: number;
      city: string;
    }
    interface PersonB { 
      name: string; 
      country: string;
      phone: string;
    }
    
    type Result = CommonStrictPairs<PersonA, PersonB>;
    const result: Result = {
      name: "john"
      // Only name is common
    };
    
    expect(result.name).to.equal("john");
  });

  test("should handle identical literal values", () => {
    interface ConfigA { 
      version: 1; 
      enabled: true;
      mode: 'strict';
    }
    interface ConfigB { 
      version: 1; 
      enabled: true;
      theme: 'dark';
    }
    
    type Result = CommonStrictPairs<ConfigA, ConfigB>;
    const result: Result = {
      version: 1,
      enabled: true
      // mode excluded (not in B), theme excluded (not in A)
    };
    
    expect(result.version).to.equal(1);
    expect(result.enabled).to.equal(true);
  });

  test("should handle complex nested types", () => {
    interface ComplexA { 
      user: { name: string; id: number };
      settings: { theme: 'light' };
      tags: string[];
    }
    interface ComplexB { 
      user: { name: string; id: number };
      settings: { theme: 'dark' };
      metadata: object;
    }
    
    type Result = CommonStrictPairs<ComplexA, ComplexB>;
    const result: Result = {
      user: { name: "test", id: 123 }
      // settings excluded due to different theme literals
      // tags/metadata not in both
    };
    
    expect(result.user.name).to.equal("test");
    expect(result.user.id).to.equal(123);
  });

  test("should result in empty object when no common properties", () => {
    interface TypeA { 
      propA: string;
      valueA: number;
    }
    interface TypeB { 
      propB: boolean;
      valueB: string;
    }
    
    type Result = CommonStrictPairs<TypeA, TypeB>;
    const result: Result = {};
    
    expect(Object.keys(result)).to.have.length(0);
  });
});