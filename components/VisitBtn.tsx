"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ImNewTab } from "react-icons/im";

function VisitBtn({ shareURL }: { shareURL: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // window not found error will not happen
  }
  const shareLink = `${window.location.origin}/submit/${shareURL}`;
  return (
    <Button
      className="w-[120px]"
      onClick={() => {
        window.open(shareLink, "_blank");
      }}
    >
      <ImNewTab className="w-4 h-4 mr-2" />
      Visit
    </Button>
  );
}

export default VisitBtn;
