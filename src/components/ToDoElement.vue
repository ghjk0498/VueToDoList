<template>
  <div v-for="todo in todoList" :key="todo.id">
    <input type="checkbox" :checked="todo.checked" @change="$emit('change', $event)">
    <textarea class="text" :id="todo.id" :value="todo.text" @click="$emit('click', $event)" readonly/>
  </div>
</template>

<script lang="ts">
import { Vue, prop, Options } from "vue-class-component";
import { ToDo } from '@/components/ToDo';

// https://stackoverflow.com/questions/66857734/vue3-class-component-access-props
// vue-class-component로 Props 접근하는 것이 제대로 동작하기는 하나 Vue.with를 검색해도 안나와서 이해가 안 됨.
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

</style>