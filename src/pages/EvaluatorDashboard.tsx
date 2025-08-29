import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
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

const casesByTopic = {
  emergency: [
    { id: 'e1', title: 'Acute Myocardial Infarction in ER', department: 'Emergency Medicine', submittedBy: 'Dr. Sarah Wilson', submittedDate: '2 hours ago', priority: 'high' },
    { id: 'e2', title: 'Severe Trauma Case Management', department: 'Emergency Medicine', submittedBy: 'Dr. Mike Chen', submittedDate: '4 hours ago', priority: 'high' },
    { id: 'e3', title: 'Drug Overdose Treatment Protocol', department: 'Emergency Medicine', submittedBy: 'Dr. Lisa Park', submittedDate: '6 hours ago', priority: 'medium' }
  ],
  pediatric: [
    { id: 'p1', title: 'Pediatric Asthma Management', department: 'Pediatrics', submittedBy: 'Dr. Emma Davis', submittedDate: '1 day ago', priority: 'medium' },
    { id: 'p2', title: 'Childhood Diabetes Case Study', department: 'Pediatrics', submittedBy: 'Dr. James Liu', submittedDate: '2 days ago', priority: 'medium' },
    { id: 'p3', title: 'Rare Genetic Disorder Diagnosis', department: 'Pediatrics', submittedBy: 'Dr. Amy Rodriguez', submittedDate: '3 days ago', priority: 'high' }
  ],
  cardiology: [
    { id: 'c1', title: 'Complex Arrhythmia Treatment', department: 'Cardiology', submittedBy: 'Dr. Robert Kim', submittedDate: '1 day ago', priority: 'high' },
    { id: 'c2', title: 'Heart Failure Case Management', department: 'Cardiology', submittedBy: 'Dr. Nina Patel', submittedDate: '2 days ago', priority: 'medium' },
    { id: 'c3', title: 'Post-Surgical Cardiac Care', department: 'Cardiology', submittedBy: 'Dr. Tom Zhang', submittedDate: '4 days ago', priority: 'medium' }
  ]
};

