create table public.gobeyond_categories (
  id uuid not null default gen_random_uuid (),
  slug text not null,
  title text not null,
  title_english text null,
  description text null,
  description_english text null,
  created_at timestamp with time zone not null default now(),
  constraint gobeyond_categories_pkey primary key (id),
  constraint gobeyond_categories_slug_key unique (slug)
) TABLESPACE pg_default;

create index IF not exists idx_gobeyond_categories_slug on public.gobeyond_categories using btree (slug) TABLESPACE pg_default;

create table public.gobeyond_tours (
  id uuid not null default gen_random_uuid (),
  category_id uuid null,
  slug text not null,
  title text not null,
  title_english text null,
  description text null,
  description_english text null,
  price numeric(10, 2) not null default 0,
  image_url text null,
  destination text not null,
  duration text null,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint gobeyond_tours_pkey primary key (id),
  constraint gobeyond_tours_slug_key unique (slug),
  constraint gobeyond_tours_category_id_fkey foreign KEY (category_id) references gobeyond_categories (id) on delete set null
) TABLESPACE pg_default;

create index IF not exists idx_gobeyond_tours_slug on public.gobeyond_tours using btree (slug) TABLESPACE pg_default;

create index IF not exists idx_gobeyond_tours_destination on public.gobeyond_tours using btree (destination) TABLESPACE pg_default;

create index IF not exists idx_gobeyond_tours_category on public.gobeyond_tours using btree (category_id) TABLESPACE pg_default;

create trigger trg_gobeyond_tours_updated_at BEFORE
update on gobeyond_tours for EACH row
execute FUNCTION set_updated_at ();