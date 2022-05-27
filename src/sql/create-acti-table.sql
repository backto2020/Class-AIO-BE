create table if not exists `acti` (
  `id` int unsigned auto_increment,
  `title` text not null,
  `begin` timestamp not null,
  `end` timestamp not null,
  `content` mediumtext not null,
  `type` text not null,
  `login` tinyint not null default 0,
  primary key ( `id` )
) default charset=utf8;

-- describe acti;
-- +---------+--------------+------+-----+---------+----------------+
-- | Field   | Type         | Null | Key | Default | Extra          |
-- +---------+--------------+------+-----+---------+----------------+
-- | id      | int unsigned | NO   | PRI | NULL    | auto_increment |
-- | title   | text         | NO   |     | NULL    |                |
-- | begin   | timestamp    | NO   |     | NULL    |                |
-- | end     | timestamp    | NO   |     | NULL    |                |
-- | content | mediumtext   | NO   |     | NULL    |                |
-- | type    | text         | NO   |     | NULL    |                |
-- | login   | tinyint      | NO   |     | 0       |                |
-- +---------+--------------+------+-----+---------+----------------+

-- insert into acti
-- (title, begin, end, content, type, login)
-- values
-- ('这是一个活动', '2022-05-26 05:45:56', '2022-05-27 05:45:00', '活动内容活动内容活动内容活动内容活动内容活动内容，活动内容活动内容活动内容活动内容活动内容。', '班会活动', 1);

-- select id, title, begin, end, type, login from acti;
-- +----+--------------------+---------------------+---------------------+--------------+-------+
-- | id | title              | begin               | end                 | type         | login |
-- +----+--------------------+---------------------+---------------------+--------------+-------+
-- |  1 | 这是一个活动       | 2022-05-26 05:45:56 | 2022-05-27 05:45:00 | 班会活动     |     1 |
-- +----+--------------------+---------------------+---------------------+--------------+-------+