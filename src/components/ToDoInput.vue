<template>
  <form @submit.prevent="submit">
    <h3>ToDo 등록</h3>
    <div class="register-todo">
      <textarea id="todo-input" placeholder="내용을 입력해주세요." v-model="text" @keydown.enter="onSubmitKey" autofocus required></textarea>
      <button type="submit">등록</button>
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

  /**
   * 현재 선택된 ToDoElement 가 있을 경우 : ToDo 수정
   * 현재 선택된 ToDoElement 가 없는 경우 : ToDo 등록
   */
  submit() {
    if (this.currentFocusElement) {
      const todo: ToDo | undefined = this.todoList.find(todo => todo.id == this.currentFocusElement?.id);
      if (todo) {
        todo.text = this.text;
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
      }
    } else {
      const todo: ToDo = this.createToDo(this.generateUniqueId(), this.text, false);
      this.todoList.unshift(todo);
      localStorage.setItem("todoList", JSON.stringify(this.todoList));
      this.text = '';
    }
  }

  /**
   * ToDoElement 를 구분하기 위해 Unique 한 값을 생성
   */
  generateUniqueId() {
    return Date.now() + '' + Math.random();
  }

  /**
   * ToDo 객체 생성
   * @param id
   * @param text
   * @param checked
   */
  createToDo(id: string, text: string, checked: boolean) {
    return { id, text, checked };
  }

  /**
   * Enter 입력하는 경우        : 개행
   * Ctrl + Enter 입력하는 경우 : submit() 호출 -> ToDo 등록
   * @param event
   */
  onSubmitKey(event: KeyboardEvent) {
    if (event.ctrlKey) {
      this.submit();
    }
  }

  /**
   * 현재 선택된 ToDoElement 인 경우 : 선택 해제
   * 선택되지 않은 ToDoElement 인 경우 : 선택
   * @param event
   */
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

  /**
   * 선택 해제(선택된 ToDoElement 가 checked 되는 경우)
   * @param event
   */
  @Watch("focusResetEvent")
  onFocusReset(event: InputEvent) {
    const checkbox: HTMLInputElement = event.target as HTMLInputElement;
    if (this.currentFocusElement && this.currentFocusElement.id === (checkbox.nextSibling as HTMLElement).id) {
      (this.currentFocusElement as HTMLTextAreaElement).style.border = "1px solid black";
      this.currentFocusElement = undefined;
      this.text = "";
    }
  }
}
</script>

<style scoped>
.register-todo {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e2e2e2;
  border: 1px solid black;
  width: 500px;
  height: 14vh;
  padding: 5px;
}

.register-todo > textarea {
  width: 430px;
  height: 12vh;
  resize: none;
  margin-right: 10px;
}

.register-todo > input[type=submit] {
  font-size: 1em;
}
</style>