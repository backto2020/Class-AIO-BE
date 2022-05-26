create table if not exists `noti` (
  `id` int unsigned auto_increment,
  `title` text not null,
  `time` timestamp not null,
  `content` mediumtext not null,
  `type` text not null,
  primary key ( `id` )
) default charset=utf8;

-- describe noti;
-- +---------+--------------+------+-----+---------+----------------+
-- | Field   | Type         | Null | Key | Default | Extra          |
-- +---------+--------------+------+-----+---------+----------------+
-- | id      | int unsigned | NO   | PRI | NULL    | auto_increment |
-- | title   | text         | NO   |     | NULL    |                |
-- | time    | timestamp    | NO   |     | NULL    |                |
-- | content | mediumtext   | NO   |     | NULL    |                |
-- | type    | text         | NO   |     | NULL    |                |
-- +---------+--------------+------+-----+---------+----------------+

-- insert into noti
-- (title, time, content, type)
-- values
-- ('这是一条通知', '2022-05-26 05:45:56', '通知内容通知内容通知内容通知内容通知内容通知内容，通知内容通知内容通知内容通知内容通知内容。', 'covid19');

-- select id, title, time, type from noti;
-- +----+--------------------+---------------------+---------+
-- | id | title              | time                | type    |
-- +----+--------------------+---------------------+---------+
-- |  1 | 这是一条通知       | 2022-05-26 05:45:56 | covid19 |
-- +----+--------------------+---------------------+---------+