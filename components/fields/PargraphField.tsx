"use client";

import { LuHeading1 } from "react-icons/lu";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from "../FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";
import { BsTextParagraph } from "react-icons/bs";
import { Textarea } from "../ui/textarea";

const type: ElementsType = "PargraphField";
const extraAttributes = {
  text: "text here",
};

const propertiesSchema = z.object({
  text: z.string().min(2).max(500),
});

export const PargraphFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    // icon: MdTextFields, //Kliton doesn't have tags
    icon: BsTextParagraph,
    label: "Pargraph",
  },
  designerComponent: DesignerComponent,
  // formComponent: () => <div>formComp</div>,
  formComponent: FormComponent,
  // propertiesComponent: () => <div>propComp</div>,
  propertiesComponent: PropertiesComponent,
  // validate: (
  //   formElement: FormElementInstance,
  //   currentValue: string
  // ): boolean => {
  //   const element = formElement as CustomInstance;
  //   if (element.extraAttributes.required) {
  //     return currentValue.length > 0;
  //   }
  //   return true;
  // },
  validate: () => true, //this field doesn't have any validation
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

type propertiesFormSchema = Zod.infer<typeof propertiesSchema>;

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { text } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">Paragraph Field</Label>
      <p>{text}</p>
    </div>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  const { text } = element.extraAttributes;
  return <p>{text}</p>;
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance; //casting to get the right type definition
  const { title } = element.extraAttributes;
  const { updateElement } = useDesigner();
  const form = useForm<propertiesFormSchema>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      text: element.extraAttributes?.text,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchema) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        ...values,
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => e.preventDefault()}
        onBlur={form.handleSubmit(applyChanges)}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
