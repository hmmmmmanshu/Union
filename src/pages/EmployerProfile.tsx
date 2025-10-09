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
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { Loader2, MapPin, Building2, User as UserIcon } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type City = Database['public']['Tables']['cities']['Row'];
type Employer = Database['public']['Tables']['employers']['Row'];

const EmployerProfile = () => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [employer, setEmployer] = useState<Employer | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  
  // Form state
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [cityId, setCityId] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (userRole !== 'employer' && userRole !== 'both') {
      toast.error('This page is only for employers');
      navigate('/');
      return;
    }

    loadData();
  }, [user, userRole]);

  const loadData = async () => {
    try {
      setLoading(true);

      // Load employer profile
      const { data: employerData, error: employerError } = await supabase
        .from('employers')
        .select('*')
        .eq('user_id', user!.id)
        .single();

      if (employerError) throw employerError;
      
      setEmployer(employerData);
      if (employerData) {
        setPhone(employerData.phone || "");
        setCompanyName(employerData.company_name || "");
        setPincode(employerData.location_pincode || "");
        // Parse city from location_city field or use city_id when we add it
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!employer) {
      toast.error('Employer profile not found');
      return;
    }

    try {
      setSaving(true);

      // Determine which city to use
      let selectedCity = cities.find(c => c.id === cityId);
      
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
            selectedCity = newCity;
          }
        }
      }

      // Update employer profile
      const { error: updateError } = await supabase
        .from('employers')
        .update({
          phone,
          company_name: companyName || null,
          location_city: selectedCity?.name || null,
          location_state: selectedCity?.state || null,
          location_pincode: pincode || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', employer.id);

      if (updateError) throw updateError;

      toast.success('Profile updated successfully!');
      navigate('/');
      
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Complete Your Employer Profile</h1>
            <p className="text-muted-foreground">
              Set up your profile to start hiring trusted gig workers
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal/Business Information */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <UserIcon className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Business Information</h2>
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
                  <Label htmlFor="company">Company/Business Name (Optional)</Label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="e.g., ABC Constructions, or leave blank for individual"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Leave blank if hiring as an individual
                  </p>
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
                  <Label htmlFor="city">Where do you need services? *</Label>
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

                <div>
                  <Label htmlFor="pincode">Pincode (Optional)</Label>
                  <Input
                    id="pincode"
                    type="text"
                    placeholder="e.g., 400001"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    maxLength={6}
                  />
                </div>
              </div>
            </Card>

            {/* Activity Summary */}
            <Card className="p-6 bg-muted/30">
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Your Activity</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-background rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {employer?.total_projects_posted || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Projects Posted</div>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {employer?.average_rating ? employer.average_rating.toFixed(1) : '—'}
                  </div>
                  <div className="text-sm text-muted-foreground">Your Rating</div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-4 text-center">
                Complete your profile to start posting jobs and hiring verified workers
              </p>
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
                disabled={saving}
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

export default EmployerProfile;

