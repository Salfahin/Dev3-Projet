(
	SELECT *
	FROM (
		SELECT *
		FROM parts
		WHERE part_type = 0
	)
	ORDER BY part_id DESC
	LIMIT 5
)
UNION ALL
(
	SELECT *
	FROM (
		SELECT *
		FROM parts
		WHERE part_type = 1
	)
	ORDER BY part_id DESC
	LIMIT 5
)
UNION ALL
(
	SELECT *
	FROM (
		SELECT *
		FROM parts
		WHERE part_type = 2
	)
	ORDER BY part_id DESC
	LIMIT 5
)
UNION ALL
(
	SELECT *
	FROM (
		SELECT *
		FROM parts
		WHERE part_type = 3
	)
	ORDER BY part_id DESC
	LIMIT 5
)
UNION ALL
(
	SELECT *
	FROM (
		SELECT *
		FROM parts
		WHERE part_type = 4
	)
	ORDER BY part_id DESC
	LIMIT 5
)
UNION ALL
(
	SELECT *
	FROM (
		SELECT *
		FROM parts
		WHERE part_type = 5
	)
	ORDER BY part_id DESC
	LIMIT 5
)
UNION ALL
(
	SELECT *
	FROM (
		SELECT *
		FROM parts
		WHERE part_type = 6
	)
	ORDER BY part_id DESC
	LIMIT 5
)
UNION ALL
(
	SELECT *
	FROM (
		SELECT *
		FROM parts
		WHERE part_type = 7
	)
	ORDER BY part_id DESC
	LIMIT 5
)
UNION ALL
(
	SELECT *
	FROM (
		SELECT *
		FROM parts
		WHERE part_type = 8
	)
	ORDER BY part_id DESC
	LIMIT 5
)
UNION ALL
(
	SELECT *
	FROM (
		SELECT *
		FROM parts
		WHERE part_type = 9
	)
	ORDER BY part_id DESC
	LIMIT 5
)
