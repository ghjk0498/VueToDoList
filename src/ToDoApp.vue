<template>
  <form :id="formClass" @submit.prevent="submit">
    <h3>ToDo 등록</h3>
    <div class="regist-div">
      <textarea id="todo-input" placeholder="내용을 입력해주세요." v-model="text" @keydown.enter="submitKeyEvent" autofocus required></textarea>
      <button type="submit" id="regist-submit">등록</button>
    </div>
  </form>

  <h3>ToDo 목록</h3>
  <div id="todo-list" class="todo-list-div">
    <ToDo :todoList="todoList" />
  </div>

  <br><button type="button" id="delete-button">삭제</button><span> 체크된 모든 todo 삭제(임시)</span>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ToDo from './components/ToDo.vue';
// import '@/assets/typescript.ts';

@Options({
  components: {
    ToDo,
  },
})
export default class ToDoApp extends Vue {
  formClass = 'regist-form';

  text = '';
  todoList = [
    {id: "test", text: "test text", checked: false},
    {id: "test2", text: "test text2", checked: true}
  ];
  created() {
    console.log("a");
  }
  submit() {
    this.createToDo(this.generateUniqueId(), this.text, false);
  }
  generateUniqueId() {
    return Date.now() + '' + Math.random();
  }
  createToDo(id: string, text: string, checked: boolean) {
    console.log(id, text, checked);
  }
  submitKeyEvent(event: KeyboardEvent) {
    if (event.ctrlKey) {
      this.submit();
    }
  }
}
</script>
<style>
@import '@/assets/style.css';
</style>