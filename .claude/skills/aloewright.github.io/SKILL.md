```markdown
# aloewright.github.io Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns used in the `aloewright.github.io` TypeScript codebase. It covers file naming, import/export conventions, commit message styles, and testing patterns. While no specific framework or automated workflows were detected, this guide provides best practices and suggested commands for maintaining consistency and productivity.

## Coding Conventions

### File Naming
- **Style:** camelCase
- **Example:**  
  ```plaintext
  myComponent.ts
  userProfilePage.ts
  ```

### Import Style
- **Absolute Imports:**  
  All imports use absolute paths rather than relative ones.
  ```typescript
  import UserProfile from 'components/userProfile'
  ```

### Export Style
- **Default Exports:**  
  Each module exports a single default export.
  ```typescript
  // userProfile.ts
  export default function UserProfile() {
    // ...
  }
  ```

### Commit Messages
- **Type:** Freeform (no enforced structure)
- **Average Length:** 37 characters
- **Prefixes:** Not standardized

  **Example:**  
  ```
  Add initial user profile component
  ```

## Workflows

### Code Development
**Trigger:** When adding or updating features or components  
**Command:** `/dev`

1. Create a new file using camelCase naming.
2. Write your TypeScript code, using absolute imports and default exports.
3. Write or update corresponding test files as needed.
4. Commit changes with a clear, concise message.

### Testing
**Trigger:** Before pushing changes or merging branches  
**Command:** `/test`

1. Locate or create test files matching the `*.test.*` pattern.
2. Run the test suite using the project's preferred test runner (framework unknown; check project documentation or package.json).
3. Ensure all tests pass before proceeding.

### Code Review
**Trigger:** When submitting changes for review  
**Command:** `/review`

1. Ensure code follows naming, import, and export conventions.
2. Double-check commit messages for clarity.
3. Confirm that all relevant tests are present and passing.

## Testing Patterns

- **Test File Pattern:**  
  Test files are named using the `*.test.*` pattern (e.g., `userProfile.test.ts`).
- **Framework:**  
  Not detected; consult project documentation for specifics.
- **Best Practice:**  
  Place tests alongside or near the modules they cover, and ensure comprehensive coverage for each feature.

  **Example:**
  ```typescript
  // userProfile.test.ts
  import UserProfile from 'components/userProfile'

  test('should render user profile', () => {
    // test implementation
  })
  ```

## Commands

| Command   | Purpose                                   |
|-----------|-------------------------------------------|
| /dev      | Start feature/component development       |
| /test     | Run all tests                            |
| /review   | Prepare code for review and submission    |
```