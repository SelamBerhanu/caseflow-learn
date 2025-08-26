import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Upload, 
  MessageSquare, 
  Filter, 
  BarChart3, 
  Shield, 
  BookOpen 
} from "lucide-react";

export const FeaturesSection = () => {
  const studentFeatures = [
    {
      icon: Upload,
      title: "Easy Submission",
      description: "Upload case reports in PDF or photo format with optional anonymous posting"
    },
    {
      icon: MessageSquare,
      title: "Expert Feedback",
      description: "Receive detailed evaluations and comments from qualified medical professionals"
    },
    {
      icon: Filter,
      title: "Smart Filtering",
      description: "Find relevant case reports by university, department, and medical specialty"
    }
  ];

  const evaluatorFeatures = [
    {
      icon: BookOpen,
      title: "Review Cases",
      description: "Access submitted case reports and provide valuable educational feedback"
    },
    {
      icon: BarChart3,
      title: "Track Impact",
      description: "Monitor your evaluation statistics and see how you're helping students learn"
    },
    {
      icon: Shield,
      title: "Professional Profile",
      description: "Showcase your specialty and institutional affiliation to build trust"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        {/* Student Features */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">For Medical Students</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Accelerate your learning with professional case report evaluations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studentFeatures.map((feature, index) => (
              <Card key={index} className="border-border bg-card hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-primary-light">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-card-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Evaluator Features */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">For Medical Professionals</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Share your expertise and shape the next generation of medical professionals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {evaluatorFeatures.map((feature, index) => (
              <Card key={index} className="border-border bg-card hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-accent-light">
                    <feature.icon className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl text-card-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};