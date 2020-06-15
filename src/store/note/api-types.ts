import * as Yup from "yup";

export type NoteCreatePost = {
  title: string;
  content: string;
};

export type NoteEditPut = {
  title: string;
  content: string;
};

export const NoteCreatePostValidation = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
});
