-- ============================================================
-- STUDYMETAVERSE — FULL DATABASE MIGRATION
-- Run this in your Supabase SQL Editor (fresh project)
-- Supabase handles auth.users natively — we extend it via profiles
-- ============================================================


-- ============================================================
-- EXTENSIONS
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE degree_type AS ENUM (
  'preparatory_course',
  'bachelors',
  'masters'
);

CREATE TYPE study_mode AS ENUM (
  'fully_onsite',
  'fully_online',
  'hybrid'
);

CREATE TYPE language_of_instruction AS ENUM (
  'german_only',
  'english_only',
  'german_english'
);

CREATE TYPE start_semester AS ENUM (
  'summer',
  'winter',
  'summer_winter'
);

CREATE TYPE nc_status AS ENUM (
  'restricted',
  'non_restricted'
);

CREATE TYPE requirement_status AS ENUM (
  'yes',
  'no',
  'varied'
);

CREATE TYPE institution_type AS ENUM (
  'private',
  'public'
);

CREATE TYPE preparation_subject_group AS ENUM (
  'm_kurs',    -- Medical
  't_kurs',    -- Technical
  'ti_kurs',   -- Technical-Informatics
  'w_kurs',    -- Economics
  'ww_kurs',   -- Business and Economics
  'g_kurs',    -- Humanities
  's_kurs',    -- Language
  'sw_kurs'    -- Social Sciences
);

CREATE TYPE payment_status AS ENUM (
  'pending',
  'paid',
  'failed',
  'refunded'
);


