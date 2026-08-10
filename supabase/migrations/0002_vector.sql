create extension if not exists vector with schema extensions;

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade,
  title text not null,
  source_url text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.document_chunks (
  id bigint generated always as identity primary key,
  document_id uuid not null references public.documents(id) on delete cascade,
  content text not null,
  embedding extensions.vector(1536),
  metadata jsonb not null default '{}'::jsonb
);

alter table public.documents enable row level security;
alter table public.document_chunks enable row level security;
create policy "owners manage documents" on public.documents for all using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "owners read chunks" on public.document_chunks for select using (exists (select 1 from public.documents d where d.id = document_id and d.owner_id = auth.uid()));

-- Change vector dimension before production if the selected embedding model differs from 1536.
