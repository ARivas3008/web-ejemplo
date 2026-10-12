# Barnes & Noble Inventory

## Overview
An independent Angular standalone academic practice project for UPC NRC 7750.
The original statement is adapted to Angular, TypeScript and PrimeNG as explicitly requested.

## Authorship
- Student / requested author: Bernie Aarón Rivas Méndez.
- Student code: U20241F109.
- Prepared with AI assistance as study material; this is not evidence of independent work during an examination.
- Private GitHub repository URL: not supplied and not created. Add your actual repository URL here after creating it.
- No instructor invitation or examination-time commit history has been fabricated.

## Features
- Toolbar, persistent/collapsible sidebar and EN/ES selector.
- Two bookstore cards per desktop row, with grouped copies and replenishment metrics.
- Reactive receipt form with specialty, book selection and copies.
- Open Library subject lookup with up to 50 works and Unknown Author fallback.
- Automatic store matching by specialty and updated inventory after successful receipt.
- Responsive grid, accessible labels, loading/error/retry states and safe unknown-route handling.
- English by default; Spanish interface and locale-aware numeric formatting.

## Stack
Angular / Angular CLI 22.2.2; TypeScript 6.0.2; PrimeNG 22.1.2; Angular CDK 22.2.2;
PrimeUI themes 3.0.1; PrimeFlex 4.0.0; PrimeIcons 8.0.2; RxJS 7.8.2;
ngx-translate core/http-loader 18.0.0; JSON Server 0.17.4; tsx 4.20.6 for domain tests.
Node 24.19.0 / npm 11.17.0 were used. Node must satisfy package.json engines.
No Vue, React or standalone Vite application dependency is included. Angular's internal
build tool dependencies can include Vite as part of Angular CLI.

## Run in Visual Studio Code (PowerShell)
Open this folder (the folder containing package.json), then run:
```powershell
code .
npm ci
npm run api
```
Keep that terminal running. In a second terminal in the same folder:
```powershell
npm start
```
Open http://localhost:4200/bookstores/overview . Stop servers with Ctrl+C.
Run one exam at a time: all use ports 3000 and 4200 by default.
If using another API port, change both the api script and environment.apiBase.

## Configuration and input data
Edit src/environments/environment.ts for API URLs, resource paths and branding.
The three original statement PDFs were supplied, but their accompanying data ZIPs were
not available. server/db.json is a compatible DEMONSTRATION dataset, not the official
attachment. Back it up before experimenting. Replace it with the official data when available,
preserving the endpoint collection names below. JSON Server writes changes into this file.

- logoToken: your **publishable** Logo.dev token. Without it or if the image fails, an initials badge is shown.
- primeUiLicense: a valid PrimeUI community/commercial license key. PrimeNG 22 displays a license notice until configured. See https://primeui.dev/licenses/community .
- No credentials were invented. Frontend environment fields are public; never put server secrets here.
- External providers require internet access; failures are shown with retry and are not silently replaced with invented API data.
- Provider-owned content keeps its original language. Application labels, validation and navigation are bilingual.

## Routes
- `/bookstores/overview`: main overview.
- `/inventory/receipts/new`: creation form.
- `/`: redirects to the overview.
- `**`: shows the unknown URL and a return button.

## APIs
Local base URL: http://localhost:3000 .
- `GET /bookstores`
- `GET /book-stocks`
- `POST /book-stocks`
- `GET https://openlibrary.org/subjects/{specialty}.json?limit=50`

## Domain rules
Aggregate copies by bookKey before counting titles. Replenishment includes only recorded titles whose sum is strictly below minimumCopies. A receipt must be an integer in [1, 2 * minimumCopies].
The API generates record IDs; the application generates ISO UTC timestamps at creation.
Successful POST responses are awaited before navigation. Failed requests preserve the form.

## Architecture
Contexts: bookstores, inventory, catalog, shared.
Each context has only the necessary domain/application/infrastructure/presentation files.
Domain models contain no Angular or HTTP imports. Resources and assemblers isolate API
contracts. HttpClient gateways compose typed BaseEndpoint instances. Injectable stores
coordinate use cases and expose Signals. Pages are routed; summary components are included.
Reference: https://github.com/AplicacionesWeb16127/learning-center-main
Reviewed commit: cde7fd7625439749a41df4dbf3a9cad2e1e3ea41.
See docs/requirements.md and docs/verification.md for decisions and checks.

## Verify
```powershell
npm test
npm run build
npm ls --depth=0
```
Domain tests cover meaningful business boundaries and provider mapping. Production builds
use strict TypeScript and strict Angular templates. The initial bundle currently exceeds
the 1 MB warning budget by about 35 kB because of the selected UI libraries; it stays below
the 2 MB error budget. This is a warning, not a compilation error.
For deployment, serve dist/ea7750u20241f109/browser and rewrite unknown application URLs to index.html.

## Source packaging
The ZIP includes source, configuration, package-lock.json, README, tests and the demo database.
It excludes node_modules, dist, .angular and .git. Install the locked dependencies with npm ci.
