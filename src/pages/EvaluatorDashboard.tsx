import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { FileText, CheckCircle, Clock, TrendingUp, Award, MessageSquare } from "lucide-react";
import { Navigation } from "@/components/Navigation";

const pendingReports = [
  {
    id: 1,
    title: "Chest Pain in 45-year-old Male",
    department: "Emergency Medicine",
    submittedBy: "Anonymous",
    submittedDate: "2024-01-15",
    priority: "high"
  },
  {
    id: 2,
    title: "Pediatric Fever Case",
    department: "Pediatrics",
    submittedBy: "Anonymous",
    submittedDate: "2024-01-14",
    priority: "medium"
  }
];

export default function EvaluatorDashboard() {
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [evaluation, setEvaluation] = useState("");

  const handleEvaluate = (report: any) => {
    setSelectedReport(report);
  };

  const handleSubmitEvaluation = () => {
    // Handle evaluation submission
    console.log("Submitting evaluation for:", selectedReport, evaluation);
    setSelectedReport(null);
    setEvaluation("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-8 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-foreground">Evaluator Dashboard</h1>
            <p className="text-muted-foreground">Review and evaluate student case reports to contribute to medical education</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Evaluations</p>
                    <p className="text-2xl font-bold text-primary">127</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Reviews</p>
                    <p className="text-2xl font-bold text-accent">8</p>
                  </div>
                  <Clock className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Likes</p>
                    <p className="text-2xl font-bold text-destructive">342</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-destructive" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <p className="text-2xl font-bold text-secondary-foreground">4.8</p>
                  </div>
                  <Award className="h-8 w-8 text-secondary-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">Pending Reports ({pendingReports.length})</TabsTrigger>
              <TabsTrigger value="evaluated">My Evaluations</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-6">
              {selectedReport ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Evaluate Report: {selectedReport.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Case Report Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Department:</span>
                          <span className="ml-2 font-medium">{selectedReport.department}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Submitted:</span>
                          <span className="ml-2 font-medium">{selectedReport.submittedDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Your Evaluation & Feedback</label>
                      <Textarea
                        value={evaluation}
                        onChange={(e) => setEvaluation(e.target.value)}
                        placeholder="Provide detailed evaluation, feedback, and educational insights for this case report..."
                        className="min-h-[200px]"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={handleSubmitEvaluation} disabled={!evaluation.trim()}>
                        Submit Evaluation
                      </Button>
                      <Button variant="outline" onClick={() => setSelectedReport(null)}>
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {pendingReports.map((report) => (
                    <Card key={report.id} className="border border-border hover:border-accent/40 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">{report.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{report.department}</span>
                              <span>•</span>
                              <span>Submitted by: {report.submittedBy}</span>
                              <span>•</span>
                              <span>{report.submittedDate}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={report.priority === 'high' ? 'destructive' : 'secondary'}>
                              {report.priority} priority
                            </Badge>
                            <Button onClick={() => handleEvaluate(report)}>
                              Start Evaluation
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="evaluated" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recently Evaluated Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No evaluations completed yet</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Start evaluating reports to build your contribution history
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Topics for Evaluation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Based on current submissions and your expertise, these topics need more evaluator attention:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Emergency Medicine Cases</h4>
                        <p className="text-sm text-muted-foreground">12 pending evaluations</p>
                      </div>
                      <div className="text-right">
                        <Progress value={30} className="w-24 mb-1" />
                        <p className="text-xs text-muted-foreground">30% evaluated</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Pediatric Cases</h4>
                        <p className="text-sm text-muted-foreground">8 pending evaluations</p>
                      </div>
                      <div className="text-right">
                        <Progress value={60} className="w-24 mb-1" />
                        <p className="text-xs text-muted-foreground">60% evaluated</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Cardiology Cases</h4>
                        <p className="text-sm text-muted-foreground">5 pending evaluations</p>
                      </div>
                      <div className="text-right">
                        <Progress value={80} className="w-24 mb-1" />
                        <p className="text-xs text-muted-foreground">80% evaluated</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}