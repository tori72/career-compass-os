import { PageHeader } from "@/components/ui/page-header";
import { Lock, Lightbulb, Building, Microscope, FileText, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const innovationTiers = [
  {
    tier: 1,
    name: "Foundational",
    description: "Companies focused on core business operations with emerging innovation interest",
    characteristics: ["Process optimization", "Digital adoption", "Efficiency focus"],
    industryInvolvement: false,
  },
  {
    tier: 2,
    name: "Developing",
    description: "Companies investing in structured innovation programs",
    characteristics: ["Internal R&D", "Innovation teams", "Pilot programs"],
    industryInvolvement: false,
  },
  {
    tier: 3,
    name: "Established",
    description: "Companies with mature innovation practices and industry collaboration",
    characteristics: ["Research partnerships", "Patent portfolios", "Industry consortiums"],
    industryInvolvement: true,
  },
  {
    tier: 4,
    name: "Advanced",
    description: "Innovation leaders shaping industry standards",
    characteristics: ["Thought leadership", "Open innovation", "Venture investments"],
    industryInvolvement: true,
  },
  {
    tier: 5,
    name: "Pioneering",
    description: "Companies at the frontier of industry transformation",
    characteristics: ["Breakthrough research", "Market creation", "Ecosystem leadership"],
    industryInvolvement: true,
  },
];

export default function Innovation() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <PageHeader
        title="Innovation"
        description="Company innovation tiers and industry involvement"
      />

      {/* Disabled State Banner */}
      <div className="border border-dashed border-border rounded-lg p-6 mb-8 bg-muted/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-md bg-muted">
            <Lock className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <h2 className="font-medium text-foreground">Feature Disabled</h2>
            <p className="text-sm text-muted-foreground">
              Activates when innovation framework data is integrated
            </p>
          </div>
        </div>
      </div>

      {/* Five-Tier Framework */}
      <h3 className="text-base font-medium text-foreground mb-4">Five-Tier Innovation Framework</h3>
      
      <div className="space-y-4 mb-8">
        {innovationTiers.map((tier) => (
          <div
            key={tier.tier}
            className="border border-border rounded-lg p-4 opacity-60"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-semibold text-muted-foreground">
                    {tier.tier}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-foreground">{tier.name}</h4>
                    {tier.industryInvolvement && (
                      <Badge variant="secondary" className="text-xs">
                        Industry Involvement
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {tier.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {tier.characteristics.map((char) => (
                      <Badge key={char} variant="outline" className="text-xs">
                        {char}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Roadmap Items */}
      <h3 className="text-base font-medium text-foreground mb-4">Future Capabilities</h3>
      
      <div className="border border-border rounded-lg divide-y divide-border opacity-60">
        <div className="p-4 flex items-start gap-4">
          <div className="p-2 rounded-md bg-muted">
            <Building className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground">Company Tier Classification</h4>
            <p className="text-sm text-muted-foreground mt-1">
              View which innovation tier each company belongs to based on their activities
            </p>
          </div>
        </div>
        <div className="p-4 flex items-start gap-4">
          <div className="p-2 rounded-md bg-muted">
            <Microscope className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground">Research Involvement</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Track academic partnerships, research publications, and collaborative projects
            </p>
          </div>
        </div>
        <div className="p-4 flex items-start gap-4">
          <div className="p-2 rounded-md bg-muted">
            <FileText className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground">IP & Patent Analysis</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Understand intellectual property portfolios and patent filing patterns
            </p>
          </div>
        </div>
        <div className="p-4 flex items-start gap-4">
          <div className="p-2 rounded-md bg-muted">
            <Award className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground">Innovation Recognition</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Awards, recognition, and industry accolades for innovation achievements
            </p>
          </div>
        </div>
      </div>

      {/* Note about industry involvement starting at Tier 3 */}
      <div className="mt-8 p-4 border border-border rounded-lg bg-muted/30">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground">About Industry Involvement</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Industry involvement in innovation ecosystems begins at Tier 3 (Established) and above. 
              Companies at these tiers actively participate in research partnerships, 
              industry consortiums, and collaborative innovation initiatives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
