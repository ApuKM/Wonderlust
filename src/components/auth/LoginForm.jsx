"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { GrGoogle } from "react-icons/gr";
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { useState } from "react";
import toast from "react-hot-toast";
import { Spinner } from "@heroui/react";
import { redirect } from "next/navigation";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    },
       {
          onRequest: (ctx) => {
              //show loading
              setLoading(true)
          },
          onSuccess: (ctx) => {
              //redirect to the dashboard or sign in page
              setLoading(false)
              toast.success("Login successful")
              redirect("/")
          },
          onError: (ctx) => {
              // display the error message
              setLoading(false)
              toast.error(ctx.error.message);
          },
  }
  );
    // console.log(data, error);

    // if (error) {
    //   toast.error(`${error.message}. Please try again.`);
    // }

    // if (!error) {
    //   toast.success("Login successful");
    //   router.push("/");
    // }
  };
  const handlGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };
  return (
    <>
      <Form onSubmit={handleLogin} className="flex flex-col gap-5">
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label className="mb-1 text-sm font-medium text-slate-800">
            Email
          </Label>
          <Input
            placeholder="john@example.com"
            className="rounded-2xl text-sm"
          />
          <FieldError className="mt-1 text-xs text-red-500" />
        </TextField>

        <TextField
          isRequired
          minLength={8}
          name="password"
          type={showPassword ? "text" : "password"}
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label className="mb-1 text-sm font-medium text-slate-800">
            Password
          </Label>
          <div className="relative">
            <Input
              placeholder="Enter password"
              className="w-full rounded-2xl text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showPassword ? <IoIosEyeOff size={15} /> : <FaEye size={15} />}
            </button>
          </div>
          <Description className="mt-1 text-xs text-slate-700">
            Must be at least 8 characters with 1 uppercase and 1 number
          </Description>
          <FieldError className="mt-1 text-xs text-red-500" />
        </TextField>

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            className="w-full rounded-2xl bg-slate-900 text-white font-medium shadow-lg transition hover:bg-slate-800"
          >
            {loading ? <Spinner size="sm" color="white"/> : <Check />}
            Sign In
          </Button>

          <Button
            type="reset"
            variant="secondary"
            className="w-full rounded-2xl font-medium"
          >
            Reset
          </Button>
        </div>
      </Form>

      <div className="my-2 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-medium uppercase tracking-wide text-slate-700">
          or
        </span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <Button
        onClick={handlGoogleSignIn}
        variant="outline"
        className="w-full rounded-2xl border-slate-300 bg-white font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
      >
        <GrGoogle className="text-lg" />
        Continue with Google
      </Button>
    </>
  );
};

export default LoginForm;