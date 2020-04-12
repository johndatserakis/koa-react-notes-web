import * as Yup from "yup";

export interface NoteCreatePost {
  title: string;
  content: string;
}

export const NoteCreatePostValidation = Yup.object({
  title: Yup.string().required("Required"),
  content: Yup.string().required("Required"),
});

export interface NotesQuery {
  sort: string;
  order: "desc" | "asc";
  page: number;
  limit: number;
}
