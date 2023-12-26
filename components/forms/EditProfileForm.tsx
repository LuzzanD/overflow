"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { usePathname, useRouter } from "next/navigation";
import { editUser } from "@/lib/actions/user.actions";

const formSchema = z.object({
  fullname: z.string().min(10, {
    message: "Question must be at least 10 characters long.",
  }),
  username: z.string().min(1, {
    message: "Explanation of the question must be at least 50 characters.",
  }),
  portfolio: z.string().min(10, {
    message: "Question must be at least 10 characters long.",
  }),
  location: z.string().min(10, {
    message: "Question must be at least 10 characters long.",
  }),
  bio: z.string().min(10, {
    message: "Question must be at least 10 characters long.",
  }),
});

interface Props {
  userId: string;
  name: string;
  username: string;
  bio: string;
  portfolioLink: string;
  locationString: string;
}

const EditProfileForm = ({
  userId,
  name,
  username,
  bio,
  portfolioLink,
  locationString,
}: Props) => {
  const router = useRouter();
  const path = usePathname();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: name || "",
      username: username || "",
      portfolio: portfolioLink || "",
      location: locationString || "",
      bio: bio || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await editUser({
        userId,
        fullname: values.fullname,
        username: values.username,
        portfolioLink: values.portfolio,
        locationString: values.location,
        bio: values.bio,
        path,
      });
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px] font-semibold leading-[20.8px] dark:text-slate-100">
                Full name
                <span className="text-[14px] text-orange-600"> *</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Change your full name."
                  className="w-[90%] rounded-lg border-none bg-white text-sm hover:bg-slate-200 focus:outline-none dark:bg-dark-100 dark:text-slate-100 dark:hover:bg-dark-100/70"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px] font-semibold leading-[20.8px] dark:text-slate-100">
                Username
                <span className="text-[14px] text-orange-600"> *</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Change your username."
                  className="w-[90%] rounded-lg border-none bg-white text-sm hover:bg-slate-200 focus:outline-none dark:bg-dark-100 dark:text-slate-100 dark:hover:bg-dark-100/70"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portfolio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px] font-semibold leading-[20.8px] dark:text-slate-100">
                Portfolio Link
                <span className="text-[14px] text-orange-600"> *</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your portfolio link."
                  className="w-[90%] rounded-lg border-none bg-white text-sm hover:bg-slate-200 focus:outline-none dark:bg-dark-100 dark:text-slate-100 dark:hover:bg-dark-100/70"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px] font-semibold leading-[20.8px] dark:text-slate-100">
                Location
                <span className="text-[14px] text-orange-600"> *</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your location."
                  className="w-[90%] rounded-lg border-none bg-white text-sm hover:bg-slate-200 focus:outline-none dark:bg-dark-100 dark:text-slate-100 dark:hover:bg-dark-100/70"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px] font-semibold leading-[20.8px] dark:text-slate-100">
                Bio
                <span className="text-[14px] text-orange-600"> *</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write something about yourself."
                  {...field}
                  className="w-[90%] rounded-lg border-none bg-white text-sm hover:bg-slate-200 focus:outline-none dark:bg-dark-100 dark:text-slate-100 dark:hover:bg-dark-100/70"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="primary-gradient dark:secondary-gradient ml-auto block w-[200px] text-white"
        >
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default EditProfileForm;
