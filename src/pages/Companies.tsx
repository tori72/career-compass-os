import { useState, useMemo } from "react";
import { useCompanies } from "@/hooks/useCompanies";
import { PageHeader } from "@/components/ui/page-header";
import { CompanyCard } from "@/components/companies/CompanyCard";
import { CompanyFilters } from "@/components/companies/CompanyFilters";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search, Building2 } from "lucide-react";

export default function Companies() {
  const { data: companies, isLoading } = useCompanies();
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filterOptions = useMemo(() => {
    if (!companies) return { types: [], categories: [] };

    const typeMap = new Map<string, number>();
    const categoryMap = new Map<string, number>();

    companies.forEach((company) => {
      if (company.company_type) {
        typeMap.set(company.company_type, (typeMap.get(company.company_type) || 0) + 1);
      }
      if (company.category) {
        categoryMap.set(company.category, (categoryMap.get(company.category) || 0) + 1);
      }
    });

    return {
      types: Array.from(typeMap.entries()).map(([value, count]) => ({
        label: value,
        value,
        count,
      })),
      categories: Array.from(categoryMap.entries()).map(([value, count]) => ({
        label: value,
        value,
        count,
      })),
    };
  }, [companies]);

  const filteredCompanies = useMemo(() => {
    if (!companies) return [];

    return companies.filter((company) => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        const matchesName = company.name.toLowerCase().includes(searchLower);
        const matchesType = company.company_type?.toLowerCase().includes(searchLower);
        const matchesCategory = company.category?.toLowerCase().includes(searchLower);
        if (!matchesName && !matchesType && !matchesCategory) return false;
      }

      // Type filter
      if (selectedType && company.company_type !== selectedType) return false;

      // Category filter
      if (selectedCategory && company.category !== selectedCategory) return false;

      return true;
    });
  }, [companies, search, selectedType, selectedCategory]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader
        title="Companies"
        description={`${companies?.length || 0} companies in the system`}
      />

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search companies by name, type, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Filters */}
      {!isLoading && (filterOptions.types.length > 0 || filterOptions.categories.length > 0) && (
        <div className="mb-6 p-4 border border-border rounded-lg bg-muted/20">
          <CompanyFilters
            companyTypes={filterOptions.types}
            categories={filterOptions.categories}
            selectedType={selectedType}
            selectedCategory={selectedCategory}
            onTypeChange={setSelectedType}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      )}

      {/* Results */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      ) : filteredCompanies.length > 0 ? (
        <>
          <p className="text-sm text-muted-foreground mb-4">
            Showing {filteredCompanies.length} of {companies?.length || 0} companies
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                id={company.id}
                name={company.name}
                logo_url={company.logo_url}
                company_type={company.company_type}
                category={company.category}
                employee_size={company.employee_size}
                headquarters_address={company.headquarters_address}
              />
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          icon={<Building2 className="w-full h-full" />}
          title="No companies found"
          description={
            search || selectedType || selectedCategory
              ? "Try adjusting your filters or search terms"
              : "Companies will appear here once added to the system"
          }
        />
      )}
    </div>
  );
}
