import * as yup from "yup";

const createRecipeSchema: yup.AnyObjectSchema = yup.object({
  body: yup.object({
    title: yup.string().required("title is required"),
    note: yup.string(),
    ingredients: yup.string().required("ingredients is required"),
    description: yup.string().required("description is required"),
  }),
});

const getRecipeSchema = yup.object({
  params: yup.object({
    id: yup.string().min(5).required("invalid request"),
  }),
});

const searchRecipeSchema = yup.object({
  query: yup.object({
    q: yup.string().required("invalid request"),
  }),
});

const joinSchema = yup.object({
    body: yup.object({
      email: yup.string().email().required("Email is required"),
      password: yup
        .string()
        .min(7, "password must be greater than 6")
        .required("Password is required"),
    }),
  });

const getUserRecipeSchema = yup.object({
    params: yup.object({
      userId: yup.string().min(5).required("invalid request"),
    }),
  });


  export {joinSchema,
    createRecipeSchema,
    getRecipeSchema,
    getUserRecipeSchema,
    searchRecipeSchema
  } ;