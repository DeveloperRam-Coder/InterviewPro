
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import AdminLayout from '@/components/layout/AdminLayout';
import CandidateForm from '@/components/candidates/CandidateForm';
import { getCandidate } from '@/services/candidateService';
import { Candidate } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

const EditCandidate = () => {
  const { id } = useParams<{ id: string }>();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidate = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const candidateData = await getCandidate(id);
        setCandidate(candidateData);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching candidate:', err);
        setError('Failed to load candidate details');
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load candidate information",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [id, toast]);

  if (!id) {
    return (
      <AdminLayout>
        <div className="px-4 py-6">Candidate ID is missing</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6 px-2 sm:px-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Edit Candidate</h1>
        
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-20 w-full" />
          </div>
        ) : error ? (
          <div className="bg-destructive/10 p-4 rounded-lg text-destructive">
            {error}
          </div>
        ) : (
          <CandidateForm candidateId={id} initialData={candidate} />
        )}
      </div>
    </AdminLayout>
  );
};

export default EditCandidate;
