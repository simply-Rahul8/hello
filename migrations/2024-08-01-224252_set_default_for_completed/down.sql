-- This file should undo anything in `up.sql`
ALTER TABLE tasks
ALTER COLUMN completed DROP DEFAULT;