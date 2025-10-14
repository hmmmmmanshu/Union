import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

const Profile = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const [checkingApproval, setCheckingApproval] = useState(false);

  useEffect(() => {
    console.log('Profile router - loading:', loading, 'user:', user?.email, 'role:', userRole);
    
    if (!loading) {
      if (!user) {
        console.log('No user, redirecting to auth');
        navigate('/auth');
        return;
      } 
      
      if (userRole === 'admin') {
        console.log('Redirecting to admin dashboard');
        navigate('/admin', { replace: true });
        return;
      }
      
      if (userRole === 'customer') {
        console.log('Customer role, redirecting to home');
        navigate('/', { replace: true });
        return;
      }
      
      if (userRole === 'employer') {
        console.log('Redirecting to employer profile');
        navigate('/profile/employer', { replace: true });
        return;
      }
      
      if (userRole === 'worker' || userRole === 'both') {
        console.log('Checking worker approval status');
        checkWorkerApprovalStatus();
        return;
      }
      
      if (userRole === null) {
        // User exists but role is still null - might be fetching
        console.log('User exists but role is null, waiting...');
        return;
      }
      
      // Fallback for any other case
      console.log('Unknown user role, redirecting to home');
      navigate('/', { replace: true });
    }
  }, [user, userRole, loading, navigate]);

  const checkWorkerApprovalStatus = async () => {
    if (!user) return;

    setCheckingApproval(true);
    try {
      const { data: workerData } = await supabase
        .from('workers')
        .select('approval_status')
        .eq('user_id', user.id)
        .single();

      if (workerData && workerData.approval_status === 'pending') {
        console.log('Worker pending approval, redirecting');
        navigate('/pending-approval', { replace: true });
        return;
      } else if (workerData && workerData.approval_status === 'rejected') {
        console.log('Worker rejected, redirecting to pending screen');
        navigate('/pending-approval', { replace: true });
        return;
      } else {
        // Approved or no worker data, go to worker profile
        console.log('Redirecting to worker profile');
        navigate('/profile/worker', { replace: true });
      }
    } catch (error) {
      console.error('Error checking approval status:', error);
      // On error, redirect to worker profile
      navigate('/profile/worker', { replace: true });
    } finally {
      setCheckingApproval(false);
    }
  };

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

