import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "./ui/bento-grid";
import {
  Users,
  Shield,
  CreditCard,
  MapPin,
  TrendingUp,
  Target,
  CheckCircle,
  ArrowRight,
  Star,
  IndianRupee,
  Briefcase,
  Heart,
} from "lucide-react";

const BentoFeatures = () => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Why Union Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Built by workers, for workers. Experience the difference that comes from putting people first.
          </p>
        </div>

        {/* Bento Grid */}
        <BentoGrid>
          <BentoCard
            name="Job Aggregation"
            description="Access opportunities from 50+ platforms through one interface"
            Icon={MapPin}
            className="col-span-3 lg:col-span-1"
            background={
              <div className="absolute top-4 right-4 h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
            }
          />
          
          <BentoCard
            name="Trust System"
            description="Build credibility through worker-verified ratings and Trust Circles"
            Icon={Shield}
            className="col-span-3 lg:col-span-2"
            background={
              <div className="absolute top-4 right-4 h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            }
          />
          
          <BentoCard
            name="Zero Commission"
            description="Keep 100% of your earnings with our flat subscription model"
            Icon={CreditCard}
            className="col-span-3 lg:col-span-2"
            background={
              <div className="absolute top-4 right-4 h-20 w-20 bg-accent/10 rounded-full flex items-center justify-center">
                <IndianRupee className="h-8 w-8 text-accent" />
              </div>
            }
          />
          
          <BentoCard
            name="Financial Growth"
            description="Access loans, equipment financing, and investment opportunities"
            Icon={TrendingUp}
            className="col-span-3 lg:col-span-1"
            background={
              <div className="absolute top-4 right-4 h-20 w-20 bg-blue-500/10 rounded-full flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            }
          />
          
          <BentoCard
            name="Community Hub"
            description="Connect with 50,000+ verified workers and build lasting relationships"
            Icon={Users}
            className="col-span-3 lg:col-span-2"
            background={
              <div className="absolute top-4 right-4 h-20 w-20 bg-purple-500/10 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            }
          />
          
          <BentoCard
            name="Direct Bidding"
            description="Set your own rates and compete on quality, not just price"
            Icon={Target}
            className="col-span-3 lg:col-span-1"
            background={
              <div className="absolute top-4 right-4 h-20 w-20 bg-red-500/10 rounded-full flex items-center justify-center">
                <Target className="h-8 w-8 text-red-500" />
              </div>
            }
          />
        </BentoGrid>

        {/* Stats Bar */}
        <div className="max-w-4xl mx-auto mt-16">
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
        </div>
      </div>
    </section>
  );
};

export default BentoFeatures;
