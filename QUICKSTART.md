# QUICKSTART

## Structure
```
fitness/
├── backend/    ← Express API            (port 3001)
├── web/        ← Customer Next.js app   (port 3000)
├── admin/      ← Admin Next.js dashboard(port 3002)
├── packages/types/  ← Shared TypeScript types
└── docker-compose.yml
```

## Step 1: Install
```bash
npm install -g pnpm
pnpm install
```

## Step 2: Environment
```bash
copy backend\.env.example backend\.env
copy web\.env.local.example web\.env.local
copy admin\.env.local.example admin\.env.local

# Edit backend/.env — set these 2 values:
# JWT_ACCESS_SECRET=any-random-32-char-string
# JWT_REFRESH_SECRET=another-random-32-char-string
```

## Step 3: Start database
```bash
docker-compose up -d
# Wait ~10 seconds
```

## Step 4: Setup database
```bash
pnpm db:migrate     # create tables
pnpm db:seed        # create admin user + products
```

## Step 5: Run everything
```bash
pnpm dev            # starts all 3 projects

# OR run individually:
pnpm dev:backend    # http://localhost:3001/api/v1
pnpm dev:web        # http://localhost:3000
pnpm dev:admin      # http://localhost:3002
```

## URLs
| Service | URL |
|---------|-----|
| Customer Site | http://localhost:3000 |
| Admin Dashboard | http://localhost:3002 |
| API | http://localhost:3001/api/v1 |
| API Health | http://localhost:3001/api/v1/health |
| PgAdmin | http://localhost:5050 |

## Test Credentials
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@fitstore.com | Admin123! |
| Customer | customer@fitstore.com | Customer123! |

## Backend Clean Architecture
```
backend/src/
├── config/          env.ts, database.ts, logger.ts
├── errors/          AppError.ts, HttpErrors.ts
├── middlewares/     auth, validate, rateLimiter, errorHandler, logger, notFound
├── schemas/         auth.schema.ts, product.schema.ts, order.schema.ts
├── repositories/    user.repository.ts, product.repository.ts
├── services/        auth.service.ts, product.service.ts
├── controllers/     auth.controller.ts, product.controller.ts
├── routes/          auth, product, health, index.ts
├── utils/           jwt, hash, response, asyncHandler, pagination
├── types/           express.d.ts, common.types.ts
├── app.ts           Express factory
└── server.ts        Entry point + graceful shutdown
```

## Admin Dashboard Routes
```
/login               ← Auth (only ADMIN/STAFF)
/dashboard           ← KPI cards + revenue chart
/orders              ← Order list with status filter
/orders/[id]         ← Order detail + status update
/products            ← Product catalog management
/customers           ← Customer list
/inventory           ← Stock levels + low stock alerts
```
