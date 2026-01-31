import { PageHeader } from "@/components/ui/page-header";
import { ComingSoonCard } from "@/components/ui/coming-soon-card";
import { Lock, Sparkles, Target, Layers, ArrowUpRight } from "lucide-react";

export default function Skills() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <PageHeader
        title="Skills"
        description="Skill mapping and career readiness analysis"
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
              Activates when skill & role tables are integrated
            </p>
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <h3 className="text-base font-medium text-foreground mb-4">Feature Roadmap</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <ComingSoonCard
          title="Company → Skill Mapping"
          description="Understand which skills each company values and the depth of expertise required"
          requiredData="Skill taxonomy & company-skill relationship tables"
        />
        <ComingSoonCard
          title="Role Expectations"
          description="View skill requirements by role level across different companies"
          requiredData="Role definitions & skill level matrices"
        />
        <ComingSoonCard
          title="Skill Overlap Analysis"
          description="Identify transferable skills across companies and industries"
          requiredData="Cross-company skill frequency data"
        />
        <ComingSoonCard
          title="Skill Gap Assessment"
          description="Compare your skills against company requirements"
          requiredData="User skill profiles & assessment data"
        />
      </div>

      {/* Planned Capabilities */}
      <h3 className="text-base font-medium text-foreground mb-4">Planned Capabilities</h3>
      
      <div className="border border-border rounded-lg divide-y divide-border">
        <div className="p-4 flex items-start gap-4">
          <div className="p-2 rounded-md bg-muted">
            <Sparkles className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground">Skill Discovery</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Browse and explore skills organized by domain, complexity, and industry relevance
            </p>
          </div>
        </div>
        <div className="p-4 flex items-start gap-4">
          <div className="p-2 rounded-md bg-muted">
            <Target className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground">Demand Analysis</h4>
            <p className="text-sm text-muted-foreground mt-1">
              See which skills are most in-demand across your target companies
            </p>
          </div>
        </div>
        <div className="p-4 flex items-start gap-4">
          <div className="p-2 rounded-md bg-muted">
            <Layers className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground">Depth Levels</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Understand the expected proficiency levels from awareness to expert
            </p>
          </div>
        </div>
        <div className="p-4 flex items-start gap-4">
          <div className="p-2 rounded-md bg-muted">
            <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground">Career Pathways</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Map skill progression paths aligned with career advancement
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
