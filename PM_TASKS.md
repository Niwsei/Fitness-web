# PM TASK TRACKER
## Fitness Supplement E-Commerce Platform
**Last Updated:** 2026-04-11 | **Sprint Cadence:** 2 weeks

---

## BACKLOG OVERVIEW

### Priority Legend
- 🔴 **P0** — Blocker, must ship this sprint
- 🟠 **P1** — High priority, ship soon
- 🟡 **P2** — Medium, next sprint
- 🟢 **P3** — Nice to have, backlog

### Status Legend
- `TODO` → `IN PROGRESS` → `IN REVIEW` → `DONE` → `BLOCKED`

---

## SPRINT 1 (Week 1–2) — Foundation & Setup

| ID | Task | Assignee | Priority | Status | Story Points | Notes |
|----|------|----------|----------|--------|-------------|-------|
| S1-01 | Initialize monorepo (Turborepo) | Dev Lead | 🔴 P0 | TODO | 3 | Next.js + Fastify setup |
| S1-02 | Setup PostgreSQL + Prisma schema | Backend | 🔴 P0 | TODO | 5 | All core tables |
| S1-03 | Setup Redis (local + ElastiCache) | DevOps | 🔴 P0 | TODO | 2 | Cache + queue |
| S1-04 | Configure GitHub Actions CI/CD | DevOps | 🔴 P0 | TODO | 3 | Lint, test, deploy |
| S1-05 | Create Figma design system | Designer | 🟠 P1 | TODO | 5 | Colors, typography, components |
| S1-06 | Setup AWS environments (dev/prod) | DevOps | 🔴 P0 | TODO | 3 | EC2, RDS, S3, CloudFront |
| S1-07 | Define all API contracts (OpenAPI) | Backend | 🟠 P1 | TODO | 3 | Share with Frontend |
| S1-08 | Setup Docker Compose for local dev | DevOps | 🔴 P0 | TODO | 2 | DB + Redis |
| S1-09 | Setup Stripe test account | PM | 🔴 P0 | TODO | 1 | Get API keys |
| S1-10 | Setup SendGrid account | PM | 🟠 P1 | TODO | 1 | Email templates |

**Sprint 1 Total:** 28 points

---

## SPRINT 2 (Week 3–4) — Auth & Products

| ID | Task | Assignee | Priority | Status | Story Points | Notes |
|----|------|----------|----------|--------|-------------|-------|
| S2-01 | User registration + login API | Backend | 🔴 P0 | TODO | 5 | JWT + bcrypt |
| S2-02 | Google OAuth integration | Backend | 🟠 P1 | TODO | 3 | Social login |
| S2-03 | JWT refresh token rotation | Backend | 🔴 P0 | TODO | 3 | httpOnly cookie |
| S2-04 | Product CRUD API | Backend | 🔴 P0 | TODO | 5 | + variants, images |
| S2-05 | Category management API | Backend | 🔴 P0 | TODO | 3 | Nested categories |
| S2-06 | Product search (full-text) | Backend | 🟠 P1 | TODO | 3 | PostgreSQL FTS |
| S2-07 | Image upload to S3 | Backend | 🟠 P1 | TODO | 3 | Resize + WebP convert |
| S2-08 | Login/Register UI | Frontend | 🔴 P0 | TODO | 3 | Forms + validation |
| S2-09 | Product listing page UI | Frontend | 🔴 P0 | TODO | 5 | Filters, pagination |
| S2-10 | Product detail page UI | Frontend | 🔴 P0 | TODO | 5 | Images, variants, reviews |
| S2-11 | Write auth unit tests | Backend | 🟠 P1 | TODO | 3 | Coverage > 80% |

**Sprint 2 Total:** 41 points

---

## SPRINT 3 (Week 5–6) — Cart & Checkout

| ID | Task | Assignee | Priority | Status | Story Points | Notes |
|----|------|----------|----------|--------|-------------|-------|
| S3-01 | Cart API (add/update/remove) | Backend | 🔴 P0 | TODO | 5 | Guest + auth carts |
| S3-02 | Checkout API | Backend | 🔴 P0 | TODO | 5 | Order creation |
| S3-03 | Stripe Payment Intent API | Backend | 🔴 P0 | TODO | 5 | Create + confirm |
| S3-04 | Stripe Webhook handler | Backend | 🔴 P0 | TODO | 3 | payment_intent.succeeded |
| S3-05 | Inventory deduction on order | Backend | 🔴 P0 | TODO | 3 | Atomic transaction |
| S3-06 | Order confirmation email | Backend | 🟠 P1 | TODO | 2 | SendGrid template |
| S3-07 | Discount code API | Backend | 🟡 P2 | TODO | 3 | Apply to cart |
| S3-08 | Cart UI (sidebar drawer) | Frontend | 🔴 P0 | TODO | 5 | Real-time update |
| S3-09 | Checkout page UI | Frontend | 🔴 P0 | TODO | 8 | Address + payment form |
| S3-10 | Order confirmation page | Frontend | 🔴 P0 | TODO | 2 | |
| S3-11 | Write checkout integration tests | QA | 🟠 P1 | TODO | 3 | |

**Sprint 3 Total:** 44 points

---

## SPRINT 4 (Week 7–8) — Admin & User Account

