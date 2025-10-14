import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
  Users,
  Shield,
  CreditCard,
  MapPin,
  TrendingUp,
  MessageSquare,
  FileText,
  Target,
  Building,
  Heart,
  ArrowRight,
  CheckCircle,
  Star,
  IndianRupee,
  Phone,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const UnionFeatures = () => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 px-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Why Union Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Built by workers, for workers. Experience the difference that comes from putting people first.
          </p>
          <div className="mt-8 flex items-center justify-center space-x-2">
            <div className="h-1 w-12 bg-primary rounded-full"></div>
            <div className="h-1 w-1 bg-primary rounded-full"></div>
            <div className="h-1 w-1 bg-primary rounded-full"></div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-sm text-muted-foreground">Active Workers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">₹2.5Cr</div>
              <div className="text-sm text-muted-foreground">Earnings Protected</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Platform Partners</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4.9★</div>
              <div className="text-sm text-muted-foreground">Worker Satisfaction</div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {unionFeatures.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm",
                "hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300",
                feature.className
              )}
            >
              <div className="p-8 sm:p-12">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600 font-medium">Verified</span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {feature.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {feature.badges?.map((badge, badgeIndex) => (
                    <span
                      key={badgeIndex}
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Success Stories - Fake Profiles Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Success Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Meet the gig workers who have transformed their lives through Union. Real stories, real earnings, real impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {fakeProfiles.map((profile, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                {/* Profile Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={profile.imageUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">{profile.name}</h3>
                        <p className="text-sm text-gray-200">{profile.profession}</p>
                      </div>
                      <Badge className="bg-green-500/90 text-white border-0">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Location */}
                  <div className="flex items-center mb-4">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm text-muted-foreground">{profile.location}</span>
                  </div>

                  {/* Earnings Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-primary/5 rounded-lg">
                      <div className="text-lg font-bold text-primary">₹{profile.monthlyEarnings}</div>
                      <div className="text-xs text-muted-foreground">Monthly</div>
                    </div>
                    <div className="text-center p-3 bg-accent/5 rounded-lg">
                      <div className="text-lg font-bold text-accent">{profile.rating}</div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {profile.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Rates */}
                  <div className="space-y-2 mb-4">
                    {profile.rates.map((rate, rateIndex) => (
                      <div key={rateIndex} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{rate.type}:</span>
                        <span className="font-semibold text-foreground">{rate.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-sm italic text-muted-foreground mb-4">
                    "{profile.quote}"
                  </blockquote>

                  {/* Action Button */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    View Profile
                    <ArrowRight className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-union rounded-2xl p-8 md:p-12 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Join These Success Stories?
              </h3>
              <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
                Join thousands of verified gig workers who are earning more, building trust, and growing their careers with Union.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  Join as Service Provider
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Browse Services
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const unionFeatures = [
  {
    title: "Unified Job Aggregation",
    description: "Access opportunities from Swiggy, Zomato, Urban Company, and 50+ platforms through one interface. No more juggling multiple apps or missing out on the best gigs.",
    className: "mb-8",
    icon: <MapPin className="h-6 w-6" />,
    badges: ["Multi-Platform", "Real-Time Updates", "Smart Matching"],
  },
  {
    title: "Peer-Verified Trust System",
    description: "Build credibility through worker-verified ratings and Trust Circles. Employers see your reputation built by fellow workers, not algorithms.",
    className: "mb-8",
    icon: <Shield className="h-6 w-6" />,
    badges: ["Peer Reviews", "Trust Circles", "Verified Profiles"],
  },
  {
    title: "Zero Commission Model",
    description: "Keep 100% of your earnings with our flat subscription model. No hidden fees, no percentage cuts - just transparent pricing that puts money back in your pocket.",
    className: "mb-8",
    icon: <CreditCard className="h-6 w-6" />,
    badges: ["100% Earnings", "Flat Fee", "No Hidden Costs"],
  },
  {
    title: "Financial Empowerment",
    description: "Access emergency loans, equipment financing, and investment opportunities based on your work history and Trust Circle rating. Build wealth, not just income.",
    className: "mb-8",
    icon: <TrendingUp className="h-6 w-6" />,
    badges: ["Emergency Loans", "Asset Financing", "Investment Tools"],
  },
  {
    title: "Worker Community Hub",
    description: "Connect with 50,000+ verified workers. Share experiences, organize for better conditions, access training programs, and build lasting professional relationships.",
    className: "mb-8",
    icon: <Users className="h-6 w-6" />,
    badges: ["50K+ Workers", "Community Events", "Skill Development"],
  },
  {
    title: "Direct Project Bidding",
    description: "Set your own rates and compete on quality, not just price. Post portfolios, justify pricing, and win projects that value your expertise and professionalism.",
    className: "mb-8",
    icon: <Target className="h-6 w-6" />,
    badges: ["Portfolio Showcase", "Quality Focus", "Fair Competition"],
  },
];

// Fake profiles with Indian-looking images and realistic data
const fakeProfiles = [
  {
    name: "Priya Sharma",
    profession: "Home Cook",
    location: "Mumbai, Maharashtra",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&crop=face&auto=format",
    monthlyEarnings: "45,000",
    rating: "4.9★",
    skills: ["Indian Cuisine", "Meal Planning", "Nutrition"],
    rates: [
      { type: "Daily", price: "₹1,500" },
      { type: "Monthly", price: "₹45,000" }
    ],
    quote: "Union helped me start my own home kitchen business. I now earn 3x more than my previous job!"
  },
  {
    name: "Rajesh Kumar",
    profession: "Ride Driver",
    location: "Delhi, NCR",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face&auto=format",
    monthlyEarnings: "38,000",
    rating: "4.8★",
    skills: ["Safe Driving", "Customer Service", "Navigation"],
    rates: [
      { type: "Hourly", price: "₹200" },
      { type: "Daily", price: "₹1,800" }
    ],
    quote: "With Union's zero commission model, I keep all my earnings. My family's life has completely changed!"
  },
  {
    name: "Sunita Devi",
    profession: "Housekeeper",
    location: "Bangalore, Karnataka",
    imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop&crop=face&auto=format",
    monthlyEarnings: "32,000",
    rating: "4.9★",
    skills: ["Deep Cleaning", "Organization", "Laundry"],
    rates: [
      { type: "Hourly", price: "₹150" },
      { type: "Monthly", price: "₹32,000" }
    ],
    quote: "I work for 5 families now and earn more than my husband. Union gave me independence!"
  },
  {
    name: "Amit Patel",
    profession: "Electrician",
    location: "Ahmedabad, Gujarat",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=face&auto=format",
    monthlyEarnings: "55,000",
    rating: "4.7★",
    skills: ["Electrical Repair", "Wiring", "Safety"],
    rates: [
      { type: "Hourly", price: "₹400" },
      { type: "Project", price: "₹2,000-5,000" }
    ],
    quote: "Union's trust system helped me build a strong reputation. Now I get premium clients!"
  },
  {
    name: "Lakshmi Iyer",
    profession: "Nanny",
    location: "Chennai, Tamil Nadu",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&crop=face&auto=format",
    monthlyEarnings: "40,000",
    rating: "4.9★",
    skills: ["Child Care", "Education", "Safety"],
    rates: [
      { type: "Hourly", price: "₹250" },
      { type: "Monthly", price: "₹40,000" }
    ],
    quote: "I love taking care of children. Union helped me find families who value quality childcare."
  },
  {
    name: "Vikram Singh",
    profession: "Delivery Partner",
    location: "Pune, Maharashtra",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop&crop=face&auto=format",
    monthlyEarnings: "42,000",
    rating: "4.8★",
    skills: ["Fast Delivery", "Route Planning", "Customer Service"],
    rates: [
      { type: "Per Delivery", price: "₹35-50" },
      { type: "Daily", price: "₹1,500" }
    ],
    quote: "Union's multi-platform access means I never run out of delivery opportunities!"
  },
  {
    name: "Meera Joshi",
    profession: "Beauty Therapist",
    location: "Hyderabad, Telangana",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=face&auto=format",
    monthlyEarnings: "48,000",
    rating: "4.9★",
    skills: ["Facial Care", "Hair Styling", "Makeup"],
    rates: [
      { type: "Per Session", price: "₹800-1,500" },
      { type: "Monthly", price: "₹48,000" }
    ],
    quote: "I started as a home beautician. Now I have my own salon thanks to Union's financing!"
  },
  {
    name: "Ravi Gupta",
    profession: "Plumber",
    location: "Kolkata, West Bengal",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop&crop=face&auto=format",
    monthlyEarnings: "50,000",
    rating: "4.8★",
    skills: ["Pipe Repair", "Installation", "Maintenance"],
    rates: [
      { type: "Hourly", price: "₹350" },
      { type: "Emergency", price: "₹500/hour" }
    ],
    quote: "Union's emergency loan helped me buy new tools. Now I can take on bigger projects!"
  },
  {
    name: "Anjali Reddy",
    profession: "Yoga Instructor",
    location: "Bengaluru, Karnataka",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=300&fit=crop&crop=face&auto=format",
    monthlyEarnings: "35,000",
    rating: "4.9★",
    skills: ["Yoga", "Meditation", "Wellness"],
    rates: [
      { type: "Per Class", price: "₹500" },
      { type: "Monthly Package", price: "₹35,000" }
    ],
    quote: "Teaching yoga through Union has brought me peace and financial stability."
  }
];

export default UnionFeatures;
