<template>
  <li className="note">
    {{ note.content }}
    <button @click="toggleImportance">{{ label }}</button>
  </li>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api'
import { Note } from '@/types/Notes'

export default createComponent({
  name: 'NoteItem',
  props: {
    note: {
      type: Object as () => Note,
      required: true
    },
    toggleImportance: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const label = computed(() =>
      props.note.important ? 'make not important' : 'make important'
    )
    return {
      label
    }
  }
})
</script>
