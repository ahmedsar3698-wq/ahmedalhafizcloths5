import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BrandSettings } from '../types';

let supabaseInstance: SupabaseClient | null = null;

export const getSupabaseClient = (settings?: BrandSettings): SupabaseClient | null => {
  const url = settings?.supabaseUrl || import.meta.env.VITE_SUPABASE_URL;
  const anonKey = settings?.supabaseAnonKey || import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !anonKey || url.trim() === '' || anonKey.trim() === '') {
    return null;
  }

  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(url.trim(), anonKey.trim());
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
      return null;
    }
  }

  return supabaseInstance;
};

export const resetSupabaseClient = () => {
  supabaseInstance = null;
};

/**
 * Uploads an image file to Supabase Storage if configured.
 * Otherwise returns a base64 Data URL so local uploads still work seamlessly without errors.
 */
export const uploadProductImage = async (
  file: File,
  settings?: BrandSettings
): Promise<{ url: string; isCloud: boolean }> => {
  const client = getSupabaseClient(settings);
  const bucketName = settings?.supabaseStorageBucket || 'product-images';

  if (client) {
    try {
      const fileExt = file.name.split('.').pop() || 'jpg';
      const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `fabrics/${cleanFileName}`;

      const { error: uploadError } = await client.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        console.warn('Supabase upload error, falling back to local data URL:', uploadError.message);
      } else {
        const { data: publicUrlData } = client.storage
          .from(bucketName)
          .getPublicUrl(filePath);

        if (publicUrlData?.publicUrl) {
          return { url: publicUrlData.publicUrl, isCloud: true };
        }
      }
    } catch (err) {
      console.warn('Supabase storage exception, falling back to local data URL:', err);
    }
  }

  // Graceful high-fidelity local upload fallback (Base64 Data URL)
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({ url: reader.result as string, isCloud: false });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

/**
 * SQL Schema script that the admin can copy and execute in Supabase SQL Editor
 */
export const SUPABASE_SQL_SCHEMA = `-- AL HAFIZ CLOTHS DATABASE SCHEMA & STORAGE SETUP
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
  category_name TEXT,
  description TEXT,
  fabric_type TEXT NOT NULL,
  cutting TEXT DEFAULT '4.5 Gaz (4.1 Meters) - Complete Suit',
  width TEXT DEFAULT '54 Inches (Bara Arzz)',
  season TEXT DEFAULT 'All Season',
  capry_guarantee BOOLEAN DEFAULT TRUE,
  capry_guarantee_text TEXT,
  color_guarantee BOOLEAN DEFAULT TRUE,
  quality_badge TEXT DEFAULT 'Premium Quality',
  colors JSONB DEFAULT '[]'::jsonb,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  thumbnail TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_best_seller BOOLEAN DEFAULT FALSE,
  is_new_arrival BOOLEAN DEFAULT FALSE,
  in_stock BOOLEAN DEFAULT TRUE,
  rating NUMERIC DEFAULT 5.0,
  reviews_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  special_instructions TEXT,
  items JSONB NOT NULL,
  subtotal NUMERIC NOT NULL,
  delivery_charge NUMERIC NOT NULL,
  total NUMERIC NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 5. Public read access policies
CREATE POLICY "Allow public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read orders" ON public.orders FOR SELECT USING (true);

-- 6. Storage bucket policy for product-images
-- Note: Create a public bucket named "product-images" in Supabase Storage dashboard
-- Or run:
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY "Allow public upload to product-images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow public select from product-images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'product-images');
`;
