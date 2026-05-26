"use client";

import CaseStudyManager from "./CaseStudyManager";

type CaseStudiesTabProps = {
  token: string | null;
  onOpenEdit: (caseData: any) => void;
  onOpenCreate: () => void;
};

export default function CaseStudiesTab({ token, onOpenEdit, onOpenCreate }: CaseStudiesTabProps) {
  return (
    <div className="space-y-6">
      {/* The manager includes a button to add new case study which calls onOpenEdit(null) */}
      <CaseStudyManager token={token} onEdit={onOpenEdit} onCreate={onOpenCreate} />
    </div>
  );
}
