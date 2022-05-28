create table if not exists `commit_log` (
  `id` int unsigned auto_increment,
  `sid` int unsigned not null,
  `cid` int unsigned not null,
  `time` timestamp not null,
  primary key ( `id` )
);

-- describe commit_log;
-- +-------+--------------+------+-----+---------+----------------+
-- | Field | Type         | Null | Key | Default | Extra          |
-- +-------+--------------+------+-----+---------+----------------+
-- | id    | int unsigned | NO   | PRI | NULL    | auto_increment |
-- | sid   | int unsigned | NO   |     | NULL    |                |
-- | cid   | int unsigned | NO   |     | NULL    |                |
-- | time  | timestamp    | NO   |     | NULL    |                |
-- +-------+--------------+------+-----+---------+----------------+
