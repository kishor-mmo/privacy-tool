import React from "react";
import useDesigner from "./hooks/useDesigner";
import { FormsElements } from "./FormElements";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "./ui/button";

function PropertiesFormSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;
  const PropertiesForm =
    FormsElements[selectedElement?.type]?.propertiesComponent;
  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Element Properties</p>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => setSelectedElement(null)}
        >
          <AiOutlineClose />
        </Button>
      </div>
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
}

export default PropertiesFormSidebar;
