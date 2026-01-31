import { useMemo } from "react";
import { Building2, Briefcase, Globe, Clock } from "lucide-react";
import { useCompanies } from "@/hooks/useCompanies";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { ComingSoonCard } from "@/components/ui/coming-soon-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { data: companies, isLoading } = useCompanies();

  const stats = useMemo(() => {
    if (!companies) return null;

    const typeCount = companies.reduce((acc, company) => {
      const type = company.company_type || "Unspecified";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const categoryCount = companies.reduce((acc, company) => {
      const cat = company.category || "Unspecified";
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const recentCompanies = companies.slice(0, 5);

    return {
      total: companies.length,
      byType: typeCount,
      byCategory: categoryCount,
      recent: recentCompanies,
    };
  }, [companies]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader
        title="Dashboard"
        description="System overview and key metrics"
      />

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {isLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-28" />
            ))}
          </>
        ) : (
          <>
            <StatCard
              title="Total Companies"
              value={stats?.total || 0}
              icon={<Building2 className="w-5 h-5 text-muted-foreground" />}
            />
            <StatCard
              title="Company Types"
              value={Object.keys(stats?.byType || {}).length}
              icon={<Briefcase className="w-5 h-5 text-muted-foreground" />}
            />
            <StatCard
              title="Categories"
              value={Object.keys(stats?.byCategory || {}).length}
              icon={<Globe className="w-5 h-5 text-muted-foreground" />}
            />
            <StatCard
              title="Recently Added"
              value={stats?.recent?.length || 0}
              description="Last 5 companies"
              icon={<Clock className="w-5 h-5 text-muted-foreground" />}
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Companies by Type */}
        <div className="border border-border rounded-lg p-4">
          <div className="section-header">
            <h3 className="text-base font-medium">Companies by Type</h3>
          </div>
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-8" />
              ))}
            </div>
          ) : stats?.byType && Object.keys(stats.byType).length > 0 ? (
            <div className="dense-list">
              {Object.entries(stats.byType).map(([type, count]) => (
                <div key={type} className="dense-list-item">
                  <span className="text-sm text-foreground">{type}</span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No data available"
              description="Companies will appear here once added"
            />
          )}
        </div>

        {/* Companies by Category */}
        <div className="border border-border rounded-lg p-4">
          <div className="section-header">
            <h3 className="text-base font-medium">Companies by Category</h3>
          </div>
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-8" />
              ))}
            </div>
          ) : stats?.byCategory && Object.keys(stats.byCategory).length > 0 ? (
            <div className="dense-list">
              {Object.entries(stats.byCategory).map(([cat, count]) => (
                <div key={cat} className="dense-list-item">
                  <span className="text-sm text-foreground">{cat}</span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No data available"
              description="Categories will appear here once companies are added"
            />
          )}
        </div>
      </div>

      {/* Recently Added Companies */}
      <div className="border border-border rounded-lg p-4 mb-8">
        <div className="section-header">
          <h3 className="text-base font-medium">Recently Added Companies</h3>
          <Link
            to="/companies"
            className="text-sm text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12" />
            ))}
          </div>
        ) : stats?.recent && stats.recent.length > 0 ? (
          <div className="dense-list">
            {stats.recent.map((company) => (
              <Link
                key={company.id}
                to={`/companies/${company.id}`}
                className="dense-list-item hover:bg-muted/50 -mx-4 px-4 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                    {company.logo_url ? (
                      <img
                        src={company.logo_url}
                        alt={company.name}
                        className="w-6 h-6 object-contain"
                      />
                    ) : (
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {company.name}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {company.company_type || "—"}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No companies yet"
            description="Companies will appear here once added to the system"
          />
        )}
      </div>

      {/* Coming Soon Section */}
      <div className="space-y-4">
        <h3 className="text-base font-medium text-foreground">Coming Soon</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ComingSoonCard
            title="Employability Snapshot"
            description="Overview of employability metrics and readiness indicators"
            requiredData="Student & employability datasets"
          />
          <ComingSoonCard
            title="Skill Readiness"
            description="Analysis of skill gaps and preparation recommendations"
            requiredData="Skill mapping datasets"
          />
          <ComingSoonCard
            title="Personalized Focus Areas"
            description="Tailored recommendations based on career goals"
            requiredData="User profiles & preferences"
          />
        </div>
      </div>
    </div>
  );
}
