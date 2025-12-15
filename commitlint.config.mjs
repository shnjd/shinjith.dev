 const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // 1. Format: <type>([optional scope]): <description> - enforced by most rules below.
    
    // Enforce that the type is not empty.
    'type-empty': [2, 'never'],
    
    // Enforce specific commit types mentioned in the blog:
    // feat:, fix:, build:, chore:, ci:, style:, refactor:
    'type-enum': [
      2, 
      'always', 
      ['feat', 'fix', 'build', 'chore', 'ci', 'style', 'refactor', 'content']
    ],
    
    // Subject/Description Rules:
    
    // 2. Short and Summarized: Try to fit the subject line inside 50 characters.
    'header-max-length': [2, 'always', 50],
    
    // 3. Capitalize the description: Start subject line with a capital letter.
    // 'sentence-case' capitalizes the first letter of the subject.
    'subject-case': [2, 'always', 'sentence-case'],
    
    // 4. Avoid trailing period.
    'subject-full-stop': [2, 'never', '.'],
    
    // Body Rules:
    
    // 5. Body is added by leaving a blank line after the subject line.
    'body-leading-blank': [2, 'always'],
    
    // 6. Wrap the body at 72 characters.
    'body-max-line-length': [2, 'always', 72],

    // Footer Rules (standard best practice, supports 'BREAKING CHANGE'):
    
    // Ensure a blank line precedes the footer (e.g., 'BREAKING CHANGE:' or 'Signed-off-by:').
    'footer-leading-blank': [2, 'always'],
    
    // Scope Rules (optional scope is implied by the blog's format):
    
    // Enforce that if a scope is used, it is in lower-case (e.g., feat(parser):).
    'scope-case': [2, 'always', 'lower-case'],
  } 
};

 export default config
