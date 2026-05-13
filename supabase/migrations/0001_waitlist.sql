CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    x_account TEXT,
    role TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (since it's a public waitlist form)
CREATE POLICY "Allow public insert to waitlist" ON public.waitlist
    FOR INSERT WITH CHECK (true);

-- Only admins can read
CREATE POLICY "Allow admins to read waitlist" ON public.waitlist
    FOR SELECT USING (auth.role() = 'service_role');
