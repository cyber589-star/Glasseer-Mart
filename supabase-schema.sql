-- Run this in Supabase SQL Editor (Ctrl+Enter to execute all)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  sku TEXT,
  brand TEXT,
  category TEXT NOT NULL DEFAULT '',
  subcategory TEXT,
  description TEXT DEFAULT '',
  short_description TEXT DEFAULT '',
  cost_price NUMERIC DEFAULT 0,
  price NUMERIC NOT NULL DEFAULT 0,
  sale_price NUMERIC,
  discount_percentage NUMERIC,
  stock_quantity INT DEFAULT 0,
  low_stock_alert INT DEFAULT 0,
  inventory_status TEXT DEFAULT 'in_stock',
  featured_image TEXT,
  gallery_images JSONB DEFAULT '[]',
  variants JSONB DEFAULT '[]',
  specs JSONB DEFAULT '[]',
  features JSONB DEFAULT '[]',
  tags JSONB DEFAULT '[]',
  status TEXT DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT false,
  is_best_seller BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  rating NUMERIC DEFAULT 0,
  review_count INT DEFAULT 0,
  reviews JSONB DEFAULT '[]',
  seo JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  images JSONB DEFAULT '[]',
  colors JSONB DEFAULT '[]',
  in_stock BOOLEAN DEFAULT true,
  original_price NUMERIC
);
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname='idx_products_slug') THEN CREATE INDEX idx_products_slug ON products(slug); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname='idx_products_category') THEN CREATE INDEX idx_products_category ON products(category); END IF; END $$;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Public products') THEN CREATE POLICY "Public products" ON products FOR SELECT USING (true); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Admin products insert') THEN CREATE POLICY "Admin products insert" ON products FOR INSERT WITH CHECK (true); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Admin products update') THEN CREATE POLICY "Admin products update" ON products FOR UPDATE USING (true); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Admin products delete') THEN CREATE POLICY "Admin products delete" ON products FOR DELETE USING (true); END IF; END $$;

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  image TEXT DEFAULT '',
  count INT DEFAULT 0,
  description TEXT DEFAULT ''
);
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Public categories') THEN CREATE POLICY "Public categories" ON categories FOR SELECT USING (true); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Admin categories all') THEN CREATE POLICY "Admin categories all" ON categories FOR ALL USING (true); END IF; END $$;

-- Brands
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT DEFAULT '',
  logo TEXT DEFAULT '',
  product_count INT DEFAULT 0
);
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Public brands') THEN CREATE POLICY "Public brands" ON brands FOR SELECT USING (true); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Admin brands all') THEN CREATE POLICY "Admin brands all" ON brands FOR ALL USING (true); END IF; END $$;

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_mobile TEXT NOT NULL,
  customer_alt_phone TEXT DEFAULT '',
  province TEXT DEFAULT '',
  city TEXT DEFAULT '',
  address TEXT DEFAULT '',
  postal_code TEXT DEFAULT '',
  order_notes TEXT DEFAULT '',
  items JSONB DEFAULT '[]',
  delivery_charges NUMERIC DEFAULT 0,
  subtotal NUMERIC DEFAULT 0,
  total NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'pending',
  payment_method TEXT DEFAULT 'cod',
  tracking_number TEXT DEFAULT '',
  date TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Admin orders all') THEN CREATE POLICY "Admin orders all" ON orders FOR ALL USING (true); END IF; END $$;

-- Customers
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  alt_phone TEXT DEFAULT '',
  province TEXT DEFAULT '',
  city TEXT DEFAULT '',
  address TEXT DEFAULT '',
  orders INT DEFAULT 0,
  total_spent NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'active',
  joined_date TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Admin customers all') THEN CREATE POLICY "Admin customers all" ON customers FOR ALL USING (true); END IF; END $$;

-- Coupons
CREATE TABLE IF NOT EXISTS coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  type TEXT DEFAULT 'percentage',
  value NUMERIC DEFAULT 0,
  min_order NUMERIC DEFAULT 0,
  usage_limit INT DEFAULT 0,
  used_count INT DEFAULT 0,
  expires_at TIMESTAMPTZ,
  status TEXT DEFAULT 'active'
);
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Admin coupons all') THEN CREATE POLICY "Admin coupons all" ON coupons FOR ALL USING (true); END IF; END $$;

-- Inquiries
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  subject TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  date TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Admin inquiries all') THEN CREATE POLICY "Admin inquiries all" ON inquiries FOR ALL USING (true); END IF; END $$;

-- Subscribers
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'active'
);
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Admin subscribers all') THEN CREATE POLICY "Admin subscribers all" ON subscribers FOR ALL USING (true); END IF; END $$;

-- Media
CREATE TABLE IF NOT EXISTS media_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  name TEXT,
  type TEXT,
  size BIGINT DEFAULT 0,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE media_items ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Admin media all') THEN CREATE POLICY "Admin media all" ON media_items FOR ALL USING (true); END IF; END $$;

-- Home Content (single row)
CREATE TABLE IF NOT EXISTS home_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hero_title TEXT DEFAULT '',
  hero_subtitle TEXT DEFAULT '',
  hero_video_url TEXT DEFAULT '/images/hero-bg.mp4',
  hero_cta_text TEXT DEFAULT '',
  hero_cta_link TEXT DEFAULT '/shop',
  about_title TEXT DEFAULT '',
  about_text TEXT DEFAULT '',
  newsletter_title TEXT DEFAULT '',
  newsletter_text TEXT DEFAULT ''
);
ALTER TABLE home_content ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Public home_content') THEN CREATE POLICY "Public home_content" ON home_content FOR SELECT USING (true); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Admin home_content all') THEN CREATE POLICY "Admin home_content all" ON home_content FOR ALL USING (true); END IF; END $$;

-- Insert default home_content row
INSERT INTO home_content (id, hero_title, hero_subtitle, hero_cta_text, hero_cta_link, about_title, about_text, newsletter_title, newsletter_text)
VALUES (uuid_generate_v4(), '', '', '', '/shop', '', '', '', '')
ON CONFLICT DO NOTHING;

-- Storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true)
ON CONFLICT DO NOTHING;

DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Public images') THEN CREATE POLICY "Public images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images'); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Admin images upload') THEN CREATE POLICY "Admin images upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images'); END IF; END $$;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname='Admin images delete') THEN CREATE POLICY "Admin images delete" ON storage.objects FOR DELETE USING (bucket_id = 'product-images'); END IF; END $$;
