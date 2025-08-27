import { Button } from "@/components/ui/button";
import { GraduationCap, UserPlus, LogIn, LogOut, Home } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname.includes('dashboard');

  const handleLogout = () => {
    navigate('/');
  };

  const handleBackToDashboard = () => {
    if (location.pathname.includes('student')) {
      navigate('/student-dashboard');
    } else if (location.pathname.includes('evaluator')) {
      navigate('/evaluator-dashboard');
    }
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
            {isDashboard ? (
              <>
                <Button variant="ghost" size="sm" onClick={handleBackToDashboard}>
                  <Home className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
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