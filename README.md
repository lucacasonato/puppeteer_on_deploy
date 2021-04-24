# puppteer_on_deploy

This demo shows how to use Puppeteer on Deno or Deno Deploy by using the
headless browser service https://browserless.io.

## Run locally with Deno CLI

To run the app locally with the Deno CLI, run the following command:

```shell
deno run --config tsconfig.json --no-check --allow-env --allow-net local.ts
```

You will need to sign up to https://browserless.io, and store your account token
in the `BROWSERLESS_TOKEN` environment variable.

Once the program is running, visit https://localhost:8080.

## To run locally with `deployctl`

To run the app locally with `deployctl`, run the following command:

```shell
deployctl --no-check deploy.ts
```

You will need to sign up to https://browserless.io, and store your account token
in the `BROWSERLESS_TOKEN` environment variable.

Once the program is running, visit https://localhost:8080.

## To deploy to Deno Deploy

Sign up to Deno Deploy at https://dash.deno.com, and create a project. You will
need to sign up to https://browserless.io, and add the your account token to the
Deno Deploy project in the `BROWSERLESS_TOKEN` environment variable.

Click `Deploy from URL`, and deploy this script:
`https://raw.githubusercontent.com/lucacasonato/puppeteer_on_deploy/main/deploy.ts`.

Now visit your site at your deployments URL.
