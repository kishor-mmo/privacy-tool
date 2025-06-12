"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

import { formSchema, formSchemaType } from "@/schemas/form";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "./ui/use-toast";
import { CreateForm } from "@/actions/form";
import { useRouter } from "next/navigation";

// MOVED TO SCHEMA FOLDER
// const formSchema = z.object({
//   name: z.string().min(4),
//   description: z.string().optional(),
// });

// type formSchemaType = z.infer<typeof formSchema>;

function CreateFormBtn() {
  const router = useRouter()
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: formSchemaType) {
    try {
      const formId  = await CreateForm(values);
      toast({
        title: "Succes",
        description: "form created successfully",
      });
      // console.log("FORM ID", formId)
      router.push(`/builder/${formId}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, Please try again later",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create a new Form</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Form</DialogTitle>
          <DialogDescription>
            Create a new form to capture responses
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                onClick={() => form.handleSubmit(onSubmit)}
                // onClick={form.handleSubmit(onSubmit)} //Kliton changed it for success toast but working for me
                disabled={form.formState.isSubmitting}
                className="w-full mt-4"
              >
                {!form.formState.isSubmitting && <span>Save</span>}
                {form.formState.isSubmitting && (
                  <ImSpinner2 className="animate-spin" />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateFormBtn;
