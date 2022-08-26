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
export default class App extends Vue { }
</script>