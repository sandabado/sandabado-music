create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price_cents integer not null check (price_cents >= 0),
  currency text not null default 'usd',
  category text,
  pillar text check (pillar in ('presence', 'press', 'studios', 'foundation', 'guardian')),
  image_url text,
  inventory_count integer check (inventory_count is null or inventory_count >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  stripe_order_id text unique,
  status text not null default 'pending' check (status in ('pending', 'paid', 'cancelled')),
  total_cents integer not null check (total_cents >= 0),
  currency text not null default 'usd',
  shipping_address jsonb,
  items jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  quantity integer not null check (quantity > 0),
  price_cents integer not null check (price_cents >= 0),
  name text not null,
  created_at timestamptz not null default now()
);

create index products_category_idx on public.products(category);
create index orders_user_idx on public.orders(user_id);
create index orders_status_idx on public.orders(status);
create index order_items_order_idx on public.order_items(order_id);

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "active products are publicly visible" on public.products for select using (active = true);
create policy "admins manage products" on public.products for all using (exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'admin'));
create policy "orders are visible to their owner" on public.orders for select using ((select auth.uid()) = user_id);
create policy "order items are visible through their order" on public.order_items for select using (exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = (select auth.uid())));
