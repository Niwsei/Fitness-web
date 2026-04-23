# SYSTEM DESIGN DOCUMENT
## Fitness Supplement E-Commerce Platform
**Version:** 1.0 | **Date:** 2026-04-11

---

## 1. ARCHITECTURE OVERVIEW

```
                          ┌─────────────────────────────────┐
                          │         CLIENT LAYER             │
                          │   Next.js 15 (SSR + App Router) │
                          │   Mobile: React Native (Phase 2) │
                          └──────────────┬──────────────────┘
                                         │ HTTPS
                          ┌──────────────▼──────────────────┐
                          │         CDN LAYER                │
                          │   CloudFront (Static Assets)     │
                          │   Images via S3 + CloudFront     │
                          └──────────────┬──────────────────┘
                                         │
                          ┌──────────────▼──────────────────┐
                          │       API GATEWAY                │
                          │   AWS API Gateway / NGINX        │
                          │   Rate Limiting, Auth Middleware  │
                          └──────┬───────────────┬──────────┘
                                 │               │
              ┌──────────────────▼──┐   ┌────────▼─────────────┐
              │   API SERVER        │   │   BACKGROUND WORKERS  │
              │   Node.js + Fastify │   │   BullMQ + Redis      │
              │   (Stateless)       │   │   (Email, Inventory)  │
              └──────────────────┬──┘   └────────┬─────────────┘
                                 │               │
              ┌──────────────────▼───────────────▼──────────────┐
              │                  DATA LAYER                       │
              │  ┌─────────────┐  ┌──────────┐  ┌────────────┐  │
              │  │ PostgreSQL  │  │  Redis   │  │     S3     │  │
              │  │  (Primary)  │  │  Cache   │  │  (Images)  │  │
              │  │  RDS Multi- │  │  Session │  │            │  │
              │  │  AZ Failover│  │  Queue   │  │            │  │
              │  └─────────────┘  └──────────┘  └────────────┘  │
              └──────────────────────────────────────────────────┘
```

### Scaling Strategy
- **Horizontal Scaling:** API servers behind ALB, auto-scale 2–20 instances
- **Database:** Read replicas for product catalog queries
- **Cache:** Redis for sessions, product cache (TTL 5 min), cart data
- **CDN:** All images and static assets served via CloudFront

---

## 2. TECH STACK

### Frontend
| Component | Technology | Why |
|-----------|-----------|-----|
| Framework | Next.js 15 | SSR for SEO, App Router, fast |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS + shadcn/ui | Rapid development, consistent |
| State | Zustand | Lightweight, simple |
| Data fetching | TanStack Query | Caching, background refetch |
| Forms | React Hook Form + Zod | Validation |
| Payments | Stripe Elements | PCI compliant |

### Backend
| Component | Technology | Why |
|-----------|-----------|-----|
| Runtime | Node.js 22 LTS | Stable, ecosystem |
| Framework | Fastify | 2x faster than Express |
| Language | TypeScript | Type safety |
| ORM | Prisma | Type-safe queries, migrations |
| Auth | JWT + bcrypt + OAuth2 | Secure, standard |
| Queue | BullMQ + Redis | Reliable job processing |
| Email | SendGrid | Deliverability |
| Search | PostgreSQL Full-text / Algolia | Phase 1 / Phase 2 |

### Infrastructure
| Component | Technology |
|-----------|-----------|
| Cloud | AWS |
| Compute | EC2 (t3.medium) → Auto Scaling Groups |
| Database | RDS PostgreSQL 16 (Multi-AZ) |
| Cache | ElastiCache Redis |
| Storage | S3 + CloudFront |
| Container | Docker + ECS Fargate (Phase 2) |
| CI/CD | GitHub Actions |
| Monitoring | Datadog + PagerDuty |
| Secrets | AWS Secrets Manager |

---

## 3. DATABASE SCHEMA (ERD)

