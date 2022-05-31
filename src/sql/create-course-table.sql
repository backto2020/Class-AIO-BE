create table if not exists `course` (
  `id` int unsigned auto_increment,
  `day` tinyint not null,
  `period` tinyint not null,
  `length` tinyint not null,
  `name` text not null,
  `teacher` text,
  `room` text,
  primary key ( `id` )
) default charset=utf8;

-- describe course;
-- +---------+--------------+------+-----+---------+----------------+
-- | Field   | Type         | Null | Key | Default | Extra          |
-- +---------+--------------+------+-----+---------+----------------+
-- | id      | int unsigned | NO   | PRI | NULL    | auto_increment |
-- | day     | tinyint      | NO   |     | NULL    |                |
-- | period  | tinyint      | NO   |     | NULL    |                |
-- | length  | tinyint      | NO   |     | NULL    |                |
-- | name    | text         | NO   |     | NULL    |                |
-- | teacher | text         | YES  |     | NULL    |                |
-- | room    | text         | YES  |     | NULL    |                |
-- +---------+--------------+------+-----+---------+----------------+
