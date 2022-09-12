<template>
  <form @submit.prevent="submit">
    <h3>ToDo 등록</h3>
    <div class="regist-div">
      <textarea id="todo-input" placeholder="내용을 입력해주세요." v-model="text" @keydown.enter="onSubmitKey" autofocus required></textarea>
      <button type="submit" id="regist-submit">등록</button>
    </div>
  </form>
</template>

<script lang="ts">

import { prop, Vue } from "vue-class-component";
import { ToDo } from "@/components/ToDo";
import { Watch } from "vue-property-decorator";

class Props {
  todoList = prop<Array<ToDo>>({ required: true });
  clickEvent = prop<MouseEvent>({ required: true });
  focusResetEvent = prop<InputEvent>({ required: true });
}

export default class ToDoInput extends Vue.with(Props) {
  text: string = '';
  currentFocusElement: HTMLTextAreaElement | undefined;

  submit() {
    if (this.currentFocusElement) {
      const todo: ToDo | undefined = this.todoList.find(todo => todo.id == this.currentFocusElement?.id);
      if (todo) {
        todo.text = this.text;
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
      }
    } else {
      const todo: ToDo = this.createToDo(this.generateUniqueId(), this.text, false);
      this.todoList.push(todo);
      localStorage.setItem("todoList", JSON.stringify(this.todoList));
      this.text = '';
    }
  }
  generateUniqueId() {
    return Date.now() + '' + Math.random();
  }
  createToDo(id: string, text: string, checked: boolean) {
    return { id, text, checked };
  }
  onSubmitKey(event: KeyboardEvent) {
    if (event.ctrlKey) {
      this.submit();
    }
  }
  @Watch("clickEvent")
  onTodoClick(event: MouseEvent) {
    const textarea : HTMLTextAreaElement = event.target as HTMLTextAreaElement;
    if (this.currentFocusElement == textarea) {
      this.currentFocusElement = undefined;
      this.text = "";
      textarea.style.border = "1px solid black";
    } else {
      if (this.currentFocusElement) {
        this.currentFocusElement.style.border = "1px solid black";
      }
      this.currentFocusElement = textarea;
      this.text = textarea.value;
      textarea.style.border = "2px solid red";
    }
  }
  @Watch("focusResetEvent")
  onFocusReset() {
    (this.currentFocusElement as HTMLTextAreaElement).style.border = "1px solid black";
    this.currentFocusElement = undefined;
    this.text = "";
  }
}
</script>

<style scoped>

</style>