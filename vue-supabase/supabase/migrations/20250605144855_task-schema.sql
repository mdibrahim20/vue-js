drop table if exists tasks;

create table public.tasks (
  id bigint primary key generated always as identity not null,
  created_at timestamptz default now() not null,
  name text not null,
  status current_status default 'active' not null,
  description text not null,
  due_date date default null,
  project_id bigint references public.projects(id) default null,
  collaborators text[] default array[]::varchar[] not null
);
