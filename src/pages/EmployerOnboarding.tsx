import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { Loader2, ChevronRight, ChevronLeft, CheckCircle, Mail } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type City = Database['public']['Tables']['cities']['Row'];
type Employer = Database['public']['Tables']['employers']['Row'];

const EmployerOnboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [employer, setEmployer] = useState<Employer | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  
  // Form state
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [cityId, setCityId] = useState("");
  const [customCity, setCustomCity] = useState("");

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      setLoading(true);

      const { data: employerData } = await supabase
        .from('employers')
        .select('*')
        .eq('user_id', user!.id)
        .single();
      
      setEmployer(employerData);

      const { data: citiesData } = await supabase
        .from('cities')
        .select('*')
        .order('is_metro', { ascending: false })
        .order('name', { ascending: true });

      setCities(citiesData || []);

    } catch (error: any) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && !phone) {
      toast.error('Please enter your phone number');
      return;
    }
    if (currentStep === 2 && !cityId) {
      toast.error('Please select your city');
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleComplete = async () => {
    if (!employer) {
      toast.error('Profile not found');
      return;
    }

    try {
      setSaving(true);

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

      const selectedCity = cities.find(c => c.id === finalCityId);

      await supabase
        .from('employers')
        .update({
          phone,
          company_name: companyName || null,
          location_city: selectedCity?.name || null,
          location_state: selectedCity?.state || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', employer.id);

      setCurrentStep(3);
      
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Navbar />
      
      <div className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-medium text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </h2>
              <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="p-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Welcome! Tell us about yourself</h1>
                  <p className="text-muted-foreground">Basic information to get started</p>
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
                    <Label htmlFor="company">Company/Business Name (Optional)</Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="ABC Constructions, or leave blank for individual"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Leave blank if you're hiring as an individual
                    </p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Where do you need workers?</h1>
                  <p className="text-muted-foreground">Select your location</p>
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
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6 text-center">
                {user?.email_confirmed_at ? (
                  <>
                    <div className="flex justify-center">
                      <CheckCircle className="h-16 w-16 text-green-500" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold mb-2">You're all set!</h1>
                      <p className="text-muted-foreground">
                        Your profile is complete. Start posting jobs and hiring verified workers!
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

            {/* Navigation */}
            <div className="mt-8 flex gap-4">
              {currentStep > 1 && currentStep < 3 && (
                <Button variant="outline" onClick={handleBack} className="flex-1">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}

              {currentStep < 2 && (
                <Button onClick={handleNext} className="flex-1 gradient-primary hover:opacity-90">
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}

              {currentStep === 2 && (
                <Button
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

              {currentStep === 3 && (
                <Button
                  onClick={() => navigate('/')}
                  className="w-full gradient-primary hover:opacity-90"
                >
                  {user?.email_confirmed_at ? 'Go to Dashboard' : 'I\'ll verify later'}
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployerOnboarding;

