create table if not exists `acti_login` (
  `id` int unsigned auto_increment,
  `sid` int unsigned not null,
  `aid` int unsigned not null,
  `time` timestamp not null,
  primary key ( `id` )
);

-- describe acti_login;
-- +-------+--------------+------+-----+---------+----------------+
-- | Field | Type         | Null | Key | Default | Extra          |
-- +-------+--------------+------+-----+---------+----------------+
-- | id    | int unsigned | NO   | PRI | NULL    | auto_increment |
-- | sid   | int unsigned | NO   | MUL | NULL    |                |
-- | aid   | int unsigned | NO   | MUL | NULL    |                |
-- | time  | timestamp    | NO   |     | NULL    |                |
-- +-------+--------------+------+-----+---------+----------------+

-- insert into acti_login
-- (sid, aid, time)
-- values
-- (19101010, 5, '2022-05-27 13:00:00');