| ID | Task | Assignee | Priority | Status | Story Points | Notes |
|----|------|----------|----------|--------|-------------|-------|
| S4-01 | Admin: Dashboard API (KPIs) | Backend | 🔴 P0 | TODO | 5 | Revenue, orders, users |
| S4-02 | Admin: Order management API | Backend | 🔴 P0 | TODO | 3 | Status updates |
| S4-03 | Admin: Inventory management API | Backend | 🟠 P1 | TODO | 3 | Adjust stock |
| S4-04 | Admin: Customer list + detail | Backend | 🟡 P2 | TODO | 2 | |
| S4-05 | Admin: Revenue reports API | Backend | 🟡 P2 | TODO | 3 | Daily/weekly/monthly |
| S4-06 | Admin Dashboard UI | Frontend | 🔴 P0 | TODO | 8 | Charts (Recharts) |
| S4-07 | Admin: Product management UI | Frontend | 🔴 P0 | TODO | 5 | CRUD + image upload |
| S4-08 | Admin: Order list + detail UI | Frontend | 🔴 P0 | TODO | 5 | Update status |
| S4-09 | User: My Orders page | Frontend | 🔴 P0 | TODO | 3 | |
| S4-10 | User: Profile + address management | Frontend | 🟠 P1 | TODO | 3 | |
| S4-11 | User: Review + rating system | Frontend | 🟡 P2 | TODO | 3 | |

**Sprint 4 Total:** 43 points

---

## SPRINT 5 (Week 9–10) — QA, Performance & Launch

| ID | Task | Assignee | Priority | Status | Story Points | Notes |
|----|------|----------|----------|--------|-------------|-------|
| S5-01 | End-to-end tests (Playwright) | QA | 🔴 P0 | TODO | 8 | Critical user flows |
| S5-02 | Load test (k6, 1000 concurrent) | QA/DevOps | 🔴 P0 | TODO | 3 | Before launch |
| S5-03 | Security audit + pen test | Security | 🔴 P0 | TODO | 5 | OWASP Top 10 |
| S5-04 | SEO: meta tags, sitemap, robots.txt | Frontend | 🟠 P1 | TODO | 2 | |
| S5-05 | Performance: Core Web Vitals | Frontend | 🟠 P1 | TODO | 3 | LCP < 2.5s |
| S5-06 | Setup Datadog monitoring | DevOps | 🔴 P0 | TODO | 3 | APM + logs + alerts |
| S5-07 | Setup PagerDuty alerts | DevOps | 🟠 P1 | TODO | 1 | On-call rotation |
| S5-08 | Production deployment | DevOps | 🔴 P0 | TODO | 3 | Blue/green deploy |
| S5-09 | Soft launch (seed 50 test orders) | PM | 🔴 P0 | TODO | 2 | |
| S5-10 | Go-live checklist review | PM + All | 🔴 P0 | TODO | 2 | |
| S5-11 | Post-launch monitoring (48h) | DevOps | 🔴 P0 | TODO | 2 | |

**Sprint 5 Total:** 34 points

---

## PHASE 2 BACKLOG (Post-MVP)

| ID | Feature | Priority | Estimated Effort |
|----|---------|----------|-----------------|
| P2-01 | Subscription / recurring orders | 🟠 P1 | 3 weeks |
| P2-02 | AI supplement recommender | 🟡 P2 | 4 weeks |
| P2-03 | Loyalty points system | 🟡 P2 | 2 weeks |
| P2-04 | Affiliate / referral program | 🟡 P2 | 2 weeks |
| P2-05 | Mobile app (React Native) | 🟡 P2 | 8 weeks |
| P2-06 | Multi-language (ລາວ/EN/TH) | 🟡 P2 | 2 weeks |
| P2-07 | Multi-currency (LAK/USD/THB) | 🟡 P2 | 1 week |
| P2-08 | Algolia search | 🟡 P2 | 1 week |
| P2-09 | Live chat support (Intercom) | 🟢 P3 | 1 week |
| P2-10 | Blog / content marketing | 🟢 P3 | 2 weeks |

---

## GO-LIVE CHECKLIST

### Technical
- [ ] All P0 features deployed to production
- [ ] No open P0/P1 bugs
- [ ] Load test passed (1000 concurrent users, < 500ms p99)
- [ ] SSL certificate valid
- [ ] All environment variables set in production
- [ ] Database migrations applied
- [ ] Backup schedule confirmed (daily RDS snapshots)
- [ ] Monitoring alerts configured (uptime, error rate, response time)
- [ ] Stripe live keys configured (not test keys)
- [ ] Webhook endpoints verified in Stripe dashboard

### Business
- [ ] Product catalog seeded (min. 20 products)
- [ ] Shipping rates configured
- [ ] Tax rates configured
- [ ] Return/refund policy written
- [ ] Privacy policy + Terms of Service published
- [ ] Contact/support email working
- [ ] Social media accounts linked

### Marketing
- [ ] Google Analytics 4 installed
- [ ] Facebook Pixel installed
- [ ] Launch announcement ready
- [ ] Email list welcome sequence set up

---

## DAILY STANDUP TEMPLATE

```
Date: YYYY-MM-DD
Sprint: X | Day: X/10

✅ DONE YESTERDAY:
- [name]: [what was completed]

🔨 DOING TODAY:
- [name]: [task ID + description]

🚧 BLOCKERS:
- [name]: [blocker description + who can help]

📊 Sprint Burndown: [X] / [total] points remaining
```

---

## SPRINT RETROSPECTIVE TEMPLATE

```
Sprint: X | Date: YYYY-MM-DD
Velocity: [actual] / [planned] story points

👍 WHAT WENT WELL:
-

👎 WHAT DIDN'T GO WELL:
-

🔧 ACTION ITEMS FOR NEXT SPRINT:
- [action]: [owner] by [date]
```
