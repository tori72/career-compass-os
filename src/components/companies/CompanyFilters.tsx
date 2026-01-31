import { cn } from "@/lib/utils";

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface CompanyFiltersProps {
  companyTypes: FilterOption[];
  categories: FilterOption[];
  selectedType: string | null;
  selectedCategory: string | null;
  onTypeChange: (type: string | null) => void;
  onCategoryChange: (category: string | null) => void;
}

export function CompanyFilters({
  companyTypes,
  categories,
  selectedType,
  selectedCategory,
  onTypeChange,
  onCategoryChange,
}: CompanyFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Company Type Filter */}
      <div>
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
          Company Type
        </h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTypeChange(null)}
            className={cn(
              "filter-chip",
              !selectedType && "active"
            )}
          >
            All
          </button>
          {companyTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => onTypeChange(type.value)}
              className={cn(
                "filter-chip",
                selectedType === type.value && "active"
              )}
            >
              {type.label}
              {type.count !== undefined && (
                <span className="ml-1.5 text-xs opacity-70">({type.count})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Category
          </h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onCategoryChange(null)}
              className={cn(
                "filter-chip",
                !selectedCategory && "active"
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => onCategoryChange(cat.value)}
                className={cn(
                  "filter-chip",
                  selectedCategory === cat.value && "active"
                )}
              >
                {cat.label}
                {cat.count !== undefined && (
                  <span className="ml-1.5 text-xs opacity-70">({cat.count})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
