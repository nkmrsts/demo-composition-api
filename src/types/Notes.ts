export interface Note {
  content: string
  date: string
  important: boolean
  id: string
}

export interface PostNoteParams {
  content: string
  important: boolean
}

export type PutNoteParams = Note

export type GetAllNotesResponse = Note[]
