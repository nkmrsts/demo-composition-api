<template>
  <div id="app">
    <h1>Notes</h1>

    <!-- <Notification message={errorMessage} /> -->
    <!--
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
    -->
    <ul class="note-list">
      <NoteItem
        v-for="(note, i) in state.notes"
        :key="i"
        :note="note"
        :toggleImportance="() => toggleImportanceOf(note.id)"
      />
    </ul>
    <form @submit.prevent="handleSubmit">
      <input v-model="state.newNote" />
      <button type="submit" :disabled="isDisabled">save</button>
    </form>

    <!-- <Footer /> -->
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import {
  createComponent,
  reactive,
  computed,
  onMounted
} from '@vue/composition-api'
import NoteItem from '@/components/NoteItem.vue'
import { Note } from '@/types/Note'

export default createComponent({
  components: {
    NoteItem
  },
  setup() {
    const state: {
      newNote: string
      notes: Note[]
    } = reactive({
      newNote: '',
      notes: []
    })

    const isDisabled = computed(() => !state.newNote.length)

    const handleSubmit = (event: Event) => {
      if (state.newNote) {
        const noteObject: Note = {
          content: state.newNote,
          date: new Date().toISOString(),
          important: false,
          id: state.notes.length + 1
        }
        state.notes.push(noteObject)
        state.newNote = ''
      }
    }
    const toggleImportanceOf = (id: number) => {
      const foundNoteIndex = state.notes.findIndex(note => note.id === id)
      if (foundNoteIndex > -1) {
        const foundNote = state.notes[foundNoteIndex]
        state.notes.splice(foundNoteIndex, 1, {
          ...foundNote,
          important: !foundNote.important
        })
      }
    }

    onMounted(() => {
      axios.get('http://localhost:3001/notes').then(response => {
        state.notes = [...state.notes, ...response.data]
      })
    })
    return {
      state,
      isDisabled,
      handleSubmit,
      toggleImportanceOf
    }
  }
})
</script>
<style scoped>
.note-list {
  list-style-type: none;
}
</style>
