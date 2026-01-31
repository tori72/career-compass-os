import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Company {
  id: string;
  name: string;
  logo_url: string | null;
  company_type: string | null;
  category: string | null;
  employee_size: string | null;
  headquarters_address: string | null;
  operating_countries: string[] | null;
  website_url: string | null;
  description: string | null;
  founded_year: number | null;
  created_at: string;
  updated_at: string;
}

export function useCompanies() {
  return useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Company[];
    },
  });
}

export function useCompany(id: string) {
  return useQuery({
    queryKey: ["company", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Company;
    },
    enabled: !!id,
  });
}

export function useCompanyBrandReputation(companyId: string) {
  return useQuery({
    queryKey: ["company_brand_reputation", companyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company_brand_reputation")
        .select("*")
        .eq("company_id", companyId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!companyId,
  });
}

export function useCompanyBusiness(companyId: string) {
  return useQuery({
    queryKey: ["company_business", companyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company_business")
        .select("*")
        .eq("company_id", companyId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!companyId,
  });
}

export function useCompanyCompensation(companyId: string) {
  return useQuery({
    queryKey: ["company_compensation", companyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company_compensation")
        .select("*")
        .eq("company_id", companyId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!companyId,
  });
}

export function useCompanyCulture(companyId: string) {
  return useQuery({
    queryKey: ["company_culture", companyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company_culture")
        .select("*")
        .eq("company_id", companyId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!companyId,
  });
}

export function useCompanyFinancials(companyId: string) {
  return useQuery({
    queryKey: ["company_financials", companyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company_financials")
        .select("*")
        .eq("company_id", companyId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!companyId,
  });
}

export function useCompanyLogistics(companyId: string) {
  return useQuery({
    queryKey: ["company_logistics", companyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company_logistics")
        .select("*")
        .eq("company_id", companyId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!companyId,
  });
}

export function useCompanyPeople(companyId: string) {
  return useQuery({
    queryKey: ["company_people", companyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company_people")
        .select("*")
        .eq("company_id", companyId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!companyId,
  });
}

export function useCompanyTalentGrowth(companyId: string) {
  return useQuery({
    queryKey: ["company_talent_growth", companyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company_talent_growth")
        .select("*")
        .eq("company_id", companyId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!companyId,
  });
}

export function useCompanyTechnologies(companyId: string) {
  return useQuery({
    queryKey: ["company_technologies", companyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company_technologies")
        .select("*")
        .eq("company_id", companyId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!companyId,
  });
}
