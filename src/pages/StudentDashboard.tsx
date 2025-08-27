import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Search, Heart, Star, Filter } from "lucide-react";
import { Navigation } from "@/components/Navigation";

const mockReports = [
  {
    id: 1,
    title: "Acute Myocardial Infarction Case",
    department: "Cardiology",
    university: "Harvard Medical School",
    evaluator: "Dr. Sarah Johnson",
    evaluatorSpecialty: "Cardiologist",
    rating: 4.8,
    likes: 24,
    evaluated: true
  },
  {
    id: 2,
    title: "Pneumonia in Elderly Patient",
    department: "Internal Medicine",
    university: "Johns Hopkins",
    evaluator: "Dr. Michael Chen",
    evaluatorSpecialty: "Pulmonologist",
    rating: 4.6,
    likes: 18,
    evaluated: true
  }
];

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("browse");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmitReport = () => {
    // Handle case report submission
    console.log("Submitting report:", selectedFile);
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 pb-8 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-foreground">Student Dashboard</h1>
            <p className="text-muted-foreground">Submit case reports and explore evaluated cases to enhance your learning</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="browse">Browse Reports</TabsTrigger>
              <TabsTrigger value="submit">Submit Report</TabsTrigger>
              <TabsTrigger value="my-reports">My Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Search className="h-5 w-5 mr-2" />
                    Find Evaluated Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="space-y-2">
                      <Label>University</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="All Universities" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="harvard">Harvard Medical School</SelectItem>
                          <SelectItem value="johns-hopkins">Johns Hopkins</SelectItem>
                          <SelectItem value="stanford">Stanford Medicine</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="All Departments" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cardiology">Cardiology</SelectItem>
                          <SelectItem value="internal">Internal Medicine</SelectItem>
                          <SelectItem value="surgery">Surgery</SelectItem>
                          <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Topic</Label>
                      <Input placeholder="Search by topic..." />
                    </div>
                  </div>
                  
                  <Button className="mb-6">
                    <Filter className="h-4 w-4 mr-2" />
                    Apply Filters
                  </Button>

                  <div className="space-y-4">
                    {mockReports.map((report) => (
                      <Card key={report.id} className="border border-border hover:border-primary/40 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold mb-2">{report.title}</h3>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span>{report.department}</span>
                                <span>•</span>
                                <span>{report.university}</span>
                              </div>
                            </div>
                            <Badge variant="secondary">Evaluated</Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm">
                              <span className="text-muted-foreground">
                                Evaluated by: <span className="font-medium text-foreground">{report.evaluator}</span> ({report.evaluatorSpecialty})
                              </span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                                <span className="text-sm font-medium">{report.rating}</span>
                              </div>
                              <div className="flex items-center">
                                <Heart className="h-4 w-4 text-destructive mr-1" />
                                <span className="text-sm">{report.likes}</span>
                              </div>
                              <Button size="sm">View Report</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="submit" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="h-5 w-5 mr-2" />
                    Submit New Case Report
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Report Title</Label>
                    <Input id="title" placeholder="Enter a descriptive title for your case report" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Case Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Provide a brief description of the case..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cardiology">Cardiology</SelectItem>
                          <SelectItem value="internal">Internal Medicine</SelectItem>
                          <SelectItem value="surgery">Surgery</SelectItem>
                          <SelectItem value="pediatrics">Pediatrics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Privacy</Label>
                      <Select defaultValue="anonymous">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="anonymous">Submit Anonymously</SelectItem>
                          <SelectItem value="identifiable">Include My Name</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file">Upload Case Report</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <input
                        type="file"
                        id="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <label htmlFor="file" className="cursor-pointer">
                        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-2">
                          {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                        </p>
                        <p className="text-sm text-muted-foreground">PDF, JPG, PNG up to 10MB</p>
                      </label>
                    </div>
                  </div>

                  <Button onClick={handleSubmitReport} className="w-full" disabled={!selectedFile}>
                    Submit Case Report for Evaluation
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="my-reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Submitted Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No reports submitted yet</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Submit your first case report to start building your portfolio
                    </p>
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