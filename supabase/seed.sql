-- ============================================================
-- ONENEXT — Database Setup & Seed
-- Run this entire file in your Supabase SQL Editor
-- ============================================================

-- 1. Create products table
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  price numeric(10,2) not null,
  original_price numeric(10,2),
  category text not null,
  emoji text not null default '📦',
  badge text check (badge in ('sale', 'new', 'hot', null)),
  rating numeric(2,1) not null default 4.0 check (rating >= 1 and rating <= 5),
  stock int not null default 100,
  created_at timestamptz default now()
);

-- 2. Enable RLS and allow public reads
alter table products enable row level security;

create policy "Public can read products"
  on products for select
  to anon, authenticated
  using (true);

-- 3. Create newsletter_subscribers table (if not already done)
create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);

alter table newsletter_subscribers enable row level security;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'newsletter_subscribers'
      AND policyname = 'Allow public inserts'
  ) THEN
    CREATE POLICY "Allow public inserts"
      ON public.newsletter_subscribers
      FOR INSERT
      TO anon, authenticated
      WITH CHECK (true);
  END IF;
END $$;

-- 4. Seed 100 products
insert into products (name, description, price, original_price, category, emoji, badge, rating) values

-- FASHION (18 products)
('Classic White Tee', 'Premium 100% cotton crew neck t-shirt. Soft, breathable, and perfect for everyday wear.', 29.99, null, 'Fashion', '👕', 'new', 4.5),
('Slim Fit Chinos', 'Modern slim fit chinos in stretch cotton. Available in multiple colors.', 59.99, 79.99, 'Fashion', '👖', 'sale', 4.3),
('Urban Runner Sneakers', 'Lightweight running shoes with memory foam insole and breathable mesh upper.', 89.99, null, 'Fashion', '👟', 'new', 4.7),
('Leather Chelsea Boots', 'Genuine leather Chelsea boots with elastic side panels. Timeless style.', 149.99, 189.99, 'Fashion', '👢', 'sale', 4.6),
('Floral Summer Dress', 'Lightweight floral print dress perfect for warm weather. Midi length.', 49.99, null, 'Fashion', '👗', null, 4.4),
('Denim Jacket', 'Classic denim jacket with button front and chest pockets. Versatile layering piece.', 79.99, 99.99, 'Fashion', '🧥', 'sale', 4.5),
('Wool Blend Scarf', 'Soft wool blend scarf in a classic plaid pattern. Warm and stylish.', 34.99, null, 'Fashion', '🧣', null, 4.2),
('Baseball Cap', 'Adjustable structured baseball cap with embroidered logo. One size fits all.', 24.99, null, 'Fashion', '🧢', 'new', 4.3),
('Silk Blouse', 'Elegant silk blend blouse with button-down front. Perfect for office or evening.', 69.99, 89.99, 'Fashion', '👚', 'sale', 4.6),
('Cargo Shorts', 'Durable cargo shorts with multiple pockets. Ideal for outdoor activities.', 44.99, null, 'Fashion', '🩳', null, 4.1),
('Knit Sweater', 'Cozy ribbed knit sweater in merino wool blend. Perfect for cooler days.', 89.99, 110.00, 'Fashion', '🧶', 'sale', 4.7),
('Leather Belt', 'Full-grain leather belt with brushed silver buckle. Classic and durable.', 39.99, null, 'Fashion', '👔', null, 4.4),
('Yoga Leggings', 'High-waist compression leggings with moisture-wicking fabric. 4-way stretch.', 54.99, null, 'Fashion', '🩱', 'hot', 4.8),
('Trench Coat', 'Classic double-breasted trench coat in water-resistant cotton blend.', 199.99, 249.99, 'Fashion', '🧥', 'sale', 4.9),
('Graphic Hoodie', 'Oversized hoodie with bold graphic print. Soft fleece interior.', 64.99, null, 'Fashion', '👕', 'new', 4.5),
('Ankle Socks 5-Pack', 'Premium cotton ankle socks with cushioned sole. Breathable and durable.', 19.99, null, 'Fashion', '🧦', null, 4.3),
('Swimwear Set', 'Quick-dry swimwear set with UV protection. Vibrant tropical print.', 49.99, 65.00, 'Fashion', '👙', 'sale', 4.4),
('Formal Dress Shirt', 'Wrinkle-resistant formal shirt in 100% cotton. Slim fit collar.', 59.99, null, 'Fashion', '👔', null, 4.6),

