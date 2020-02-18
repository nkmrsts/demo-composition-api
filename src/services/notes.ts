import axios from 'axios'
import mock from '../../mocks/$mock'

import { PutNoteParams, PostNoteParams } from '@/types/Notes.ts'

if (process.env.NODE_ENV === 'develop') {
  mock() // axiosのモック有効化
}

const baseUrl = 'http://localhost:8080/api/notes'

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
