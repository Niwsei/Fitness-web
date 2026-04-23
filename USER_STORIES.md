# USER STORIES
## Fitness Supplement E-Commerce Platform
**Format:** As a [user], I want to [action] so that [benefit]

---

## CUSTOMER STORIES

### Authentication
**US-001** — Registration  
As a new visitor, I want to create an account with email/password or Google so that I can track my orders and save my preferences.  
**Acceptance Criteria:**
- Email must be unique
- Password min 8 chars, must include number
- Receive welcome email after registration
- Can sign up with Google in 1 click

**US-002** — Login  
As a returning customer, I want to log in quickly so that I can access my account and continue shopping.  
**Acceptance Criteria:**
- Login with email + password
- Login with Google OAuth
- "Remember me" option (30-day session)
- Locked after 5 failed attempts

**US-003** — Password Reset  
As a customer who forgot their password, I want to reset it via email so that I can regain access.

---

### Browsing & Discovery

**US-010** — Browse Products  
As a customer, I want to browse supplements by category so that I can discover products relevant to my goals.  
**Acceptance Criteria:**
- Filter by: category, brand, price range, fitness goal
- Sort by: newest, price (asc/desc), popularity, rating
- Pagination (20 items per page)
- Show stock status (In Stock / Low Stock / Out of Stock)

**US-011** — Search  
As a customer, I want to search for specific products so that I can find what I need quickly.  
**Acceptance Criteria:**
- Search by name, brand, ingredient
- Results appear within 500ms
- Autocomplete suggestions
- "No results" shows related products

**US-012** — Product Detail  
As a customer, I want to see detailed product information so that I can make an informed purchase decision.  
**Acceptance Criteria:**
- Multiple product images (zoom on hover)
- Select variant (flavor, size)
- Price, compare price (with discount %)
- Nutritional facts / ingredients
- Customer reviews with average rating
- "Frequently bought together" suggestions

**US-013** — Fitness Goal Filter  
As a customer focused on muscle gain, I want to filter products by my goal so that I only see relevant supplements.  
**Acceptance Criteria:**
- Goals: Muscle Gain, Weight Loss, Endurance, General Health
- Filter persists during session
- Product badges show compatible goals

---

### Cart & Checkout

**US-020** — Add to Cart  
As a customer, I want to add products to my cart so that I can purchase multiple items in one order.  
**Acceptance Criteria:**
- Add from product listing or detail page
- Select variant before adding (if variants exist)
- Cart count updates in header immediately
- "Added to cart" confirmation toast

**US-021** — View & Edit Cart  
As a customer, I want to review my cart before checkout so that I can adjust quantities or remove items.  
**Acceptance Criteria:**
- Slide-out cart drawer
- Update quantity (min 1, max available stock)
- Remove individual items
- Show subtotal, estimated shipping
- "Continue shopping" + "Checkout" buttons

**US-022** — Apply Discount Code  
As a customer with a coupon, I want to apply a discount code so that I can get a reduced price.  
**Acceptance Criteria:**
- Code input field in cart
- Show discount amount after applying
- Error message for invalid/expired codes
- Only one code per order

**US-023** — Checkout  
As a customer ready to buy, I want to complete checkout quickly so that I can receive my order.  
**Acceptance Criteria:**
- Step 1: Shipping address (saved addresses auto-fill)
- Step 2: Shipping method selection
- Step 3: Payment (Stripe card or saved card)
- Order summary visible throughout
- Complete in < 3 minutes

**US-024** — Guest Checkout  
As a visitor, I want to checkout without creating an account so that I can buy quickly.  
**Acceptance Criteria:**
- Enter email for order confirmation
- Optional: "Create account with this email" post-checkout
- Cart persists for 7 days via session

---

### Orders & Account

**US-030** — Order Confirmation  
As a customer who just purchased, I want to receive immediate confirmation so that I know my order was placed.  
**Acceptance Criteria:**
- Confirmation page with order number
- Email confirmation within 2 minutes
- Contains: items, total, estimated delivery

**US-031** — Track Order  
As a customer, I want to track my order status so that I know when to expect delivery.  
**Acceptance Criteria:**
- Status: Confirmed → Processing → Shipped → Delivered
- Tracking number + carrier link when shipped
- Email notification at each status change

**US-032** — Order History  
As a customer, I want to view my past orders so that I can reorder or track previous purchases.  
**Acceptance Criteria:**
- List of orders (newest first)
- Order status, date, total
- Click to see full order detail
- "Buy again" button on items

**US-033** — Write a Review  
As a customer who received their order, I want to leave a product review so that I can help other customers.  
**Acceptance Criteria:**
- Only available for purchased + delivered products
- Rating (1–5 stars) + optional title + body
- Reviewer name shown (not email)
- Review appears after admin approval

---

## ADMIN STORIES

**US-100** — Dashboard Overview  
As an admin, I want to see key metrics at a glance so that I can monitor business health.  
**Acceptance Criteria:**
- Today's revenue, orders, new customers
- Charts: revenue (7/30/90 days), orders by status
- Low stock alerts (< 10 units)
- Recent orders feed

**US-101** — Manage Orders  
As an admin, I want to view and update order statuses so that I can fulfill orders efficiently.  
**Acceptance Criteria:**
- Filter by: status, date range, payment status
- Update status with note
- Print packing slip
- Email customer on status change

**US-102** — Manage Products  
As an admin, I want to add and edit products so that I can keep the catalog up to date.  
**Acceptance Criteria:**
- Create product with all fields
- Upload multiple images (drag & drop)
- Add/edit variants (flavor, size)
- Duplicate product for quick setup
- Bulk activate/deactivate

**US-103** — Inventory Management  
As an admin, I want to track stock levels so that I can prevent overselling.  
**Acceptance Criteria:**
- View current stock per variant
- Low stock alerts (configurable threshold)
- Manual stock adjustment with reason
- Inventory movement history/log

**US-104** — Discount Code Management  
As an admin, I want to create discount codes so that I can run promotions.  
**Acceptance Criteria:**
- Type: % off, fixed amount, free shipping
- Set usage limits + expiry date
- View usage statistics per code

**US-105** — Revenue Reports  
As an admin, I want to view revenue reports so that I can analyze business performance.  
**Acceptance Criteria:**
- Revenue by: day, week, month, custom range
- Top selling products
- Revenue by category
- Export to CSV

---

## STORY POINT SCALE

| Points | Effort | Example |
|--------|--------|---------|
| 1 | Trivial (< 1 hour) | Update copy, toggle feature flag |
| 2 | Small (2-4 hours) | Simple API endpoint |
| 3 | Medium (4-8 hours) | CRUD with validation |
| 5 | Large (1-2 days) | Complex feature with UI + API |
| 8 | X-Large (2-3 days) | Major flow (checkout, admin dashboard) |
| 13 | Epic — break it down | Subscription system, mobile app |
