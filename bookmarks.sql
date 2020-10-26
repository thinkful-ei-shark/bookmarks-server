CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- First, remove the table if it exists
drop table if exists bookmarks;

-- Create the table anew
create table bookmarks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v1(),
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  rating INTEGER CHECK(rating >= 1 AND rating <= 5)
);

-- insert some test data
-- Using a multi-row insert statement here
insert into bookmarks (title, url, description, rating)
values
('Thinkful', 'https://www.thinkful.com', 'Think outside the classroom', 5),
('Google', 'https://www.google.com', 'Where we find everything else', 4),
('MDN', 'https://developer.mozilla.org', 'The only place to find web documentation', 5),
('Facebook', 'https://www.Facebook.com', 'A book of faces', 2),
('Twitter', 'https://www.Twitter.com', 'Tweet tweet', 3);
