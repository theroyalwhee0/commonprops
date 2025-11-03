import { test, describe } from "vitest";
import { expect } from "chai";
import type { GetUpcastable } from "../src/index.ts";

describe("GetUpcastable", () => {
  test("should return primitive types for string types", () => {
    // String literal should return string.
    type Hello = GetUpcastable<"hello">;
    const helloChk: Hello = "any string";
    expect(typeof helloChk).to.equal("string");

    // Empty string literal should return string.
    type Empty = GetUpcastable<"">;
    const emptyChk: Empty = "any string";
    expect(typeof emptyChk).to.equal("string");

    // String type should return string.
    type StringType = GetUpcastable<string>;
    const stringChk: StringType = "any string";
    expect(typeof stringChk).to.equal("string");
  });

  test("should return primitive types for number types", () => {
    // Numeric literal should return number.
    type FortyTwo = GetUpcastable<42>;
    const fortyTwoChk: FortyTwo = 123;
    expect(typeof fortyTwoChk).to.equal("number");

    // Zero literal should return number.
    type Zero = GetUpcastable<0>;
    const zeroChk: Zero = 456;
    expect(typeof zeroChk).to.equal("number");

    // Number type should return number.
    type NumberType = GetUpcastable<number>;
    const numberChk: NumberType = 789;
    expect(typeof numberChk).to.equal("number");
  });

  test("should return primitive types for boolean types", () => {
    // True literal should return boolean.
    type TrueType = GetUpcastable<true>;
    const trueChk: TrueType = false; // Can assign any boolean
    expect(typeof trueChk).to.equal("boolean");

    // False literal should return boolean.
    type FalseType = GetUpcastable<false>;
    const falseChk: FalseType = true; // Can assign any boolean
    expect(typeof falseChk).to.equal("boolean");

    // Boolean type should return boolean.
    type BooleanType = GetUpcastable<boolean>;
    const booleanChk: BooleanType = true;
    expect(typeof booleanChk).to.equal("boolean");
  });

  test("should return never for non-primitive types", () => {
    // Object type should return never - can't assign anything.
    type ObjectType = GetUpcastable<{ a: 1 }>;
    // @ts-expect-error Cannot assign to never type
    const objectTest: ObjectType = "anything";
    expect(objectTest).to.equal("anything");

    // Array type should return never.
    type ArrayType = GetUpcastable<string[]>;
    // @ts-expect-error Cannot assign to never type
    const arrayTest: ArrayType = [];
    expect(arrayTest).to.deep.equal([]);

    // Function type should return never.
    type FunctionType = GetUpcastable<() => void>;
    // @ts-expect-error Cannot assign to never type
    const functionTest: FunctionType = (): void => { return; };
    expect(typeof functionTest).to.equal("function");

    // null type should return never.
    type NullType = GetUpcastable<null>;
    // @ts-expect-error Cannot assign to never type
    const nullTest: NullType = null;
    void expect(nullTest).to.be.null;

    // undefined type should return never.
    type UndefinedType = GetUpcastable<undefined>;
    // @ts-expect-error Cannot assign to never type
    const undefinedTest: UndefinedType = undefined;
    void expect(undefinedTest).to.be.undefined;
  });

  test("should handle union types", () => {
    // Union of string literals should return string.
    type UnionString = GetUpcastable<"hello" | "world">;
    const unionStringChk: UnionString = "any string";
    expect(typeof unionStringChk).to.equal("string");

    // Union of numeric literals should return number.
    type UnionNumber = GetUpcastable<1 | 2 | 3>;
    const unionNumberChk: UnionNumber = 999;
    expect(typeof unionNumberChk).to.equal("number");

    // Union of boolean literals should return boolean.
    type UnionBoolean = GetUpcastable<true | false>;
    const unionBooleanChk: UnionBoolean = false;
    expect(typeof unionBooleanChk).to.equal("boolean");
  });
});