-- ELECTRONICS (18 products)
('Pro Wireless Headphones', 'Active noise cancellation, 30-hour battery life, premium sound quality.', 149.99, 199.99, 'Electronics', '🎧', 'sale', 4.8),
('Smart Watch Series X', 'Health tracking, GPS, 5-day battery, water resistant to 50m.', 299.99, 349.99, 'Electronics', '⌚', 'hot', 4.7),
('Mechanical Keyboard', 'TKL mechanical keyboard with RGB backlight and tactile switches.', 119.99, null, 'Electronics', '⌨️', 'new', 4.6),
('4K Webcam', '4K UHD webcam with built-in ring light and noise-cancelling microphone.', 89.99, 119.99, 'Electronics', '📷', 'sale', 4.5),
('Portable SSD 1TB', 'USB-C portable SSD with 1050MB/s read speed. Shock and drop resistant.', 99.99, null, 'Electronics', '💾', null, 4.7),
('Wireless Charging Pad', '15W fast wireless charging pad compatible with all Qi devices.', 29.99, 39.99, 'Electronics', '🔋', 'sale', 4.3),
('USB-C Hub 7-in-1', 'Multiport hub with HDMI 4K, 3x USB-A, SD card, and 100W PD charging.', 49.99, null, 'Electronics', '🔌', 'new', 4.5),
('Smart LED Desk Lamp', 'Touch-controlled LED lamp with adjustable color temperature and brightness.', 44.99, 59.99, 'Electronics', '💡', 'sale', 4.4),
('Bluetooth Speaker', 'Waterproof portable speaker with 360° sound and 24-hour battery.', 79.99, null, 'Electronics', '🔊', 'hot', 4.8),
('Gaming Mouse', 'Precision gaming mouse with 25,600 DPI sensor and 11 programmable buttons.', 69.99, 89.99, 'Electronics', '🖱️', 'sale', 4.6),
('Monitor Stand', 'Adjustable aluminum monitor stand with built-in USB hub and cable management.', 59.99, null, 'Electronics', '🖥️', null, 4.4),
('Laptop Cooling Pad', 'Dual fan laptop cooling pad with adjustable height and RGB lighting.', 34.99, null, 'Electronics', '💻', 'new', 4.2),
('Smart Plug 4-Pack', 'Wi-Fi smart plugs with energy monitoring and voice assistant compatibility.', 39.99, 49.99, 'Electronics', '🔌', 'sale', 4.5),
('Noise Cancelling Earbuds', 'True wireless earbuds with ANC, 8-hour battery, and IPX5 water resistance.', 129.99, 159.99, 'Electronics', '🎵', 'sale', 4.7),
('Portable Power Bank 20000mAh', 'High-capacity power bank with 65W PD fast charging and dual USB-A ports.', 59.99, null, 'Electronics', '🔋', null, 4.6),
('Smart Home Hub', 'Central hub for all smart home devices. Compatible with Alexa and Google Home.', 89.99, 109.99, 'Electronics', '🏠', 'sale', 4.3),
('Action Camera 4K', 'Waterproof 4K action camera with image stabilization and wide-angle lens.', 179.99, 219.99, 'Electronics', '📹', 'sale', 4.7),
('E-Reader', 'Lightweight e-reader with 6-inch glare-free display and 6-week battery life.', 139.99, null, 'Electronics', '📱', 'new', 4.8),

