"use client";

import { authClient } from "@/lib/auth-client";
import { Spinner } from "@heroui/react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";
import { TiTick } from "react-icons/ti";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { name, image, email, password } = Object.fromEntries(
      formData.entries(),
    );
    const { data, error } = await authClient.signUp.email(
      {
        name,
        image,
        email,
        password,
        callbackURL: "/login",
      },
      {
        onRequest: (ctx) => {
            //show loading
            setLoading(true)
        },
        onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
            setLoading(false)
            toast.success("Register successful")
            redirect("/login")
        },
        onError: (ctx) => {
            // display the error message
            setLoading(false)
            toast.error(ctx.error.message);
        },
}
    );
    // if(data){
    //  toast.success("Register seccessful")
    //  redirect("/login")
    // }
    // if(error){
    //   toast.error("Something went wrong!")
    //   console.log(error)
    // }
  };
  return (
    <>
      <Form onSubmit={handleRegister} className="flex flex-col gap-5">
        {/* Name */}
        <TextField isRequired name="name" type="text">
          <Label className="text-sm font-medium text-slate-800">Name</Label>
          <Input placeholder="John Doe" className="rounded-xl" />
          <FieldError />
        </TextField>

        {/* Image */}
        <TextField name="image">
          <Label className="text-sm font-medium text-slate-800">
            Profile Image
          </Label>
          <Input placeholder="https://example.com/photo.jpg" />
          <FieldError />
        </TextField>

        {/* Email */}
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Invalid email address";
            }
            return null;
          }}
        >
          <Label className="text-sm font-medium text-slate-800">Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        {/* Password */}
        <TextField
          isRequired
          name="password"
          type={showPassword ? "text" : "password"}
          validate={(value) => {
            if (value.length < 8) {
              return "Minimum 8 characters required";
            }
            if (!/[A-Z]/.test(value)) {
              return "Add at least 1 uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Add at least 1 number";
            }
            return null;
          }}
        >
          <Label className="text-sm font-medium text-slate-800">Password</Label>

          <div className="relative">
            <Input placeholder="Enter password" className="w-full" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showPassword ? <IoIosEyeOff size={15} /> : <FaEye size={15} />}
            </button>
          </div>

          <Description className="text-xs text-slate-700">
            8+ chars, 1 uppercase, 1 number
          </Description>
          <FieldError />
        </TextField>

        {/* Submit */}
        <Button
          type="submit"
          className="mt-2 w-full rounded-xl bg-slate-900 text-white font-medium shadow-md hover:bg-slate-800 transition"
        >
          {loading ? <Spinner size="sm" className="text-white"/> : <TiTick />}
          Register
        </Button>
      </Form>
    </>
  );
};

export default RegisterForm;
