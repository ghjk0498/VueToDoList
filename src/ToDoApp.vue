<template>
  <form :id="formClass" @submit.prevent="submit">
    <h3>ToDo 등록</h3>
    <div class="regist-div">
      <textarea id="todo-input" placeholder="내용을 입력해주세요." v-model="text" @keydown.enter="onSubmitKey" autofocus required></textarea>
      <button type="submit" id="regist-submit">등록</button>
    </div>
  </form>

  <h3>ToDo 목록</h3>
  <div id="todo-list" class="todo-list-div">
    <ToDo :todoList="todoList" @change="onTodoChange" @click="onTodoClick"/>
  </div>

  <br><button type="button" id="delete-button" @click="onDeleteClick">삭제</button><span> 체크된 모든 todo 삭제(임시)</span>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ToDo from './components/ToDo.vue';

interface ToDoIf {
  id: string,
  text: string,
  checked: boolean
}

@Options({
  components: {
    ToDo,
  }
})
export default class ToDoApp extends Vue {
  formClass: string = 'regist-form';
  currentFocusElement: HTMLTextAreaElement | undefined;
  text: string = '';
  todoList: Array<ToDoIf> = [];
  created() {
    this.todoList = JSON.parse(localStorage.getItem("todoList") || "");
  }
  submit() {
    if (this.currentFocusElement) {
      const todo: ToDoIf | undefined = this.todoList.find(todo => todo.id == this.currentFocusElement?.id);
      if (todo) {
        todo.text = this.text;
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
      }
    } else {
      const todo: ToDoIf = this.createToDo(this.generateUniqueId(), this.text, false);
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
  onTodoChange(event: InputEvent) {
    const checkbox: HTMLInputElement = event.target as HTMLInputElement;
    const id: string = (checkbox.nextSibling as HTMLElement).id;
    const todo : ToDoIf | undefined = this.todoList.find(todo => todo.id == id);
    if (todo) {
      todo.checked = checkbox.checked;
      localStorage.setItem("todoList", JSON.stringify(this.todoList));
    }
  }
  onDeleteClick() {
    this.todoList = this.todoList.filter(todo => !todo.checked)
    localStorage.setItem("todoList", JSON.stringify(this.todoList));
  }
}
</script>
<style>
@import '@/assets/style.css';
</style>