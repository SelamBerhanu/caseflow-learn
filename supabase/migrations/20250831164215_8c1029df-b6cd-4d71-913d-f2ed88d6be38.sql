-- First, let's populate the universities table with Ethiopian universities
INSERT INTO public.universities (name, code) VALUES
  ('University of Gondar', 'UOG'),
  ('Jimma University', 'JU'),
  ('Arba Minch University', 'AMU'),
  ('Bahir Dar University', 'BDU'),
  ('Hawassa University', 'HU'),
  ('Mekelle University', 'MU'),
  ('Adigrat University', 'AU'),
  ('Arsi University', 'ArU'),
  ('Debre Tabor University', 'DTU'),
  ('Wachemo University', 'WU'),
  ('Wollo University', 'WoU'),
  ('Wolkite University', 'WkU'),
  ('Wolaita Sodo University', 'WSU'),
  ('Debre Markos University', 'DMU'),
  ('Debre Berhan University', 'DBU'),
  ('Haramaya University', 'HU2'),
  ('Ethiopian Defense University – College of Health Sciences', 'EDU-CHS'),
  ('St. Paul''s Hospital Millennium Medical College', 'SPHMMC'),
  ('Hayat Medical College', 'HMC'),
  ('Myungsung Medical College', 'MMC'),
  ('Sante Medical College', 'SMC'),
  ('Bethel Medical College', 'BMC'),
  ('Adama General Hospital Medical College', 'AGHMC'),
  ('Yekatit 12 Hospital Medical College', 'Y12HMC'),
  ('Yirgalem Hospital Medical College', 'YHMC'),
  ('Africa Medical College', 'AMC2'),
  ('Gambi Medical College', 'GMC');

-- Add some common medical departments
INSERT INTO public.departments (name, university_id) 
SELECT dept_name, u.id
FROM (
  VALUES 
    ('Medicine'),
    ('Surgery'), 
    ('Pediatrics'),
    ('Obstetrics and Gynecology'),
    ('Internal Medicine'),
    ('Emergency Medicine'),
    ('Radiology'),
    ('Pathology'),
    ('Anesthesiology'),
    ('Psychiatry'),
    ('Orthopedics'),
    ('Dermatology'),
    ('Ophthalmology'),
    ('ENT (Otolaryngology)'),
    ('Cardiology'),
    ('Neurology'),
    ('Public Health'),
    ('Nursing'),
    ('Pharmacy'),
    ('Laboratory Sciences')
) AS dept_list(dept_name)
CROSS JOIN public.universities u
WHERE u.name IN ('University of Gondar', 'Jimma University', 'Bahir Dar University', 'Hawassa University', 'Mekelle University');

-- Update profiles table to use foreign keys for university and department
ALTER TABLE public.profiles 
ADD COLUMN university_id uuid REFERENCES public.universities(id),
ADD COLUMN department_id uuid REFERENCES public.departments(id);

-- Add index for better performance
CREATE INDEX idx_profiles_university_id ON public.profiles(university_id);
CREATE INDEX idx_profiles_department_id ON public.profiles(department_id);