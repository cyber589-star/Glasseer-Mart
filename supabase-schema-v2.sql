-- =============================================================
-- GLASEER MART - PRODUCTION SCHEMA V2
-- Run this entire script in Supabase SQL Editor
-- WARNING: Drops ALL existing tables before recreating
-- =============================================================

-- Drop everything in dependency order
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS wishlist_items CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS customer_addresses CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS product_images CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS coupons CASCADE;
DROP TABLE IF EXISTS inquiries CASCADE;
DROP TABLE IF EXISTS subscribers CASCADE;
DROP TABLE IF EXISTS media_items CASCADE;
DROP TABLE IF EXISTS home_content CASCADE;
DROP TABLE IF EXISTS admin_sessions CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================
-- 1. CATEGORIES (hierarchical)
-- =============================================================
CREATE TABLE categories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT DEFAULT '',
  image       TEXT DEFAULT '',
  parent_id   UUID REFERENCES categories(id) ON DELETE SET NULL,
  sort_order  INT DEFAULT 0,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_active ON categories(is_active);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Admin all categories"    ON categories FOR ALL USING (true);

-- =============================================================
-- 2. PRODUCTS
-- =============================================================
CREATE TABLE products (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  description     TEXT DEFAULT '',
  category        TEXT DEFAULT '',
  price           NUMERIC NOT NULL DEFAULT 0,
  compare_price   NUMERIC DEFAULT 0,
  shipping_fee    NUMERIC DEFAULT 0,
  tax             NUMERIC DEFAULT 0,
  images          JSONB DEFAULT '[]',
  colors          JSONB DEFAULT '[]',
  features        JSONB DEFAULT '[]',
  specs           JSONB DEFAULT '[]',
  tags            JSONB DEFAULT '[]',
  is_featured     BOOLEAN DEFAULT false,
  is_best_seller  BOOLEAN DEFAULT false,
  is_new          BOOLEAN DEFAULT false,
  in_stock        BOOLEAN DEFAULT true,
  is_active       BOOLEAN DEFAULT true,
  rating          NUMERIC DEFAULT 0,
  review_count    INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_slug        ON products(slug);
CREATE INDEX idx_products_category    ON products(category);
CREATE INDEX idx_products_active      ON products(is_active);
CREATE INDEX idx_products_featured    ON products(is_featured) WHERE is_featured = true;
CREATE INDEX idx_products_bestseller  ON products(is_best_seller) WHERE is_best_seller = true;
CREATE INDEX idx_products_new         ON products(is_new) WHERE is_new = true;
CREATE INDEX idx_products_created     ON products(created_at DESC);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read products" ON products FOR SELECT USING (is_active = true OR (SELECT count(*) FROM pg_policies) > 0);
CREATE POLICY "Admin all products"   ON products FOR ALL USING (true);

-- =============================================================
-- 3. PRODUCT IMAGES
-- =============================================================
CREATE TABLE product_images (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  alt         TEXT DEFAULT '',
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_product_images_product ON product_images(product_id);

ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read product_images" ON product_images FOR SELECT USING (true);
CREATE POLICY "Admin all product_images"   ON product_images FOR ALL USING (true);

-- =============================================================
-- 4. CUSTOMERS
-- =============================================================
CREATE TABLE customers (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT NOT NULL,
  email         TEXT,
  phone         TEXT,
  alt_phone     TEXT DEFAULT '',
  orders_count  INT DEFAULT 0,
  total_spent   NUMERIC DEFAULT 0,
  status        TEXT DEFAULT 'active',
  notes         TEXT DEFAULT '',
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_customers_email ON customers(email) WHERE email IS NOT NULL AND email != '';
CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_customers_created ON customers(created_at DESC);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin all customers" ON customers FOR ALL USING (true);
CREATE POLICY "Customer read own"   ON customers FOR SELECT USING (true);

-- =============================================================
-- 5. CUSTOMER ADDRESSES
-- =============================================================
CREATE TABLE customer_addresses (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  label       TEXT DEFAULT 'Home',
  full_name   TEXT NOT NULL,
  phone       TEXT NOT NULL,
  province    TEXT DEFAULT '',
  city        TEXT DEFAULT '',
  address     TEXT DEFAULT '',
  postal_code TEXT DEFAULT '',
  is_default  BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_customer_addresses_customer ON customer_addresses(customer_id);

ALTER TABLE customer_addresses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin all addresses"     ON customer_addresses FOR ALL USING (true);
CREATE POLICY "Customer own addresses"  ON customer_addresses FOR ALL USING (true);

-- =============================================================
-- 6. ORDERS
-- =============================================================
CREATE TABLE orders (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id       UUID REFERENCES customers(id) ON DELETE SET NULL,
  customer_name     TEXT NOT NULL,
  customer_email    TEXT NOT NULL,
  customer_mobile   TEXT NOT NULL,
  customer_alt_phone TEXT DEFAULT '',
  province          TEXT DEFAULT '',
  city              TEXT DEFAULT '',
  address           TEXT DEFAULT '',
  postal_code       TEXT DEFAULT '',
  order_notes       TEXT DEFAULT '',
  items             JSONB DEFAULT '[]',
  delivery_charges  NUMERIC DEFAULT 0,
  subtotal          NUMERIC DEFAULT 0,
  total             NUMERIC DEFAULT 0,
  status            TEXT DEFAULT 'pending' CHECK (status IN ('pending','processing','shipped','completed','failed','cancelled')),
  payment_method    TEXT DEFAULT 'cod' CHECK (payment_method IN ('cod','card')),
  tracking_number   TEXT DEFAULT '',
  date              TIMESTAMPTZ DEFAULT NOW(),
  needs_power       BOOLEAN DEFAULT false,
  power_type        TEXT DEFAULT '',
  prescription_image TEXT DEFAULT '',
  lens_type         TEXT DEFAULT '',
  lens_price        NUMERIC DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status   ON orders(status);
CREATE INDEX idx_orders_date     ON orders(date DESC);
CREATE INDEX idx_orders_tracking ON orders(tracking_number);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin all orders"  ON orders FOR ALL USING (true);
CREATE POLICY "Customer own orders" ON orders FOR SELECT USING (true);

-- =============================================================
-- 7. ORDER ITEMS (normalized, not JSONB)
-- =============================================================
CREATE TABLE order_items (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id      UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id    UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name  TEXT NOT NULL,
  product_image TEXT DEFAULT '',
  price         NUMERIC NOT NULL,
  quantity      INT NOT NULL DEFAULT 1,
  variant       TEXT DEFAULT '',
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_order_items_order   ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin all order_items" ON order_items FOR ALL USING (true);
CREATE POLICY "Customer own items"    ON order_items FOR SELECT USING (true);

-- =============================================================
-- 8. REVIEWS & RATINGS
-- =============================================================
CREATE TABLE reviews (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id    UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  customer_id   UUID REFERENCES customers(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT DEFAULT '',
  rating        INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title         TEXT DEFAULT '',
  comment       TEXT DEFAULT '',
  is_featured   BOOLEAN DEFAULT false,
  is_approved   BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reviews_product   ON reviews(product_id);
CREATE INDEX idx_reviews_approved  ON reviews(is_approved);
CREATE INDEX idx_reviews_featured  ON reviews(is_featured) WHERE is_featured = true;

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read reviews"    ON reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Admin all reviews"      ON reviews FOR ALL USING (true);
CREATE POLICY "Customer own reviews"   ON reviews FOR ALL USING (true);

-- =============================================================
-- 9. COUPONS
-- =============================================================
CREATE TABLE coupons (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code         TEXT NOT NULL UNIQUE,
  type         TEXT DEFAULT 'percentage' CHECK (type IN ('percentage','fixed')),
  value        NUMERIC DEFAULT 0,
  min_order    NUMERIC DEFAULT 0,
  usage_limit  INT DEFAULT 0,
  used_count   INT DEFAULT 0,
  is_active    BOOLEAN DEFAULT true,
  expires_at   TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_coupons_code    ON coupons(code);
CREATE INDEX idx_coupons_active  ON coupons(is_active);

ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read coupons"  ON coupons FOR SELECT USING (is_active = true AND (expires_at IS NULL OR expires_at > NOW()));
CREATE POLICY "Admin all coupons"    ON coupons FOR ALL USING (true);

-- =============================================================
-- 10. WISHLIST
-- =============================================================
CREATE TABLE wishlist_items (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(customer_id, product_id)
);

CREATE INDEX idx_wishlist_customer ON wishlist_items(customer_id);
CREATE INDEX idx_wishlist_product  ON wishlist_items(product_id);

ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin all wishlist"    ON wishlist_items FOR ALL USING (true);
CREATE POLICY "Customer own wishlist" ON wishlist_items FOR ALL USING (true);

-- =============================================================
-- 11. INQUIRIES (contact form)
-- =============================================================
CREATE TABLE inquiries (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  email       TEXT,
  phone       TEXT,
  subject     TEXT DEFAULT '',
  message     TEXT DEFAULT '',
  status      TEXT DEFAULT 'new' CHECK (status IN ('new','read','replied')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_date   ON inquiries(created_at DESC);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin all inquiries"     ON inquiries FOR ALL USING (true);

-- =============================================================
-- 12. SUBSCRIBERS (newsletter)
-- =============================================================
CREATE TABLE subscribers (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email         TEXT NOT NULL UNIQUE,
  status        TEXT DEFAULT 'active' CHECK (status IN ('active','unsubscribed')),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscribers_email ON subscribers(email);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert subscribers" ON subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin all subscribers"     ON subscribers FOR ALL USING (true);

-- =============================================================
-- 13. MEDIA ITEMS (uploaded files)
-- =============================================================
CREATE TABLE media_items (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url         TEXT NOT NULL,
  name        TEXT DEFAULT '',
  type        TEXT DEFAULT '',
  size        BIGINT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_media_items_created ON media_items(created_at DESC);

ALTER TABLE media_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read media" ON media_items FOR SELECT USING (true);
CREATE POLICY "Admin all media"   ON media_items FOR ALL USING (true);

-- =============================================================
-- 14. HOME CONTENT (single row)
-- =============================================================
CREATE TABLE home_content (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hero_title        TEXT DEFAULT '',
  hero_subtitle     TEXT DEFAULT '',
  hero_video_url    TEXT DEFAULT '/images/hero-bg.mp4',
  hero_cta_text     TEXT DEFAULT '',
  hero_cta_link     TEXT DEFAULT '/shop',
  about_title       TEXT DEFAULT '',
  about_text        TEXT DEFAULT '',
  newsletter_title  TEXT DEFAULT '',
  newsletter_text   TEXT DEFAULT '',
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE home_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read home_content" ON home_content FOR SELECT USING (true);
CREATE POLICY "Admin all home_content"   ON home_content FOR ALL USING (true);

INSERT INTO home_content (hero_title, hero_subtitle, hero_cta_text, hero_cta_link, about_title, about_text, newsletter_title, newsletter_text)
VALUES ('', '', '', '/shop', '', '', '', '')
ON CONFLICT DO NOTHING;

-- =============================================================
-- 15. NOTIFICATIONS (admin alerts)
-- =============================================================
CREATE TABLE notifications (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type        TEXT DEFAULT 'info' CHECK (type IN ('info','order','review','inquiry')),
  title       TEXT NOT NULL,
  message     TEXT DEFAULT '',
  is_read     BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_read    ON notifications(is_read);
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin all notifications" ON notifications FOR ALL USING (true);

-- =============================================================
-- 16. STORAGE BUCKET
-- =============================================================
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop ALL possible policy names (old + new) to make this idempotent
DROP POLICY IF EXISTS "Public images" ON storage.objects;
DROP POLICY IF EXISTS "Public images read" ON storage.objects;
DROP POLICY IF EXISTS "Admin images upload" ON storage.objects;
DROP POLICY IF EXISTS "Admin images update" ON storage.objects;
DROP POLICY IF EXISTS "Admin images delete" ON storage.objects;

CREATE POLICY "Public images read"   ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Admin images upload"  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');
CREATE POLICY "Admin images update"  ON storage.objects FOR UPDATE USING (bucket_id = 'product-images');
CREATE POLICY "Admin images delete"  ON storage.objects FOR DELETE USING (bucket_id = 'product-images');

-- =============================================================
-- SEED DATA: Default categories
-- =============================================================
INSERT INTO categories (id, name, slug, description, sort_order) VALUES
  (uuid_generate_v4(), 'Fashion',      'fashion',      'Trendy fashion eyewear', 1),
  (uuid_generate_v4(), 'Sunglasses',   'sunglasses',   'Premium sunglasses',    2),
  (uuid_generate_v4(), 'Prescription', 'prescription', 'Prescription glasses',  3),
  (uuid_generate_v4(), 'Computer',     'computer',     'Blue light blocking',   4),
  (uuid_generate_v4(), 'Premium',      'premium',      'Luxury collection',     5),
  (uuid_generate_v4(), 'Sport',        'sport',        'Sport & performance',   6)
ON CONFLICT (slug) DO NOTHING;
