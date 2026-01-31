import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Building2, Globe, MapPin, Calendar, Users, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import {
  useCompany,
  useCompanyBusiness,
  useCompanyTechnologies,
  useCompanyPeople,
  useCompanyCulture,
  useCompanyTalentGrowth,
  useCompanyCompensation,
  useCompanyLogistics,
  useCompanyFinancials,
  useCompanyBrandReputation,
} from "@/hooks/useCompanies";

function DataField({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="py-3 border-b border-border last:border-0">
      <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
        {label}
      </dt>
      <dd className="text-sm text-foreground">
        {value || <span className="text-muted-foreground italic">Not available</span>}
      </dd>
    </div>
  );
}

function ArrayField({ label, items }: { label: string; items: string[] | null | undefined }) {
  return (
    <div className="py-3 border-b border-border last:border-0">
      <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
        {label}
      </dt>
      <dd>
        {items && items.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {items.map((item, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        ) : (
          <span className="text-sm text-muted-foreground italic">Not available</span>
        )}
      </dd>
    </div>
  );
}

function TabContent({ children, isEmpty }: { children: React.ReactNode; isEmpty?: boolean }) {
  if (isEmpty) {
    return (
      <EmptyState
        title="No data available"
        description="Information for this section has not been added yet"
      />
    );
  }
  return <div className="space-y-0 divide-y divide-border">{children}</div>;
}

export default function CompanyDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: company, isLoading } = useCompany(id!);
  const { data: business } = useCompanyBusiness(id!);
  const { data: technologies } = useCompanyTechnologies(id!);
  const { data: people } = useCompanyPeople(id!);
  const { data: culture } = useCompanyCulture(id!);
  const { data: talentGrowth } = useCompanyTalentGrowth(id!);
  const { data: compensation } = useCompanyCompensation(id!);
  const { data: logistics } = useCompanyLogistics(id!);
  const { data: financials } = useCompanyFinancials(id!);
  const { data: brandReputation } = useCompanyBrandReputation(id!);

  if (isLoading) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <Skeleton className="h-8 w-32 mb-6" />
        <Skeleton className="h-24 mb-6" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <Link
          to="/companies"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Companies
        </Link>
        <EmptyState
          title="Company not found"
          description="The requested company could not be found"
        />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Back link */}
      <Link
        to="/companies"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Companies
      </Link>

      {/* Company Header */}
      <div className="border border-border rounded-lg p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
            {company.logo_url ? (
              <img
                src={company.logo_url}
                alt={`${company.name} logo`}
                className="w-full h-full object-contain"
              />
            ) : (
              <Building2 className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-semibold text-foreground">{company.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {company.company_type && (
                <Badge variant="secondary">{company.company_type}</Badge>
              )}
              {company.category && (
                <Badge variant="outline">{company.category}</Badge>
              )}
            </div>
            {company.description && (
              <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                {company.description}
              </p>
            )}
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          {company.headquarters_address && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{company.headquarters_address}</span>
            </div>
          )}
          {company.employee_size && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4 flex-shrink-0" />
              <span>{company.employee_size}</span>
            </div>
          )}
          {company.founded_year && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>Founded {company.founded_year}</span>
            </div>
          )}
          {company.website_url && (
            <a
              href={company.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <Globe className="w-4 h-4 flex-shrink-0" />
              <span>Website</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="overview" className="border border-border rounded-lg">
        <TabsList className="w-full justify-start border-b border-border rounded-none bg-muted/30 p-0 h-auto flex-wrap">
          <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Overview
          </TabsTrigger>
          <TabsTrigger value="business" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Business
          </TabsTrigger>
          <TabsTrigger value="technology" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Technology
          </TabsTrigger>
          <TabsTrigger value="people" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            People
          </TabsTrigger>
          <TabsTrigger value="culture" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Culture
          </TabsTrigger>
          <TabsTrigger value="talent" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Talent & Growth
          </TabsTrigger>
          <TabsTrigger value="compensation" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Compensation
          </TabsTrigger>
          <TabsTrigger value="financials" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
            Financials
          </TabsTrigger>
        </TabsList>

        <div className="p-6">
          <TabsContent value="overview" className="mt-0">
            <TabContent>
              <DataField label="Company Type" value={company.company_type} />
              <DataField label="Category" value={company.category} />
              <DataField label="Employee Size" value={company.employee_size} />
              <DataField label="Founded" value={company.founded_year} />
              <DataField label="Headquarters" value={company.headquarters_address} />
              <ArrayField label="Operating Countries" items={company.operating_countries} />
              <DataField label="Description" value={company.description} />
            </TabContent>
          </TabsContent>

          <TabsContent value="business" className="mt-0">
            <TabContent isEmpty={!business}>
              {business && (
                <>
                  <DataField label="Business Model" value={business.business_model} />
                  <ArrayField label="Revenue Streams" items={business.revenue_streams} />
                  <ArrayField label="Target Markets" items={business.target_markets} />
                  <ArrayField label="Competitive Advantages" items={business.competitive_advantages} />
                  <ArrayField label="Strategic Priorities" items={business.strategic_priorities} />
                </>
              )}
            </TabContent>
          </TabsContent>

          <TabsContent value="technology" className="mt-0">
            <TabContent isEmpty={!technologies}>
              {technologies && (
                <>
                  <ArrayField label="Tech Stack" items={technologies.tech_stack} />
                  <ArrayField label="Development Practices" items={technologies.development_practices} />
                  <ArrayField label="Infrastructure" items={technologies.infrastructure} />
                  <ArrayField label="Innovation Areas" items={technologies.innovation_areas} />
                </>
              )}
            </TabContent>
          </TabsContent>

          <TabsContent value="people" className="mt-0">
            <TabContent isEmpty={!people}>
              {people && (
                <>
                  <DataField label="Team Size" value={people.team_size} />
                  <ArrayField label="Hiring Managers" items={people.hiring_managers} />
                  <ArrayField label="Notable Alumni" items={people.notable_alumni} />
                  <DataField
                    label="Leadership Team"
                    value={
                      people.leadership_team
                        ? JSON.stringify(people.leadership_team, null, 2)
                        : null
                    }
                  />
                </>
              )}
            </TabContent>
          </TabsContent>

          <TabsContent value="culture" className="mt-0">
            <TabContent isEmpty={!culture}>
              {culture && (
                <>
                  <DataField label="Work Environment" value={culture.work_environment} />
                  <ArrayField label="Core Values" items={culture.core_values} />
                  <ArrayField label="Diversity Initiatives" items={culture.diversity_initiatives} />
                  <DataField
                    label="Work-Life Balance Rating"
                    value={culture.work_life_balance_rating ? `${culture.work_life_balance_rating}/5` : null}
                  />
                  <DataField
                    label="Employee Engagement Score"
                    value={culture.employee_engagement_score ? `${culture.employee_engagement_score}%` : null}
                  />
                </>
              )}
            </TabContent>
          </TabsContent>

          <TabsContent value="talent" className="mt-0">
            <TabContent isEmpty={!talentGrowth}>
              {talentGrowth && (
                <>
                  <ArrayField label="Career Paths" items={talentGrowth.career_paths} />
                  <ArrayField label="Training Programs" items={talentGrowth.training_programs} />
                  <DataField
                    label="Mentorship Available"
                    value={talentGrowth.mentorship_available ? "Yes" : "No"}
                  />
                  <DataField
                    label="Internal Mobility Rate"
                    value={
                      talentGrowth.internal_mobility_rate
                        ? `${talentGrowth.internal_mobility_rate}%`
                        : null
                    }
                  />
                  <DataField label="Average Tenure" value={talentGrowth.average_tenure} />
                </>
              )}
            </TabContent>
          </TabsContent>

          <TabsContent value="compensation" className="mt-0">
            <TabContent isEmpty={!compensation && !logistics}>
              {compensation && (
                <>
                  <DataField
                    label="Salary Range"
                    value={
                      compensation.salary_range_min && compensation.salary_range_max
                        ? `$${compensation.salary_range_min.toLocaleString()} - $${compensation.salary_range_max.toLocaleString()}`
                        : null
                    }
                  />
                  <DataField label="Bonus Structure" value={compensation.bonus_structure} />
                  <DataField
                    label="Equity Offered"
                    value={compensation.equity_offered ? "Yes" : "No"}
                  />
                  <ArrayField label="Benefits" items={compensation.benefits} />
                </>
              )}
              {logistics && (
                <>
                  <ArrayField label="Office Locations" items={logistics.office_locations} />
                  <DataField label="Remote Work Policy" value={logistics.remote_work_policy} />
                  <DataField label="Work Hours" value={logistics.work_hours} />
                  <DataField label="Travel Requirements" value={logistics.travel_requirements} />
                  <DataField
                    label="Relocation Support"
                    value={logistics.relocation_support ? "Yes" : "No"}
                  />
                </>
              )}
            </TabContent>
          </TabsContent>

          <TabsContent value="financials" className="mt-0">
            <TabContent isEmpty={!financials && !brandReputation}>
              {financials && (
                <>
                  <DataField label="Revenue Range" value={financials.revenue_range} />
                  <DataField label="Funding Stage" value={financials.funding_stage} />
                  <DataField label="Total Funding" value={financials.total_funding} />
                  <DataField label="Profitability Status" value={financials.profitability_status} />
                  <DataField label="Growth Rate" value={financials.growth_rate} />
                </>
              )}
              {brandReputation && (
                <>
                  <DataField
                    label="Glassdoor Rating"
                    value={brandReputation.glassdoor_rating ? `${brandReputation.glassdoor_rating}/5` : null}
                  />
                  <DataField
                    label="LinkedIn Followers"
                    value={brandReputation.linkedin_followers?.toLocaleString()}
                  />
                  <DataField
                    label="Employer Brand Score"
                    value={brandReputation.employer_brand_score ? `${brandReputation.employer_brand_score}%` : null}
                  />
                  <ArrayField label="Awards" items={brandReputation.awards} />
                  <ArrayField label="Media Mentions" items={brandReputation.media_mentions} />
                </>
              )}
            </TabContent>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
