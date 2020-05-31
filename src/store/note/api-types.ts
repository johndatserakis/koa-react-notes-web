import * as Yup from "yup";

export type NoteCreatePost = {
  readonly title: string;
  readonly content: string;
};

export type NotePutRequest = {
  readonly title: string;
  readonly content: string;
};

export const NoteCreatePostValidation = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
});
