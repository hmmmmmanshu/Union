import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Star, 
  MapPin, 
  CheckCircle2, 
  Calendar, 
  Shield, 
  Award,
  Clock,
  MessageCircle,
  ArrowLeft
} from "lucide-react";

const ProviderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample data with authentic Indian gig worker photo
  const provider = {
    id: "1",
    name: "Priya Sharma",
    service: "Professional Maid",
    location: "Mumbai, Maharashtra",
    rating: 4.9,
    reviews: 127,
    experience: 5,
    verified: true,
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop&crop=face",
    priceRange: "₹8,000 - ₹12,000/month",
    about: "Experienced and trustworthy maid service with 5 years of professional experience. Specialized in home cleaning, laundry, and basic cooking. Known for punctuality and attention to detail.",
    skills: ["House Cleaning", "Laundry", "Basic Cooking", "Dishwashing", "Ironing"],
    availability: "Monday - Saturday, 8 AM - 6 PM",
    languages: ["Hindi", "Marathi", "English"],
    certifications: ["Background Verified", "Police Clearance", "Health Certificate"],
  };

  const reviews = [
    {
      id: 1,
      name: "Anjali Desai",
      rating: 5,
      date: "2 weeks ago",
      comment: "Excellent service! Very professional and thorough in her work. Highly recommended!",
    },
    {
      id: 2,
      name: "Rahul Mehta",
      rating: 5,
      date: "1 month ago",
      comment: "Very reliable and trustworthy. Been working with us for 3 months now.",
    },
    {
      id: 3,
      name: "Kavita Joshi",
      rating: 4,
      date: "2 months ago",
      comment: "Good work quality. Sometimes runs a bit late but overall satisfied.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Button>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Header */}
              <Card className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={provider.imageUrl}
                    alt={provider.name}
                    className="w-full md:w-48 h-64 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h1 className="text-3xl font-bold mb-2">{provider.name}</h1>
                          <p className="text-lg text-muted-foreground">{provider.service}</p>
                        </div>
                        {provider.verified && (
                          <Badge className="bg-success text-success-foreground">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-3 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {provider.location}
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 fill-primary text-primary mr-1" />
                        <span className="font-semibold text-lg mr-1">{provider.rating}</span>
                        <span className="text-muted-foreground">({provider.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {provider.experience} years experience
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {provider.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* About */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">About</h2>
                <p className="text-muted-foreground leading-relaxed">{provider.about}</p>
              </Card>

              {/* Details */}
              <Card className="p-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Availability</h3>
                  </div>
                  <p className="text-muted-foreground">{provider.availability}</p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Languages</h3>
                  </div>
                  <p className="text-muted-foreground">{provider.languages.join(", ")}</p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Certifications</h3>
                  </div>
                  <div className="space-y-2">
                    {provider.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <span className="text-muted-foreground">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Reviews */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Reviews</h2>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{review.name}</p>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="ml-1 font-medium">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                      {review.id !== reviews[reviews.length - 1].id && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24 space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Price Range</p>
                  <p className="text-2xl font-bold">{provider.priceRange}</p>
                </div>

                <Separator />

                <Button 
                  size="lg" 
                  className="w-full gradient-primary hover:opacity-90"
                  onClick={() => navigate('/auth')}
                >
                  Book Now
                </Button>

                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">100% Verified Profile</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span className="text-muted-foreground">Background Checked</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Award className="h-5 w-5 text-accent" />
                    <span className="text-muted-foreground">Top Rated Provider</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-border py-8 mt-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 Union. Making home services accessible and trustworthy.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProviderDetail;
