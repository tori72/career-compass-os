import { useMemo } from "react";
import { useCompanies } from "@/hooks/useCompanies";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/ui/page-header";
import { ComingSoonCard } from "@/components/ui/coming-soon-card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["hsl(217, 91%, 60%)", "hsl(142, 71%, 45%)", "hsl(38, 92%, 50%)", "hsl(280, 67%, 55%)", "hsl(0, 84%, 60%)"];

export default function Analytics() {
  const { data: companies, isLoading: companiesLoading } = useCompanies();
  
  const { data: cultures } = useQuery({
    queryKey: ["all_company_cultures"],
    queryFn: async () => {
      const { data, error } = await supabase.from("company_culture").select("*");
      if (error) throw error;
      return data;
    },
  });

  const { data: technologies } = useQuery({
    queryKey: ["all_company_technologies"],
    queryFn: async () => {
      const { data, error } = await supabase.from("company_technologies").select("*");
      if (error) throw error;
      return data;
    },
  });

  const { data: logistics } = useQuery({
    queryKey: ["all_company_logistics"],
    queryFn: async () => {
      const { data, error } = await supabase.from("company_logistics").select("*");
      if (error) throw error;
      return data;
    },
  });

  const companyDistribution = useMemo(() => {
    if (!companies) return [];
    
    const typeCount = companies.reduce((acc, company) => {
      const type = company.company_type || "Unspecified";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(typeCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [companies]);

  const techStackFrequency = useMemo(() => {
    if (!technologies) return [];

    const techCount: Record<string, number> = {};
    technologies.forEach((tech) => {
      tech.tech_stack?.forEach((t) => {
        techCount[t] = (techCount[t] || 0) + 1;
      });
    });

    return Object.entries(techCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [technologies]);

  const remoteVsOnsite = useMemo(() => {
    if (!logistics) return [];

    const policyCount: Record<string, number> = {};
    logistics.forEach((l) => {
      const policy = l.remote_work_policy || "Not specified";
      policyCount[policy] = (policyCount[policy] || 0) + 1;
    });

    return Object.entries(policyCount).map(([name, value]) => ({ name, value }));
  }, [logistics]);

  const cultureIndicators = useMemo(() => {
    if (!cultures || cultures.length === 0) return null;

    const withRating = cultures.filter((c) => c.work_life_balance_rating);
    const avgRating = withRating.length > 0
      ? withRating.reduce((sum, c) => sum + Number(c.work_life_balance_rating), 0) / withRating.length
      : 0;

    const workEnvironments = cultures.reduce((acc, c) => {
      if (c.work_environment) {
        acc[c.work_environment] = (acc[c.work_environment] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return {
      avgWorkLifeBalance: avgRating.toFixed(1),
      workEnvironments: Object.entries(workEnvironments).map(([name, value]) => ({ name, value })),
    };
  }, [cultures]);

  const isLoading = companiesLoading;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader
        title="Analytics"
        description="Aggregated insights from company data"
      />

      {/* Enabled Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Company Distribution */}
        <div className="border border-border rounded-lg p-4">
          <h3 className="text-base font-medium text-foreground mb-4">Company Distribution</h3>
          {isLoading ? (
            <Skeleton className="h-64" />
          ) : companyDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={companyDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {companyDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState title="No data" description="Add companies to see distribution" />
          )}
        </div>

        {/* Tech Stack Frequency */}
        <div className="border border-border rounded-lg p-4">
          <h3 className="text-base font-medium text-foreground mb-4">Tech Stack Frequency</h3>
          {isLoading ? (
            <Skeleton className="h-64" />
          ) : techStackFrequency.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={techStackFrequency} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={100} 
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState title="No data" description="Add technology data to see frequency" />
          )}
        </div>

        {/* Remote vs Onsite */}
        <div className="border border-border rounded-lg p-4">
          <h3 className="text-base font-medium text-foreground mb-4">Remote Work Policies</h3>
          {isLoading ? (
            <Skeleton className="h-64" />
          ) : remoteVsOnsite.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={remoteVsOnsite}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {remoteVsOnsite.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState title="No data" description="Add logistics data to see policies" />
          )}
        </div>

        {/* Culture Indicators */}
        <div className="border border-border rounded-lg p-4">
          <h3 className="text-base font-medium text-foreground mb-4">Culture Indicators</h3>
          {isLoading ? (
            <Skeleton className="h-64" />
          ) : cultureIndicators ? (
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Work-Life Balance</p>
                <p className="text-3xl font-semibold text-foreground">
                  {cultureIndicators.avgWorkLifeBalance}<span className="text-lg text-muted-foreground">/5</span>
                </p>
              </div>
              {cultureIndicators.workEnvironments.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Work Environments</p>
                  <div className="space-y-2">
                    {cultureIndicators.workEnvironments.map((env) => (
                      <div key={env.name} className="flex items-center justify-between text-sm">
                        <span className="text-foreground">{env.name}</span>
                        <span className="text-muted-foreground">{env.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <EmptyState title="No data" description="Add culture data to see indicators" />
          )}
        </div>
      </div>

      {/* Coming Soon */}
      <h3 className="text-base font-medium text-foreground mb-4">Coming Soon</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ComingSoonCard
          title="Skill Trend Shifts"
          description="Track how skill demands change over time"
          requiredData="Historical skill data"
        />
        <ComingSoonCard
          title="Outcome Correlations"
          description="Understand factors that correlate with career success"
          requiredData="Outcome & placement data"
        />
        <ComingSoonCard
          title="Innovation Impact"
          description="Analyze how innovation activities affect growth"
          requiredData="Innovation metrics"
        />
      </div>
    </div>
  );
}
