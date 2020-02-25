import { notes } from './notes'

export default {
  put({ data }) {
    notes[data.id] = { ...data }

    return [204, notes[data.id]]
  }
}
