
import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import CandidateForm from '@/components/candidates/CandidateForm';

const NewCandidate = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">Add New Candidate</h1>
        <CandidateForm />
      </div>
    </AdminLayout>
  );
};

export default NewCandidate;
