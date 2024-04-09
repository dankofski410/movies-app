-- movies.user_list definition

CREATE TABLE `user_rating` (
  `user_id` int(11) NOT NULL,
  `movie_id` int(32) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;