import React from "react";
import { Button } from "./ui/button";
import { MdPreview } from "react-icons/md";
import useDesigner from "./hooks/useDesigner";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { FormsElements } from "./FormElements";

function PreviewDialogBtn() {
  const { elements } = useDesigner();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="gap-2">
          <MdPreview />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
        <div className="px-4 py-2 border-b">
          <p className="text-lg font-bold text-muted-foreground">
            Form Preview
          </p>
          <p className="text-sm text-muted-foreground ">
            This is how the form will look like to the users
          </p>
        </div>
        <div className="flex flex-col flex-grow items-center justify-center p-4 bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-y-auto">
          <div className="max-w[620px] bg-background flex flex-col flex-grow gap-4
          h-full w-full rounded-2xl overflow-y-auto p-8">
            {
              elements.map(element => {
                const FormComponent = FormsElements[element.type].formComponent;
                return <FormComponent key={element.id} elementInstance={element}/>
              })
            }
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PreviewDialogBtn;
