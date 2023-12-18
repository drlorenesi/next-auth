import { Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";

// This component works with:
// 'text', 'email', 'password', and 'date' types
export default function InputField({
  control,
  name,
  type,
  placeholder,
  message,
  ...rest
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          <Form.Control
            type={type}
            placeholder={placeholder}
            isInvalid={fieldState.error}
            {...field}
            {...rest}
          />
          <Form.Control.Feedback type="invalid">
            {fieldState.error?.message}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">{message}</Form.Text>
        </>
      )}
    />
  );
}
