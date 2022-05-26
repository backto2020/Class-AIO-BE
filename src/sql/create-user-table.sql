create table if not exists `user` (
  `sid` int unsigned,
  `username` varchar(20) not null,
  `password` varchar(20) not null,
  `name` varchar(10) not null,
  `avatar` text not null,
  `gender` varchar(10) not null,
  `birthday` date not null,
  `school` varchar(10) not null,
  `major` varchar(10) not null,
  `grade` smallint not null,
  `admin` tinyint not null default 0,
  primary key ( `sid` )
) default charset=utf8;

-- describe user;
-- +----------+--------------+------+-----+---------+-------+
-- | Field    | Type         | Null | Key | Default | Extra |
-- +----------+--------------+------+-----+---------+-------+
-- | sid      | int unsigned | NO   | PRI | NULL    |       |
-- | username | varchar(20)  | NO   |     | NULL    |       |
-- | password | varchar(20)  | NO   |     | NULL    |       |
-- | name     | varchar(10)  | NO   |     | NULL    |       |
-- | avatar   | text         | NO   |     | NULL    |       |
-- | gender   | varchar(10)  | NO   |     | NULL    |       |
-- | birthday | date         | NO   |     | NULL    |       |
-- | school   | varchar(10)  | NO   |     | NULL    |       |
-- | major    | varchar(10)  | NO   |     | NULL    |       |
-- | grade    | smallint     | NO   |     | NULL    |       |
-- | admin    | tinyint      | NO   |     | 0       |       |
-- +----------+--------------+------+-----+---------+-------+

-- insert into user values (19000000, 'admin', 'admin', '管理员', 'https://s2.loli.net/2022/05/11/JNFt98pAWqZlznw.jpg', '男', '1970-12-12', '智能工程学院', '交通工程', 2019, 1);
-- (19101010, 'wangw5', 'SuperSecretPwd', '王五', 'https://s2.loli.net/2022/05/11/JNFt98pAWqZlznw.jpg', '女', '1970-04-06', '智能工程学院', '交通工程', 2019, 1);
