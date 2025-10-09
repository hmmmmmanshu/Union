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
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { Loader2, ChevronRight, ChevronLeft, CheckCircle, Mail } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Skill = Database['public']['Tables']['skills']['Row'];
type City = Database['public']['Tables']['cities']['Row'];
type Worker = Database['public']['Tables']['workers']['Row'];

const WorkerOnboarding = () => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
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

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (userRole !== 'worker' && userRole !== 'both') {
      navigate('/');
      return;
    }

    loadData();
  }, [user, userRole]);

  const loadData = async () => {
    try {
      setLoading(true);

      // Load worker profile
      const { data: workerData } = await supabase
        .from('workers')
        .select('*')
        .eq('user_id', user!.id)
        .single();
      
      setWorker(workerData);

      // Load skills
      const { data: skillsData } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true })
        .order('name', { ascending: true });

      setSkills(skillsData || []);

      // Load cities
      const { data: citiesData } = await supabase
        .from('cities')
        .select('*')
        .order('is_metro', { ascending: false })
        .order('name', { ascending: true });

      setCities(citiesData || []);

    } catch (error: any) {
      console.error('Error loading data:', error);
      toast.error('Failed to load onboarding data');
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

  const handleNext = () => {
    // Validation for each step
    if (currentStep === 1 && !phone) {
      toast.error('Please enter your phone number');
      return;
    }
    if (currentStep === 2 && !cityId) {
      toast.error('Please select your city');
      return;
    }
    if (currentStep === 2 && cityId === 'custom' && !customCity) {
      toast.error('Please enter your city name');
      return;
    }
    if (currentStep === 3 && selectedSkills.length === 0) {
      toast.error('Please select at least one skill');
      return;
    }

    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleComplete = async () => {
    if (!worker) {
      toast.error('Profile not found');
      return;
    }

    try {
      setSaving(true);

      // Determine city
      let finalCityId = cityId;
      if (cityId === 'custom' && customCity) {
        const [cityName, stateName] = customCity.split(',').map(s => s.trim());
        if (cityName && stateName) {
          const { data: newCity } = await supabase
            .from('cities')
            .insert({ name: cityName, state: stateName, is_metro: false })
            .select()
            .single();
          if (newCity) finalCityId = newCity.id;
        }
      }

      // Update worker profile
      await supabase
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

      // Delete and re-insert skills
      await supabase.from('worker_skills').delete().eq('worker_id', worker.id);
      
      if (selectedSkills.length > 0) {
        await supabase
          .from('worker_skills')
          .insert(selectedSkills.map(skillId => ({
            worker_id: worker.id,
            skill_id: skillId,
            proficiency_level: 'intermediate' as const,
          })));
      }

      // Move to verification step
      setCurrentStep(5);
      
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile');
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

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Navbar />
      
      <div className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-medium text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </h2>
              <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          <Card className="p-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Welcome! Let's set up your profile</h1>
                  <p className="text-muted-foreground">Tell us about yourself</p>
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

                  <div>
                    <Label htmlFor="bio">About You (Optional)</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell employers about your experience and work style..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Where do you work?</h1>
                  <p className="text-muted-foreground">Select your city or add a custom location</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Select value={cityId} onValueChange={setCityId}>
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
                      <Label htmlFor="custom-city">Enter City and State *</Label>
                      <Input
                        id="custom-city"
                        placeholder="e.g., Mysore, Karnataka"
                        value={customCity}
                        onChange={(e) => setCustomCity(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Format: City Name, State Name
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold mb-2">What services do you offer?</h1>
                  <p className="text-muted-foreground">Select all that apply</p>
                </div>

                <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
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
                            <Label htmlFor={skill.id} className="text-sm font-normal cursor-pointer">
                              {skill.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {selectedSkills.length > 0 && (
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <p className="text-sm text-primary font-medium">
                      {selectedSkills.length} skill{selectedSkills.length > 1 ? 's' : ''} selected
                    </p>
                  </div>
                )}
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Set your rates</h1>
                  <p className="text-muted-foreground">Help employers understand your pricing</p>
                </div>

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
                      <Label htmlFor="hourly">Hourly (₹)</Label>
                      <Input
                        id="hourly"
                        type="number"
                        min="0"
                        step="10"
                        placeholder="200"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="daily">Daily (₹)</Label>
                      <Input
                        id="daily"
                        type="number"
                        min="0"
                        step="100"
                        placeholder="1500"
                        value={dailyRate}
                        onChange={(e) => setDailyRate(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="monthly">Monthly (₹)</Label>
                      <Input
                        id="monthly"
                        type="number"
                        min="0"
                        step="1000"
                        placeholder="15000"
                        value={monthlyRate}
                        onChange={(e) => setMonthlyRate(e.target.value)}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    You can update these rates anytime from your profile
                  </p>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6 text-center">
                {user?.email_confirmed_at ? (
                  <>
                    <div className="flex justify-center">
                      <CheckCircle className="h-16 w-16 text-green-500" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold mb-2">You're all set!</h1>
                      <p className="text-muted-foreground">
                        Your profile is complete and verified. Start finding work opportunities now!
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-center">
                      <Mail className="h-16 w-16 text-primary" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold mb-2">Verify your email to get started</h1>
                      <p className="text-muted-foreground mb-4">
                        We've sent a verification link to <strong>{user?.email}</strong>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Please check your email and click the verification link to activate your account.
                        Once verified, you can start accessing job opportunities!
                      </p>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm font-medium mb-2">Haven't received the email?</p>
                      <p className="text-xs text-muted-foreground">
                        Check your spam folder, or contact support if you need help.
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex gap-4">
              {currentStep > 1 && currentStep < 5 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}

              {currentStep < 4 && (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 gradient-primary hover:opacity-90"
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}

              {currentStep === 4 && (
                <Button
                  type="button"
                  onClick={handleComplete}
                  className="flex-1 gradient-primary hover:opacity-90"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Complete Setup'
                  )}
                </Button>
              )}

              {currentStep === 5 && user?.email_confirmed_at && (
                <Button
                  type="button"
                  onClick={() => navigate('/')}
                  className="w-full gradient-primary hover:opacity-90"
                >
                  Go to Dashboard
                </Button>
              )}

              {currentStep === 5 && !user?.email_confirmed_at && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="w-full"
                >
                  I'll verify later
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkerOnboarding;

