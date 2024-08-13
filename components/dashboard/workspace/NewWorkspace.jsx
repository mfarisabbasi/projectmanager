"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { newWorkspaceValidation } from "@/lib/validations";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/common/CustomFormField";
import MainButton from "@/components/common/MainButton";

const NewWorkspace = ({ setShowNewWorkspace, fetchWorkspaces }) => {
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(newWorkspaceValidation),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values) {
    setLoading(true);
    const response = await fetch("/api/workspaces/new", {
      method: "POST",
      body: JSON.stringify({
        name: values.name,
      }),
    });

    if (response.status === 201) {
      const data = await response.json();
      console.log(data);
      toast({
        title: "Success",
        description: response.statusText,
        className: "bg-green-500 text-black",
      });
      setShowNewWorkspace(false);
      fetchWorkspaces();
    } else {
      console.log(response);
      toast({
        title: "Error",
        description: response.statusText,
        className: "bg-red-500 text-black",
      });
    }

    setLoading(false);
  }
  return (
    <div className="h-3/4 flex flex-col justify-center items-center">
      <div className="sm:w-[420px]">
        <MainButton
          onClick={() => setShowNewWorkspace(false)}
          isBack={true}
          type="button"
          label="Back"
          bgColor="bg-primary"
        />
      </div>
      <Form {...form}>
        <div className="sm:w-[420px]">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full mt-4"
          >
            <CustomFormField
              form={form}
              name="name"
              label="Workspace Name"
              type="text"
              placeHolder="for ex New Startup"
            />
            <MainButton loading={loading} type="button" label="Create" />
          </form>
        </div>
      </Form>
    </div>
  );
};

export default NewWorkspace;
