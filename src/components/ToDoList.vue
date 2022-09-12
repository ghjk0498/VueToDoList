<template>
  <h3>ToDo 목록</h3>
  <div id="todo-list" class="todo-list-div">
    <ToDoElement :todoList="todoList" @change="$emit('change', $event)" @click="$emit('click', $event)"/>
  </div>
</template>

<script lang="ts">
import {Options, prop, Vue} from "vue-class-component";
import ToDoElement from "@/components/ToDoElement.vue";
import {ToDo} from "@/components/ToDo";

class Props {
  todoList = prop<Array<ToDo>>({ required: true });
}

@Options({
  emits: ["click", "change"],
  components: {
    ToDoElement,
  }
})
export default class ToDoList extends Vue.with(Props) {
}
</script>

<style scoped>

</style>