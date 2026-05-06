-- Initial Schema for PepVerify DeSci Platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Suppliers Table
CREATE TABLE public.suppliers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  trust_score INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  attestation_count INTEGER DEFAULT 0,
  compounds_supported TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Compounds Table
CREATE TABLE public.compounds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL, -- e.g., 'Peptide', 'Hormone'
  description TEXT
);

-- 3. Reports Table
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  supplier_id UUID REFERENCES public.suppliers(id) ON DELETE CASCADE,
  compound_id UUID REFERENCES public.compounds(id) ON DELETE RESTRICT,
  batch_number TEXT NOT NULL,
  ipfs_cid TEXT NOT NULL, -- The PDF uploaded to Pinata
  purity_percentage DECIMAL(5,2) NOT NULL,
  lab_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Attestations (The On-Chain Proofs)
CREATE TABLE public.attestations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE,
  sas_attestation_id TEXT NOT NULL UNIQUE, -- The Solana Transaction Signature / Hash
  signer_wallet TEXT NOT NULL,
  status TEXT DEFAULT 'verified',
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attestations ENABLE ROW LEVEL SECURITY;

-- Create Policies (Read-Only for Public)
CREATE POLICY "Public Read Access on Suppliers" ON public.suppliers FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Compounds" ON public.compounds FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Reports" ON public.reports FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Attestations" ON public.attestations FOR SELECT USING (true);

-- Insert Mock Data (Optional Seed)
INSERT INTO public.compounds (name, type) VALUES 
('BPC-157', 'Peptide'),
('TB-500', 'Peptide'),
('Tirzepatide', 'GLP-1'),
('Semaglutide', 'GLP-1');
