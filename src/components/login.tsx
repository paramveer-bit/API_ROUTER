"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"


const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
})

export default function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    // Here you would typically send the login credentials to your backend
    try {
      const res = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {email: values.email, password: values.password})
      router.push("/dashboard")
    } catch (error:any) {
      console.log(error)
      toast({
        title: "Error",
        description:error.message,
        variant : "destructive"
      })
    }
    console.log(values)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard") // Redirect to dashboard after successful login
    }, 2000)
  }

  useState(()=>{
    
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Email------------------------ */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Password------------------------------------------- */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
      </form>
      {/* Other links----------------------------------------------------------- */}
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p>
        <p className="mt-2">
          <Link href="/forgot-password" className="font-medium text-primary hover:underline">
            Forgot your password?
          </Link>
        </p>
      </div>
    </Form>
  )
}

