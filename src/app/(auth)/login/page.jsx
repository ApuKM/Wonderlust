import LoginForm from "@/components/auth/LoginForm"
import { Card } from "@heroui/react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-white to-slate-100 px-4">
      <Card className="w-full max-w-md rounded-3xl border border-slate-200/70 bg-white/90 p-8 shadow-2xl backdrop-blur-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Sign In
          </h1>
          <p className="mt-2 text-sm text-slate-700">
            Please sign in to continue.
          </p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-slate-700 mt-6">
          Don’t have an account?{" "}
          <Link
            href={"/signup"}
            className="text-slate-900 font-medium cursor-pointer hover:underline"
          >
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default page;