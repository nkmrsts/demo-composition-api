import { notes } from './notes'

export default {
  get() {
    return [200, notes]
  },

  post({ data }) {
    const newNote = {
      content: data.content,
      important: data.important === undefined ? false : data.important,
      date: new Date(),
      id: notes.length
    }
    notes.push(newNote)

    return [201, newNote]
  }
}
