import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, CheckCircle2 } from "lucide-react";

interface ProviderCardProps {
  id: string;
  name: string;
  service: string;
  location: string;
  rating: number;
  reviews: number;
  experience: number;
  verified: boolean;
  imageUrl: string;
  priceRange: string;
}

const ProviderCard = ({
  id,
  name,
  service,
  location,
  rating,
  reviews,
  experience,
  verified,
  imageUrl,
  priceRange,
}: ProviderCardProps) => {
  return (
    <Link to={`/provider/${id}`}>
      <Card className="overflow-hidden hover-lift cursor-pointer group">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {verified && (
            <Badge className="absolute top-3 right-3 bg-success text-success-foreground">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Header */}
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground capitalize">{service}</p>
          </div>

          {/* Location */}
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </div>

          {/* Rating & Reviews */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-primary text-primary mr-1" />
              <span className="font-medium">{rating}</span>
              <span className="text-sm text-muted-foreground ml-1">
                ({reviews} reviews)
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {experience} yrs exp
            </span>
          </div>

          {/* Price */}
          <div className="pt-3 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Starting from</span>
              <span className="font-semibold text-lg">{priceRange}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProviderCard;
