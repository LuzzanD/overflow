"use client";

import { Input } from "@/components/ui/input";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@/components/ui/button";

const AskQuestion = () => {
  const editorRef = useRef(null);
  return (
    <form className="flex w-full flex-col gap-12 px-12 py-16">
      <h1 className="h1-bold mb-2">Ask a public question</h1>
      <div className="flex flex-col gap-2 ">
        <h3 className="paragraph-semibold">Question title</h3>
        <Input className="rounded-lg bg-transparent hover:bg-transparent/5 focus:outline-none" />
        <p className="small-regular">
          Be specific and imagine you&apos;re asking a question to another
          person.
        </p>
      </div>
      <div className="flex flex-col gap-2 ">
        <h3 className="paragraph-semibold">
          Detailed explanation of your problem?
        </h3>
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
          onInit={(evt, editor) => {
            // @ts-ignore
            editorRef.current = editor;
          }}
          initialValue="<p>Please enter your question here.</p>"
          init={{
            height: 500,
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
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
          }}
        />
        <p className="small-regular">
          Introduce the problem and expand on what you put in the title. Minimum
          20 characters.
        </p>
      </div>
      <div className="flex flex-col gap-2 ">
        <h3 className="paragraph-semibold">Tags</h3>
        <Input className="rounded-lg bg-transparent hover:bg-transparent/5 focus:outline-none" />
        <p className="small-regular">
          Add up to 5 tags to describe what your question is about. Start typing
          to see suggestions.
        </p>
      </div>
      <Button variant="outline" type="submit">
        Ask the question!
      </Button>
    </form>
  );
};

export default AskQuestion;
