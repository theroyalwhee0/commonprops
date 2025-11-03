export type IsUpcastable<T> = [
    T
] extends [string] ? (string extends T ? false : true) : [
    T
] extends [number] ? (number extends T ? false : true) : [
    T
] extends [boolean] ? (true extends T ? (false extends T ? false : true) : true) : false;
export type GetUpcastable<T> = T extends string ? string : T extends number ? number : T extends boolean ? boolean : never;
export type CommonStrictPairs<T, U> = {
    [K in keyof T & keyof U as T[K] extends U[K] ? U[K] extends T[K] ? K : never : never]: T[K] extends U[K] ? T[K] : U[K] extends T[K] ? U[K] : never;
};
export type CommonUpcastPairs<T, U> = {
    [K in keyof T & keyof U as T[K] extends U[K] ? U[K] extends T[K] ? K : K : U[K] extends T[K] ? K : IsUpcastable<T[K]> extends true ? IsUpcastable<U[K]> extends true ? GetUpcastable<T[K]> extends GetUpcastable<U[K]> ? K : never : never : never]: T[K] extends U[K] ? U[K] extends T[K] ? T[K] : U[K] : U[K] extends T[K] ? T[K] : IsUpcastable<T[K]> extends true ? IsUpcastable<U[K]> extends true ? GetUpcastable<T[K]> extends GetUpcastable<U[K]> ? GetUpcastable<T[K]> : never : never : never;
};
export type CommonStrictProps<T extends readonly unknown[], Empty = {}> = T extends readonly [infer First, infer Second, ...infer Rest] ? Rest extends readonly [] ? CommonStrictPairs<First, Second> : CommonStrictProps<[CommonStrictPairs<First, Second>, ...Rest]> : T extends readonly [infer Only] ? Only : Empty;
export type CommonUpcastProps<T extends readonly unknown[], Empty = {}> = T extends readonly [infer First, infer Second, ...infer Rest] ? Rest extends readonly [] ? CommonUpcastPairs<First, Second> : CommonUpcastProps<[CommonUpcastPairs<First, Second>, ...Rest]> : T extends readonly [infer Only] ? Only : Empty;
