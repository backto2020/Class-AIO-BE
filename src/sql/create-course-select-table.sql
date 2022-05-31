create table if not exists `course_select` (
  `id` int unsigned auto_increment,
  `sid` int unsigned not null,
  `cid` int unsigned not null,
  primary key ( `id` )
);

-- describe course_select;
-- +-------+--------------+------+-----+---------+----------------+
-- | Field | Type         | Null | Key | Default | Extra          |
-- +-------+--------------+------+-----+---------+----------------+
-- | id    | int unsigned | NO   | PRI | NULL    | auto_increment |
-- | sid   | int unsigned | NO   |     | NULL    |                |
-- | cid   | int unsigned | NO   |     | NULL    |                |
-- +-------+--------------+------+-----+---------+----------------+