-- HOME & LIVING (14 products)
('Bamboo Cutting Board Set', 'Set of 3 bamboo cutting boards with juice groove and non-slip feet.', 34.99, null, 'Home & Living', '🪵', 'new', 4.6),
('Scented Candle Set', 'Set of 6 hand-poured soy wax candles in calming fragrances. 40-hour burn time.', 44.99, 59.99, 'Home & Living', '🕯️', 'sale', 4.7),
('Throw Blanket', 'Ultra-soft sherpa throw blanket. Machine washable, 150x200cm.', 39.99, null, 'Home & Living', '🛋️', null, 4.8),
('Ceramic Plant Pots Set', 'Set of 3 minimalist ceramic plant pots with drainage holes and saucers.', 29.99, 39.99, 'Home & Living', '🪴', 'sale', 4.5),
('Kitchen Knife Set', '5-piece professional kitchen knife set with wooden block. German steel blades.', 89.99, 119.99, 'Home & Living', '🔪', 'sale', 4.7),
('Linen Duvet Cover', 'Pure linen duvet cover with button closure. Breathable and gets softer with each wash.', 79.99, null, 'Home & Living', '🛏️', null, 4.6),
('Wall Art Print Set', 'Set of 3 minimalist botanical prints. Ready to frame, A4 size.', 24.99, null, 'Home & Living', '🖼️', 'new', 4.4),
('Aroma Diffuser', 'Ultrasonic essential oil diffuser with 7 LED colors and auto shut-off.', 34.99, 44.99, 'Home & Living', '💨', 'sale', 4.5),
('Stainless Steel Water Bottle', 'Double-wall insulated bottle. Keeps drinks cold 24h, hot 12h. 750ml.', 29.99, null, 'Home & Living', '🍶', 'hot', 4.8),
('Wooden Serving Board', 'Acacia wood serving board with handles. Perfect for charcuterie and entertaining.', 44.99, null, 'Home & Living', '🪵', null, 4.6),
('Blackout Curtains', 'Thermal blackout curtains with noise reduction. Available in multiple sizes.', 54.99, 69.99, 'Home & Living', '🪟', 'sale', 4.4),
('Bathroom Organizer Set', 'Bamboo bathroom organizer with soap dispenser, toothbrush holder, and tray.', 39.99, null, 'Home & Living', '🪥', 'new', 4.3),
('Cast Iron Skillet', 'Pre-seasoned cast iron skillet. Oven safe to 500°F. 10-inch diameter.', 49.99, 64.99, 'Home & Living', '🍳', 'sale', 4.9),
('Desk Organizer', 'Bamboo desk organizer with multiple compartments. Keeps workspace tidy.', 27.99, null, 'Home & Living', '🗂️', null, 4.4),

-- BEAUTY (12 products)
('Vitamin C Serum', 'Brightening vitamin C serum with hyaluronic acid. Reduces dark spots and boosts radiance.', 34.99, null, 'Beauty', '✨', 'hot', 4.7),
('Retinol Night Cream', 'Anti-aging retinol night cream with peptides. Reduces fine lines overnight.', 44.99, 59.99, 'Beauty', '🌙', 'sale', 4.6),
('Jade Roller & Gua Sha Set', 'Natural jade facial roller and gua sha tool. Reduces puffiness and improves circulation.', 24.99, null, 'Beauty', '💆', 'new', 4.5),
('Micellar Cleansing Water', 'Gentle micellar water that removes makeup and cleanses without rinsing. 400ml.', 14.99, 19.99, 'Beauty', '💧', 'sale', 4.4),
('SPF 50 Sunscreen', 'Lightweight daily sunscreen with SPF 50. Non-greasy, suitable for all skin types.', 19.99, null, 'Beauty', '☀️', null, 4.8),
('Hyaluronic Acid Moisturizer', 'Intense hydration moisturizer with 3 types of hyaluronic acid. Plumps and smooths.', 29.99, null, 'Beauty', '💦', 'new', 4.7),
('Eyeshadow Palette', '18-shade eyeshadow palette with matte and shimmer finishes. Long-lasting formula.', 39.99, 54.99, 'Beauty', '👁️', 'sale', 4.5),
('Lip Care Set', 'Set of 5 tinted lip balms with SPF 15. Moisturizing and long-lasting color.', 22.99, null, 'Beauty', '💋', null, 4.3),
('Hair Mask Treatment', 'Deep conditioning hair mask with argan oil and keratin. Repairs damaged hair.', 27.99, 34.99, 'Beauty', '💇', 'sale', 4.6),
('Perfume Eau de Parfum', 'Floral and woody fragrance with notes of jasmine, sandalwood, and musk. 50ml.', 69.99, 89.99, 'Beauty', '🌸', 'sale', 4.7),
('Electric Face Massager', 'Microcurrent facial massager with 5 intensity levels. Lifts and tones skin.', 49.99, null, 'Beauty', '⚡', 'hot', 4.5),
('Nail Care Kit', 'Complete nail care kit with file, buffer, cuticle oil, and strengthening base coat.', 18.99, null, 'Beauty', '💅', 'new', 4.2),

