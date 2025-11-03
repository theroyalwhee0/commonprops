# Contributing to CommonProps

Thank you for your interest in contributing to `commonprops`! This document provides guidelines for contributing to the project.

## Code of Conduct

This project adheres to the Contributor Covenant [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:

- A clear, descriptive title
- Steps to reproduce the problem
- Expected vs actual behavior
- Your environment (OS, TypeScript version, Node version)
- Any relevant error messages or logs

### Suggesting Enhancements

Enhancement suggestions are welcome! Please create an issue describing:

- The motivation for the enhancement
- A clear description of the proposed functionality
- Any potential implementation considerations

### Pull Requests

1. **Fork and Clone**: Fork the repository and clone it locally
2. **Create a Branch**: Create a feature branch from `main`
3. **Make Changes**: Follow the project's coding standards (see below)
4. **Test**: Ensure all tests pass with `npm test`
5. **Lint**: Run `npm run lint` and address any warnings
6. **Commit**: Write clear, descriptive commit messages
7. **Push**: Push your branch to your fork
8. **Open a PR**: Submit a pull request to the `main` branch

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/commonprops.git
cd commonprops

# Install dependencies
npm install

# Run tests
npm test

# Run linter
npm run lint

# Build documentation
npm run docs
```

## Coding Standards

This project maintains strict code quality standards:

### Required Practices

- **Comprehensive documentation**: All exported types must have TSDoc comments
  - Include `@example` blocks demonstrating usage
  - Document template parameters with `@template`
  - Explain complex type behavior clearly
- **Type safety**: Follow TypeScript best practices
  - No use of `any` without justification
  - Prefer const assertions where appropriate
- **Testing**: Add tests for new functionality

### Documentation

- All exported types must have complete TSDoc comments
- Include practical examples in documentation
- Explain edge cases and behavior details
- Document the "why" not just the "what"

### Code Organization

- Keep type definitions focused and single-purpose
- Use descriptive names for type parameters
- Comment complex conditional type logic
- Group related helper types together

## Testing

- Write unit tests for new functionality
- Ensure tests cover edge cases
- Test with multiple TypeScript versions if relevant
- Document test expectations clearly

## Documentation

- Update README.md for user-facing changes
- Add TSDoc comments for all exported types
- Include examples in documentation
- Update CHANGELOG.md following [Keep a Changelog](https://keepachangelog.com/) format
- Run `npm run docs` to preview generated documentation

## Dependencies

- Keep dependencies minimal
- Discuss new dependencies before adding them
- This is a type-only library with no runtime dependencies

## Questions?

If you have questions about contributing, feel free to:

- Open an issue for discussion
- Check existing issues and pull requests for context

Thank you for contributing to `commonprops`!
