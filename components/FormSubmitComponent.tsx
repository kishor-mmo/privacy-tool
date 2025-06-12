"use client";
import React, { useCallback, useRef, useState, useTransition } from "react";
import { FormElementInstance, FormsElements } from "./FormElements";
import { Button } from "./ui/button";
import { HiCursorClick } from "react-icons/hi";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "./ui/use-toast";
import { SubmitForm } from "@/actions/form";

function FormSubmitComponent({
  formUrl,
  content,
}: {
  formUrl: string;
  content: FormElementInstance[];
}) {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  //getting a random value to trigger rerender in case of new submit
  //since we're using useRef
  const [renderkey, setRenderKey] = useState(new Date().getTime());
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || ""; //need to see what this holds
      const valid =
        FormsElements[field.type].validate(field, actualValue) || "";
      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }
    return true;
  }, [content]);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(new Date().getTime()); // if error set a new key so that React can re render the component
      toast({
        title: "Error",
        description: "Please check the form for errors",
        variant: "destructive",
      });
      return;
    }

    try {
      const jsonContent = JSON.stringify(formValues.current);
      await SubmitForm(formUrl, jsonContent);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
    console.log("FORM VALUES", formValues.current);
  };

  if (submitted) {
    return (
      <div className="flex justify-center items-center p-8 h-full w-full">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border rounded">
          <h1 className="text-2xl font-bold">Form Submitted</h1>
          <p className="text-muted-foreground">
            Thank you for submitting the form. You can close this page now.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full p-8 flex justify-center items-center">
      <div
        key={renderkey} //re render the entire block
        className="flex flex-col gap-4 flex-grow bg-background w-full max-w-[620px] p-8
      overflow-y-auto border rounded shadow-xl"
      >
        {content.map((element) => {
          const FormElement = FormsElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
        <Button
          onClick={() => {
            // submitForm(); // loader
            startTransition(submitForm);
          }}
          className="mt-8"
          disabled={pending}
        >
          {!pending && (
            <>
              <HiCursorClick className="mr-2" />
              Submit
            </>
          )}
          {pending && <ImSpinner2 className="animate-spin" />}
        </Button>
      </div>
    </div>
  );
}

export default FormSubmitComponent;
