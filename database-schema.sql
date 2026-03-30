-- ============================================================
-- SCAM VERIFIER — DATABASE SCHEMA
-- Run this entire file in the Supabase SQL editor.
-- Project: supabase.com > your project > SQL Editor
-- ============================================================

-- Reports table
CREATE TABLE reports (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- User input
  input_text    TEXT NOT NULL,
  input_url     TEXT,
  questions     JSONB NOT NULL,

  -- Payment
  stripe_session_id   TEXT UNIQUE,
  payment_status      TEXT DEFAULT 'pending',
  payment_amount      INTEGER,
  paid_at             TIMESTAMP WITH TIME ZONE,

  -- Contact
  user_email    TEXT,

  -- AI output
  verdict               TEXT CHECK (verdict IN ('safe', 'caution', 'risk')),
  verdict_summary       TEXT,
  red_flags             JSONB,
  green_flags           JSONB,
  reality_check         TEXT,
  realistic_outcome     TEXT,
  recommended_questions JSONB,
  similar_schemes       JSONB,
  confidence_score      INTEGER CHECK (confidence_score BETWEEN 0 AND 100),

  -- Meta
  analysis_duration_ms  INTEGER,
  ai_model_used         TEXT
);

-- Indexes for fast lookups
CREATE INDEX idx_reports_stripe_session ON reports(stripe_session_id);
CREATE INDEX idx_reports_created_at ON reports(created_at DESC);
CREATE INDEX idx_reports_payment_status ON reports(payment_status);

-- Row Level Security — prevents data leaks
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Policy: reports are readable by anyone who has the report ID
-- (the UUID itself acts as the access token)
CREATE POLICY "Reports readable by ID"
  ON reports FOR SELECT
  USING (true);

-- Policy: only the service role can insert (backend API routes only)
CREATE POLICY "Service role only insert"
  ON reports FOR INSERT
  WITH CHECK (false);

-- Policy: only the service role can update (backend API routes only)
CREATE POLICY "Service role only update"
  ON reports FOR UPDATE
  USING (false);
