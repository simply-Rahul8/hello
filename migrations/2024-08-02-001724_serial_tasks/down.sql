-- This file should undo anything in `up.sql`
ALTER TABLE "tasks" ALTER COLUMN "id" DROP DEFAULT;

-- Drop the sequence
DROP SEQUENCE tasks_id_seq;