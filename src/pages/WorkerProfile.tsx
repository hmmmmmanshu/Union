import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { Loader2, MapPin, IndianRupee, Briefcase, User as UserIcon } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Skill = Database['public']['Tables']['skills']['Row'];
type City = Database['public']['Tables']['cities']['Row'];
type Worker = Database['public']['Tables']['workers']['Row'];

const WorkerProfile = () => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [worker, setWorker] = useState<Worker | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  
  // Form state
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [cityId, setCityId] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [monthlyRate, setMonthlyRate] = useState("");
  const [paymentMode, setPaymentMode] = useState<string>("hourly");

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (userRole !== 'worker' && userRole !== 'both') {
      toast.error('This page is only for workers');
      navigate('/');
      return;
    }

    loadData();
  }, [user, userRole]);

  const loadData = async () => {
    try {
      setLoading(true);

      // Load worker profile
      const { data: workerData, error: workerError } = await supabase
        .from('workers')
        .select('*')
        .eq('user_id', user!.id)
        .single();

      if (workerError) throw workerError;
      
      setWorker(workerData);
      if (workerData) {
        setPhone(workerData.phone || "");
        setBio(workerData.bio || "");
        setYearsExperience(workerData.years_of_experience?.toString() || "");
        setCityId(workerData.city_id || "");
        setHourlyRate(workerData.hourly_rate?.toString() || "");
        setDailyRate(workerData.daily_rate?.toString() || "");
        setMonthlyRate(workerData.monthly_rate?.toString() || "");
        setPaymentMode(workerData.preferred_payment_mode || "hourly");
      }

      // Load skills
      const { data: skillsData, error: skillsError } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true })
        .order('name', { ascending: true });

      if (skillsError) throw skillsError;
      setSkills(skillsData || []);

      // Load worker's existing skills
      if (workerData) {
        const { data: workerSkillsData } = await supabase
          .from('worker_skills')
          .select('skill_id')
          .eq('worker_id', workerData.id);

        if (workerSkillsData) {
          setSelectedSkills(workerSkillsData.map(ws => ws.skill_id));
        }
      }

      // Load cities
      const { data: citiesData, error: citiesError } = await supabase
        .from('cities')
        .select('*')
        .order('is_metro', { ascending: false })
        .order('name', { ascending: true });

      if (citiesError) throw citiesError;
      setCities(citiesData || []);

    } catch (error: any) {
      console.error('Error loading data:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleSkillToggle = (skillId: string) => {
    setSelectedSkills(prev => 
      prev.includes(skillId)
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!worker) {
      toast.error('Worker profile not found');
      return;
    }

    if (selectedSkills.length === 0) {
      toast.error('Please select at least one skill');
      return;
    }

    try {
      setSaving(true);

      // Determine which city to use
      let finalCityId = cityId;
      if (cityId === 'custom' && customCity) {
        // Insert custom city
        const [cityName, stateName] = customCity.split(',').map(s => s.trim());
        if (cityName && stateName) {
          const { data: newCity, error: cityError } = await supabase
            .from('cities')
            .insert({
              name: cityName,
              state: stateName,
              is_metro: false,
            })
            .select()
            .single();

          if (!cityError && newCity) {
            finalCityId = newCity.id;
          }
        }
      }

      // Update worker profile
      const { error: updateError } = await supabase
        .from('workers')
        .update({
          phone,
          bio,
          years_of_experience: parseInt(yearsExperience) || 0,
          city_id: finalCityId || null,
          hourly_rate: hourlyRate ? parseFloat(hourlyRate) : null,
          daily_rate: dailyRate ? parseFloat(dailyRate) : null,
          monthly_rate: monthlyRate ? parseFloat(monthlyRate) : null,
          preferred_payment_mode: paymentMode,
          updated_at: new Date().toISOString(),
        })
        .eq('id', worker.id);

      if (updateError) throw updateError;

      // Delete existing skills
      await supabase
        .from('worker_skills')
        .delete()
        .eq('worker_id', worker.id);

      // Insert new skills
      if (selectedSkills.length > 0) {
        const skillsToInsert = selectedSkills.map(skillId => ({
          worker_id: worker.id,
          skill_id: skillId,
          proficiency_level: 'intermediate' as const,
        }));

        const { error: skillsError } = await supabase
          .from('worker_skills')
          .insert(skillsToInsert);

        if (skillsError) throw skillsError;
      }

      toast.success('Profile updated successfully!');
      
      // Check if worker needs approval
      if (worker.approval_status === 'pending') {
        navigate('/pending-approval');
      } else {
        navigate('/');
      }
      
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast.error(error.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
            <p className="text-muted-foreground">
              Tell us about your skills, experience, and rates to start getting work opportunities
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <UserIcon className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Personal Information</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="bio">About You</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell employers about your experience, work style, and what makes you great at what you do..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    min="0"
                    max="50"
                    placeholder="e.g., 5"
                    value={yearsExperience}
                    onChange={(e) => setYearsExperience(e.target.value)}
                  />
                </div>
              </div>
            </Card>

            {/* Location */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Location</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="city">Where do you provide services? *</Label>
                  <Select value={cityId} onValueChange={setCityId} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom">Other (Enter Manually)</SelectItem>
                      {cities.filter(c => c.is_metro).length > 0 && (
                        <>
                          <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                            Metro Cities
                          </div>
                          {cities.filter(c => c.is_metro).map(city => (
                            <SelectItem key={city.id} value={city.id}>
                              {city.name}, {city.state}
                            </SelectItem>
                          ))}
                        </>
                      )}
                      {cities.filter(c => !c.is_metro).length > 0 && (
                        <>
                          <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                            Other Cities
                          </div>
                          {cities.filter(c => !c.is_metro).map(city => (
                            <SelectItem key={city.id} value={city.id}>
                              {city.name}, {city.state}
                            </SelectItem>
                          ))}
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {cityId === 'custom' && (
                  <div>
                    <Label htmlFor="custom-city">Enter City and State</Label>
                    <Input
                      id="custom-city"
                      placeholder="e.g., Mysore, Karnataka"
                      value={customCity}
                      onChange={(e) => setCustomCity(e.target.value)}
                      required={cityId === 'custom'}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Format: City Name, State Name
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Skills/Services */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Briefcase className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Skills & Services *</h2>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Select all services you can provide
              </p>

              <div className="space-y-6">
                {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="font-semibold text-sm mb-3 text-primary">{category}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={skill.id}
                            checked={selectedSkills.includes(skill.id)}
                            onCheckedChange={() => handleSkillToggle(skill.id)}
                          />
                          <Label
                            htmlFor={skill.id}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {skill.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Pricing */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <IndianRupee className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Your Rates</h2>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Set your rates. You can set one or all three options.
              </p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="payment-mode">Preferred Payment Mode</Label>
                  <Select value={paymentMode} onValueChange={setPaymentMode}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="project_based">Project Based</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="hourly">Hourly Rate (₹)</Label>
                    <Input
                      id="hourly"
                      type="number"
                      min="0"
                      step="10"
                      placeholder="e.g., 200"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="daily">Daily Rate (₹)</Label>
                    <Input
                      id="daily"
                      type="number"
                      min="0"
                      step="100"
                      placeholder="e.g., 1500"
                      value={dailyRate}
                      onChange={(e) => setDailyRate(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="monthly">Monthly Rate (₹)</Label>
                    <Input
                      id="monthly"
                      type="number"
                      min="0"
                      step="1000"
                      placeholder="e.g., 15000"
                      value={monthlyRate}
                      onChange={(e) => setMonthlyRate(e.target.value)}
                    />
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  Tip: Setting competitive rates based on your experience and location helps you get more opportunities
                </p>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
                className="flex-1"
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 gradient-primary hover:opacity-90"
                disabled={saving || selectedSkills.length === 0}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Profile'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;

