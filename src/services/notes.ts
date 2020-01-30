import axios from 'axios'
import { PutNoteParams, PostNoteParams } from '@/types/Notes.ts'

const baseUrl = 'http://localhost:3001/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject: PostNoteParams) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id: string, newObject: PutNoteParams) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update }
