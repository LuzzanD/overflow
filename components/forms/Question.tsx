"use client";

import React, { useRef, useState } from "react";
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
import Tag from "../shared/Tag";
import { useTheme } from "@/context/ThemeProvider";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(10, {
    message: "Question must be at least 10 characters long.",
  }),
  text: z.string().min(50, {
    message: "Explanation of the question must be at least 50 characters.",
  }),
  tags: z
    .string()
    .array()
    .min(0)
    .max(5, { message: "Please add only up to 5 tags" }),
});

interface QuestionProps {
  id: string;
}

const Question = ({ id }: QuestionProps) => {
  const router = useRouter();
  const editorRef = useRef(null);
  const { mode } = useTheme();
  const [tagInput, setTagInput] = useState("");
  const [tagArray, setTagArray] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      text: "",
      tags: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createQuestion({
        author: JSON.parse(id),
        title: values.title,
        text: values.text,
        tags: tagArray,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (name: string) => {
    const newTagArray = tagArray.filter((tag) => tag !== name);
    setTagArray(newTagArray);
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === "Enter" && tagInput) {
      if (tagArray.length === 5) {
        alert("There should be max 5 tags related to a question.");
        setTagInput("");
      } else {
        setTagArray((prevValue) =>
          Array.from(
            new Set([...prevValue, ...tagInput.toLowerCase().split(" ")])
          )
        );
        setTagInput("");
      }
    }
  };

  const tagsArrayRender =
    tagArray.length > 0 &&
    tagArray.map((tag, index) => {
      return (
        <Tag key={index} name={tag} changeable handleTagClose={handleClose} />
      );
    });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[16px] font-semibold leading-[20.8px] dark:text-slate-100">
                Question title
                <span className="text-[14px] text-orange-600"> *</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Please insert the question title."
                  className="w-[90%] rounded-lg border-none bg-white text-sm hover:bg-slate-200 focus:outline-none dark:bg-dark-100 dark:text-slate-100 dark:hover:bg-dark-100/70"
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
              <FormLabel className="text-[16px] font-semibold leading-[20.8px] dark:text-slate-100">
                Detailed explanation of your problem?
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
                    const plainTextContent = new DOMParser().parseFromString(
                      content,
                      "text/html"
                    ).body.textContent;
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
                    height: 500,
                    width: "90%",
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
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor  | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,sans-serif; font-size:16px; color: grey;}",
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
          render={() => (
            <FormItem>
              <FormLabel className="text-[16px] font-semibold leading-[20.8px] dark:text-slate-100">
                Tags
                <span className="text-[14px] text-orange-600"> *</span>
              </FormLabel>
              <FormControl>
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Please insert tag names related to your question above."
                  className="w-[90%] rounded-lg border-none bg-white text-sm hover:bg-slate-200 focus:outline-none dark:bg-dark-100 dark:text-slate-100 dark:hover:bg-dark-100/70"
                  onKeyDown={(e) => handleEnterKey(e)}
                />
              </FormControl>

              <FormDescription className="text-[12px] font-normal leading-[15.6px] text-sky-600">
                Add up to 5 tags to describe what your question is about. Start
                typing to see suggestions.
              </FormDescription>
              <div className="flex gap-1">{tagsArrayRender}</div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="primary-gradient dark:secondary-gradient ml-auto block w-[200px] text-white"
        >
          Ask the question!
        </Button>
      </form>
    </Form>
  );
};

export default Question;
