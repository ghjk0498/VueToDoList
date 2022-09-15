<template>
  <div v-for="todo in todoList" :key="todo.id">
    <input type="checkbox" :checked="todo.checked" @change="$emit('change', $event)">
    <textarea class="text" :id="todo.id" :value="todo.text" @click="$emit('click', $event)" readonly/>
  </div>
</template>

<script lang="ts">
import { Vue, prop, Options } from "vue-class-component";
import { ToDo } from '@/components/ToDo';

class Props {
  todoList = prop<Array<ToDo>>({ required: true });
}
@Options({
  emits: ["click", "change"]
})
export default class ToDoElement extends Vue.with(Props) {
}
</script>

<style scoped>
div {
  display: flex;
  margin: 3px;
}

div > input[type=checkbox] {
  display: flex;
  border: 1px solid black;
  margin-right: 10px;
}

div > input[type=checkbox]:checked + textarea {
  text-decoration: line-through;
  opacity: 0.5;
}

div > textarea {
  display: inline-block;
  resize: none;
  border: 1px solid black;
  outline: none;
  width: 490px;
  height: 7.7vh;
}
</style>