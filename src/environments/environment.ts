// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  base_url: 'http://localhost:8000',
  users_url: 'http://localhost:8000/api/users',
  oauth_url: 'http://localhost:8000/oauth/token',
  api_address: 'http://localhost:8000/api/',
  api_version: 'v1/',
  client_id: '1',
  client_secret: 'GvZBT2iqMMC3e54VnzM5b6136pU6TK4gGFJVHqZl'
};
