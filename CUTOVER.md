# Cutover Checklist

Use this after the GitHub Pages site has been exported and verified.

1. Confirm the static site is deployed from `freetoolonline-web` and the Pages custom domain is set to `freetoolonline.com`.
2. Confirm `webservice` is serving the migrated `/ajax/*` endpoints and that CORS allows `https://freetoolonline.com`.
3. Update DNS for `freetoolonline.com` so traffic goes to GitHub Pages.
4. Verify the frontend loads and the AJAX calls hit `webservice`.
5. Terminate the Elastic Beanstalk `web` environment.
6. Verify the AWS bill no longer includes the public IPv4/VPC charge for the old `web` environment.
