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
    const checkWorkerApprovalStatus = async () => {
      if (!user || !userRole) return;

      // Check approval status for workers
      if (userRole === 'worker' || userRole === 'both') {
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
          }
        } catch (error) {
          console.error('Error checking approval status:', error);
        } finally {
          setCheckingApproval(false);
        }
      }
    };

    console.log('Profile router - loading:', loading, 'user:', user?.email, 'role:', userRole);
    
    if (!loading) {
      if (!user) {
        console.log('No user, redirecting to auth');
        navigate('/auth');
      } else if (userRole === 'admin') {
        console.log('Redirecting to admin dashboard');
        navigate('/admin', { replace: true });
      } else if (userRole === 'worker' || userRole === 'both') {
        console.log('Checking worker approval status');
        checkWorkerApprovalStatus();
        if (!checkingApproval) {
          console.log('Redirecting to worker profile');
          navigate('/profile/worker', { replace: true });
        }
      } else if (userRole === 'employer') {
        console.log('Redirecting to employer profile');
        navigate('/profile/employer', { replace: true });
      } else if (userRole === 'customer') {
        console.log('Customer role, redirecting to home');
        navigate('/', { replace: true });
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

