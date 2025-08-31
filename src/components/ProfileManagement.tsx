import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

interface University {
  id: string;
  name: string;
  code: string;
}

interface Department {
  id: string;
  name: string;
  university_id: string;
}

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  role: string;
  university_id: string | null;
  department_id: string | null;
  avatar_url: string | null;
}

interface ProfileManagementProps {
  user: User;
}

export const ProfileManagement = ({ user }: ProfileManagementProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [universities, setUniversities] = useState<University[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedUniversityId, setSelectedUniversityId] = useState<string>("");
  
  const [formData, setFormData] = useState({
    full_name: "",
    university_id: "",
    department_id: ""
  });

  useEffect(() => {
    loadProfile();
    loadUniversities();
  }, [user]);

  useEffect(() => {
    if (selectedUniversityId) {
      loadDepartments(selectedUniversityId);
    }
  }, [selectedUniversityId]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile(data);
        setFormData({
          full_name: data.full_name || "",
          university_id: data.university_id || "",
          department_id: data.department_id || ""
        });
        setSelectedUniversityId(data.university_id || "");
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile information",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadUniversities = async () => {
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .order('name');

      if (error) throw error;
      setUniversities(data || []);
    } catch (error) {
      console.error('Error loading universities:', error);
    }
  };

  const loadDepartments = async (universityId: string) => {
    try {
      const { data, error } = await supabase
        .from('departments')
        .select('*')
        .eq('university_id', universityId)
        .order('name');

      if (error) throw error;
      setDepartments(data || []);
    } catch (error) {
      console.error('Error loading departments:', error);
    }
  };

  const handleUniversityChange = (universityId: string) => {
    setSelectedUniversityId(universityId);
    setFormData({
      ...formData,
      university_id: universityId,
      department_id: "" // Reset department when university changes
    });
  };

  const handleSave = async () => {
    if (!formData.full_name.trim()) {
      toast({
        title: "Error",
        description: "Full name is required",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    try {
      const updateData = {
        full_name: formData.full_name,
        university_id: formData.university_id || null,
        department_id: formData.department_id || null,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          ...updateData
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully"
      });

      // Reload profile to get updated data
      loadProfile();
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to save profile changes",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-10 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-10 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={user.email} disabled className="bg-muted" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="full_name">Full Name</Label>
          <Input
            id="full_name"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="university">University</Label>
          <Select value={formData.university_id} onValueChange={handleUniversityChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select your university" />
            </SelectTrigger>
            <SelectContent>
              {universities.map((university) => (
                <SelectItem key={university.id} value={university.id}>
                  {university.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {departments.length > 0 && (
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select 
              value={formData.department_id} 
              onValueChange={(value) => setFormData({ ...formData, department_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((department) => (
                  <SelectItem key={department.id} value={department.id}>
                    {department.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input 
            id="role" 
            value={profile?.role || "student"} 
            disabled 
            className="bg-muted capitalize" 
          />
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-full">
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </CardContent>
    </Card>
  );
};