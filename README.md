# CommonProps Documentation

This branch (`gh-pages`) contains the generated documentation for CommonProps,
deployed to GitHub Pages.

## Directory Structure

```text
.
├── index.html           # Redirects to latest/ or unreleased/
├── latest/              # Documentation for highest semver release
├── unreleased/          # Documentation from main branch (unreleased changes)
└── v{version}/          # Versioned documentation (e.g., v0.1.2, v1.0.0)
```

## Workflow

Documentation is automatically updated by the `docs.yaml` workflow:

### On Push to Main

- Updates `unreleased/` with latest documentation from main branch
- Updates `index.html` to redirect to `unreleased/`

### On Release Publish

- Updates `unreleased/` with release documentation
- Creates `v{version}/` directory for the release
- Detects highest semver version from all `v*/` directories
- Updates `latest/` to copy of highest semver version
- Updates `index.html` to redirect to `latest/`

## Semver Handling

The workflow uses `sort -V` to determine the actual latest version. If releases
are published out of order (e.g., v0.1.3 after v1.0.0), `latest/` will correctly
point to v1.0.0 as the highest semantic version.

## Manual Maintenance

This branch is maintained automatically by GitHub Actions. Manual commits should
be rare and limited to structural changes (like this README).

### Whitelist .gitignore

This branch uses a whitelist approach for `.gitignore`:

- Ignores everything by default
- Explicitly allows: `v*/`, `latest/`, `unreleased/`, `*.html`, `*.js`,
  `*.css`, `*.svg`, `.nojekyll`
- Blocks: `.claude/`, `.focus/`, build artifacts

## Deployment

GitHub Pages is configured to deploy from this branch. All content in tracked
directories is publicly accessible at:

<https://theroyalwhee0.github.io/commonprops/>

## Related

- Main branch: Contains source code and build configuration
- Workflow: `.github/workflows/docs.yaml` (on main branch)
- Issue: #28
