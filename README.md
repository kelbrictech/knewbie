# KNEWBIE

KNEWBIE learning environment, prepared for Netlify deployment.

## Architecture

- `index.html` — current prototype UI and seeded curriculum content
- `netlify/functions/` — server-side login/session endpoints
- `netlify.toml` — redirects and Functions configuration

## Authentication

Credentials are **not stored in the browser code or this public repository**. Configure these Netlify environment variables before enabling production login:

- `KNEWBIE_USERS_JSON` — JSON array of seeded user records containing username, accountEmail, role, salt and scrypt hash
- `KNEWBIE_SESSION_SECRET` — random secret used to sign HttpOnly session cookies

Do not commit real credentials or `.env` files.

## Deploy

Connect this GitHub repository to Netlify and use the repository root as the site base. No build command is required for the current HTML prototype. Netlify Functions are deployed automatically from `netlify/functions`.
