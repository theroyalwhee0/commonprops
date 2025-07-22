import { test, describe } from "node:test";
import { expect } from "chai";
import type { IsUpcastable, } from "../src/index.ts";

describe("IsUpcastable", () => {
  test("should identify string literals", () => {
    // String literal.
    type Hello = IsUpcastable<"hello">;
    const helloChk: Hello = true;
    expect(helloChk).to.equal(true);

    // Empty string literal.
    type BlankChk = IsUpcastable<"">;
    const blankChk: BlankChk = true;
    expect(blankChk).to.equal(true);

    // String type, not a literal.
    type StringChk = IsUpcastable<string>;
    const stringChk: StringChk = false;
    expect(stringChk).to.equal(false);
  });
  test("should identify numeric literals", () => {
    // Numeric literal.
    type FortyTwo = IsUpcastable<42>;
    const fortyTwoChk: FortyTwo = true;
    expect(fortyTwoChk).to.equal(true);

    // Zero literal.
    type ZeroChk = IsUpcastable<0>;
    const zeroChk: ZeroChk = true;
    expect(zeroChk).to.equal(true);

    // Number type, not a literal.
    type NumberChk = IsUpcastable<number>;
    const numberChk: NumberChk = false;
    expect(numberChk).to.equal(false);
  });
  test("should identify boolean literals", () => {
    // True literal.
    type TrueChk = IsUpcastable<true>;
    const trueChk: TrueChk = true;
    expect(trueChk).to.equal(true);

    // False literal.
    type FalseChk = IsUpcastable<false>;
    const falseChk: FalseChk = true;
    expect(falseChk).to.equal(true);

    // Boolean type, not a literal.
    type BooleanChk = IsUpcastable<boolean>;
    const booleanChk: BooleanChk = false;
    expect(booleanChk).to.equal(false);
  });
  test("should return false for non-primitive types", () => {
    // Object type.
    type ObjectChk = IsUpcastable<{ a: 1 }>;
    const objectChk: ObjectChk = false;
    expect(objectChk).to.equal(false);

    // Array type.
    type ArrayChk = IsUpcastable<string[]>;
    const arrayChk: ArrayChk = false;
    expect(arrayChk).to.equal(false);

    // Function type.
    type FunctionChk = IsUpcastable<() => void>;
    const functionChk: FunctionChk = false;
    expect(functionChk).to.equal(false);

    // null type.
    type NullChk = IsUpcastable<null>;
    const nullChk: NullChk = false;
    expect(nullChk).to.equal(false);

    // undefined type.
    type UndefinedChk = IsUpcastable<undefined>;
    const undefinedChk: UndefinedChk = false;
    expect(undefinedChk).to.equal(false);
  });
  test("should handle union types", () => {
    // Union of string literals.
    type UnionString = IsUpcastable<"hello" | "world">;
    const unionStringChk: UnionString = true;
    expect(unionStringChk).to.equal(true);

    // Union of numeric literals.
    type UnionNumber = IsUpcastable<1 | 2 | 3>;
    const unionNumberChk: UnionNumber = true;
    expect(unionNumberChk).to.equal(true);

    // Mixed union with non-literals.
    type MixedUnion = IsUpcastable<"hello" | number>;
    const mixedUnionChk: MixedUnion = false;
    expect(mixedUnionChk).to.equal(false);
  });
});