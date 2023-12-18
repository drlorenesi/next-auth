import * as yup from "yup";

export default yup.object({
  title: yup
    .string()
    .min(2, "Title must be at least 2 characters")
    .trim()
    .required(),
  body: yup
    .string()
    .min(4, "Body must be at least 4 characters")
    .trim()
    .required(),
});
