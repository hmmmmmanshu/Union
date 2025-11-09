import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Users, Briefcase, TrendingUp } from "lucide-react";
import { LampContainer } from "@/components/ui/lamp";

const Hero = () => {
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/providers?location=${location}&service=${service}`);
  };

  return (
    <section className="relative overflow-hidden">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-center mb-4 sm:mb-6 text-foreground px-4 leading-tight max-w-4xl mx-auto"
        >
          <span className="block">Empowering Gig workers</span>
          <span className="block mt-3 sm:mt-4 bg-gradient-to-r from-[hsl(20_92%_62%)] via-[hsl(32_94%_64%)] to-[hsl(8_85%_58%)] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient drop-shadow-sm text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            Building fair opportunities
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 px-4 leading-relaxed"
        >
          Your gateway to verified Gig work. Connect with opportunities, build trust, access financing, and grow with community support.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.7,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="w-full max-w-3xl mx-auto mb-4 sm:mb-6 px-4"
        >
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl shadow-elevated p-2 md:p-3">
            <div className="grid md:grid-cols-3 gap-2">
              {/* Location Input */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 h-12 border-0 focus-visible:ring-1 bg-background"
                />
              </div>

              {/* Service Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Driver, Cook, Technician..."
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="pl-10 h-12 border-0 focus-visible:ring-1 bg-background"
                />
              </div>

              {/* Search Button */}
              <Button
                onClick={handleSearch}
                className="h-12 gradient-primary hover:opacity-90 transition-opacity text-base font-medium"
              >
                Find Work
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Quick Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.9,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4"
        >
          <Button variant="outline" size="sm" className="rounded-full bg-background/50 backdrop-blur-sm text-xs sm:text-sm" onClick={() => navigate('/providers?service=driver')}>
            Drivers
          </Button>
          <Button variant="outline" size="sm" className="rounded-full bg-background/50 backdrop-blur-sm text-xs sm:text-sm" onClick={() => navigate('/providers?service=delivery')}>
            Delivery
          </Button>
          <Button variant="outline" size="sm" className="rounded-full bg-background/50 backdrop-blur-sm text-xs sm:text-sm" onClick={() => navigate('/providers?service=technician')}>
            Technicians
          </Button>
          <Button variant="outline" size="sm" className="rounded-full bg-background/50 backdrop-blur-sm text-xs sm:text-sm" onClick={() => navigate('/providers?service=labor')}>
            Laborers
          </Button>
        </motion.div>
      </LampContainer>

      {/* Trust Indicators */}
      <div className="container mx-auto px-4 py-8 -mt-4 sm:-mt-6">
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            <div className="flex flex-col items-center">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 mb-2 sm:mb-3 text-primary" />
              <div className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground">50K+</div>
              <div className="text-xs sm:text-sm text-center text-muted-foreground leading-tight">Verified Workers</div>
            </div>
            <div className="flex flex-col items-center">
              <Briefcase className="h-6 w-6 sm:h-8 sm:w-8 mb-2 sm:mb-3 text-primary" />
              <div className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground">1M+</div>
              <div className="text-xs sm:text-sm text-center text-muted-foreground leading-tight">Jobs Posted</div>
            </div>
            <div className="flex flex-col items-center">
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 mb-2 sm:mb-3 text-primary" />
              <div className="text-lg sm:text-2xl md:text-3xl font-bold text-foreground">4.8★</div>
              <div className="text-xs sm:text-sm text-center text-muted-foreground leading-tight">Trust Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
