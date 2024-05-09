CREATE TABLE account (
  account_id serial PRIMARY KEY,
  uid varchar(25) UNIQUE NOT NULL,
  username varchar(25) NULL
);

CREATE TABLE category (
  category_id serial PRIMARY KEY,
  category varchar(15) UNIQUE NOT NULL
);

CREATE TABLE post (
  post_id serial PRIMARY KEY,
  account_id int NOT NULL,
  title varchar(50) NOT NULL,
  body varchar(1000) NOT NULL,
  category_id int NOT NULL
);

CREATE TABLE comment (
  comment_id serial PRIMARY KEY,
  account_id int NOT NULL,
  post_id int NOT NULL,
  comment varchar(255) NOT NULL
);

CREATE TABLE post_upvote (
  post_interaction_id serial PRIMARY KEY,
  account_id int NOT NULL,
  post_id int NOT NULL
);
