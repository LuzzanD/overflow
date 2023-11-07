"use client";

import React, { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  text: z.string().min(50, {
    message: "Username must be at least 50 characters.",
  }),
  tags: z.string().min(2, {
    message: "tags must be at least 2 characters.",
  }),
});

const AskQuestion = () => {
  const editorRef = useRef(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      text: "",
      tags: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("values");
  };

  return (
    // <form className="flex w-full flex-col gap-12 px-12 py-16">
    //   <h1 className="h1-bold mb-2">Ask a public question</h1>
    //   <div className="flex flex-col gap-2 ">
    //     <h3 className="paragraph-semibold">Question title</h3>
    //     <Input className="rounded-lg bg-transparent hover:bg-transparent/5 focus:outline-none" />
    //     <p className="small-regular">
    //       Be specific and imagine you&apos;re asking a question to another
    //       person.
    //     </p>
    //   </div>

    //   <div className="flex flex-col gap-2 ">
    //     <h3 className="paragraph-semibold">Tags</h3>
    //     <Input className="rounded-lg bg-transparent hover:bg-transparent/5 focus:outline-none" />
    //     <p className="small-regular">
    //       Add up to 5 tags to describe what your question is about. Start typing
    //       to see suggestions.
    //     </p>
    //   </div>
    //   <Button variant="outline" type="submit">
    //     Ask the question!
    //   </Button>
    // </form>
    <div className="flex w-full flex-col gap-8 p-8">
      <h1 className="h1-bold mb-2">Ask a public question</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-semibold leading-[20.8px]">
                  Question title
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Please insert the question title."
                    className="rounded-lg bg-transparent text-sm hover:bg-transparent/5 focus:outline-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-[12px] font-normal leading-[15.6px] text-sky-600">
                  Be specific and imagine you&apos;re asking a question to
                  another person.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full flex-col gap-2">
            <h3 className="paragraph-semibold">
              Detailed explanation of your problem?
            </h3>
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
              onInit={(evt, editor) => {
                // @ts-ignore
                editorRef.current = editor;
              }}
              initialValue="<p>Please enter the detailed explanation of your question.</p>"
              init={{
                height: 500,
                width: "100%",
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor  | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:16px; color: grey }",
              }}
            />
            <p className="small-regular text-sky-600">
              Introduce the problem and expand on what you put in the title.
              Minimum 20 characters.
            </p>
          </div>
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[16px] font-semibold leading-[20.8px]">
                  Tags
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Please insert tag names related to your question above."
                    className="rounded-lg bg-transparent text-sm hover:bg-transparent/5 focus:outline-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-[12px] font-normal leading-[15.6px] text-sky-600">
                  Add up to 5 tags to describe what your question is about.
                  Start typing to see suggestions.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="primary-gradient ml-auto block w-[200px] text-white"
          >
            Ask the question!
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AskQuestion;