```sql
-- USERS
CREATE TABLE users (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email       VARCHAR(255) UNIQUE NOT NULL,
    password    VARCHAR(255),          -- null if OAuth
    first_name  VARCHAR(100) NOT NULL,
    last_name   VARCHAR(100) NOT NULL,
    phone       VARCHAR(20),
    role        ENUM('customer','admin','staff') DEFAULT 'customer',
    fitness_goal ENUM('muscle_gain','weight_loss','endurance','maintenance'),
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ADDRESSES
CREATE TABLE addresses (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID REFERENCES users(id),
    label       VARCHAR(50),           -- 'home', 'office'
    street      VARCHAR(255) NOT NULL,
    city        VARCHAR(100) NOT NULL,
    province    VARCHAR(100),
    country     CHAR(2) NOT NULL,      -- ISO 3166-1 alpha-2
    postal_code VARCHAR(20),
    is_default  BOOLEAN DEFAULT false
);

-- CATEGORIES
CREATE TABLE categories (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(100) NOT NULL,
    slug        VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    image_url   VARCHAR(500),
    parent_id   UUID REFERENCES categories(id),  -- for subcategories
    sort_order  INT DEFAULT 0
);

-- PRODUCTS
CREATE TABLE products (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku             VARCHAR(100) UNIQUE NOT NULL,
    name            VARCHAR(255) NOT NULL,
    slug            VARCHAR(255) UNIQUE NOT NULL,
    description     TEXT,
    short_desc      VARCHAR(500),
    category_id     UUID REFERENCES categories(id),
    brand           VARCHAR(100),
    price           DECIMAL(10,2) NOT NULL,
    compare_price   DECIMAL(10,2),          -- strike-through price
    cost_price      DECIMAL(10,2),          -- for margin calculation
    weight_grams    INT,
    is_active       BOOLEAN DEFAULT true,
    is_featured     BOOLEAN DEFAULT false,
    fitness_goals   TEXT[],                  -- ['muscle_gain','endurance']
    tags            TEXT[],
    meta_title      VARCHAR(255),
    meta_desc       VARCHAR(500),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- PRODUCT VARIANTS (size/flavor)
CREATE TABLE product_variants (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id      UUID REFERENCES products(id),
    sku             VARCHAR(100) UNIQUE NOT NULL,
    name            VARCHAR(100) NOT NULL,   -- '1kg Chocolate', '2kg Vanilla'
    price_modifier  DECIMAL(10,2) DEFAULT 0,
    stock_quantity  INT NOT NULL DEFAULT 0,
    low_stock_alert INT DEFAULT 10,
    weight_grams    INT,
    is_active       BOOLEAN DEFAULT true
);

-- PRODUCT IMAGES
CREATE TABLE product_images (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id  UUID REFERENCES products(id),
    url         VARCHAR(500) NOT NULL,
    alt_text    VARCHAR(255),
    sort_order  INT DEFAULT 0,
    is_primary  BOOLEAN DEFAULT false
);

-- ORDERS
CREATE TABLE orders (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number    VARCHAR(20) UNIQUE NOT NULL,  -- 'FIT-2026-00001'
    user_id         UUID REFERENCES users(id),
    status          ENUM('pending','confirmed','processing','shipped','delivered','cancelled','refunded'),
    payment_status  ENUM('pending','paid','failed','refunded'),
    payment_method  VARCHAR(50),
    stripe_payment_id VARCHAR(255),
    subtotal        DECIMAL(10,2) NOT NULL,
    shipping_fee    DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    tax_amount      DECIMAL(10,2) DEFAULT 0,
    total           DECIMAL(10,2) NOT NULL,
    currency        CHAR(3) DEFAULT 'USD',
    shipping_addr   JSONB NOT NULL,             -- snapshot of address
    notes           TEXT,
    shipped_at      TIMESTAMPTZ,
    delivered_at    TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ORDER ITEMS
CREATE TABLE order_items (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id        UUID REFERENCES orders(id),
    product_id      UUID REFERENCES products(id),
    variant_id      UUID REFERENCES product_variants(id),
    product_name    VARCHAR(255) NOT NULL,   -- snapshot
    variant_name    VARCHAR(100),            -- snapshot
    quantity        INT NOT NULL,
    unit_price      DECIMAL(10,2) NOT NULL,  -- price at time of purchase
    total_price     DECIMAL(10,2) NOT NULL
);

-- CARTS (persisted to DB for cross-device)
CREATE TABLE carts (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID REFERENCES users(id),
    session_id  VARCHAR(255),               -- for guest carts
    expires_at  TIMESTAMPTZ,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE cart_items (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id     UUID REFERENCES carts(id),
    variant_id  UUID REFERENCES product_variants(id),
    quantity    INT NOT NULL DEFAULT 1,
    added_at    TIMESTAMPTZ DEFAULT NOW()
);

-- DISCOUNT CODES
CREATE TABLE discount_codes (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code            VARCHAR(50) UNIQUE NOT NULL,
    type            ENUM('percentage','fixed_amount','free_shipping'),
    value           DECIMAL(10,2) NOT NULL,
    min_order_value DECIMAL(10,2),
    max_uses        INT,
    used_count      INT DEFAULT 0,
    valid_from      TIMESTAMPTZ,
    valid_until     TIMESTAMPTZ,
    is_active       BOOLEAN DEFAULT true
);

-- REVIEWS
CREATE TABLE reviews (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id  UUID REFERENCES products(id),
    user_id     UUID REFERENCES users(id),
    order_id    UUID REFERENCES orders(id),  -- verified purchase
    rating      SMALLINT CHECK (rating BETWEEN 1 AND 5),
    title       VARCHAR(255),
    body        TEXT,
    is_approved BOOLEAN DEFAULT false,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- INVENTORY MOVEMENTS (audit log)
CREATE TABLE inventory_movements (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    variant_id  UUID REFERENCES product_variants(id),
    type        ENUM('purchase','sale','adjustment','return','damage'),
    quantity    INT NOT NULL,               -- positive = in, negative = out
    reference   VARCHAR(255),              -- order_id or PO number
    note        TEXT,
    created_by  UUID REFERENCES users(id),
    created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### Key Indexes
```sql
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_active ON products(is_active, is_featured);
CREATE INDEX idx_orders_user ON orders(user_id, created_at DESC);
CREATE INDEX idx_orders_status ON orders(status, payment_status);
CREATE INDEX idx_variants_product ON product_variants(product_id);
CREATE INDEX idx_reviews_product ON reviews(product_id, is_approved);
```

---

## 4. API DESIGN

### Base URL: `https://api.fitstore.com/v1`

