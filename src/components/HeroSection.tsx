import { Button } from "@/components/ui/button";
import { ArrowRight, Users, FileText, Star } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 px-4">
      <div className="container mx-auto text-center">
        {/* Hero Content */}
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Elevate Medical Learning
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Connect medical students with expert evaluators. Submit case reports, 
            receive professional feedback, and accelerate your clinical knowledge.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 transform hover:scale-105">
              <Link to="/student-auth">
                <Users className="h-5 w-5 mr-2" />
                Join as Student
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary-light transition-all duration-300">
              <Link to="/evaluator-auth">
                <FileText className="h-5 w-5 mr-2" />
                Join as Evaluator
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary-light to-background border border-border">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Case Reports Evaluated</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-accent-light to-background border border-border">
            <div className="text-3xl font-bold text-accent mb-2">150+</div>
            <div className="text-muted-foreground">Medical Students</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-secondary to-background border border-border">
            <div className="text-3xl font-bold text-foreground mb-2 flex items-center justify-center">
              4.9 <Star className="h-6 w-6 text-yellow-500 ml-1 fill-current" />
            </div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};