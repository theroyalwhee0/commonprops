/**
 * TypeScript utility types for extracting common properties from multiple types.
 * 
 * This module provides two main approaches to finding common properties:
 * - **Strict mode**: Properties must have exactly matching types
 * - **Upcast mode**: Primitive literals can be upcast to their base types (e.g., 'hello' → string)
 * 
 * @example
 * ```typescript
 * interface Cat { name: string; type: 'cat'; active: true; }
 * interface Dog { name: string; type: 'dog'; active: false; }
 * 
 * // Strict: only exact matches
 * type StrictCommon = CommonStrictProps<[Cat, Dog]>; // { name: string }
 * 
 * // Upcast: literals become primitives  
 * type UpcastCommon = CommonUpcastProps<[Cat, Dog]>; // { name: string; type: string; active: boolean }
 * ```
 * 
 * @author Adam Mill <hismajesty@theroyalwhee.com>
 * @license Apache-2.0
 */

/**
 * Determines if a type can be upcast to its primitive base type.
 * 
 * Returns `true` for literal types (e.g., `'hello'`, `42`, `true`) that can be 
 * upcast to their primitive base (`string`, `number`, `boolean`).
 * Returns `false` for primitive base types and non-primitive types.
 * 
 * Uses non-distributive conditionals to handle union types correctly.
 * 
 * @template T The type to check
 * @returns `true` if the type is a primitive literal, `false` otherwise
 * 
 * @example
 * ```typescript
 * type A = IsUpcastable<'hello'>;   // true
 * type B = IsUpcastable<string>;    // false  
 * type C = IsUpcastable<42>;        // true
 * type D = IsUpcastable<number>;    // false
 * type E = IsUpcastable<boolean>;   // false
 * ```
 */
export type IsUpcastable<T> =
    [T] extends [string] ? (string extends T ? false : true) :
    [T] extends [number] ? (number extends T ? false : true) :
    [T] extends [boolean] ? (
        true extends T ? (
            false extends T ? false : true
        ) : true
    ) :
    false

/**
 * Gets the primitive base type for a given type.
 * 
 * Returns the primitive type that a literal can be upcast to.
 * Returns `never` for non-primitive types.
 * 
 * @template T The type to get the primitive for
 * @returns The primitive base type or `never`
 * 
 * @example
 * ```typescript
 * type A = GetUpcastable<'hello'>;  // string
 * type B = GetUpcastable<42>;       // number
 * type C = GetUpcastable<true>;     // boolean
 * type D = GetUpcastable<object>;   // never
 * ```
 */
export type GetUpcastable<T> =
    T extends string ? string :
    T extends number ? number :
    T extends boolean ? boolean :
    never

/**
 * Finds common properties between two types using strict type matching.
 * 
 * Properties are included only if their types are exactly identical.
 * Properties with incompatible types are completely excluded from the result
 * (not included with `never` type). Uses key remapping to filter properties
 * at the type level.
 * 
 * @template T First type
 * @template U Second type
 * @returns Object type with only properties that have exactly matching types
 * 
 * @example
 * ```typescript
 * interface A { name: string; type: 'cat'; active: true; }
 * interface B { name: string; type: 'dog'; active: false; }
 * 
 * type Result = CommonStrictPairs<A, B>; // { name: string }
 * // 'type' excluded: 'cat' !== 'dog'
 * // 'active' excluded: true !== false
 * // Only properties with identical types are included
 * ```
 */
export type CommonStrictPairs<T, U> = {
    [K in keyof T & keyof U as T[K] extends U[K]
        ? U[K] extends T[K]
        ? K
        : never
        : never]: T[K] extends U[K]
    ? T[K]
    : U[K] extends T[K]
    ? U[K]
    : never
}

