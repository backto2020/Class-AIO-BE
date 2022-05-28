create table if not exists `commit` (
  `id` int unsigned auto_increment,
  `title` text not null,
  `begin` timestamp not null,
  `end` timestamp not null,
  `content` mediumtext not null,
  `type` text not null,
  primary key ( `id` )
) default charset=utf8;

-- describe commit;
-- +---------+--------------+------+-----+---------+----------------+
-- | Field   | Type         | Null | Key | Default | Extra          |
-- +---------+--------------+------+-----+---------+----------------+
-- | id      | int unsigned | NO   | PRI | NULL    | auto_increment |
-- | title   | text         | NO   |     | NULL    |                |
-- | begin   | timestamp    | NO   |     | NULL    |                |
-- | end     | timestamp    | NO   |     | NULL    |                |
-- | content | mediumtext   | NO   |     | NULL    |                |
-- | type    | text         | NO   |     | NULL    |                |
-- +---------+--------------+------+-----+---------+----------------+
