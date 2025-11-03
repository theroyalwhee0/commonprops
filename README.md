# CommonProps

TypeScript utility types for extracting common properties from multiple types.

## Overview

This module provides two main approaches to finding common properties:

- **Strict mode**: Properties must have exactly matching types
- **Upcast mode**: Primitive literals can be upcast to their base types (e.g., 'hello' → string)

## Usage

```typescript
interface Cat { name: string; type: 'cat'; active: true; }
interface Dog { name: string; type: 'dog'; active: false; }

// Strict: only exact matches
type StrictCommon = CommonStrictProps<[Cat, Dog]>; // { name: string }

// Upcast: literals become primitives  
type UpcastCommon = CommonUpcastProps<[Cat, Dog]>; // { name: string; type: string; active: boolean }
```

## API

[API documentation](https://theroyalwhee0.github.io/commonprops/)

### Main Types

- `CommonStrictProps<T[]>` - Find common properties with strict type matching
- `CommonUpcastProps<T[]>` - Find common properties with primitive literal upcasting

### Helper Types

- `IsUpcastable<T>` - Check if a type can be upcast to its primitive base
- `GetUpcastable<T>` - Get the primitive base type for a given type
- `CommonStrictPairs<T, U>` - Two-type strict comparison
- `CommonUpcastPairs<T, U>` - Two-type upcast comparison

## Behavior Details

### Property Exclusion vs Inclusion

**Properties are completely excluded** when they cannot be unified:

```typescript
interface A { name: string; type: 'cat'; }
interface B { name: string; type: 'dog'; }

type Strict = CommonStrictProps<[A, B]>;
// Result: { name: string }
// 'type' property is excluded entirely (not present in result type)
```

### Type Selection Priority

When types can be unified, **more general types are preferred**:

```typescript
// Example: string vs 'literal' 
type Mixed = CommonUpcastPairs<{prop: string}, {prop: 'literal'}>;
// Result: {prop: string} - chooses the more general type

// Multi-step example:
interface Cat { type: 'cat' }
interface Dog { type: 'dog' }  
interface Bird { type: 'bird' }

type Step1 = CommonUpcastPairs<Cat, Dog>;    // {type: string}
type Step2 = CommonUpcastPairs<Step1, Bird>; // {type: string} (maintains generality)
```

### Recursive Processing

Multi-type functions process types left-to-right, maintaining type generality:

```typescript
type Result = CommonUpcastProps<[Cat, Dog, Bird]>;
// Equivalent to: CommonUpcastPairs<CommonUpcastPairs<Cat, Dog>, Bird>
```

## License & Copyright

This project is licensed under the Apache License 2.0 - see the [LICENSE.txt](LICENSE.txt) file for details.

Copyright 2025 Adam Mill
