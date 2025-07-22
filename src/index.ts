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
 * @license UNLICENSED
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
 * Literal types must match exactly - no upcasting is performed.
 * 
 * @template T First type
 * @template U Second type
 * @returns Object type with common properties having exact matching types
 * 
 * @example
 * ```typescript
 * interface A { name: string; type: 'cat'; }
 * interface B { name: string; type: 'dog'; }
 * 
 * type Result = CommonStrictPairs<A, B>; // { name: string }
 * // 'type' is excluded because 'cat' !== 'dog'
 * ```
 */
export type CommonStrictPairs<T, U> = {
    [K in keyof T & keyof U]: T[K] extends U[K]
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
 * 2. Both are primitive literals that can be upcast to the same base type
 * 
 * When upcasting occurs, the result is the primitive base type.
 * 
 * @template T First type
 * @template U Second type
 * @returns Object type with common properties, upcasting literals when possible
 * 
 * @example
 * ```typescript
 * interface A { name: string; type: 'cat'; active: true; }
 * interface B { name: string; type: 'dog'; active: false; }
 * 
 * type Result = CommonUpcastPairs<A, B>;
 * // { name: string; type: string; active: boolean }
 * // 'type': 'cat' | 'dog' → string
 * // 'active': true | false → boolean
 * ```
 */
export type CommonUpcastPairs<T, U> = {
    [K in keyof T & keyof U]:
    T[K] extends U[K]
    ? T[K]
    : U[K] extends T[K]
    ? U[K]
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
