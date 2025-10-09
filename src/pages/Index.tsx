import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UnionFeatures from "@/components/UnionFeatures";
import ProviderCard from "@/components/ProviderCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin } from "lucide-react";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");

  // Sample provider data with authentic Indian gig worker photos
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
      <UnionFeatures />

      {/* Providers Grid */}
      <section className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
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
                  No providers found matching your criteria. Try adjusting your search.
                </p>
              </div>
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
