import {
  Users,
  Shield,
  CreditCard,
  MapPin,
  TrendingUp,
  Target,
  IndianRupee,
} from "lucide-react";

const BentoFeatures = () => {
  const features = [
    {
      name: "Job Aggregation",
      description: "Access opportunities from 50+ platforms through one interface.",
      Icon: MapPin,
    },
    {
      name: "Trust System",
      description: "Build credibility through worker-verified ratings and Trust Circles.",
      Icon: Shield,
    },
    {
      name: "Zero Commission",
      description: "Keep 100% of your earnings with our flat subscription model.",
      Icon: CreditCard,
    },
    {
      name: "Financial Growth",
      description: "Access loans, equipment financing, and investment opportunities.",
      Icon: TrendingUp,
    },
    {
      name: "Community Hub",
      description: "Connect with 50,000+ verified workers and build lasting relationships.",
      Icon: Users,
    },
    {
      name: "Direct Bidding",
      description: "Set your own rates and compete on quality, not just price.",
      Icon: Target,
    },
  ];

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

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {features.map(({ name, description, Icon }) => (
            <div
              key={name}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{name}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

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
