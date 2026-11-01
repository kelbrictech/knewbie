# KNEWBIE — Interactive Demo (Netlify)

This public repository is the KNEWBIE feature showroom. Production application development takes place separately in the private repository kelbrictech/KNEWBIE-CLOUDFLARE.

- Demo: https://kelbrictech-knewbie.netlify.app
- Visitors click Explore demo profiles without entering any password.
- Student, teacher, administrator and Master Access views operate only on fictional profiles and in-browser demonstration records.
- No persistent real student database, real authentication or production account access is provided.
- Content and UI changes are independent of the Cloudflare live application.

## Safety

The old Netlify authentication functions, fallback signing secret and hard-coded password hashes have been removed from the current source tree. Earlier public Git history may still contain prior code; do not reuse the previous signing secret or demo credentials anywhere.

This is a showroom, not a place to upload real student records, personal information, or confidential files. The actual production service must use server-verified identities and organization-scoped storage in its own Cloudflare deployment.

## Build checks

Run npm test to check that demo login is credential-free and production-only authentication code is absent. Netlify publishes the repository root without a build step.
