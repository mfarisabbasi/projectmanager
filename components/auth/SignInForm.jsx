import { Form } from "@/components/ui/form";
import Link from "next/link";
import MainButton from "@/components/common/MainButton";
import CustomFormField from "@/components/common/CustomFormField";

const SignInForm = ({ form, loading, onSubmit }) => {
  return (
    <Form {...form}>
      <div className="sm:w-[420px]">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full mt-4"
        >
          <CustomFormField
            form={form}
            name="email"
            label="Email"
            type="email"
            placeHolder="Enter your email"
          />
          <CustomFormField
            form={form}
            name="password"
            label="Password"
            type="password"
            placeHolder="Enter your password"
          />

          <MainButton loading={loading} type="button" label="Sign In" />
        </form>
        <p className="text-center mt-2">
          Don't have an account?{" "}
          <span className="text-black font-medium underline">
            <Link href="/auth/sign-up">Sign Up</Link>
          </span>
        </p>
      </div>
    </Form>
  );
};

export default SignInForm;
