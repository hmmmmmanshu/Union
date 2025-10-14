import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoFeatures from "@/components/BentoFeatures";
import ProviderCard from "@/components/ProviderCard";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Worker = Database['public']['Tables']['workers']['Row'] & {
  skills?: Array<{ skill_name: string }>;
  city?: { name: string; state: string } | null;
};

const Index = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");

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
    const nameInitial = worker.full_name.charAt(0).toUpperCase();
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

  // Filter providers
  const filteredProviders = allProviders.filter((provider) => {
    const matchesSearch = 
      searchTerm === "" ||
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesService = 
      serviceFilter === "all" ||
      provider.service === serviceFilter;
    
    const matchesLocation = 
      locationFilter === "" ||
      provider.location.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesService && matchesLocation;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* Union Features Section */}
      <BentoFeatures />

      {/* Providers Grid */}
      <section className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                {filteredProviders.length} provider{filteredProviders.length !== 1 ? 's' : ''} available
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
                        : 'No providers found matching your criteria. Try adjusting your search.'
                      }
                </p>
              </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 Union. Making home services accessible and trustworthy.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
