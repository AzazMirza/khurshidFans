"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ✅ Allow login with email OR phone
const formSchema = z.object({
  identifier: z
    .string()
    .refine(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
        /^\+?[1-9]\d{1,14}$/.test(value),
      {
        message: "Enter a valid email or phone number",
      }
    ),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const Login02Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || "Login failed");
        return;
      }

      // alert("Login successful!");
      window.location.href = "dashboard";
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Blurred background image */}
      <div className="absolute inset-0">
        <img
          src="/images/BLDC-COVER.jpg"
          alt="Background"
          className="w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center px-8 py-10 rounded-2xl shadow-lg backdrop-blur-lg bg-[var(--nav-color)]/20 border border-white/70">
        <img
          src="/images/khurshid fans logo.png"
          alt="khurshid fans logo"
          className="h-12"
        />
        <p className="mt-4 text-xl font-semibold tracking-tight text-white">
          Log in to Khurshid Fans
        </p>

        <Button className="mt-8 w-full gap-3 bg-white/20 hover:bg-white/30 text-white border border-white/40 cursor-pointer">
          <GoogleLogo />
          Continue with Google
        </Button>

        <div className="my-7 w-full flex items-center justify-center overflow-hidden text-white">
          <Separator className="bg-white/40" />
          <span className="text-sm px-2">OR</span>
          <Separator className="bg-white/40" />
        </div>

        <Form {...form}>
          <form
            className="w-full space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => {
                const isPhone = /^\+?[0-9]*$/.test(field.value);
                return (
                  <FormItem>
                    <FormLabel className="text-white">Email / Phone</FormLabel>
                    <FormControl>
                      <Input
                        type={isPhone ? "tel" : "email"}
                        inputMode={isPhone ? "tel" : "email"}
                        placeholder="Enter your email or phone"
                        className="w-full bg-white/30 border border-white/40 text-white placeholder-white/70"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="w-full bg-white/30 border border-white/40 text-white placeholder-white/70"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-300" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mt-4 w-full bg-[var(--gold-btn-color)] hover:bg-[var(--gold-btn-hover)] text-black cursor-pointer"
            >
              Continue
            </Button>
          </form>
        </Form>

        {/* Links */}
        <div className="mt-5 space-y-5">
          <Link
            href="#"
            className="text-sm block underline text-white/80 text-center hover:text-[var(--gold-btn-color)]"
          >
            Forgot your password?
          </Link>
          <p className="text-sm text-center text-white/80">
            Don&apos;t have an account?
            <Link
              href="/signup"
              className="ml-1 underline text-white/80 hover:text-[var(--gold-btn-color)]"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const GoogleLogo = () => (
  <svg
    width="1.3em"
    height="1.3em"
    id="icon-google"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block shrink-0 align-sub text-inherit size-lg"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M15.6823 8.18368C15.6823 7.63986 15.6382 7.0931 15.5442 6.55811H7.99829V9.63876H12.3194C12.1401 10.6323 11.564 11.5113 10.7203 12.0698V14.0687H13.2983C14.8122 12.6753 15.6823 10.6176 15.6823 8.18368Z"
        fill="#4285F4"
      ></path>
      <path
        d="M7.99812 16C10.1558 16 11.9753 15.2915 13.3011 14.0687L10.7231 12.0698C10.0058 12.5578 9.07988 12.8341 8.00106 12.8341C5.91398 12.8341 4.14436 11.426 3.50942 9.53296H0.849121V11.5936C2.2072 14.295 4.97332 16 7.99812 16Z"
        fill="#34A853"
      ></path>
      <path
        d="M3.50665 9.53295C3.17154 8.53938 3.17154 7.4635 3.50665 6.46993V4.4093H0.849292C-0.285376 6.66982 -0.285376 9.33306 0.849292 11.5936L3.50665 9.53295Z"
        fill="#FBBC04"
      ></path>
      <path
        d="M7.99812 3.16589C9.13867 3.14825 10.241 3.57743 11.067 4.36523L13.3511 2.0812C11.9048 0.723121 9.98526 -0.0235266 7.99812 -1.02057e-05C4.97332 -1.02057e-05 2.2072 1.70493 0.849121 4.40932L3.50648 6.46995C4.13848 4.57394 5.91104 3.16589 7.99812 3.16589Z"
        fill="#EA4335"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="15.6825" height="16" fill="white"></rect>
      </clipPath>
    </defs>
  </svg>
);

export default Login02Page;
