import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, CheckCircle, Clock, TrendingUp, Award, MessageSquare, Download } from "lucide-react";
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

const recommendedTopics = [
  { id: 'emergency', name: 'Emergency Medicine Cases', pending: 12, progress: 30 },
  { id: 'pediatric', name: 'Pediatric Cases', pending: 8, progress: 60 },
  { id: 'cardiology', name: 'Cardiology Cases', pending: 5, progress: 80 }
];

export default function EvaluatorDashboard() {
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [evaluation, setEvaluation] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const handleEvaluate = (report: any) => {
    setSelectedReport(report);
  };

  const handleSubmitEvaluation = () => {
    // Handle evaluation submission
    console.log("Submitting evaluation for:", selectedReport, evaluation);
    setSelectedReport(null);
    setEvaluation("");
  };

  const handleTopicSelection = (topicId: string, checked: boolean) => {
    if (checked) {
      setSelectedTopics([...selectedTopics, topicId]);
    } else {
      setSelectedTopics(selectedTopics.filter(id => id !== topicId));
    }
  };

  const handleAcceptSelected = () => {
    console.log("Accepting selected topics:", selectedTopics);
    // Handle accepting selected topics logic here
    setSelectedTopics([]);
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left side - Uploaded Paper */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        Uploaded Paper: {selectedReport.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <h4 className="font-medium mb-3">Case Report Details</h4>
                        <div className="grid grid-cols-1 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Department:</span>
                            <span className="ml-2 font-medium">{selectedReport.department}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Submitted:</span>
                            <span className="ml-2 font-medium">{selectedReport.submittedDate}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Submitted by:</span>
                            <span className="ml-2 font-medium">{selectedReport.submittedBy}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Paper Preview/Content Area */}
                      <div className="border-2 border-dashed border-border rounded-lg p-6 min-h-[400px] bg-background">
                        <div className="text-center text-muted-foreground">
                          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium mb-2">Case Report Document</p>
                          <p className="text-sm">Paper content would be displayed here</p>
                          <Button variant="outline" className="mt-4">
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Right side - Evaluator's Feedback + Decision */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MessageSquare className="h-5 w-5 mr-2" />
                        Evaluation & Feedback
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Your Evaluation & Feedback</label>
                        <Textarea
                          value={evaluation}
                          onChange={(e) => setEvaluation(e.target.value)}
                          placeholder="Provide detailed evaluation, feedback, and educational insights for this case report..."
                          className="min-h-[300px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Decision</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select evaluation decision" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="approved">Approve - Excellent work</SelectItem>
                            <SelectItem value="approved-minor">Approve with minor revisions</SelectItem>
                            <SelectItem value="revisions">Major revisions required</SelectItem>
                            <SelectItem value="rejected">Reject - Needs significant improvement</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col space-y-4 pt-4">
                        <Button onClick={handleSubmitEvaluation} disabled={!evaluation.trim()}>
                          Submit Evaluation
                        </Button>
                        <Button variant="outline" onClick={() => setSelectedReport(null)}>
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
                  
                  <div className="space-y-4 mb-6">
                    {recommendedTopics.map((topic) => (
                      <div key={topic.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Checkbox 
                            id={topic.id}
                            checked={selectedTopics.includes(topic.id)}
                            onCheckedChange={(checked) => handleTopicSelection(topic.id, checked as boolean)}
                          />
                          <div>
                            <h4 className="font-medium">{topic.name}</h4>
                            <p className="text-sm text-muted-foreground">{topic.pending} pending evaluations</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Progress value={topic.progress} className="w-24 mb-1" />
                          <p className="text-xs text-muted-foreground">{topic.progress}% evaluated</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedTopics.length > 0 && (
                    <div className="flex justify-between items-center pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground">
                        {selectedTopics.length} topic{selectedTopics.length > 1 ? 's' : ''} selected
                      </p>
                      <Button onClick={handleAcceptSelected}>
                        Accept Selected
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}