create extension if not exists "uuid-ossp";

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  first_name text,
  last_name text,
  role text not null default 'member' check (role in ('member', 'admin')),
  primary_pillar text check (primary_pillar in ('presence', 'press', 'studios', 'foundation', 'guardian')),
  reading_data jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.readings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  birth_date date not null,
  birth_time time,
  birth_place text not null,
  has_birth_time boolean not null default false,
  reading_json jsonb not null,
  created_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  pillar text not null default 'all' check (pillar in ('presence', 'press', 'studios', 'foundation', 'guardian', 'all')),
  format text not null check (format in ('virtual', 'in-person')),
  start_time timestamptz not null,
  end_time timestamptz not null check (end_time > start_time),
  price_cents integer not null default 0 check (price_cents >= 0),
  capacity integer check (capacity > 0),
  location text,
  stripe_price_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.rsvps (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  event_id uuid not null references public.events(id) on delete cascade,
  email text not null,
  name text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  stripe_session_id text unique,
  paid boolean not null default false,
  created_at timestamptz not null default now(),
  unique(event_id, user_id)
);

create index readings_user_idx on public.readings(user_id);
create index events_start_time_idx on public.events(start_time);
create index rsvps_user_idx on public.rsvps(user_id);
create index rsvps_event_idx on public.rsvps(event_id);

alter table public.profiles enable row level security;
alter table public.readings enable row level security;
alter table public.events enable row level security;
alter table public.rsvps enable row level security;

create policy "profiles are visible to their owner" on public.profiles for select using ((select auth.uid()) = id);
create policy "profiles are updated by their owner" on public.profiles for update using ((select auth.uid()) = id);
create policy "readings are visible to their owner" on public.readings for select using ((select auth.uid()) = user_id);
create policy "readings are created by their owner" on public.readings for insert with check ((select auth.uid()) = user_id);
create policy "events are publicly visible" on public.events for select using (true);
create policy "admins manage events" on public.events for all using (exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'admin'));
create policy "rsvps are visible to their owner" on public.rsvps for select using ((select auth.uid()) = user_id);
create policy "rsvps are created by their owner" on public.rsvps for insert with check ((select auth.uid()) = user_id);
create policy "rsvps are updated by their owner" on public.rsvps for update using ((select auth.uid()) = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, first_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
