<script lang="ts">
import '@/assets/typescript.ts';
export default { }
</script>
<template>
	<form id="regist-form">
		<h3>ToDo 등록</h3>
		<div class="regist-div">
			<textarea id="todo-input" placeholder="내용을 입력해주세요." autofocus required></textarea>
			<input type="submit" id="regist-submit" value="등록">
		</div>
	</form>
	
	<h3>ToDo 목록</h3>
	<div id="todo-list" class="todo-list-div">
	</div>
	
	<br><button type="button" id="delete-button">삭제</button><span> 체크된 모든 todo 삭제(임시)</span>
</template>
<style>
@import '@/assets/style.css';
</style>