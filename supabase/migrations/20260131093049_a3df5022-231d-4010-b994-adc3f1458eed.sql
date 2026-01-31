-- Companies main table
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  company_type TEXT,
  category TEXT,
  employee_size TEXT,
  headquarters_address TEXT,
  operating_countries TEXT[],
  website_url TEXT,
  description TEXT,
  founded_year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Company Brand Reputation
CREATE TABLE public.company_brand_reputation (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  glassdoor_rating DECIMAL(2,1),
  linkedin_followers INTEGER,
  awards TEXT[],
  media_mentions TEXT[],
  employer_brand_score DECIMAL(3,1),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Company Business
CREATE TABLE public.company_business (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  business_model TEXT,
  revenue_streams TEXT[],
  target_markets TEXT[],
  competitive_advantages TEXT[],
  strategic_priorities TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Company Compensation
CREATE TABLE public.company_compensation (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  salary_range_min INTEGER,
  salary_range_max INTEGER,
  bonus_structure TEXT,
  equity_offered BOOLEAN DEFAULT false,
  benefits TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Company Culture
CREATE TABLE public.company_culture (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  work_environment TEXT,
  core_values TEXT[],
  diversity_initiatives TEXT[],
  work_life_balance_rating DECIMAL(2,1),
  employee_engagement_score DECIMAL(3,1),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Company Financials
CREATE TABLE public.company_financials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  revenue_range TEXT,
  funding_stage TEXT,
  total_funding TEXT,
  profitability_status TEXT,
  growth_rate TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Company Logistics
CREATE TABLE public.company_logistics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  office_locations TEXT[],
  remote_work_policy TEXT,
  work_hours TEXT,
  travel_requirements TEXT,
  relocation_support BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Company People
CREATE TABLE public.company_people (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  leadership_team JSONB,
  team_size INTEGER,
  hiring_managers TEXT[],
  notable_alumni TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Company Talent Growth
CREATE TABLE public.company_talent_growth (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  career_paths TEXT[],
  training_programs TEXT[],
  mentorship_available BOOLEAN DEFAULT false,
  internal_mobility_rate DECIMAL(4,1),
  average_tenure TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Company Technologies
CREATE TABLE public.company_technologies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  tech_stack TEXT[],
  development_practices TEXT[],
  infrastructure TEXT[],
  innovation_areas TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables (public read for now)
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_brand_reputation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_business ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_compensation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_culture ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_financials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_logistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_people ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_talent_growth ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_technologies ENABLE ROW LEVEL SECURITY;

-- Public read policies for all tables
CREATE POLICY "Public read access" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.company_brand_reputation FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.company_business FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.company_compensation FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.company_culture FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.company_financials FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.company_logistics FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.company_people FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.company_talent_growth FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.company_technologies FOR SELECT USING (true);

-- Create indexes for better query performance
CREATE INDEX idx_companies_type ON public.companies(company_type);
CREATE INDEX idx_companies_category ON public.companies(category);
CREATE INDEX idx_company_brand_company_id ON public.company_brand_reputation(company_id);
CREATE INDEX idx_company_business_company_id ON public.company_business(company_id);
CREATE INDEX idx_company_compensation_company_id ON public.company_compensation(company_id);
CREATE INDEX idx_company_culture_company_id ON public.company_culture(company_id);
CREATE INDEX idx_company_financials_company_id ON public.company_financials(company_id);
CREATE INDEX idx_company_logistics_company_id ON public.company_logistics(company_id);
CREATE INDEX idx_company_people_company_id ON public.company_people(company_id);
CREATE INDEX idx_company_talent_company_id ON public.company_talent_growth(company_id);
CREATE INDEX idx_company_tech_company_id ON public.company_technologies(company_id);