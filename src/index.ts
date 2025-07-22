// Helper to determine if a type is a primitive literal
export type IsUpcastable<T> =
    [T] extends [string] ? (string extends T ? false : true) :
    [T] extends [number] ? (number extends T ? false : true) :
    [T] extends [boolean] ? (
        true extends T ? (
            false extends T ? false : true
        ) : true
    ) :
    false

// Helper to determine if a type is a primitive literal
export type CheckPrimitiveLiteral<T> =
    [T] extends [string] ? (string extends T ? "string" : "string literal") :
    [T] extends [number] ? (number extends T ? "number" : "number literal") :
    [T] extends [boolean] ? (
        true extends T ? (
            false extends T ? "boolean" : "false literal"
        ) : "true literal"
    ) :
    "other"

// Helper to get the primitive type from a literal
export type GetUpcastable<T> =
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
    : IsUpcastable<T[K]> extends true
    ? IsUpcastable<U[K]> extends true
    ? GetUpcastable<T[K]> extends GetUpcastable<U[K]>
    ? GetUpcastable<T[K]>
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
