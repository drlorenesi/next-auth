"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import postSchema from "@/app/_lib/schemas/postSchema";
import toast from "react-hot-toast";

// Bootstrap Components
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

// Form Inputs
import InputField from "@/app/_components/formInputs/InputField";
import TextAreaField from "@/app/_components/formInputs/TextAreaField";

export default function NewPostForm() {
  const router = useRouter();

  // 1. Default values
  const defaultValues = {
    title: "",
    body: "",
  };

  // 2. useForm Hook
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(postSchema),
  });

  // 3. onSubmit function
  const onSubmit = async (data) => {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const responseData = await res.json();
    if (!res.ok) {
      toast.error("Server error...");
      console.log("Error:", responseData);
      return;
    }
    toast.success("Data submitted!");
    router.refresh();
    router.push("/posts");
  };

  return (
    <Form
      className="card bg-light p-3 mb-3 rounded-3 shadow-sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Ttile */}
      <Form.Group className="mb-2">
        <Form.Label>Title:</Form.Label>
        <InputField
          control={control}
          name="title"
          type="text"
          placeholder="Add title..."
        />
      </Form.Group>
      {/* Body */}
      <Form.Group className="mb-2">
        <Form.Label>Body:</Form.Label>
        <TextAreaField
          control={control}
          name="body"
          placeholder="What's on your mind?"
        />
      </Form.Group>
      {/* Submit */}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={isSubmitting || Object.keys(errors).length > 0}
      >
        {isSubmitting && (
          <span>
            <Spinner animation="border" size="sm" /> {"Submitting..."}
          </span>
        )}
        {!isSubmitting && "Submit"}
      </button>
    </Form>
  );
}
