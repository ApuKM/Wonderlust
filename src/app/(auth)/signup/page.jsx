import { Card } from "@heroui/react";
import React from "react";
import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-white to-slate-100 px-4">
      <Card className="w-full max-w-md rounded-3xl border border-slate-200/70 bg-white p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
          <p className="text-sm text-slate-700 mt-1">
            Join us and start your journey
          </p>
        </div>
        <RegisterForm />
        <p className="text-center text-sm text-slate-700 mt-6">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="text-slate-900 font-medium cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default RegisterPage;