import { Note } from "@/store/note/types";
import axios, { setAuthorizationHeader } from "@/common/axios";
import { AxiosResponse } from "axios";
import { NotesQuery, NoteCreatePost, NotePutRequest } from "./api-types";

export const all = async (data: NotesQuery): Promise<Note[]> => {
  setAuthorizationHeader(axios);
  const result: AxiosResponse<{
    data: { notes: Note[] };
  }> = await axios.get("notes", { params: data });

  return result.data.data.notes;
};

export const find = async (data: number): Promise<Note> => {
  setAuthorizationHeader(axios);
  const result: AxiosResponse<{ data: { note: Note } }> = await axios.get(
    `notes/${data}`,
  );

  return result.data.data.note;
};

export const create = async (data: NoteCreatePost): Promise<Note> => {
  setAuthorizationHeader(axios);
  const result: AxiosResponse<{ data: { note: Note } }> = await axios.post(
    "notes",
    data,
  );

  return result.data.data.note;
};

export const update = async (data: Note): Promise<Note> => {
  const putRequest: NotePutRequest = {
    title: data.title,
    content: data.content,
  };

  setAuthorizationHeader(axios);
  const result: AxiosResponse<{ data: { note: Note } }> = await axios.put(
    `notes/${data.id}`,
    putRequest,
  );

  return result.data.data.note;
};

export const del = async (data: Note): Promise<Note> => {
  setAuthorizationHeader(axios);
  await axios.delete(`notes/${data.id}`);
  return data;
};
