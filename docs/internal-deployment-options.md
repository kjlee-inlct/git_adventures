# Internal Deployment Options

## Purpose

Define the simplest appropriate deployment model for the current Git Adventures internal-validation phase and establish a clear trigger for introducing Docker Compose later.

## 1. Current Product Shape

The current product is a static browser application.

```text
Static HTML / CSS / JavaScript
        |
        v
Internal HTTP server
        |
        v
Browser
```

Current behavior is client-side:

- Mission Engine
- Git State Simulator
- Assessment Scoring
- Local Progress
- Local Session Recorder
- Facilitator Console
- Report Aggregator

No backend API, database, authentication server, central analytics service, or server-side Git runtime is required for the first internal calibration cycle.

Therefore **Docker Compose is not required today**.

---

## 2. Simplest Development / Single-PC Run

For local or facilitator-machine testing:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
http://localhost:8000/facilitator.html
http://localhost:8000/reports.html
```

Advantages:

- zero deployment configuration,
- fast iteration,
- no image build,
- no Docker dependency.

Use this for development and one-machine product review.

---

## 3. Simple Internal Shared Server

For a small internal group, use one static web server.

Recommended shapes:

```text
Option A
Nginx / Caddy installed directly
        |
        v
Git Adventures static files
```

or

```text
Option B
Single Nginx container
        |
        v
Read-only static files
```

One container does not require Docker Compose.

Example conceptual command:

```text
docker run ... nginx
```

A proper deployment should pin the image version, expose only the intended internal port, and mount/copy the static application read-only.

---

## 4. Why Compose Is Not Needed Yet

Compose is most valuable when multiple runtime services must be started, networked, configured, and upgraded together.

Today there is effectively one service:

```text
static-web
```

Adding Compose now would mostly add:

- another configuration file,
- Docker network abstraction with no real need,
- image/build maintenance,
- deployment concepts unrelated to the learning-product validation goal.

This would not improve Mission quality, usability evidence, or Assessment calibration.

The architecture rule remains:

```text
Product validation need
        !=
Infrastructure complexity
```

---

## 5. When Docker Compose Becomes Useful

Introduce Compose when at least two coordinated runtime services are justified.

### Trigger A - Reverse Proxy + Application Service

Example:

```text
reverse-proxy
    |
    v
static-web
```

Useful when internal deployment needs standardized TLS, hostname routing, headers, or multiple internal apps.

### Trigger B - Central Report Upload API

```text
reverse-proxy
      |
      +--- static-web
      |
      `--- report-api
              |
              `--- storage
```

Compose becomes useful because service discovery, ports, environment variables, and persistence need coordination.

### Trigger C - Account / Progress Sync Backend

```text
web
 |
 api
 |
 database
```

Compose is then a reasonable internal-development/deployment option.

### Trigger D - Real Git Execution Sandbox

If advanced Assessment later uses isolated server-side repositories:

```text
web
api
worker / sandbox manager
storage
```

Compose may help for development, although stronger isolation/orchestration may eventually be required beyond Compose.

### Trigger E - Monitoring / Operations Stack

If internal deployment genuinely needs:

```text
web
reverse proxy
metrics
log collector
```

Compose can provide a reproducible stack.

---

## 6. Suggested Adoption Rule

Do not introduce Compose based only on preference for Dockerized projects.

Adopt it when:

```text
>= 2 coordinated runtime services
OR
repeatable one-command deployment materially reduces operations work
OR
proxy / persistence / environment coordination becomes a real requirement
```

Until then:

```text
Development
  -> python -m http.server

Small internal deployment
  -> static server directly
  OR
  -> one Nginx/Caddy container
```

---

## 7. Recommended Current Choice

For the first 3-5 sessions per group:

```text
Internal Linux PC / Server
        |
        v
Nginx or Caddy static hosting
        |
        v
LAN browser access
```

If the team already standardizes on Docker, one Nginx container is also acceptable.

**Do not make Docker a tester prerequisite.** Testers only need a browser and the internal URL.

The Session Recorder continues to store data locally in each browser. Session JSON files are exported manually and aggregated locally through `reports.html`.

---

## 8. Data Persistence Implication

Current persistence is browser-local:

```text
Browser Local Storage
  - learner progress
  - active internal test session
```

Server restart does not delete this browser-local state.

However:

- clearing browser storage removes it,
- another PC/browser has separate state,
- no central backup exists,
- exported Session JSON remains a manual operational artifact.

These limitations are intentional during product validation.

A database should not be added merely to avoid manual JSON export before there is evidence that central collection is operationally necessary.

---

## 9. Security Boundary for Internal Hosting

Even for a static app:

- expose only to the intended internal network,
- do not publish the test server to the public Internet by default,
- use a maintained web server,
- prefer read-only application files,
- if TLS/authentication is required by company policy, add them at the proxy/server layer rather than the Mission Engine.

No secret should be embedded in browser JavaScript.

---

## 10. Future Compose Shape

When Compose is justified, keep the learning engine independent from infrastructure.

Example future structure:

```text
services:
  web:
    static Git Adventures client

  api:
    progress / report / organization API

  db:
    persistent product data

  proxy:
    optional TLS / routing
```

The client should still communicate through adapters rather than importing deployment concerns into Mission definitions.

---

## 11. Decision Summary

```text
Current phase
  Docker Compose required?  NO

Local development
  python -m http.server      YES

Small internal shared server
  Nginx/Caddy static server  RECOMMENDED
  Single container           OPTIONAL

Compose
  Introduce when multiple coordinated services or real operations needs appear
```

The priority for the current phase is collecting reliable product evidence, not building infrastructure that the product does not yet need.