### Authentication
```
POST /auth/register
POST /auth/login
POST /auth/logout
POST /auth/refresh
POST /auth/forgot-password
POST /auth/reset-password
GET  /auth/me
```

### Products
```
GET    /products                 # list with filters
GET    /products/:slug           # product detail
GET    /products/search?q=       # search
GET    /products/featured        # featured products
GET    /categories               # all categories
GET    /categories/:slug/products
```

### Cart
```
GET    /cart                     # get current cart
POST   /cart/items               # add item
PATCH  /cart/items/:id           # update quantity
DELETE /cart/items/:id           # remove item
DELETE /cart                     # clear cart
POST   /cart/apply-coupon        # apply discount code
```

### Orders
```
POST   /orders                   # create order (checkout)
GET    /orders                   # user order history
GET    /orders/:id               # order detail
POST   /orders/:id/cancel        # cancel order
```

### Payments
```
POST   /payments/create-intent   # Stripe PaymentIntent
POST   /payments/webhook         # Stripe webhooks (internal)
```

### Admin (role: admin/staff)
```
GET    /admin/dashboard          # KPI summary
GET    /admin/orders             # all orders with filters
PATCH  /admin/orders/:id/status  # update order status
GET    /admin/products           # product management
POST   /admin/products           # create product
PATCH  /admin/products/:id       # update product
DELETE /admin/products/:id       # soft delete
GET    /admin/inventory          # inventory levels
POST   /admin/inventory/adjust   # manual adjustment
GET    /admin/customers          # customer list
GET    /admin/reports/revenue    # revenue reports
```

### Response Format
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 145,
    "totalPages": 8
  }
}
```

### Error Format
```json
{
  "success": false,
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Product with slug 'whey-protein-gold' not found",
    "statusCode": 404
  }
}
```

---

## 5. SECURITY DESIGN

### Authentication & Authorization
- JWT Access Token (15 min expiry) + Refresh Token (7 days, httpOnly cookie)
- Passwords hashed with bcrypt (cost factor 12)
- Role-based access control (RBAC): customer / staff / admin
- Rate limiting: 100 req/min per IP, 1000 req/min per authenticated user
- Google OAuth2 for social login

### Data Protection
- All data in transit: TLS 1.3
- Sensitive data at rest: AES-256 encryption (AWS RDS)
- PCI DSS: Card data handled by Stripe only (no storage)
- GDPR: User data export + deletion endpoints

### Input Validation
- All inputs validated with Zod schemas
- SQL injection: prevented by Prisma parameterized queries
- XSS: Content-Security-Policy headers, sanitize user content
- CSRF: SameSite cookies + CSRF tokens

---

## 6. PERFORMANCE TARGETS

| Endpoint | Target P99 |
|----------|-----------|
| Product listing | < 200ms |
| Product detail | < 100ms (cached) |
| Search | < 500ms |
| Cart operations | < 200ms |
| Checkout | < 1000ms |
| Admin dashboard | < 1000ms |

### Caching Strategy
```
Product catalog     → Redis cache, TTL: 5 minutes
Product detail      → Redis cache, TTL: 5 minutes
Homepage featured   → Redis cache, TTL: 10 minutes
User session        → Redis, TTL: 7 days
Static assets       → CloudFront, TTL: 1 year (immutable)
Images              → CloudFront, TTL: 30 days
```

---

## 7. FOLDER STRUCTURE

```
fitness-store/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── app/                # App Router pages
│   │   │   ├── (shop)/         # Public shop routes
│   │   │   ├── account/        # User account
│   │   │   └── admin/          # Admin dashboard
│   │   ├── components/
│   │   │   ├── ui/             # shadcn base components
│   │   │   ├── shop/           # Shop-specific components
│   │   │   └── admin/          # Admin components
│   │   └── lib/                # Utils, API client
│   │
│   └── api/                    # Fastify backend
│       ├── src/
│       │   ├── routes/         # Route handlers
│       │   ├── services/       # Business logic
│       │   ├── repositories/   # Database queries
│       │   ├── middlewares/    # Auth, rate limit, etc.
│       │   ├── schemas/        # Zod validation schemas
│       │   ├── jobs/           # BullMQ background jobs
│       │   └── lib/            # Stripe, SendGrid, Redis
│       └── prisma/
│           ├── schema.prisma
│           └── migrations/
│
├── packages/
│   ├── types/                  # Shared TypeScript types
│   └── utils/                  # Shared utilities
│
├── docker-compose.yml          # Local dev environment
├── .github/workflows/          # CI/CD
└── turbo.json                  # Turborepo config
```
