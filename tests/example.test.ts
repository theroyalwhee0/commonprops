import { test, describe } from 'node:test';
import { expect } from 'chai';
import type { CommonStrictProps, CommonUpcastProps } from '../src/index.ts';

describe('CommonProps Type Tests', () => {
  test('should compile TypeScript types correctly', () => {
    interface A {
      name: string;
      age: number;
      active: true;
    }

    interface B {
      name: string;
      age: number;
      active: false;
    }

    type StrictResult = CommonStrictProps<[A, B]>;
    type UpcastResult = CommonUpcastProps<[A, B]>;

    const strictTest: StrictResult = {
      name: 'test',
      age: 25,
    };

    const upcastTest: UpcastResult = {
      name: 'test',
      age: 25,
      active: true,
    };

    expect(strictTest.name).to.equal('test');
    expect(upcastTest.active).to.be.a('boolean');
  });

  test('should handle empty arrays', () => {
    type EmptyResult = CommonStrictProps<[]>;
    const emptyResult: EmptyResult = {};
    expect(emptyResult).to.be.an('object');
  });
});