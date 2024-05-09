ALTER TABLE account ADD COLUMN IF NOT EXISTS img_url VARCHAR(255);


CREATE OR REPLACE VIEW PostAccountView AS
SELECT post_id, title, body, username, img_url
FROM post
INNER JOIN account USING (account_id);