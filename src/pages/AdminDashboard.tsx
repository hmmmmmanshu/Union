import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { 
  Loader2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Briefcase, 
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Database } from "@/integrations/supabase/types";

type Worker = Database['public']['Tables']['workers']['Row'] & {
  user_email?: string;
  skills?: Array<{ skill_name: string }>;
};

const AdminDashboard = () => {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (userRole !== 'admin') {
      toast.error('Access denied. Admin privileges required.');
      navigate('/');
      return;
    }

    loadPendingWorkers();
  }, [user, userRole]);

  const loadPendingWorkers = async () => {
    try {
      setLoading(true);

      // Get pending workers with their email and skills
      // Note: We need to query auth.users for emails
      const { data: workersData, error: workersError } = await supabase
        .from('workers')
        .select(`
          *,
          user_id
        `)
        .eq('approval_status', 'pending')
        .order('created_at', { ascending: false });

      if (workersError) throw workersError;

      // Get all user IDs
      const userIds = (workersData || []).map(w => w.user_id);
      
      // Query auth.users table for emails (requires RLS policy or service role)
      const { data: usersData } = await supabase
        .rpc('get_user_emails', { user_ids: userIds })
        .then(result => result)
        .catch(() => ({ data: null })); // Fallback if function doesn't exist

      // Create a map of user_id to email
      const emailMap: Record<string, string> = {};
      if (usersData) {
        usersData.forEach((u: any) => {
          emailMap[u.id] = u.email;
        });
      }

      // Get skills for each worker
      const workersWithDetails = await Promise.all(
        (workersData || []).map(async (worker) => {
          // Get skills
          const { data: skillsData } = await supabase
            .from('worker_skills')
            .select(`
              skill_id,
              skills (name)
            `)
            .eq('worker_id', worker.id);

          return {
            ...worker,
            user_email: emailMap[worker.user_id] || 'Email hidden',
            skills: skillsData?.map(s => ({ skill_name: (s.skills as any)?.name || 'Unknown' })) || []
          };
        })
      );

      setWorkers(workersWithDetails);
    } catch (error: any) {
      console.error('Error loading workers:', error);
      toast.error('Failed to load pending workers');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!selectedWorker) return;

    try {
      setProcessing(true);

      const { error } = await supabase
        .from('workers')
        .update({
          approval_status: 'approved',
          approved_at: new Date().toISOString(),
          approved_by: user!.id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', selectedWorker.id);

      if (error) throw error;

      toast.success(`${selectedWorker.full_name}'s profile has been approved!`);
      
      // Refresh the list
      await loadPendingWorkers();
      
      // Close dialog
      setSelectedWorker(null);
      setActionType(null);
    } catch (error: any) {
      console.error('Error approving worker:', error);
      toast.error('Failed to approve worker');
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!selectedWorker || !rejectionReason.trim()) {
      toast.error('Please provide a rejection reason');
      return;
    }

    try {
      setProcessing(true);

      const { error } = await supabase
        .from('workers')
        .update({
          approval_status: 'rejected',
          approval_rejection_reason: rejectionReason,
          approved_by: user!.id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', selectedWorker.id);

      if (error) throw error;

      toast.success(`${selectedWorker.full_name}'s profile has been rejected`);
      
      // Refresh the list
      await loadPendingWorkers();
      
      // Close dialog
      setSelectedWorker(null);
      setActionType(null);
      setRejectionReason("");
    } catch (error: any) {
      console.error('Error rejecting worker:', error);
      toast.error('Failed to reject worker');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Review and approve gig worker profiles
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Approval</p>
                  <p className="text-3xl font-bold">{workers.length}</p>
                </div>
                <Clock className="h-10 w-10 text-orange-500" />
              </div>
            </Card>
          </div>

          {/* Pending Workers List */}
          {workers.length === 0 ? (
            <Card className="p-12">
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">All Caught Up!</h3>
                <p className="text-muted-foreground">
                  There are no pending worker profiles to review at the moment.
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Pending Profiles</h2>
              
              {workers.map((worker) => (
                <Card key={worker.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    {/* Worker Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                          {worker.full_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{worker.full_name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {worker.user_email}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        {worker.phone && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            {worker.phone}
                          </div>
                        )}
                        
                        {worker.location_city && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {worker.location_city}, {worker.location_state}
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Briefcase className="h-4 w-4" />
                          {worker.years_of_experience} years experience
                        </div>
                      </div>

                      {worker.bio && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {worker.bio}
                        </p>
                      )}

                      {worker.skills && worker.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {worker.skills.map((skill, idx) => (
                            <Badge key={idx} variant="secondary">
                              {skill.skill_name}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="text-xs text-muted-foreground">
                        Submitted: {new Date(worker.created_at!).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex md:flex-col gap-2">
                      <Button
                        onClick={() => {
                          setSelectedWorker(worker);
                          setActionType('approve');
                        }}
                        className="flex-1 md:flex-initial bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedWorker(worker);
                          setActionType('reject');
                        }}
                        variant="destructive"
                        className="flex-1 md:flex-initial"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Approval Dialog */}
      <AlertDialog open={actionType === 'approve'} onOpenChange={() => {
        setActionType(null);
        setSelectedWorker(null);
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Worker Profile</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve <strong>{selectedWorker?.full_name}</strong>? 
              Their profile will be visible to customers on the platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={processing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleApprove}
              disabled={processing}
              className="bg-green-600 hover:bg-green-700"
            >
              {processing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Approving...
                </>
              ) : (
                'Approve'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rejection Dialog */}
      <AlertDialog open={actionType === 'reject'} onOpenChange={() => {
        setActionType(null);
        setSelectedWorker(null);
        setRejectionReason("");
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Worker Profile</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for rejecting <strong>{selectedWorker?.full_name}</strong>'s profile.
              This will help them understand what needs improvement.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Enter rejection reason (e.g., incomplete profile, missing documents, etc.)"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={processing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReject}
              disabled={processing || !rejectionReason.trim()}
              className="bg-red-600 hover:bg-red-700"
            >
              {processing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Rejecting...
                </>
              ) : (
                'Reject'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;

