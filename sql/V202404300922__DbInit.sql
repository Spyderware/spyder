CREATE TABLE account (
  account_id char(20),
  accountname varchar(25)
);

CREATE TABLE category (
  category_id serial,
  category varchar(15)
);

CREATE TABLE post (
  post_id serial,
  account_id int,
  title varchar(35),
  body varchar(255),
  category_id int,
  removed bool
);

CREATE TABLE comment (
  comment_id serial,
  account_id int,
  post_id int,
  comment varchar(50),
  removed bool
);

CREATE TABLE post_upvote (
  post_interaction_id serial,
  account_id int,
  post_id int
);

ALTER TABLE post_upvote 
ADD CONSTRAINT post_upvote_post_id_fk FOREIGN KEY (post_id) REFERENCES post (post_id);

ALTER TABLE post_upvote 
ADD CONSTRAINT post_upvote_account_id_fk FOREIGN KEY (account_id) REFERENCES account (account_id);

ALTER TABLE post 
ADD CONSTRAINT post_category_id_fk FOREIGN KEY (category_id) REFERENCES category (category_id);

ALTER TABLE post 
ADD CONSTRAINT post_account_id_fk FOREIGN KEY (account_id) REFERENCES account (account_id);

ALTER TABLE comment 
ADD CONSTRAINT comment_account_id_fk FOREIGN KEY (account_id) REFERENCES account (account_id);

ALTER TABLE comment 
ADD CONSTRAINT comment_post_id_fk FOREIGN KEY (post_id) REFERENCES post (post_id);
