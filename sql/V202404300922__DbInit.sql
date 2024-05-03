CREATE TABLE account (
  account_id serial PRIMARY KEY,
  uid varchar(20) UNIQUE,
  username varchar(25) UNIQUE
);

CREATE TABLE category (
  category_id serial PRIMARY KEY,
  category varchar(15) UNIQUE
);

CREATE TABLE post (
  post_id serial PRIMARY KEY,
  account_id int,
  title varchar(35),
  body varchar(255),
  category_id int
);

CREATE TABLE comment (
  comment_id serial PRIMARY KEY,
  account_id int,
  post_id int,
  comment varchar(50)
);

CREATE TABLE post_upvote (
  post_interaction_id serial PRIMARY KEY,
  account_id int,
  post_id int
);
