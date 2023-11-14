"use client";

import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createQuestion } from "@/lib/actions/question.actions";

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

interface QuestionProps {
  id: string;
}

const Question = ({ id }: QuestionProps) => {
  const editorRef = useRef(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      text: "",
      tags: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createQuestion({
        author: JSON.parse(id),
        title: values.title,
        text: values.text,
        tags: values.tags,
        upvotes: [],
        downvotes: [],
        createdAt: new Date(),
      });
      console.log(values.tags, values.text, values.title);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
                Be specific and imagine you&apos;re asking a question to another
                person.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <div className="flex w-full flex-col gap-2"> */}
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px] font-semibold leading-[20.8px]">
                Detailed explanation of your problem?
              </FormLabel>
              <FormControl>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                  onInit={(evt, editor) => {
                    // @ts-ignore
                    editorRef.current = editor;
                  }}
                  initialValue="Please enter the detailed explanation of your question."
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
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
              </FormControl>
              <FormDescription className="text-[12px] font-normal leading-[15.6px] text-sky-600">
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* </div> */}
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
                Add up to 5 tags to describe what your question is about. Start
                typing to see suggestions.
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
  );
};

export default Question;