-- ============================================================
-- SUBJECT AREAS
-- ============================================================
CREATE TABLE subject_areas (
  id   SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

INSERT INTO subject_areas (name) VALUES
  ('Agriculture'),
  ('Arts'),
  ('Biochemistry'),
  ('Biology'),
  ('Business'),
  ('Chemistry'),
  ('Communication'),
  ('Computer Science'),
  ('Economics'),
  ('Education'),
  ('Engineering'),
  ('Environmental Science'),
  ('Food and Beverage'),
  ('Health'),
  ('Literature'),
  ('Medicine'),
  ('Philosophy'),
  ('Physics'),
  ('Psychology'),
  ('Social Science');


-- ============================================================
-- UNIVERSITIES
-- ============================================================
CREATE TABLE universities (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT NOT NULL,
  city          TEXT NOT NULL,
  type          institution_type NOT NULL,
  website_url   TEXT,
  description   TEXT,
  address       TEXT,                        -- e.g. "Arcisstraße 21, 80333 Munich"
  student_count INTEGER,                     -- e.g. 48000
  ranking       TEXT,                        -- e.g. "#37 QS 2024"
  logo_url      TEXT,                        -- stored in Supabase Storage
  image_url     TEXT,                        -- hero/cover image for detail page
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- PROGRAMS
-- ============================================================
CREATE TABLE programs (
  id                         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  university_id              UUID NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
  title                      TEXT NOT NULL,
  degree_type                degree_type NOT NULL,
  subject_area_id            INTEGER REFERENCES subject_areas(id) ON DELETE SET NULL,
  study_mode                 study_mode NOT NULL,
  language_of_instruction    language_of_instruction NOT NULL,
  std_period_semesters       INTEGER,                          -- e.g. 6
  start_semester             start_semester NOT NULL,
  program_details            TEXT,                             -- rich text / about section

  -- Admission
  nc_status                  nc_status NOT NULL DEFAULT 'non_restricted',
  ects_required              INTEGER DEFAULT 0,                -- 0, 180, or 210
  motiv_required             requirement_status DEFAULT 'no',
  test_required              requirement_status DEFAULT 'no',
  interview                  requirement_status DEFAULT 'no',
  modul_required             requirement_status DEFAULT 'no',  -- module handbook
  moiletter_accepted         BOOLEAN DEFAULT FALSE,            -- MOI letter accepted

  -- Tuition
  tuition_fee                BOOLEAN DEFAULT FALSE,
  tuition_fee_amount         NUMERIC(10, 2),                   -- nullable if no tuition

  -- Preparatory course only
  preparation_subject_group  preparation_subject_group,       -- NULL if not preparatory

  -- Application deadlines
  deadline_winter            DATE,                            -- e.g. July 15
  deadline_summer            DATE,                            -- e.g. Jan 15

  -- Admin flags
  is_featured                BOOLEAN DEFAULT FALSE,           -- show on homepage
  is_published               BOOLEAN DEFAULT TRUE,            -- toggle visibility

  created_at                 TIMESTAMPTZ DEFAULT NOW(),
  updated_at                 TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- PROFILES (extends Supabase auth.users)
-- ============================================================
CREATE TABLE profiles (
  id                    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username              TEXT UNIQUE,
  email                 TEXT NOT NULL,
  is_premium            BOOLEAN DEFAULT FALSE,
  subscription_id       TEXT,                  -- Stripe subscription ID
  subscription_end_date TIMESTAMPTZ,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();


-- ============================================================
-- ADMIN USERS (separate from regular users)
-- ============================================================
CREATE TABLE admin_users (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email        TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,               -- bcrypt hashed
  created_at   TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- USER WATCHLIST
-- ============================================================
CREATE TABLE user_watchlist (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, program_id)               -- prevent duplicate saves
);


-- ============================================================
-- MATCH REPORTS
-- ============================================================
CREATE TABLE match_reports (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id            UUID REFERENCES profiles(id) ON DELETE SET NULL, -- nullable (guest purchase)
  program_id         UUID REFERENCES programs(id) ON DELETE SET NULL,
  email              TEXT NOT NULL,           -- for delivery (guest or logged in)
  payment_status     payment_status DEFAULT 'pending',
  stripe_payment_id  TEXT,                    -- Stripe charge/payment intent ID
  stripe_session_id  TEXT,                    -- Stripe checkout session ID
  amount_paid        NUMERIC(10, 2),          -- actual amount paid (from settings)
  report_content     TEXT,                    -- generated report text/HTML
  report_sent_at     TIMESTAMPTZ,
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  updated_at         TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- NEWS POSTS
-- ============================================================
CREATE TABLE news_posts (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,       -- URL-friendly: "new-engineering-programs-2025"
  body            TEXT NOT NULL,              -- rich text
  excerpt         TEXT,                       -- short summary for cards
  category        TEXT,                       -- e.g. "Admissions", "Scholarships"
  cover_image_url TEXT,
  is_published    BOOLEAN DEFAULT FALSE,
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- SETTINGS (dynamic site-wide config, managed from admin)
-- ============================================================
CREATE TABLE settings (
  id          SERIAL PRIMARY KEY,
  key         TEXT NOT NULL UNIQUE,
  value       TEXT NOT NULL,
  description TEXT,                           -- admin-facing hint
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default settings
INSERT INTO settings (key, value, description) VALUES
  ('match_report_price',     '29',                         'Price of the Match Report in EUR (shown everywhere on site)'),
  ('match_report_currency',  'EUR',                        'Currency for Match Report'),
  ('site_tagline',           'Find Your Perfect Programme in Germany', 'Hero section tagline'),
  ('programmes_count_label', '3200+',                      'Programme count shown on landing page trust bar'),
  ('stripe_mode',            'test',                        'Stripe mode: test or live');


-- ============================================================
-- INDEXES (for search performance)
-- ============================================================
CREATE INDEX idx_programs_university     ON programs(university_id);
CREATE INDEX idx_programs_degree_type    ON programs(degree_type);
CREATE INDEX idx_programs_subject_area   ON programs(subject_area_id);
CREATE INDEX idx_programs_language       ON programs(language_of_instruction);
CREATE INDEX idx_programs_study_mode     ON programs(study_mode);
CREATE INDEX idx_programs_start_semester ON programs(start_semester);
CREATE INDEX idx_programs_nc_status      ON programs(nc_status);
CREATE INDEX idx_programs_tuition_fee    ON programs(tuition_fee);
CREATE INDEX idx_programs_is_featured    ON programs(is_featured);
CREATE INDEX idx_programs_is_published   ON programs(is_published);
CREATE INDEX idx_programs_ects           ON programs(ects_required);
CREATE INDEX idx_universities_city       ON universities(city);
CREATE INDEX idx_universities_type       ON universities(type);
CREATE INDEX idx_news_slug               ON news_posts(slug);
CREATE INDEX idx_news_published          ON news_posts(is_published, published_at DESC);
CREATE INDEX idx_watchlist_user          ON user_watchlist(user_id);
CREATE INDEX idx_match_reports_email     ON match_reports(email);
CREATE INDEX idx_match_reports_status    ON match_reports(payment_status);

-- Full-text search index across program title + university name
CREATE INDEX idx_programs_fts ON programs USING GIN (
  to_tsvector('english', title || ' ' || COALESCE(program_details, ''))
);


-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Profiles: users can only read/update their own profile
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Watchlist: users manage their own entries only
ALTER TABLE user_watchlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own watchlist"
  ON user_watchlist FOR ALL
  USING (auth.uid() = user_id);

-- Programs: public read, no public write
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published programs"
  ON programs FOR SELECT
  USING (is_published = TRUE);

-- Universities: public read
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read universities"
  ON universities FOR SELECT
  USING (TRUE);

-- News: public read for published posts only
ALTER TABLE news_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published news"
  ON news_posts FOR SELECT
  USING (is_published = TRUE);

-- Settings: public read (price needs to be visible on frontend)
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read settings"
  ON settings FOR SELECT
  USING (TRUE);

-- Match reports: users can see their own
ALTER TABLE match_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own match reports"
  ON match_reports FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert a match report"
  ON match_reports FOR INSERT
  WITH CHECK (TRUE);


-- ============================================================
-- UPDATED_AT TRIGGER (auto-update timestamp on any row change)
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_universities_updated_at
  BEFORE UPDATE ON universities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_programs_updated_at
  BEFORE UPDATE ON programs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_news_updated_at
  BEFORE UPDATE ON news_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_match_reports_updated_at
  BEFORE UPDATE ON match_reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================================
-- STORAGE BUCKETS (run separately in Supabase dashboard or via API)
-- ============================================================
-- bucket: university-logos     (public)
-- bucket: university-images    (public)
-- bucket: news-covers          (public)
-- bucket: match-reports        (private — only accessible by owner)
-- ============================================================


-- ============================================================
-- MIGRATION COMPLETE
-- To move to a new Supabase account:
-- 1. Create new Supabase project
-- 2. Run this entire script in the SQL Editor
-- 3. Create the 4 storage buckets above
-- 4. Update your .env keys:
--    NEXT_PUBLIC_SUPABASE_URL
--    NEXT_PUBLIC_SUPABASE_ANON_KEY
--    SUPABASE_SERVICE_ROLE_KEY
-- 5. Update Stripe webhook endpoint URL
-- ============================================================