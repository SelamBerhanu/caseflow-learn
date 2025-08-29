-- Create enum types for better data integrity
CREATE TYPE public.user_role AS ENUM ('student', 'evaluator', 'admin');
CREATE TYPE public.case_status AS ENUM ('pending', 'under_review', 'completed', 'rejected');
CREATE TYPE public.privacy_level AS ENUM ('public', 'university_only', 'private');

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'student',
  university TEXT,
  department TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create universities table
CREATE TABLE public.universities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  code TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create departments table
CREATE TABLE public.departments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  university_id UUID REFERENCES public.universities(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(name, university_id)
);

-- Create topics table
CREATE TABLE public.topics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create case reports table
CREATE TABLE public.case_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  topic_id UUID REFERENCES public.topics(id),
  university_id UUID REFERENCES public.universities(id),
  department_id UUID REFERENCES public.departments(id),
  file_url TEXT,
  file_name TEXT,
  privacy_level privacy_level NOT NULL DEFAULT 'public',
  status case_status NOT NULL DEFAULT 'pending',
  likes_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create evaluations table
CREATE TABLE public.evaluations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  case_report_id UUID NOT NULL REFERENCES public.case_reports(id) ON DELETE CASCADE,
  evaluator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  status case_status NOT NULL DEFAULT 'under_review',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(case_report_id, evaluator_id)
);

-- Create evaluator topics (topics that evaluators are interested in)
CREATE TABLE public.evaluator_topics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  evaluator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id UUID NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
  accepted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(evaluator_id, topic_id)
);

-- Create likes table for case reports
CREATE TABLE public.case_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  case_report_id UUID NOT NULL REFERENCES public.case_reports(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, case_report_id)
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluator_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_likes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for universities and departments (public read access)
CREATE POLICY "Everyone can view universities" ON public.universities FOR SELECT USING (true);
CREATE POLICY "Everyone can view departments" ON public.departments FOR SELECT USING (true);

-- Create RLS policies for topics (public read access)
CREATE POLICY "Everyone can view topics" ON public.topics FOR SELECT USING (true);

-- Create RLS policies for case reports
CREATE POLICY "Users can view public case reports" ON public.case_reports 
  FOR SELECT USING (
    privacy_level = 'public' OR 
    user_id = auth.uid() OR
    (privacy_level = 'university_only' AND university_id IN (
      SELECT university_id FROM public.profiles WHERE user_id = auth.uid()
    ))
  );

CREATE POLICY "Users can create their own case reports" ON public.case_reports 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own case reports" ON public.case_reports 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own case reports" ON public.case_reports 
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for evaluations
CREATE POLICY "Evaluators can view evaluations for their cases" ON public.evaluations 
  FOR SELECT USING (
    evaluator_id = auth.uid() OR 
    case_report_id IN (SELECT id FROM public.case_reports WHERE user_id = auth.uid())
  );

CREATE POLICY "Evaluators can create evaluations" ON public.evaluations 
  FOR INSERT WITH CHECK (auth.uid() = evaluator_id);

CREATE POLICY "Evaluators can update their own evaluations" ON public.evaluations 
  FOR UPDATE USING (auth.uid() = evaluator_id);

-- Create RLS policies for evaluator topics
CREATE POLICY "Evaluators can manage their own topics" ON public.evaluator_topics 
  FOR ALL USING (auth.uid() = evaluator_id);

-- Create RLS policies for case likes
CREATE POLICY "Users can view all likes" ON public.case_likes FOR SELECT USING (true);
CREATE POLICY "Users can manage their own likes" ON public.case_likes 
  FOR ALL USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_case_reports_updated_at
  BEFORE UPDATE ON public.case_reports
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_evaluations_updated_at
  BEFORE UPDATE ON public.evaluations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert sample data
INSERT INTO public.universities (name, code) VALUES 
  ('University of Technology', 'UOT'),
  ('Medical University', 'MU'),
  ('Business School', 'BS'),
  ('Engineering Institute', 'EI');

INSERT INTO public.topics (name, description) VALUES 
  ('Cardiology', 'Heart and cardiovascular system cases'),
  ('Neurology', 'Brain and nervous system cases'),
  ('Orthopedics', 'Bone and joint cases'),
  ('Pediatrics', 'Children health cases'),
  ('Emergency Medicine', 'Critical care and emergency cases');

-- Insert departments for each university
INSERT INTO public.departments (name, university_id) 
SELECT dept_name, u.id 
FROM public.universities u
CROSS JOIN (VALUES 
  ('Medicine'),
  ('Nursing'),
  ('Pharmacy'),
  ('Health Sciences')
) AS depts(dept_name);