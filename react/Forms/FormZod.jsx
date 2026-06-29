import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function ZodValidationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Zod Validated Data:", data);
  };

  return (
    <div style={{ padding: "16px", maxWidth: "400px" }}>
      <h2>React Hook Form + Zod</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <input {...register("email")} placeholder="Email" style={{ width: "100%", padding: "8px" }} />
          {errors.email && <p style={{ color: "red", margin: "4px 0 0" }}>{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.password && <p style={{ color: "red", margin: "4px 0 0" }}>{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} style={{ padding: "8px", cursor: "pointer" }}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}