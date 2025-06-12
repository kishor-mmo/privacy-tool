import { CheckBoxFieldFormElement } from "./fields/CheckBoxField";
import { DateFieldFormElement } from "./fields/DateField";
import { NumberFieldFormElement } from "./fields/NumberField";
import { PargraphFieldFormElement } from "./fields/PargraphField";
import { SelectFieldFormElement } from "./fields/SelectField";
import { SeparatorFieldFormElement } from "./fields/SeparatorField";
import { SpacerFieldFormElement } from "./fields/SpacerField";
import { SubTitleFieldFormElement } from "./fields/SubTitleField";
import { TextAreaFormElement } from "./fields/TextArea";
import { TextFieldFormElement } from "./fields/TextField";
import { TitleFieldFormElement } from "./fields/TitleField";

export type ElementsType =
  | "TextField"
  | "TitleField"
  | "SubTitleField"
  | "PargraphField"
  | "SeparatorField"
  | "SpacerField"
  | "NumberField"
  | "TextArea"
  | "DateField"
  | "SelectField"
  | "CheckBoxField";
export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
  type: ElementsType;
  construct: (id: string) => FormElementInstance;
  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };
  designerComponent: React.FC<{ elementInstance: FormElementInstance }>;
  // formComponent: React.FC;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    // submitValue?: (key: string, value: string) => void;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  // propertiesComponent: React.FC; //In order to access the form extra Attribues of form elements
  propertiesComponent: React.FC<{ elementInstance: FormElementInstance }>;
  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type FormsElementsType = {
  [key in ElementsType]: FormElement;
};
export const FormsElements: FormsElementsType = {
  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  PargraphField: PargraphFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextArea: TextAreaFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckBoxField: CheckBoxFieldFormElement
};
