import React from "react";
import { useForm } from "react-hook-form";

export default function BuiltInValidationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange", // Validates on every keystroke
  });

  const onSubmit = (data) => {
    console.log("Built-in Validated Data:", data);
  };

  return (
    <div style={{ padding: "16px", maxWidth: "400px" }}>
      <h2>React Hook Form (Built-in)</h2>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "4px" }}>Name (Required):</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.name && <p style={{ color: "red", margin: "4px 0 0" }}>{errors.name.message}</p>}
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "4px" }}>Nickname (Optional):</label>
          <input type="text" {...register("nickname")} style={{ width: "100%", padding: "8px" }} />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "4px" }}>Age (Optional number):</label>
          <input
            type="text"
            {...register("age", {
              valueAsNumber: true,
              validate: (value) =>
                value === undefined || !isNaN(value) || "Age must be a valid number",
            })}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.age && <p style={{ color: "red", margin: "4px 0 0" }}>{errors.age.message}</p>}
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "4px" }}>Email (Required):</label>
          <input
            type="text"
            {...register("email", { required: "Email is required" })}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.email && <p style={{ color: "red", margin: "4px 0 0" }}>{errors.email.message}</p>}
        </div>

        <button type="submit" style={{ padding: "8px", cursor: "pointer", marginTop: "8px" }}>
          Submit
        </button>
      </form>
    </div>
  );
}
