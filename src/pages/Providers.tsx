import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProviderCard from "@/components/ProviderCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Worker = Database['public']['Tables']['workers']['Row'] & {
  skills?: Array<{ skill_name: string }>;
  city?: { name: string; state: string } | null;
};

const Providers = () => {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get("service") || "";
  const initialLocation = searchParams.get("location") || "";

  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(initialService);
  const [locationFilter, setLocationFilter] = useState(initialLocation);
  const [serviceFilter, setServiceFilter] = useState(initialService);

  useEffect(() => {
    loadApprovedWorkers();
  }, []);

  const loadApprovedWorkers = async () => {
    try {
      setLoading(true);

      // Fetch only approved workers with their skills and city info
      const { data: workersData, error: workersError } = await supabase
        .from('workers')
        .select(`
          *,
          city:cities (
            name,
            state
          )
        `)
        .eq('approval_status', 'approved')
        .order('created_at', { ascending: false });

      if (workersError) throw workersError;

      // Get skills for each worker
      const workersWithSkills = await Promise.all(
        (workersData || []).map(async (worker) => {
          const { data: skillsData } = await supabase
            .from('worker_skills')
            .select(`
              skill_id,
              skills (name)
            `)
            .eq('worker_id', worker.id);

          return {
            ...worker,
            skills: skillsData?.map(s => ({ 
              skill_name: (s.skills as any)?.name || 'Unknown' 
            })) || []
          };
        })
      );

      setWorkers(workersWithSkills);
    } catch (error: any) {
      console.error('Error loading workers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Transform workers to provider format for the ProviderCard component
  const allProviders = workers.map(worker => {
    const primarySkill = worker.skills?.[0]?.skill_name?.toLowerCase() || 'service';
    const location = worker.city 
      ? `${worker.city.name}, ${worker.city.state}`
      : worker.location_city && worker.location_state
        ? `${worker.location_city}, ${worker.location_state}`
        : 'India';
    
    // Generate a professional placeholder image based on the worker's name
    const imageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(worker.full_name)}&size=400&background=random&color=fff&bold=true`;

    return {
      id: worker.id,
      name: worker.full_name,
      service: primarySkill,
      location: location,
      rating: Number(worker.average_rating) || 0,
      reviews: worker.total_jobs_completed || 0,
      experience: worker.years_of_experience || 0,
      verified: worker.verified || false,
      imageUrl: imageUrl,
      priceRange: worker.monthly_rate 
        ? `₹${Number(worker.monthly_rate).toLocaleString('en-IN')}/mo`
        : worker.daily_rate
          ? `₹${Number(worker.daily_rate).toLocaleString('en-IN')}/day`
          : worker.hourly_rate
            ? `₹${Number(worker.hourly_rate).toLocaleString('en-IN')}/hr`
            : 'Contact for rates',
    };
  });

  // Filter providers based on search and filters
  const filteredProviders = allProviders.filter((provider) => {
    const matchesSearch = 
      searchTerm === "" ||
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesService = 
      serviceFilter === "" || 
      serviceFilter === "all" ||
      provider.service === serviceFilter;
    
    const matchesLocation = 
      locationFilter === "" ||
      provider.location.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesService && matchesLocation;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Find Your Service Provider</h1>
          
          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-soft p-4 md:p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name or service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Input
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Service Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="maid">Maids</SelectItem>
                  <SelectItem value="cook">Cooks</SelectItem>
                  <SelectItem value="driver">Drivers</SelectItem>
                  <SelectItem value="nanny">Nannies</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="sm:ml-auto">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredProviders.length} provider{filteredProviders.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProviders.map((provider) => (
                  <ProviderCard key={provider.id} {...provider} />
                ))}
              </div>

              {filteredProviders.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground">
                    {workers.length === 0 
                      ? 'No approved providers yet. Check back soon!'
                      : 'No providers found matching your criteria. Try adjusting your filters.'
                    }
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <footer className="border-t border-border py-8 mt-auto bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 Union. Making home services accessible and trustworthy.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Providers;
