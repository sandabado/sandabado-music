alter table public.profiles add column if not exists stripe_customer_id text unique;

create table if not exists public.memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  stripe_customer_id text not null,
  stripe_subscription_id text not null unique,
  stripe_price_id text,
  status text not null,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.stripe_events (
  id text primary key,
  type text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.consulting_invoices (
  id uuid primary key default gen_random_uuid(),
  stripe_invoice_id text not null unique,
  stripe_customer_id text not null,
  recipient_email text not null,
  status text not null,
  amount_due_cents integer not null check (amount_due_cents >= 0),
  currency text not null default 'usd',
  due_date timestamptz,
  hosted_invoice_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists memberships_user_idx on public.memberships(user_id);
create index if not exists memberships_customer_idx on public.memberships(stripe_customer_id);
create index if not exists consulting_invoices_customer_idx on public.consulting_invoices(stripe_customer_id);

alter table public.memberships enable row level security;
alter table public.stripe_events enable row level security;
alter table public.consulting_invoices enable row level security;

create policy "memberships are visible to their owner" on public.memberships for select using ((select auth.uid()) = user_id);
