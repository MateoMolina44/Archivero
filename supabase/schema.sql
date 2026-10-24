-- Archivero: base de datos de la nube (Supabase).
-- Se pega entero en Supabase → SQL Editor → New query → Run. Se puede volver a correr sin romper nada.
--
-- Todo lo de cada usuario vive en dos lugares:
-- - public.entities: piezas, tableros, notas del Anotador y ajustes, una fila por cosa (JSON).
-- - Storage, bucket 'media': las imágenes y videos, en una carpeta por usuario (<id del usuario>/...).
-- Las reglas (RLS) dejan a cada usuario leer y escribir solo lo suyo.

create table if not exists public.entities (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  kind text not null check (kind in ('item', 'board', 'note', 'meta')),
  id text not null,
  data jsonb,
  deleted boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, kind, id)
);

create index if not exists entities_user_updated on public.entities (user_id, updated_at);

-- La hora de cada cambio la pone el servidor (así no importa si el reloj de una compu está mal).
create or replace function public.entities_touch() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at := clock_timestamp();
  return new;
end $$;

drop trigger if exists entities_touch on public.entities;
create trigger entities_touch before insert or update on public.entities
  for each row execute function public.entities_touch();

alter table public.entities enable row level security;

drop policy if exists "entities: solo lo propio" on public.entities;
create policy "entities: solo lo propio" on public.entities
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

revoke all on public.entities from anon;
grant select, insert, update, delete on public.entities to authenticated;

-- Imágenes y videos: bucket privado, hasta 50 MB por archivo (el máximo del plan gratis).
insert into storage.buckets (id, name, public, file_size_limit)
values ('media', 'media', false, 52428800)
on conflict (id) do nothing;

drop policy if exists "media: leer lo propio" on storage.objects;
create policy "media: leer lo propio" on storage.objects
  for select to authenticated
  using (bucket_id = 'media' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "media: subir a lo propio" on storage.objects;
create policy "media: subir a lo propio" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "media: reemplazar lo propio" on storage.objects;
create policy "media: reemplazar lo propio" on storage.objects
  for update to authenticated
  using (bucket_id = 'media' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "media: borrar lo propio" on storage.objects;
create policy "media: borrar lo propio" on storage.objects
  for delete to authenticated
  using (bucket_id = 'media' and (storage.foldername(name))[1] = (select auth.uid())::text);
