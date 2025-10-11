import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Clock, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type Worker = Database['public']['Tables']['workers']['Row'];

const PendingApproval = () => {
  const { user, userRole, signOut } = useAuth();
  const navigate = useNavigate();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (userRole !== 'worker' && userRole !== 'both') {
      navigate('/');
      return;
    }

    loadWorkerStatus();

    // Set up realtime subscription to listen for approval status changes
    const channel = supabase
      .channel('worker_approval_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'workers',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('Worker status changed:', payload);
          const newWorker = payload.new as Worker;
          setWorker(newWorker);

          if (newWorker.approval_status === 'approved') {
            toast.success('Congratulations! Your profile has been approved! 🎉');
            // Redirect to home page after a short delay
            setTimeout(() => {
              navigate('/');
            }, 2000);
          } else if (newWorker.approval_status === 'rejected') {
            toast.error('Your profile has been rejected. Please check the reason below.');
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, userRole]);

  const loadWorkerStatus = async () => {
    try {
      setLoading(true);

      const { data: workerData, error } = await supabase
        .from('workers')
        .select('*')
        .eq('user_id', user!.id)
        .single();

      if (error) throw error;

      setWorker(workerData);

      // If approved, redirect to home
      if (workerData.approval_status === 'approved') {
        navigate('/');
      }
    } catch (error: any) {
      console.error('Error loading worker status:', error);
      toast.error('Failed to load profile status');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    navigate('/profile/worker');
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading || !worker) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="container mx-auto max-w-2xl">
          {worker.approval_status === 'pending' && (
            <Card className="p-8 md:p-12 text-center space-y-6">
              {/* Animated Clock Icon */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping">
                    <Clock className="h-20 w-20 text-orange-500/30" />
                  </div>
                  <Clock className="h-20 w-20 text-orange-500 relative z-10" />
                </div>
              </div>

              {/* Heading */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">Profile Under Review</h1>
                <p className="text-lg text-muted-foreground">
                  Thank you for submitting your profile, <span className="font-semibold text-foreground">{worker.full_name}</span>!
                </p>
              </div>

              {/* Description */}
              <div className="space-y-4 text-muted-foreground">
                <p className="text-base">
                  Your profile is currently being reviewed by our admin team. This typically takes 24-48 hours.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 text-left space-y-2">
                  <p className="font-semibold text-foreground text-sm">What happens next?</p>
                  <ul className="text-sm space-y-1 ml-4 list-disc">
                    <li>Our team will review your profile and credentials</li>
                    <li>You'll receive a notification once approved</li>
                    <li>Once approved, your profile will be visible to customers</li>
                    <li>You can start receiving job opportunities!</li>
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={loadWorkerStatus}
                  className="flex-1"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Check Status
                </Button>
                <Button
                  variant="outline"
                  onClick={handleEditProfile}
                  className="flex-1"
                >
                  Edit Profile
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="flex-1"
                >
                  Sign Out
                </Button>
              </div>

              {/* Footer Note */}
              <p className="text-xs text-muted-foreground pt-4">
                Need help? Contact us at support@union.com
              </p>
            </Card>
          )}

          {worker.approval_status === 'rejected' && (
            <Card className="p-8 md:p-12 text-center space-y-6">
              {/* X Circle Icon */}
              <div className="flex justify-center">
                <XCircle className="h-20 w-20 text-red-500" />
              </div>

              {/* Heading */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-red-600">Profile Not Approved</h1>
                <p className="text-lg text-muted-foreground">
                  We're sorry, {worker.full_name}, but your profile could not be approved at this time.
                </p>
              </div>

              {/* Rejection Reason */}
              {worker.approval_rejection_reason && (
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-left">
                  <p className="font-semibold text-red-700 dark:text-red-400 text-sm mb-2">
                    Reason for rejection:
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-300">
                    {worker.approval_rejection_reason}
                  </p>
                </div>
              )}

              {/* Description */}
              <div className="space-y-4 text-muted-foreground">
                <p className="text-base">
                  Don't worry! You can update your profile and resubmit it for review.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={handleEditProfile}
                  className="flex-1 gradient-primary hover:opacity-90"
                >
                  Update Profile & Resubmit
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="flex-1"
                >
                  Sign Out
                </Button>
              </div>

              {/* Footer Note */}
              <p className="text-xs text-muted-foreground pt-4">
                Need help? Contact us at support@union.com
              </p>
            </Card>
          )}

          {worker.approval_status === 'approved' && (
            <Card className="p-8 md:p-12 text-center space-y-6">
              {/* Check Circle Icon */}
              <div className="flex justify-center">
                <CheckCircle className="h-20 w-20 text-green-500" />
              </div>

              {/* Heading */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-green-600">Profile Approved! 🎉</h1>
                <p className="text-lg text-muted-foreground">
                  Congratulations, {worker.full_name}! Your profile is now live.
                </p>
              </div>

              {/* Description */}
              <p className="text-base text-muted-foreground">
                You can now receive job opportunities from customers. Good luck!
              </p>

              {/* Actions */}
              <Button
                onClick={() => navigate('/')}
                className="gradient-primary hover:opacity-90"
              >
                Go to Dashboard
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingApproval;

