import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Stethoscope, ArrowRight } from "lucide-react";

export const RoleSelection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Choose Your Path</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select your role to get started with CaseFlow Learn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Student Card */}
          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-primary-light/30 to-background">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 p-4 rounded-full bg-primary-light">
                <GraduationCap className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl text-card-foreground">Medical Student</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground mb-6">
                Submit case reports and learn from expert evaluations to enhance your clinical knowledge
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 mb-8">
                <li>• Upload case reports for evaluation</li>
                <li>• Access evaluated reports by specialty</li>
                <li>• Rate and learn from peer submissions</li>
                <li>• Track your learning progress</li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90">
                Join as Student
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Evaluator Card */}
          <Card className="border-2 border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-accent-light/30 to-background">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 p-4 rounded-full bg-accent-light">
                <Stethoscope className="h-12 w-12 text-accent" />
              </div>
              <CardTitle className="text-2xl text-card-foreground">Medical Professional</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground mb-6">
                Share your expertise by evaluating student case reports and contribute to medical education
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 mb-8">
                <li>• Evaluate student case submissions</li>
                <li>• Provide detailed professional feedback</li>
                <li>• Track your teaching impact</li>
                <li>• Connect with medical institutions</li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-accent to-accent/80 hover:opacity-90">
                Join as Evaluator
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};