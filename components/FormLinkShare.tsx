"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import { ImShare } from "react-icons/im";

function FormLinkShare({ shareURL }: { shareURL: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // window not found error will not happen
  }
  const shareLink = `${window.location.origin}/submit/${shareURL}`;
  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input value={shareLink} readOnly />

      <Button
        className="w-[250px]"
        onClick={() => {
          navigator.clipboard.writeText(shareLink);
          toast({
            title: "Copied",
            description: "Link copied to clipboard",
          });
        }}
      >
        <ImShare className="h-4 w-4 mr-2"/>
        Share Link
      </Button>
    </div>
  );
}

export default FormLinkShare;
