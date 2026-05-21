-- ============================================================
-- GovWatch Nigeria — Complete Database Schema
-- Run this entire file in your Supabase SQL Editor
-- ============================================================


-- ── 1. STATES ────────────────────────────────────────────────
create table if not exists states (
  id serial primary key,
  name text unique not null,
  code text unique not null,   -- e.g. 'NG-BA' for Bauchi
  lga_count int default 0,
  created_at timestamptz default now()
);


-- ── 2. LGAS ──────────────────────────────────────────────────
create table if not exists lgas (
  id serial primary key,
  name text not null,
  state_id int not null references states(id) on delete cascade,
  created_at timestamptz default now(),
  unique(name, state_id)
);


-- ── 3. PROFILES ──────────────────────────────────────────────
-- Extends Supabase Auth users. Created automatically on sign-up
-- via a trigger (see bottom of file).
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text not null default '',
  last_name text not null default '',
  email text not null default '',
  phone text,
  role text not null default 'citizen'
    check (role in ('citizen', 'champion', 'admin')),
  state_id int references states(id),
  lga_id int references lgas(id),
  is_verified boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);


-- ── 4. PROJECT CATEGORIES ────────────────────────────────────
create table if not exists project_categories (
  id serial primary key,
  name text unique not null,  -- e.g. 'Roads & Transport'
  emoji text default '📋',
  created_at timestamptz default now()
);

-- Seed the standard categories
insert into project_categories (name, emoji) values
  ('Roads & Transport',       '🛣️'),
  ('Education',               '🏫'),
  ('Health',                  '🏥'),
  ('Water & Sanitation',      '💧'),
  ('Power & Energy',          '⚡'),
  ('Agriculture & Environment','🌾'),
  ('Government Buildings',    '🏛️'),
  ('Security & Justice',      '🛡️'),
  ('Procurement - Equipment', '📦'),
  ('Procurement - Vehicles',  '🚗'),
  ('Land & Urban Planning',   '📐'),
  ('Investment & Economic Dev','💰'),
  ('Other',                   '📋')
on conflict (name) do nothing;


-- ── 5. PROJECTS ──────────────────────────────────────────────
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  mda text,                          -- Ministry / Dept / Agency
  programme text,
  function_area text,
  status text not null default 'not_started'
    check (status in ('not_started','in_progress','completed','stalled','cancelled')),
  state_id int references states(id),
  lga_id int references lgas(id),
  contractor text,
  budget_allocated numeric(15,2) default 0,
  budget_spent numeric(15,2) default 0,
  completion_percent int default 0
    check (completion_percent between 0 and 100),
  start_date date,
  expected_end_date date,
  actual_end_date date,
  latitude numeric(10,7),
  longitude numeric(10,7),
  nominated_by text default 'Community',
  vote_count int default 0,
  comment_count int default 0,
  is_stale boolean default false,
  last_updated_at timestamptz default now(),
  created_at timestamptz default now()
);


-- ── 6. PROJECT CATEGORY MAP (many-to-many) ───────────────────
create table if not exists project_category_map (
  project_id uuid not null references projects(id) on delete cascade,
  category_id int not null references project_categories(id) on delete cascade,
  primary key (project_id, category_id)
);


-- ── 7. MILESTONES ────────────────────────────────────────────
create table if not exists milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  title text not null,
  description text,
  due_date date,
  is_completed boolean default false,
  completed_at timestamptz,
  created_at timestamptz default now()
);


-- ── 8. FIELD UPDATES ─────────────────────────────────────────
-- Submitted by Accountability Champions with on-ground evidence
create table if not exists field_updates (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  submitted_by uuid references profiles(id) on delete set null,
  title text not null,
  body text not null,
  completion_percent int check (completion_percent between 0 and 100),
  evidence_urls text[],              -- array of image / document URLs
  is_verified boolean default false,
  verified_by uuid references profiles(id) on delete set null,
  verified_at timestamptz,
  created_at timestamptz default now()
);


-- ── 9. DISCREPANCY REPORTS ───────────────────────────────────
-- Filed when a project doesn't match reality on the ground
create table if not exists discrepancy_reports (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  reported_by uuid references profiles(id) on delete set null,
  title text not null,
  description text not null,
  evidence_urls text[],
  status text not null default 'pending'
    check (status in ('pending','under_review','resolved','dismissed')),
  reviewed_by uuid references profiles(id) on delete set null,
  reviewed_at timestamptz,
  resolution_note text,
  created_at timestamptz default now()
);


-- ── 10. NOMINATIONS ──────────────────────────────────────────
-- Citizens proposing new projects for their community
create table if not exists nominations (
  id uuid primary key default gen_random_uuid(),
  nominated_by uuid references profiles(id) on delete set null,
  title text not null,
  description text not null,
  category text,
  state_id int references states(id),
  lga_id int references lgas(id),
  estimated_cost numeric(15,2),
  vote_count int default 0,
  status text not null default 'pending'
    check (status in ('pending','approved','rejected','converted')),
  converted_project_id uuid references projects(id) on delete set null,
  created_at timestamptz default now()
);