export default function EvaluatorDashboard() {
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [evaluation, setEvaluation] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [acceptedTopics, setAcceptedTopics] = useState<string[]>([]);
  const [showTopicCases, setShowTopicCases] = useState(false);

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
    setAcceptedTopics([...selectedTopics]);
    setShowTopicCases(true);
    setSelectedTopics([]);
  };

  // Get cases for accepted topics
  const getAcceptedTopicCases = () => {
    let allCases: any[] = [];
    acceptedTopics.forEach(topicId => {
      if (casesByTopic[topicId as keyof typeof casesByTopic]) {
        allCases = [...allCases, ...casesByTopic[topicId as keyof typeof casesByTopic]];
      }
    });
    return allCases;
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
                <div className="h-[calc(100vh-300px)]">
                  <ResizablePanelGroup direction="horizontal" className="border rounded-lg">
                    {/* Left Panel - Case Report Document */}
                    <ResizablePanel defaultSize={50} minSize={30}>
                      <div className="h-full flex flex-col">
                        <div className="border-b p-4">
                          <div className="flex items-center mb-2">
                            <FileText className="h-5 w-5 mr-2" />
                            <h3 className="font-semibold">{selectedReport.title}</h3>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{selectedReport.department}</span>
                            <span>•</span>
                            <span>{selectedReport.submittedBy}</span>
                            <span>•</span>
                            <span>{selectedReport.submittedDate}</span>
                          </div>
                        </div>
                        
                        <ScrollArea className="flex-1 p-4">
                          <div className="space-y-6">
                            {/* Sample case report content for scrolling demo */}
                            <div className="prose prose-sm max-w-none">
                              <h2>Case Presentation</h2>
                              <p>A 45-year-old male presents to the emergency department with acute onset chest pain that began approximately 2 hours ago while at rest. The patient describes the pain as a crushing sensation in the center of his chest, radiating to his left arm and jaw.</p>
                              
                              <h3>Chief Complaint</h3>
                              <p>"I have severe chest pain that feels like someone is sitting on my chest."</p>
                              
                              <h3>History of Present Illness</h3>
                              <p>The patient was watching television when he suddenly developed severe, crushing chest pain rated 9/10 in intensity. The pain is retrosternal, radiating to the left arm and jaw. Associated symptoms include diaphoresis, nausea, and shortness of breath. The patient denies any recent trauma, fever, or cough. He has no history of similar episodes.</p>
                              
                              <h3>Past Medical History</h3>
                              <ul>
                                <li>Hypertension (diagnosed 5 years ago)</li>
                                <li>Type 2 Diabetes Mellitus (diagnosed 3 years ago)</li>
                                <li>Hyperlipidemia</li>
                                <li>Former smoker (quit 1 year ago, 20 pack-year history)</li>
                              </ul>
                              
                              <h3>Medications</h3>
                              <ul>
                                <li>Lisinopril 10mg daily</li>
                                <li>Metformin 1000mg twice daily</li>
                                <li>Atorvastatin 40mg daily</li>
                              </ul>
                              
                              <h3>Physical Examination</h3>
                              <p><strong>Vital Signs:</strong> BP 160/95, HR 110, RR 22, O2 Sat 94% on room air, Temp 37.2°C</p>
                              <p><strong>General:</strong> Patient appears anxious and diaphoretic</p>
                              <p><strong>Cardiovascular:</strong> Tachycardic, regular rhythm, no murmurs, rubs, or gallops</p>
                              <p><strong>Pulmonary:</strong> Bilateral crackles at lung bases</p>
                              <p><strong>Abdomen:</strong> Soft, non-tender, no organomegaly</p>
                              <p><strong>Extremities:</strong> No edema, good peripheral pulses</p>
                              
                              <h3>Diagnostic Studies</h3>
                              <p><strong>ECG:</strong> ST-elevation in leads II, III, aVF with reciprocal changes in leads I and aVL</p>
                              <p><strong>Chest X-ray:</strong> Mild pulmonary congestion</p>
                              <p><strong>Laboratory Results:</strong></p>
                              <ul>
                                <li>Troponin I: 12.5 ng/mL (normal &lt;0.04)</li>
                                <li>CK-MB: 85 ng/mL (normal &lt;6.3)</li>
                                <li>BNP: 450 pg/mL (normal &lt;100)</li>
                                <li>Complete metabolic panel within normal limits</li>
                              </ul>
                              
                              <h3>Assessment and Plan</h3>
                              <p><strong>Primary Diagnosis:</strong> ST-elevation myocardial infarction (STEMI) - inferior wall</p>
                              
                              <p><strong>Immediate Management:</strong></p>
                              <ul>
                                <li>Aspirin 325mg chewed</li>
                                <li>Clopidogrel 600mg loading dose</li>
                                <li>Atorvastatin 80mg</li>
                                <li>Metoprolol 25mg twice daily</li>
                                <li>Heparin per protocol</li>
                                <li>Emergency cardiac catheterization</li>
                              </ul>
                              
                              <h3>Hospital Course</h3>
                              <p>The patient was emergently taken to the cardiac catheterization laboratory where a 99% occlusion of the right coronary artery was identified and successfully treated with percutaneous coronary intervention and drug-eluting stent placement. Post-procedure, the patient's chest pain resolved completely.</p>
                              
                              <h3>Discharge Planning</h3>
                              <p>Patient was discharged on post-procedure day 2 with cardiology follow-up in 1 week. Medications at discharge included dual antiplatelet therapy, ACE inhibitor, beta-blocker, and high-intensity statin therapy.</p>
                              
                              <h3>Discussion</h3>
                              <p>This case illustrates the importance of rapid recognition and treatment of STEMI. The patient's presentation with typical chest pain, ECG changes, and elevated cardiac biomarkers led to prompt diagnosis and successful primary PCI within the recommended time frame.</p>
                            </div>
                          </div>
                        </ScrollArea>
                      </div>
                    </ResizablePanel>
                    
                    <ResizableHandle withHandle />
                    
                    {/* Right Panel - Evaluation Form */}
                    <ResizablePanel defaultSize={50} minSize={30}>
                      <div className="h-full flex flex-col">
                        <div className="border-b p-4">
                          <div className="flex items-center">
                            <MessageSquare className="h-5 w-5 mr-2" />
                            <h3 className="font-semibold">Evaluation & Feedback</h3>
                          </div>
                        </div>
                        
                        <ScrollArea className="flex-1 p-4">
                          <div className="space-y-6">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Your Evaluation & Feedback</label>
                              <Textarea
                                value={evaluation}
                                onChange={(e) => setEvaluation(e.target.value)}
                                placeholder="Provide detailed evaluation, feedback, and educational insights for this case report..."
                                className="min-h-[400px] resize-none"
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
                          </div>
                        </ScrollArea>
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
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

                  {showTopicCases && acceptedTopics.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-border">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Cases for Selected Topics</h3>
                        <Button variant="outline" size="sm" onClick={() => setShowTopicCases(false)}>
                          Close
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {getAcceptedTopicCases().map((case_item) => (
                          <Card key={case_item.id} className="border border-border hover:border-accent/40 transition-colors">
                            <CardContent className="p-6">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h4 className="text-lg font-semibold mb-2">{case_item.title}</h4>
                                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                    <span>{case_item.department}</span>
                                    <span>•</span>
                                    <span>Submitted by: {case_item.submittedBy}</span>
                                    <span>•</span>
                                    <span>{case_item.submittedDate}</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Badge variant={case_item.priority === 'high' ? 'destructive' : 'secondary'}>
                                    {case_item.priority} priority
                                  </Badge>
                                  <Button onClick={() => handleEvaluate(case_item)}>
                                    Start Evaluation
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
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