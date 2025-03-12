# Simplenight Playwright Challenge
There are some commments in the code. I am aware that production level code should not have comments, but I figure this is okay for the challenge.

# Install
### yarn install

# Running tests
### yarn playwright test --ui
Or if preferred to run without UI
### yarn playwright test

# Separate environments
### yarn playwright test --project=staging
### yarn playwright test --project=production

Pointing to these results in a 403 forbidden. With time constraints I didn't manage to troubleshoot this. I figure there is a designated url for both staging and production.

It's possible that with bad internet or if the API is being slow the test can timeout and may need to be re-run. I'm sure things could be optimized to handle this better but for now I focused on matching a user-like testing approach that mimics how a user would actually interact with the app/features. I extended the timeout a little to possibly help, but this was developed with the default timeout in use, so under normal circumstances will work within the default timeout. The extension is just in case of said internet or API slowness.
