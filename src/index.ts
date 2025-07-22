// Helper to determine if a type is a primitive literal
export type IsPrimitiveLiteral<T> =
    T extends string ? (string extends T ? false : true) :
    T extends number ? (number extends T ? false : true) :
    T extends boolean ? (boolean extends T ? false : true) :
    false

// Helper to get the primitive type from a literal
export type GetPrimitive<T> =
    T extends string ? string :
    T extends number ? number :
    T extends boolean ? boolean :
    never

// Strict pairing - no primitive upcasting
export type CommonStrictPairs<T, U> = {
    [K in keyof T & keyof U]: T[K] extends U[K]
    ? T[K]
    : U[K] extends T[K]
    ? U[K]
    : never
}

// Enhanced pair comparison with primitive upcasting
export type CommonUpcastPairs<T, U> = {
    [K in keyof T & keyof U]:
    T[K] extends U[K]
    ? T[K]
    : U[K] extends T[K]
    ? U[K]
    : IsPrimitiveLiteral<T[K]> extends true
    ? IsPrimitiveLiteral<U[K]> extends true
    ? GetPrimitive<T[K]> extends GetPrimitive<U[K]>
    ? GetPrimitive<T[K]>
    : never
    : never
    : never
}

// Primary export - works with any number of types
export type CommonStrictProps<T extends readonly unknown[], Empty = {}> = T extends readonly [infer First, infer Second, ...infer Rest]
    ? Rest extends readonly []
    ? CommonStrictPairs<First, Second>
    : CommonStrictProps<[CommonStrictPairs<First, Second>, ...Rest]>
    : T extends readonly [infer Only]
    ? Only
    : Empty

// Primary export - works with any number of types
export type CommonUpcastProps<T extends readonly unknown[], Empty = {}> = T extends readonly [infer First, infer Second, ...infer Rest]
    ? Rest extends readonly []
    ? CommonUpcastPairs<First, Second>
    : CommonUpcastProps<[CommonUpcastPairs<First, Second>, ...Rest]>
    : T extends readonly [infer Only]
    ? Only
    : Empty


// Test cases
interface Cat {
    name: string
    age: number
    type: "cat"
    active: true
    priority: 1
}

interface Bird {
    name: string
    age: number
    type: "bird"
    active: false
    priority: 2
}

interface Dog {
    name: string
    age: number
    type: "dog"
    active: true
    priority: 3
}

// Result: { name: string; age: number; type: string; active: boolean; priority: number }
type Animal = CommonUpcastProps<[Cat, Bird, Dog]>

// Strict version - no primitive upcasting, type literals become never
// Result: { name: string; age: number } (type, active, priority become never due to literal mismatches)
type AnimalStrict = CommonStrictProps<[Cat, Bird, Dog]>

// Edge cases
interface MixedTypes {
    str: "literal"
    num: 42
    bool: true
    actualString: string  // already a primitive
}

interface MoreMixed {
    str: "different"
    num: 100
    bool: false
    actualString: string
}

// Result: { str: string; num: number; bool: boolean; actualString: string }
type Mixed = CommonUpcastProps<[MixedTypes, MoreMixed]>

// Strict version - literals don't upcast, mismatched literals become never  
// Result: { actualString: string } (str, num, bool become never due to different literals)
type MixedStrict = CommonStrictProps<[MixedTypes, MoreMixed]>

// Single type case - returns the type itself
// Result: Cat
type SingleCat = CommonStrictProps<[Cat]>

// Empty array case
type EmptyStrictCase = CommonStrictProps<[]>
type EmptyUpcastCase = CommonUpcastProps<[]>
type EmptyStrictCaseNull = CommonStrictProps<[], null>
type EmptyUpcastCaseNull = CommonUpcastProps<[], null>
type EmptyStrictCaseNever = CommonStrictProps<[], never>
type EmptyUpcastCaseNever = CommonUpcastProps<[], never>
