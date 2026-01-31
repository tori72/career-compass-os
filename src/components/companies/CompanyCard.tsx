import { Link } from "react-router-dom";
import { Building2, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CompanyCardProps {
  id: string;
  name: string;
  logo_url?: string | null;
  company_type?: string | null;
  category?: string | null;
  employee_size?: string | null;
  headquarters_address?: string | null;
}

export function CompanyCard({
  id,
  name,
  logo_url,
  company_type,
  category,
  employee_size,
  headquarters_address,
}: CompanyCardProps) {
  return (
    <Link to={`/companies/${id}`} className="block">
      <div className="company-card group">
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
            {logo_url ? (
              <img
                src={logo_url}
                alt={`${name} logo`}
                className="w-full h-full object-contain"
              />
            ) : (
              <Building2 className="w-6 h-6 text-muted-foreground" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
              {name}
            </h3>
            
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {company_type && (
                <Badge variant="secondary" className="text-xs">
                  {company_type}
                </Badge>
              )}
              {category && (
                <Badge variant="outline" className="text-xs">
                  {category}
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground">
              {employee_size && (
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {employee_size}
                </span>
              )}
              {headquarters_address && (
                <span className="flex items-center gap-1 truncate">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{headquarters_address}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
