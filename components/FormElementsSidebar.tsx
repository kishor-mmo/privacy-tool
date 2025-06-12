import React from "react";
import SidebarBtnElement from "./SidebarBtnElement";
import { FormsElements } from "./FormElements";
import { Separator } from "./ui/separator";

function FormElementsSidebar() {
  return (
    <div>
      <p className="text-foreground/70 text-sm">Drag and Drop elements</p>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-2">
        <p className="text-sm text-muted-foreground place-self-start col-span-1 md:col-span-2 my-2">
          Layout Elements
        </p>
        <SidebarBtnElement formElement={FormsElements.TitleField} />
        <SidebarBtnElement formElement={FormsElements.SubTitleField} />
        <SidebarBtnElement formElement={FormsElements.PargraphField} />
        <p className="text-sm text-muted-foreground place-self-start col-span-1 md:col-span-2 my-2">
          Form Elements
        </p>
        <SidebarBtnElement formElement={FormsElements.TextField} />
        <SidebarBtnElement formElement={FormsElements.SeparatorField} />
        <SidebarBtnElement formElement={FormsElements.SpacerField} />
        <SidebarBtnElement formElement={FormsElements.NumberField} />
        <SidebarBtnElement formElement={FormsElements.TextArea} />
        <SidebarBtnElement formElement={FormsElements.DateField} />
        <SidebarBtnElement formElement={FormsElements.SelectField} />
        <SidebarBtnElement formElement={FormsElements.CheckBoxField} />
      </div>
    </div>
  );
}

export default FormElementsSidebar;
