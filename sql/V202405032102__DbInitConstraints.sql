ALTER TABLE post_upvote 
ADD CONSTRAINT post_upvote_post_id_fk FOREIGN KEY (post_id) REFERENCES post (post_id);

ALTER TABLE post_upvote 
ADD CONSTRAINT post_upvote_account_id_fk FOREIGN KEY (account_id) REFERENCES account (account_id);

ALTER TABLE post_upvote
ADD CONSTRAINT post_upvote_single_upvote UNIQUE (post_id, account_id);

ALTER TABLE post 
ADD CONSTRAINT post_category_id_fk FOREIGN KEY (category_id) REFERENCES category (category_id);

ALTER TABLE post 
ADD CONSTRAINT post_account_id_fk FOREIGN KEY (account_id) REFERENCES account (account_id);

ALTER TABLE comment 
ADD CONSTRAINT comment_account_id_fk FOREIGN KEY (account_id) REFERENCES account (account_id);

ALTER TABLE comment 
ADD CONSTRAINT comment_post_id_fk FOREIGN KEY (post_id) REFERENCES post (post_id);
