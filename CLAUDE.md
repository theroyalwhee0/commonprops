# CommonProps - Project Context for Claude

## Project Overview

CommonProps is a TypeScript utility library for extracting common properties from sets of types. It provides type utilities that find shared properties across multiple types, with support for both strict type matching and primitive literal upcasting.

The project provides:

- **CommonStrictProps**: Find common properties with strict type matching
- **CommonUpcastProps**: Find common properties with primitive literal upcasting
- **Helper types**: IsUpcastable, GetUpcastable, CommonStrictPairs, CommonUpcastPairs

## Key Project Characteristics

### Strict Linting and Quality Standards

- **Strict TypeScript linting**: Unused variables are errors, not warnings
- **Type-safe**: Pure TypeScript type utilities with no runtime code
- **Documentation**: All types include comprehensive JSDoc with examples
- **Quality gates**: ESLint, TypeScript compiler, Markdown linting, TypeDoc validation

### Code Structure

```text
src/
└── index.ts          # All type utilities and exports

tests/
├── getupcastable.test.ts    # Tests for GetUpcastable helper
├── commonstrict.test.ts     # Tests for CommonStrictProps
├── commonupcast.test.ts     # Tests for CommonUpcastProps
└── isupcastable.test.ts     # Tests for IsUpcastable helper
```

### Development Workflow

- **Install**: `npm install`
- **Build**: `npm run build` (outputs to `dist/`)
- **Test**: `npm test` (Vitest)
- **Lint**: `npm run lint` (TypeScript, ESLint, Markdown, TypeDoc)
- **Docs**: `npm run docs` (TypeDoc generates to `docs/`)
- **Pre-commit**: `git precommit` or `git precommit --all`

### Testing Strategy

- **Framework**: Vitest with Chai assertions
- **Coverage**: Comprehensive test suite covering all type utilities
- **Assertions**: Both compile-time (`@ts-expect-error`) and runtime checks
- **Run tests**: `npm test` or `npm run test:quiet` for minimal output

### Build System

- **Vite**: Modern build tool for library bundling
- **TypeScript declarations**: Generated via vite-plugin-dts
- **Output**: ES modules in `dist/` with source maps and declarations
- **Package**: Optimized via `files` field (8.2 kB published)

### Git Configuration

**Whitelist .gitignore**: Project uses a whitelist approach (all files ignored
by default, specific patterns explicitly allowed). Use `git tracklint` to verify
tracked files are properly whitelisted.

**Installation**: The `git-tracklint` script is available at <https://gist.github.com/theroyalwhee0>
if you need to install it.

**Explicitly disallowed**: `/node_modules`, `/.focus`, `.local/`, `docs/` (generated)

### GitHub Labels

Use exact emoji-prefixed labels: `✨ enhancement`, `🐛 bug`, `📚 documentation`,
`♻️ refactor`, `🔒 security`, `🔧 tooling`, `📌 task`, etc.

### Important Conventions

1. **Documentation First**: Write docs before implementation
2. **Type Safety**: All utilities are type-level only (no runtime code)
3. **Comments**: End comment sentences with periods for readability
4. **Testing**: Use Vitest with Chai for assertions
5. **TODOs**: Format as `// TODO: {description}.`
6. **Shell Utilities**: Use `gio trash $1 $2 $3` for deleting files
7. **Dependency Review**: NEVER add dependencies without review FIRST
8. **Documentation Accuracy**: Document only current features; do not document
   future plans unless imminent (in which case use TODO comments)
9. **Markdown Linting**: Markdown files are linted with markdownlint-cli.
   Pre-commit hooks automatically format markdown files.

### Pre-commit Checks

Run `git precommit` for staged files or `git precommit --all` for entire repository.
This script runs the precommit hooks configured in `.git/hooks/pre-commit`.

**Installation**: The `git-precommit` script is available at <https://gist.github.com/theroyalwhee0>
if you need to install it.

**Hooks run**: TypeScript compile check, ESLint, Markdown lint, tests, docs generation

### GitHub Workflows

- **CI** (`ci.yaml`): Runs on push/PR to main - lint, test, build, docs
- **Publish** (`publish.yaml`): Publishes to npm on release with provenance
- **Docs** (`docs.yaml`): Deploys documentation to GitHub Pages on release

### Common Development Practices

- **Package Manager**: npm 11.4.1+
- **Node.js**: Version 22+ required
- **Type-only library**: No runtime dependencies
- **Published**: `@theroyalwhee0/commonprops` on npm
- **License**: Apache-2.0

### Documentation-Specific Guidelines

When working on user-facing documentation, follow these principles and best
practices:

- No internal references (never reference CLAUDE.md in user docs)
- Document current features only
- No made-up data or benchmarks
- Technical accuracy requirements
- Consistent terminology
- Be definitive about what we control (no conditional language)

These guidelines supplement the general project conventions in CLAUDE.md but
are focused specifically on documentation work.

### Publishing

- **npm**: Published as `@theroyalwhee0/commonprops` with provenance
- **Repository**: Required in package.json for npm provenance verification
- **Files**: Only dist/, src/, README.md, LICENSE.txt, CHANGELOG.md published
- **Version**: Follows semantic versioning
- **Current version**: 0.1.2

### Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md` with release notes
3. Merge PR to main
4. Tag main: `git tag v0.x.x && git push origin v0.x.x`
5. Create GitHub release (triggers npm publish and docs deployment)

### CLAUDE.md Maintenance

Please note, CLAUDE.md is maintained by Claude Code with only minor input from
the developer.
