import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProviderCard from "@/components/ProviderCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

const Providers = () => {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get("service") || "";
  const initialLocation = searchParams.get("location") || "";

  const [searchTerm, setSearchTerm] = useState(initialService);
  const [locationFilter, setLocationFilter] = useState(initialLocation);
  const [serviceFilter, setServiceFilter] = useState(initialService);

  // Sample data with authentic Indian gig worker photos
  const allProviders = [
    {
      id: "1",
      name: "Priya Sharma",
      service: "maid",
      location: "Mumbai, Maharashtra",
      rating: 4.9,
      reviews: 127,
      experience: 5,
      verified: true,
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&crop=face",
      priceRange: "₹8,000/mo",
    },
    {
      id: "2",
      name: "Rajesh Kumar",
      service: "cook",
      location: "Delhi, NCR",
      rating: 4.8,
      reviews: 94,
      experience: 8,
      verified: true,
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face",
      priceRange: "₹12,000/mo",
    },
    {
      id: "3",
      name: "Amit Patel",
      service: "driver",
      location: "Bangalore, Karnataka",
      rating: 4.9,
      reviews: 156,
      experience: 10,
      verified: true,
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=face",
      priceRange: "₹15,000/mo",
    },
    {
      id: "4",
      name: "Sneha Reddy",
      service: "nanny",
      location: "Hyderabad, Telangana",
      rating: 5.0,
      reviews: 82,
      experience: 6,
      verified: true,
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop&crop=face",
      priceRange: "₹10,000/mo",
    },
    {
      id: "5",
      name: "Lakshmi Iyer",
      service: "maid",
      location: "Chennai, Tamil Nadu",
      rating: 4.7,
      reviews: 68,
      experience: 4,
      verified: true,
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&crop=face",
      priceRange: "₹7,500/mo",
    },
    {
      id: "6",
      name: "Vikram Singh",
      service: "driver",
      location: "Pune, Maharashtra",
      rating: 4.8,
      reviews: 103,
      experience: 7,
      verified: true,
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop&crop=face",
      priceRange: "₹14,000/mo",
    },
  ];

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
                No providers found matching your criteria. Try adjusting your filters.
              </p>
            </div>
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
