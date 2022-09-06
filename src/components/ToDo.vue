<template>
  <div :class="todoClass" v-for="todo in todoList" :key="todo.id">
    <input type="checkbox" :checked="todo.checked" @change="$emit('change', $event)">
    <textarea :class="textClass" :id="todo.id" :value="todo.text" @click="$emit('click', $event)" readonly/>
  </div>
</template>

<script lang="ts">
import {Vue, prop, Options} from "vue-class-component";

// https://stackoverflow.com/questions/66857734/vue3-class-component-access-props
// vue-class-component로 Props 접근하는 것이 제대로 동작하기는 하나 Vue.with를 검색해도 안나와서 이해가 안 됨.
export class Props {
  todoList = prop<Array<Object>>({ required: true });
}
@Options({
  emits: ["click", "change"]
})
export default class ToDo extends Vue.with(Props) {
  todoClass: string = "todo";
  textClass: string = "text";
}
</script>

<style scoped>

</style>