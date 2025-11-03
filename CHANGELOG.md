# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Fixed

## [0.1.0] - 2025-11-03

### Added

- Initial implementation of type utilities
- `CommonStrictProps<T[]>` - Find common properties with strict type matching
- `CommonUpcastProps<T[]>` - Find common properties with primitive literal upcasting
- Helper types:
  - `IsUpcastable<T>` - Check if a type can be upcast to its primitive base
  - `GetUpcastable<T>` - Get the primitive base type for a given type
  - `CommonStrictPairs<T, U>` - Two-type strict comparison
  - `CommonUpcastPairs<T, U>` - Two-type upcast comparison
- Comprehensive TypeScript documentation with examples
- TypeDoc configuration for API documentation generation
- Test suite with comprehensive coverage
- Community documentation (CODE_OF_CONDUCT.md, CONTRIBUTING.md, SECURITY.md)
- CHANGELOG.md to track project changes
- Markdown linting configuration
- GitHub Actions workflows for CI, npm publishing, and documentation deployment
- Optimized package files configuration for smaller published package size

### Changed

- Simplified README.md by removing internal implementation details
- Migrated from Node.js native test runner to Vite + Vitest
- Updated build system to use Vite for faster builds and better DX

[Unreleased]: https://github.com/theroyalwhee0/commonprops/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/theroyalwhee0/commonprops/releases/tag/v0.1.0
