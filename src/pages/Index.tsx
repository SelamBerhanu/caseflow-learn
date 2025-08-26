import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { RoleSelection } from "@/components/RoleSelection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <RoleSelection />
      
      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-card-foreground">Ready to Transform Medical Learning?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of medical students and professionals who are already using CaseFlow Learn 
              to enhance clinical education through collaborative case report evaluation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
