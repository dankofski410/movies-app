-- movies.user_rating definition

CREATE TABLE `user_rating` (
  `user_id` int(11) UNSIGNED NOT NULL,
  `movie_id` int(32) UNSIGNED NOT NULL,
  `movie_rating` int(1) UNSIGNED NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE user_rating ADD UNIQUE INDEX `idx_movie_id` (`movie_id`);