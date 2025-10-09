import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

const Profile = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Profile router - loading:', loading, 'user:', user?.email, 'role:', userRole);
    
    if (!loading) {
      if (!user) {
        console.log('No user, redirecting to auth');
        navigate('/auth');
      } else if (userRole === 'worker' || userRole === 'both') {
        console.log('Redirecting to worker profile');
        navigate('/profile/worker', { replace: true });
      } else if (userRole === 'employer') {
        console.log('Redirecting to employer profile');
        navigate('/profile/employer', { replace: true });
      } else {
        // User exists but role is still null - might be fetching
        console.log('User exists but role is null');
        toast.error('Unable to determine user type. Please sign in again.');
        navigate('/auth');
      }
    }
  }, [user, userRole, loading, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-sm text-muted-foreground">Loading your profile...</p>
      </div>
    </div>
  );
};

export default Profile;