/**
 * Finds common properties between two types with primitive literal upcasting.
 * 
 * Properties are included if:
 * 1. Types are exactly identical, or
 * 2. One type is more general than the other (e.g., `string` vs `'literal'`), or
 * 3. Both are primitive literals that can be upcast to the same base type
 * 
 * **Type Selection Priority**: When types can be unified, the more general type
 * is chosen to ensure maximum compatibility (e.g., `string` over `'cat'`).
 * This maintains upcasting behavior in recursive scenarios.
 * 
 * @template T First type
 * @template U Second type
 * @returns Object type with common properties, preferring general types when possible
 * 
 * @example
 * ```typescript
 * interface A { name: string; type: 'cat'; active: true; }
 * interface B { name: string; type: 'dog'; active: false; }
 * 
 * type Result = CommonUpcastPairs<A, B>;
 * // { name: string; type: string; active: boolean }
 * // 'type': 'cat' | 'dog' → string (upcast to common base)
 * // 'active': true | false → boolean (upcast to common base)
 * 
 * // Type priority example:
 * type Mixed = CommonUpcastPairs<{prop: string}, {prop: 'literal'}>;
 * // Result: {prop: string} - chooses more general type
 * ```
 */
export type CommonUpcastPairs<T, U> = {
    [K in keyof T & keyof U as 
        T[K] extends U[K]
        ? U[K] extends T[K]
        ? K  // Exact match
        : K  // T is more specific than U, include
        : U[K] extends T[K]
        ? K  // U is more specific than T, include  
        : IsUpcastable<T[K]> extends true
        ? IsUpcastable<U[K]> extends true
        ? GetUpcastable<T[K]> extends GetUpcastable<U[K]>
        ? K
        : never
        : never
        : never]:
    T[K] extends U[K]
    ? U[K] extends T[K]
    ? T[K]  // Exact match, use either (they're the same)
    : U[K]  // T is more specific, use the more general U
    : U[K] extends T[K]
    ? T[K]  // U is more specific, use the more general T
    : IsUpcastable<T[K]> extends true
    ? IsUpcastable<U[K]> extends true
    ? GetUpcastable<T[K]> extends GetUpcastable<U[K]>
    ? GetUpcastable<T[K]>
    : never
    : never
    : never
}

/**
 * Finds common properties across multiple types using strict type matching.
 * 
 * Recursively processes an array of types, applying strict matching rules.
 * Properties are included only if they exist in all types with exactly matching types.
 * 
 * @template T Array of types to find common properties for
 * @template Empty Default type for empty arrays (default: `{}`)
 * @returns Object type with strictly common properties
 * 
 * @example
 * ```typescript
 * interface Cat { name: string; type: 'cat'; legs: 4; }
 * interface Dog { name: string; type: 'dog'; legs: 4; }
 * interface Bird { name: string; type: 'bird'; legs: 2; }
 * 
 * type Result = CommonStrictProps<[Cat, Dog, Bird]>; // { name: string }
 * // 'type' excluded: 'cat' !== 'dog' !== 'bird'
 * // 'legs' excluded: 4 !== 2
 * ```
 */
export type CommonStrictProps<T extends readonly unknown[], Empty = {}> = T extends readonly [infer First, infer Second, ...infer Rest]
    ? Rest extends readonly []
    ? CommonStrictPairs<First, Second>
    : CommonStrictProps<[CommonStrictPairs<First, Second>, ...Rest]>
    : T extends readonly [infer Only]
    ? Only
    : Empty

/**
 * Finds common properties across multiple types with primitive literal upcasting.
 * 
 * Recursively processes an array of types, applying upcast matching rules.
 * Properties are included if they exist in all types and can be unified through upcasting.
 * 
 * @template T Array of types to find common properties for  
 * @template Empty Default type for empty arrays (default: `{}`)
 * @returns Object type with common properties, upcasting literals when possible
 * 
 * @example
 * ```typescript
 * interface Cat { name: string; type: 'cat'; active: true; priority: 1; }
 * interface Dog { name: string; type: 'dog'; active: false; priority: 2; }
 * interface Bird { name: string; type: 'bird'; active: true; priority: 3; }
 * 
 * type Result = CommonUpcastProps<[Cat, Dog, Bird]>;
 * // { name: string; type: string; active: boolean; priority: number }
 * // All literals are upcast to their primitive base types
 * ```
 */
export type CommonUpcastProps<T extends readonly unknown[], Empty = {}> = T extends readonly [infer First, infer Second, ...infer Rest]
    ? Rest extends readonly []
    ? CommonUpcastPairs<First, Second>
    : CommonUpcastProps<[CommonUpcastPairs<First, Second>, ...Rest]>
    : T extends readonly [infer Only]
    ? Only
    : Empty