-- ── 11. VOTES ────────────────────────────────────────────────
-- Community upvotes on projects and nominations (one per user)
create table if not exists votes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  nomination_id uuid references nominations(id) on delete cascade,
  created_at timestamptz default now(),
  -- one vote per project
  constraint one_vote_per_project unique (user_id, project_id),
  -- one vote per nomination
  constraint one_vote_per_nomination unique (user_id, nomination_id),
  -- must target exactly one thing
  constraint vote_target_check check (
    (project_id is not null and nomination_id is null) or
    (project_id is null and nomination_id is not null)
  )
);


-- ── 12. COMMENTS ─────────────────────────────────────────────
-- Discussion threads on project pages, with reply support
create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  user_id uuid references profiles(id) on delete set null,
  parent_id uuid references comments(id) on delete cascade,  -- null = top-level
  body text not null,
  is_flagged boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);


-- ── 13. NOTIFICATIONS ────────────────────────────────────────
-- Real-time alerts sent to users
create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  type text not null,
    -- 'project_update' | 'report_resolved' | 'vote_milestone'
    -- 'nomination_approved' | 'comment_reply' | 'champion_verified'
  title text not null,
  body text,
  link text,                         -- e.g. '/projects/uuid'
  is_read boolean default false,
  created_at timestamptz default now()
);


-- ── 14. PROJECT WATCHERS ─────────────────────────────────────
-- Users subscribed to updates for specific projects
create table if not exists project_watchers (
  user_id uuid not null references profiles(id) on delete cascade,
  project_id uuid not null references projects(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, project_id)
);


-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table profiles           enable row level security;
alter table states             enable row level security;
alter table lgas               enable row level security;
alter table project_categories enable row level security;
alter table projects           enable row level security;
alter table project_category_map enable row level security;
alter table milestones         enable row level security;
alter table field_updates      enable row level security;
alter table discrepancy_reports enable row level security;
alter table nominations        enable row level security;
alter table votes              enable row level security;
alter table comments           enable row level security;
alter table notifications      enable row level security;
alter table project_watchers   enable row level security;

-- Public read access (anyone can browse projects, states, LGAs)
create policy "Public read states"             on states             for select to anon, authenticated using (true);
create policy "Public read lgas"               on lgas               for select to anon, authenticated using (true);
create policy "Public read categories"         on project_categories for select to anon, authenticated using (true);
create policy "Public read projects"           on projects           for select to anon, authenticated using (true);
create policy "Public read category map"       on project_category_map for select to anon, authenticated using (true);
create policy "Public read milestones"         on milestones         for select to anon, authenticated using (true);
create policy "Public read field updates"      on field_updates      for select to anon, authenticated using (true);
create policy "Public read discrepancy reports" on discrepancy_reports for select to anon, authenticated using (true);
create policy "Public read nominations"        on nominations        for select to anon, authenticated using (true);
create policy "Public read votes"              on votes              for select to anon, authenticated using (true);
create policy "Public read comments"           on comments           for select to anon, authenticated using (true);

-- Profiles: users can read all, only edit their own
create policy "Public read profiles"           on profiles for select to anon, authenticated using (true);
create policy "Users update own profile"       on profiles for update to authenticated using (auth.uid() = id);

-- Authenticated users can insert
create policy "Auth users can vote"            on votes              for insert to authenticated with check (auth.uid() = user_id);
create policy "Auth users can comment"         on comments           for insert to authenticated with check (auth.uid() = user_id);
create policy "Auth users can nominate"        on nominations        for insert to authenticated with check (auth.uid() = nominated_by);
create policy "Auth users can report"          on discrepancy_reports for insert to authenticated with check (auth.uid() = reported_by);
create policy "Auth users can watch projects"  on project_watchers   for insert to authenticated with check (auth.uid() = user_id);
create policy "Auth users can unwatch"         on project_watchers   for delete to authenticated using (auth.uid() = user_id);
create policy "Auth users can delete own vote" on votes              for delete to authenticated using (auth.uid() = user_id);

-- Champions can submit field updates
create policy "Champions can submit updates"   on field_updates      for insert to authenticated
  with check (
    auth.uid() = submitted_by and
    exists (select 1 from profiles where id = auth.uid() and role in ('champion','admin'))
  );

-- Notifications: users only see their own
create policy "Users read own notifications"   on notifications      for select to authenticated using (auth.uid() = user_id);
create policy "Users update own notifications" on notifications      for update to authenticated using (auth.uid() = user_id);


-- ============================================================
-- AUTO-CREATE PROFILE ON SIGN-UP TRIGGER
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', '')
  );
  return new;
end;
$$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'on_auth_user_created'
  ) THEN
    create trigger on_auth_user_created
      after insert on auth.users
      for each row execute procedure public.handle_new_user();
  END IF;
END $$;


-- ============================================================
-- USEFUL INDEXES FOR PERFORMANCE
-- ============================================================

create index if not exists idx_projects_state      on projects(state_id);
create index if not exists idx_projects_lga        on projects(lga_id);
create index if not exists idx_projects_status     on projects(status);
create index if not exists idx_projects_created    on projects(created_at desc);
create index if not exists idx_lgas_state          on lgas(state_id);
create index if not exists idx_comments_project    on comments(project_id);
create index if not exists idx_field_updates_project on field_updates(project_id);
create index if not exists idx_votes_project       on votes(project_id);
create index if not exists idx_notifications_user  on notifications(user_id, is_read);
create index if not exists idx_watchers_project    on project_watchers(project_id);


-- ============================================================
-- VERIFY
-- ============================================================

select table_name
from information_schema.tables
where table_schema = 'public'
order by table_name;
