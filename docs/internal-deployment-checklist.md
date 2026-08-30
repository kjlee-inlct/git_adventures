# Internal Deployment Checklist

## Purpose

Provide a minimal deployment checklist for the first internal Git Adventures test cycle without introducing unnecessary infrastructure.

## Current Recommendation

```text
Docker Compose required?  NO
```

Use either:

- direct Nginx / Caddy static hosting, or
- one static-web container.

Testers need only a browser and the internal URL.

## Before Deployment

- [ ] Confirm current feature/build commit or release reference.
- [ ] Confirm CI is green.
- [ ] Confirm `index.html`, `facilitator.html`, and `reports.html` load locally.
- [ ] Confirm test-presets and operations docs match the intended cycle.
- [ ] Confirm Session Recorder starts/stops and exports JSON.
- [ ] Confirm Reports page accepts a synthetic valid JSON report.
- [ ] Confirm no secrets are embedded in browser JavaScript.

## Network / Access

- [ ] Bind only to the intended internal interface/network.
- [ ] Do not expose the test server publicly by default.
- [ ] Use the company-required hostname/TLS controls where applicable.
- [ ] Ensure testers can reach the URL without Docker or local setup.

## Static File Hosting

- [ ] Serve repository/app files read-only where practical.
- [ ] Disable directory listing unless explicitly needed.
- [ ] Use a maintained web-server version.
- [ ] Define the restart/update procedure.

## Browser Validation

From a tester machine verify:

```text
/
/facilitator.html
/reports.html
/docs/first-internal-test-cycle.md
```

- [ ] Language toggle works.
- [ ] Mission input works.
- [ ] Local Storage works.
- [ ] Session export download works according to browser policy.
- [ ] Reports JSON file upload works.

## Test-cycle Start Gate

Do not begin participant sessions until:

- [ ] correct curriculum version is deployed,
- [ ] Facilitator preset has been reviewed,
- [ ] Session Sheet and Interview Template are ready,
- [ ] internal evidence storage location is agreed,
- [ ] test-group URL is stable for the session window.

## Update During an Active Cycle

Avoid changing Missions mid-cycle without recording a version boundary.

If an urgent fix is required:

1. record the deployed old version,
2. identify sessions collected before the fix,
3. deploy the fix,
4. record the new version,
5. keep pre/post evidence separated in aggregation/review.

## Backup / Evidence

Server-side backup of learner Local Storage is not available in the current architecture.

Operational protection comes from:

- exporting Session JSON after every usable session,
- storing evidence in the approved internal location,
- not relying on one browser as the canonical evidence store.

## Rollback

Keep the previously known-good static build/reference available.

If deployment introduces a blocking bug:

```text
stop sessions
   -> restore known-good static version
   -> verify game / recorder / reports
   -> record version boundary
```

## When to Add Compose

Revisit Docker Compose when the deployment grows beyond one independent static-web service, for example:

```text
web + API
web + proxy with coordinated config
web + database/storage
web + report upload service
```

See [Internal Deployment Options](internal-deployment-options.md).
