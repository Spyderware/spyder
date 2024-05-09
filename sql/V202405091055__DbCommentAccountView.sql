CREATE OR REPLACE VIEW CommentAccountView AS
SELECT comment.comment, username, img_url, post_id
FROM comment
INNER JOIN account USING (account_id);