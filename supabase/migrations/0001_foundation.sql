create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.agent_runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  agent_name text not null,
  status text not null check (status in ('queued','running','completed','failed','cancelled')),
  input jsonb not null default '{}'::jsonb,
  output jsonb,
  error text,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.model_runs (
  id uuid primary key default gen_random_uuid(),
  agent_run_id uuid references public.agent_runs(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  provider text not null,
  model text not null,
  intent text,
  input_tokens bigint,
  output_tokens bigint,
  latency_ms integer,
  cost_usd numeric(12,6),
  success boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.tool_runs (
  id uuid primary key default gen_random_uuid(),
  agent_run_id uuid references public.agent_runs(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  tool_name text not null,
  success boolean not null default true,
  latency_ms integer,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  agent_run_id uuid references public.agent_runs(id) on delete cascade,
  rating smallint check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.agent_runs enable row level security;
alter table public.model_runs enable row level security;
alter table public.tool_runs enable row level security;
alter table public.feedback enable row level security;

create policy "profiles own row" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "users read own agent runs" on public.agent_runs for select using (auth.uid() = user_id);
create policy "users insert own agent runs" on public.agent_runs for insert with check (auth.uid() = user_id);
create policy "users read own model runs" on public.model_runs for select using (auth.uid() = user_id);
create policy "users read own tool runs" on public.tool_runs for select using (auth.uid() = user_id);
create policy "users manage own feedback" on public.feedback for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
