import * as Yup from "yup";

export interface NoteCreatePost {
  title: string;
  content: string;
}

export interface NotePutRequest {
  title: string;
  content: string;
}

export const NoteCreatePostValidation = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
});
