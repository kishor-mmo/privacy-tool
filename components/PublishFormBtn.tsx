import React, { startTransition, useTransition } from "react";
import { Button } from "./ui/button";
import { MdOutlinePublish } from "react-icons/md";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { FaIcons, FaSpinner } from "react-icons/fa";
import { toast } from "./ui/use-toast";
import { PublishForm } from "@/actions/form";
import { useRouter } from "next/navigation";

function PublishFormBtn({ id }: { id: number }) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  async function publishForm() {
    try {
      await PublishForm(id);
      toast({
        title: "Success",
        description: "Form has been published",
      });
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, Please try again later",
        variant: "destructive",
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="gap-2">
          <MdOutlinePublish className="h-4 w-4" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to publish the Form?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. After publishing you will never be
            able to edit this form <br /> <br />
            <span className="font-medium">
              By publishing this form, You can share it with the public to
              collect the requests.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishForm);
            }}
          >
            Proceed {loading && <FaSpinner className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PublishFormBtn;
