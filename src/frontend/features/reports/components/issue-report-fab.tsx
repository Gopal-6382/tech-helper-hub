"use client";

import { useState } from "react";
import { Bug } from "lucide-react";

import { Button } from "@/frontend/components/ui/button";

import { IssueReportDialog } from "@/frontend/features/reports/components/dialog";

export function IssueReportFab() {
  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        size="icon"
        variant="outline"
        aria-label="Report an issue"
        title="Report an issue"
        onClick={() => setIsReportOpen(true)}
        className="fixed bottom-5 left-5 z-50 size-11 hover:bg-muted  rounded-full bg-background shadow-lg"
      >
        <Bug className="size-5" />
      </Button>

      <IssueReportDialog open={isReportOpen} onOpenChange={setIsReportOpen} />
    </>
  );
}
