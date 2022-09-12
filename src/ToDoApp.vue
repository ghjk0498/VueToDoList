<template>
  <ToDoInput :todoList="todoList" :clickEvent="clickEvent" :focusResetEvent="focusResetEvent"/>
  <ToDoList :todoList="todoList" @change="onTodoChange" @click="sendClickEvent"/>
  <br><button type="button" id="delete-button" @click="onDeleteClick">삭제</button><span> 체크된 모든 todo 삭제(임시)</span>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ToDoList from '@/components/ToDoList.vue';
import ToDoInput from '@/components/ToDoInput.vue';
import { ToDo } from '@/components/ToDo';

@Options({
  components: {
    ToDoList,
    ToDoInput
  }
})
export default class ToDoApp extends Vue {

  todoList: Array<ToDo> = [];
  clickEvent: MouseEvent | null = null;
  focusResetEvent: InputEvent | null = null;

  created() {
    let list: string | null = localStorage.getItem("todoList");
    if (list != null) {
      this.todoList = JSON.parse(list);
    }
  }

  sendClickEvent(event: MouseEvent) {
    const checkbox: HTMLInputElement = event.target as HTMLInputElement;
    if (!(checkbox.previousSibling as HTMLInputElement).checked) {
      this.clickEvent = event;
    }
  }

  onTodoChange(event: InputEvent) {
    const checkbox: HTMLInputElement = event.target as HTMLInputElement;
    const id: string = (checkbox.nextSibling as HTMLElement).id;
    const todo : ToDo | undefined = this.todoList.find(todo => todo.id == id);
    if (checkbox.checked) {
      this.focusResetEvent = event;
    }
    if (todo) {
      todo.checked = checkbox.checked;
      localStorage.setItem("todoList", JSON.stringify(this.todoList));
    }
  }

  // 테스트를 위해 localStorage에서 삭제하기 위해 사용
  onDeleteClick() {
    this.todoList = this.todoList.filter(todo => !todo.checked)
    localStorage.setItem("todoList", JSON.stringify(this.todoList));
  }

}
</script>
<style>
</style>