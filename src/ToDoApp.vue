<template>
  <ToDoList/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ToDoList from './components/ToDoList.vue';

@Options({
  components: {
    ToDoList,
  },
})
export default class ToDoApp extends Vue { }
</script>