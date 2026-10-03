-- ============================================================
-- Technica Football — Migration October 2026
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor).
-- Safe to run more than once.
--
-- What this does:
--   Adds a sort_order column to classes so admins can reorder term
--   classes from the dashboard (up/down arrows) instead of deleting
--   and recreating them.
-- ============================================================

ALTER TABLE classes ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;

-- Seed the order the site currently shows (Foundation classes first, then
-- alphabetical by subtitle) — only on the first run, so a later re-run
-- doesn't wipe an order the admin has set.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM classes WHERE sort_order <> 0) THEN
    UPDATE classes c
    SET sort_order = ranked.rn
    FROM (
      SELECT id,
             row_number() OVER (
               ORDER BY (lower(coalesce(nullif(title, ''), id)) LIKE '%foundation%') DESC,
                        coalesce(nullif(subtitle, ''), id)
             ) - 1 AS rn
      FROM classes
    ) ranked
    WHERE c.id = ranked.id;
  END IF;
END $$;
