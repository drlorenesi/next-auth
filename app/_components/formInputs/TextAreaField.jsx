import { Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";

export default function TextAreaField({
  control,
  name,
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
            as="textarea"
            rows={3}
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
