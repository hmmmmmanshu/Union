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
} from "lucide-react";
import { motion } from "framer-motion";

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

export default UnionFeatures;
