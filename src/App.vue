<template>
  <div id="app">
    <h1>Notes</h1>

    <!-- <Notification message={errorMessage} /> -->
    <div>
      <button @click="toggleShowAll">show {{ state.showAll ? 'important' : 'all' }}</button>
    </div>

    <ul class="note-list">
      <NoteItem
        v-for="(note, i) in notesToShow"
        :key="i"
        :note="note"
        :toggleImportance="() => toggleImportanceOf(note.id)"
      />
    </ul>
    <form @submit.prevent="handleSubmit">
      <input v-model="state.newNote" />
      <button type="submit" :disabled="isDisabled">save</button>
    </form>
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
import { GetAllNotesResponse } from '@/types/Notes'
import noteService from '@/services/notes'

export default createComponent({
  components: {
    NoteItem
  },
  setup() {
    const state = reactive<{
      newNote: string
      notes: GetAllNotesResponse
      showAll: boolean
    }>({
      newNote: '',
      notes: [],
      showAll: true
    })

    const isDisabled = computed(() => !state.newNote.length)

    const notesToShow = computed(() =>
      state.showAll ? state.notes : state.notes.filter(note => note.important)
    )

    const handleSubmit = () => {
      if (state.newNote) {
        const noteObject = {
          content: state.newNote,
          important: false
        }
        noteService.create(noteObject).then(data => {
          state.notes = state.notes.concat(data)
          state.newNote = ''
        })
      }
    }

    const toggleImportanceOf = (id: string) => {
      const foundNote = state.notes.find(note => note.id === id)

      if (foundNote !== undefined) {
        const changedNote = { ...foundNote, important: !foundNote.important }
        noteService.update(id, changedNote).then(returnedNote => {
          state.notes = state.notes.map(note =>
            note.id !== id ? note : returnedNote
          )
        })
      }
    }

    const toggleShowAll = () => {
      state.showAll = !state.showAll
    }

    onMounted(() => {
      noteService.getAll().then(initialNotes => {
        state.notes = initialNotes
      })
    })
    return {
      state,
      isDisabled,
      notesToShow,
      handleSubmit,
      toggleImportanceOf,
      toggleShowAll
    }
  }
})
</script>
<style scoped>
.note-list {
  list-style-type: none;
}
</style>
