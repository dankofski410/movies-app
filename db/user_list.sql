-- movies.user_list definition

CREATE TABLE `user_list` (
  `user_id` int(11) UNSIGNED NOT NULL,
  `movie_id` int(32) UNSIGNED NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;