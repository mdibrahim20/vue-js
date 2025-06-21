drop table if exists projects;
drop type if exists current_status;

create type current_status as enum (
  'active',
  'archived',
  'deleted'
);

create table public.projects (
  id bigint primary key generated always as identity not null,
  created_at timestamptz default now() not null,
  name text not null,
  slug text unique not null,
  status current_status default 'active' not null,
  collaborators text[] default array[]::varchar[] not null
);

