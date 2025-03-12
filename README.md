# Simplenight Playwright Challenge
There are some commments in the code. I am aware that production level code should not have comments, but I figure this is okay for the challenge.

# Install
### yarn install

# Running tests
### yarn playwright test
### yarn playwright test --ui

# Separate environments
### yarn playwright test --project=staging
### yarn playwright test --project=production

Pointing to these results in a 403 forbidden. With time constraints I didn't manage to troubleshoot this. I figure there is a designated url for both staging and production.

Sometimes with bad internet or if the API is being slow the test can timeout and may need to be re-run. I'm sure things could be optimized to handle this better but I focused on matching a user-like testing approach that mimics how a user would actually interact with the app/features.
