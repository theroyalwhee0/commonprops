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

### Main Types

- `CommonStrictProps<T[]>` - Find common properties with strict type matching
- `CommonUpcastProps<T[]>` - Find common properties with primitive literal upcasting

### Helper Types

- `IsUpcastable<T>` - Check if a type can be upcast to its primitive base
- `GetUpcastable<T>` - Get the primitive base type for a given type
- `CommonStrictPairs<T, U>` - Two-type strict comparison
- `CommonUpcastPairs<T, U>` - Two-type upcast comparison

## License

UNLICENSED
