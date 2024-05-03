CREATE TABLE user (
  user_id char(20),
  username varchar(25)
);

CREATE TABLE category (
  category_id serial,
  category varchar(15)
);

CREATE TABLE post (
  post_id serial,
  user_id int,
  title varchar(35),
  body varchar(255),
  category_id int,
  removed bool
);

CREATE TABLE comment (
  comment_id serial,
  user_id int,
  post_id int,
  comment varchar(50),
  removed bool
);

CREATE TABLE post_upvote (
  post_interaction_id serial,
  user_id int,
  post_id int
);

ALTER TABLE post_upvote 
ADD CONSTRAINT post_upvote_post_id_fk FOREIGN KEY (post_id) REFERENCES post (post_id);

ALTER TABLE post_upvote 
ADD CONSTRAINT post_upvote_user_id_fk FOREIGN KEY (user_id) REFERENCES user (user_id);

ALTER TABLE post 
ADD CONSTRAINT post_category_id_fk FOREIGN KEY (category_id) REFERENCES category (category_id);

ALTER TABLE post 
ADD CONSTRAINT post_user_id_fk FOREIGN KEY (user_id) REFERENCES user (user_id);

ALTER TABLE comment 
ADD CONSTRAINT comment_user_id_fk FOREIGN KEY (user_id) REFERENCES user (user_id);

ALTER TABLE comment 
ADD CONSTRAINT comment_post_id_fk FOREIGN KEY (post_id) REFERENCES post (post_id);
