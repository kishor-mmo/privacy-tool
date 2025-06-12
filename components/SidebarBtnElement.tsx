import React from "react";
import { FormElement } from "./FormElements";
import { Button } from "./ui/button";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

function SidebarBtnElement({ formElement }: { formElement: FormElement }) {
  const { icon: Icon, label } = formElement.designerBtnElement;
  const draggable = useDraggable({
    id: `designer-btn${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });
  return (
    <Button
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      variant={"outline"}
      className={cn(
        "cursor-grab flex flex-col h-[120px] w-[120px] gap-2",
        draggable.isDragging && "ring-2 ring-primary"
      )}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}

export function SidebarBtnElementDragOverlay({
  formElement,
}: {
  formElement: FormElement;
}) {
  const { icon: Icon, label } = formElement.designerBtnElement;
  const draggable = useDraggable({
    id: `designer-btn${formElement.type}`,
    data: {
      type: formElement.type,
      isDesgnerBtnElement: true,
    },
  });
  return (
    <Button
      variant={"outline"}
      className="cursor-grab flex flex-col h-[120px] w-[120px] gap-2"
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}

export default SidebarBtnElement;