-- SPORTS (12 products)
('Yoga Mat Premium', 'Extra thick 6mm non-slip yoga mat with alignment lines. Includes carry strap.', 49.99, null, 'Sports', '🧘', 'hot', 4.8),
('Resistance Bands Set', 'Set of 5 resistance bands with different tension levels. Includes carry bag.', 24.99, 34.99, 'Sports', '💪', 'sale', 4.6),
('Running Water Bottle', 'Handheld running water bottle with adjustable strap and storage pocket. 500ml.', 19.99, null, 'Sports', '🏃', null, 4.4),
('Foam Roller', 'High-density foam roller for muscle recovery and myofascial release. 33cm.', 29.99, null, 'Sports', '🔄', 'new', 4.5),
('Jump Rope Speed', 'Adjustable speed jump rope with ball bearings for smooth rotation. Includes bag.', 14.99, 19.99, 'Sports', '🪢', 'sale', 4.3),
('Gym Gloves', 'Padded gym gloves with wrist support. Breathable mesh back, anti-slip palm.', 22.99, null, 'Sports', '🥊', null, 4.4),
('Adjustable Dumbbell Set', 'Space-saving adjustable dumbbells from 2.5kg to 25kg. Quick-change mechanism.', 199.99, 249.99, 'Sports', '🏋️', 'sale', 4.7),
('Sports Backpack', 'Lightweight sports backpack with wet/dry compartment and shoe pocket. 30L.', 44.99, null, 'Sports', '🎒', 'new', 4.5),
('Fitness Tracker Band', 'Slim fitness tracker with heart rate monitor, sleep tracking, and 7-day battery.', 59.99, 79.99, 'Sports', '⌚', 'sale', 4.4),
('Cycling Helmet', 'Lightweight cycling helmet with MIPS protection and adjustable fit system.', 79.99, null, 'Sports', '🚴', null, 4.6),
('Tennis Racket', 'Intermediate tennis racket with graphite frame and pre-strung. Includes cover.', 69.99, 89.99, 'Sports', '🎾', 'sale', 4.5),
('Protein Shaker Bottle', 'Leak-proof shaker bottle with mixing ball and measurement markings. 700ml.', 12.99, null, 'Sports', '🥤', null, 4.3),

