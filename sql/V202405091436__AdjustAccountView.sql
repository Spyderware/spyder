CREATE OR REPLACE VIEW PostAccountView AS
SELECT post_id, title, body, username, img_url, category
FROM post
INNER JOIN account USING (account_id)
INNER JOIN category USING (category_id);

SELECT * FROM PostAccountView;