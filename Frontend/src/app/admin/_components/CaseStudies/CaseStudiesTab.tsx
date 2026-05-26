"use client";

import CaseStudyManager from "./CaseStudyManager";

type CaseStudiesTabProps = {
  token: string | null;
  onOpenCreate: () => void; // not used directly, manager handles create
  onOpenEdit: (caseData: any) => void;
};

export default function CaseStudiesTab({ token, onOpenCreate, onOpenEdit }: CaseStudiesTabProps) {
  return (
    <div className="space-y-6">
      {/* The manager includes a button to add new case study which calls onOpenEdit(null) */}
      <CaseStudyManager token={token} onEdit={onOpenEdit} />
    </div>
  );
}