-- BOOKS (10 products)
('Atomic Habits', 'The life-changing guide to building good habits and breaking bad ones. Bestseller.', 16.99, null, 'Books', '📗', 'hot', 4.9),
('The Psychology of Money', 'Timeless lessons on wealth, greed, and happiness. Essential personal finance reading.', 14.99, null, 'Books', '📘', 'hot', 4.8),
('Deep Work', 'Rules for focused success in a distracted world. Transform your productivity.', 15.99, null, 'Books', '📙', null, 4.7),
('Sapiens', 'A brief history of humankind. From the Stone Age to the 21st century.', 17.99, 22.99, 'Books', '📕', 'sale', 4.8),
('The Lean Startup', 'How constant innovation creates radically successful businesses.', 14.99, null, 'Books', '📒', null, 4.6),
('Thinking Fast and Slow', 'Explores the two systems that drive the way we think. Nobel Prize winner.', 16.99, null, 'Books', '📓', null, 4.7),
('Zero to One', 'Notes on startups, or how to build the future. By Peter Thiel.', 13.99, 17.99, 'Books', '📔', 'sale', 4.6),
('The Alchemist', 'A magical story about following your dreams. One of the best-selling books ever.', 12.99, null, 'Books', '📖', null, 4.8),
('Dune', 'The epic science fiction masterpiece. A must-read for any sci-fi fan.', 15.99, null, 'Books', '🌌', 'new', 4.9),
('1984', 'George Orwell''s dystopian masterpiece. More relevant than ever.', 11.99, null, 'Books', '📚', null, 4.8),

-- ACCESSORIES (8 products)
('Leather Laptop Bag', 'Full-grain leather laptop bag fits up to 15-inch laptops. Multiple compartments.', 119.99, null, 'Accessories', '💼', null, 4.7),
('Minimalist Wallet', 'Slim RFID-blocking wallet in genuine leather. Holds up to 8 cards.', 39.99, 49.99, 'Accessories', '👛', 'sale', 4.5),
('Sunglasses Polarized', 'Polarized UV400 sunglasses with lightweight titanium frame.', 79.99, 99.99, 'Accessories', '🕶️', 'sale', 4.6),
('Canvas Tote Bag', 'Heavy-duty canvas tote bag with interior pocket. Eco-friendly and reusable.', 22.99, null, 'Accessories', '👜', 'new', 4.4),
('Passport Holder', 'Genuine leather passport holder with card slots and document organizer.', 29.99, null, 'Accessories', '📋', null, 4.5),
('Luggage Tag Set', 'Set of 3 leather luggage tags with privacy flap and steel loop.', 19.99, 24.99, 'Accessories', '🏷️', 'sale', 4.3),
('Watch Box Organizer', '6-slot watch box with glass lid and velvet interior. Perfect for display.', 34.99, null, 'Accessories', '📦', null, 4.4),
('Keychain Multi-tool', 'Compact 8-in-1 stainless steel keychain multi-tool. TSA approved.', 14.99, null, 'Accessories', '🔑', 'new', 4.2),

-- AUDIO (8 products)
('Studio Monitor Headphones', 'Professional studio headphones with flat frequency response. 250 ohm impedance.', 179.99, 219.99, 'Audio', '🎧', 'sale', 4.8),
('Vinyl Record Player', 'Belt-drive turntable with built-in preamp and Bluetooth output. Plays 33/45 RPM.', 149.99, null, 'Audio', '🎵', 'new', 4.7),
('Soundbar 2.1', 'Compact soundbar with wireless subwoofer. Dolby Atmos and HDMI ARC.', 199.99, 249.99, 'Audio', '🔊', 'sale', 4.6),
('Condenser Microphone', 'USB condenser microphone for podcasting and streaming. Cardioid pattern.', 89.99, null, 'Audio', '🎤', 'hot', 4.7),
('Wireless Earbuds Pro', 'Premium wireless earbuds with spatial audio and adaptive transparency mode.', 199.99, 249.99, 'Audio', '🎵', 'sale', 4.8),
('Portable DAC/Amp', 'High-resolution portable DAC and headphone amplifier. USB-C and 3.5mm output.', 129.99, null, 'Audio', '🎼', null, 4.5),
('Smart Speaker', 'Voice-controlled smart speaker with room-filling 360° sound and smart home control.', 99.99, 129.99, 'Audio', '📻', 'sale', 4.4),
('Guitar Tuner Clip-on', 'Chromatic clip-on tuner with high-sensitivity vibration sensor. Works on any instrument.', 12.99, null, 'Audio', '🎸', 'new', 4.6);

-- 5. Verify the count
select count(*) as total_products from products;
