import { Button } from "@/components/ui/button";
import { GraduationCap, UserPlus, LogIn, LogOut, Home } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname.includes('dashboard');
  const isStudentArea = location.pathname.includes('student');
  const isEvaluatorArea = location.pathname.includes('evaluator');
  
  // Simulate logged in state based on being in dashboard/auth areas
  const isLoggedIn = isDashboard || location.pathname.includes('-auth');

  const handleLogout = () => {
    navigate('/');
  };

  const handleStudentSubmission = () => {
    navigate('/student-dashboard?tab=submit');
  };

  const handleStudentBrowse = () => {
    navigate('/student-dashboard?tab=browse');
  };

  const handleEvaluatorReviews = () => {
    navigate('/evaluator-dashboard?tab=pending');
  };

  const handleEvaluatorStats = () => {
    navigate('/evaluator-dashboard?tab=evaluations');
  };

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">CaseFlow Learn</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              // Show joining options for people without accounts
              <>
                <Button variant="ghost" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button variant="default" size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Get Started
                </Button>
              </>
            ) : isDashboard ? (
              // Show logout for dashboard pages
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            ) : isStudentArea ? (
              // Show student features
              <>
                <Button variant="ghost" size="sm" onClick={handleStudentSubmission}>
                  Easy Submission
                </Button>
                <Button variant="ghost" size="sm" onClick={handleStudentBrowse}>
                  Expert Feedback
                </Button>
                <Button variant="ghost" size="sm" onClick={handleStudentBrowse}>
                  Smart Filtering
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : isEvaluatorArea ? (
              // Show evaluator features
              <>
                <Button variant="ghost" size="sm" onClick={handleEvaluatorReviews}>
                  Review Reports
                </Button>
                <Button variant="ghost" size="sm" onClick={handleEvaluatorStats}>
                  My Evaluations
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              // Fallback to joining options
              <>
                <Button variant="ghost" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button variant="default" size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};