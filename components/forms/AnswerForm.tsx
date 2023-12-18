"use client";

import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTheme } from "@/context/ThemeProvider";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createAnswer } from "@/lib/actions/answer.actions";
import router from "next/router";

const formSchema = z.object({
  text: z.string().min(50, {
    message: "Explanation of the question must be at least 50 characters.",
  }),
});

interface AnswerProps {
  userId: string;
  questionId: string;
}

const AnswerForm = ({ userId, questionId }: AnswerProps) => {
  const { mode } = useTheme();
  const editorRef = useRef(null);
  const [editorOpen, setEditorOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createAnswer({
        author: userId,
        questionId,
        text: values.text,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
    setEditorOpen(false);
  };

  const handleEditorOpen = () => {
    setEditorOpen((prevValue) => !prevValue);
  };

  return (
    <div>
      <div className="flex items-center gap-8">
        <div className="h-[1px] flex-1 bg-slate-300"></div>
        <Button
          className="ml-auto block w-[200px] border-[1px] border-slate-400  bg-transparent text-slate-800 dark:border-slate-100 dark:text-slate-200"
          onClick={handleEditorOpen}
        >
          {editorOpen ? "Close the editor." : "Open the editor."}
        </Button>
      </div>
      {editorOpen && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px] font-semibold leading-[20.8px] dark:text-slate-100">
                    Write your answer here.
                    <span className="text-[14px] text-orange-600"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Editor
                      apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                      onInit={(evt, editor) => {
                        // @ts-ignore
                        editorRef.current = editor;
                      }}
                      onBlur={field.onBlur}
                      onEditorChange={(content) => {
                        const plainTextContent =
                          new DOMParser().parseFromString(content, "text/html")
                            .body.textContent;
                        field.onChange(plainTextContent);
                      }}
                      init={{
                        skin:
                          typeof window !== "undefined" &&
                          (window.matchMedia("(prefers-color-scheme: dark)")
                            .matches ||
                            mode === "dark")
                            ? "oxide-dark"
                            : "oxide",
                        content_css:
                          typeof window !== "undefined" &&
                          (window.matchMedia("(prefers-color-scheme: dark)")
                            .matches ||
                            mode === "dark")
                            ? "dark"
                            : "default",
                        height: 300,
                        width: "100%",
                        menubar: false,
                        placeholder:
                          "Please enter the detailed explanation of your question.",
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
                          "codesample",
                        ],
                        toolbar:
                          "undo redo | blocks " +
                          " codesample  " +
                          "bold italic forecolor  | bullist numlist outdent indent | " +
                          "removeformat | help",
                        content_style:
                          "body { font-family:Inter,sans-serif; font-size:16px; color: grey;}",
                      }}
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
              Submit the answer.
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default AnswerForm;
