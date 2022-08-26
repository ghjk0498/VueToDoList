let count: number = 0;
let currentFocusTodo: string;

class ToDo {
	id: string;
	value: string;
	checked: boolean;
	
	constructor(id: string, value: string, checked: boolean) {
		this.id = id;
		this.value = value;
		this.checked = checked;
	}
}

function test(n : number) {
	const date = new Date().getTime();
	for (let i = 0; i < n; i++) {
		console.log(i);
		regist();
	}
	console.log((new Date().getTime() - date) / 1000);
}

window.onload = function() {
	(<HTMLFormElement>document.getElementById("regist-form")).addEventListener('submit', handleSubmit);
	(<HTMLElement>document.getElementById("delete-button")).addEventListener('click', deleteTodo);

	let todoList: Array<ToDo> = JSON.parse(<string>localStorage.getItem("todoList"));

	if (todoList) {
		const todoListElem: HTMLElement = <HTMLElement>document.getElementById("todo-list");
		for (const todo of todoList) {
			todoListElem.append(<HTMLElement>createTodoElement(todo.value, todo.id, todo.checked)[0])
		}
		if (todoList.length != 0) {
			count = Number(todoList[0].id.split("-")[1]);
		}
	} else {
		todoList = [];
		localStorage.setItem("todoList", JSON.stringify(todoList));
	}
	
	(<HTMLTextAreaElement>document.getElementById("todo-input")).addEventListener("keydown", (e : KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			if (e.ctrlKey) {
				(<HTMLInputElement>document.getElementById("regist-submit")).click();
			} else {
				(<HTMLTextAreaElement>e.target).value += "\n";
			}
		}
	});
}

function handleSubmit(e: SubmitEvent) {
	e.preventDefault();
	regist();
	return false;
}

function regist() {
	const inputElem: HTMLInputElement = <HTMLInputElement>document.getElementById("todo-input");
	const todoList: Array<ToDo> = JSON.parse(<string>localStorage.getItem("todoList"));
	
	if (currentFocusTodo) {
		(<HTMLInputElement>document.getElementById(currentFocusTodo)).value = inputElem.value;
		
		for (const todo of todoList) {
			if (todo.id === currentFocusTodo) {
				todo.value = inputElem.value;
			}
		}
		localStorage.setItem("todoList", JSON.stringify(todoList));
	} else {
		const [todoDivElem, todoId]: [HTMLElement, string] = createTodoElement(inputElem.value);
		const todoListElem: HTMLElement = <HTMLElement>document.getElementById("todo-list");
		todoListElem.prepend(todoDivElem);

		const todo: ToDo = {
			"id" : todoId,
			"value" : inputElem.value,
			"checked" : false,
		}
		todoList.unshift(todo);
		localStorage.setItem("todoList", JSON.stringify(todoList));
		
		inputElem.value = "";
		inputElem.focus();
	}
}

function createTodoElement(input: string, id: string = "", checked: boolean = false): [HTMLElement, string] {
	const todoDivElem: HTMLElement = <HTMLElement>document.createElement("div");
	todoDivElem.setAttribute("class", "todo");
	
	const checkboxElem: HTMLInputElement = <HTMLInputElement>document.createElement("input");
	checkboxElem.setAttribute("type", "checkbox");
	checkboxElem.checked = checked;
	
	const textareaElem: HTMLTextAreaElement = <HTMLTextAreaElement>document.createElement("textarea");
	textareaElem.setAttribute("class", "text");
	textareaElem.readOnly = true;
	
	let textareaId: string;
	if (id != "") {
		textareaId = id;
	} else {
		count += 1;
		textareaId = "text-" + count;
	}
	textareaElem.setAttribute("id", textareaId);
	checkboxElem.setAttribute("onclick", "check(this, '" + textareaId + "')");
	
	textareaElem.addEventListener("click", onTodoClick);
	textareaElem.value = input;
	
	todoDivElem.append(checkboxElem);
	todoDivElem.append(textareaElem);
	
	return [todoDivElem, textareaId];
}

function onTodoClick(e: MouseEvent) {
	const inputElem: HTMLInputElement = <HTMLInputElement>document.getElementById("todo-input");
	const target: HTMLInputElement = <HTMLInputElement>e.target;
	
	if (currentFocusTodo === target.id) {
		currentFocusTodo = "";
		target.style.border = "1px solid black";
		inputElem.value = "";
	} else {
		if (currentFocusTodo) {
			(<HTMLInputElement>document.getElementById(currentFocusTodo)).style.border = "1px solid black";
		}
		currentFocusTodo = target.id;
		target.style.border = "2px solid red";
		inputElem.value = target.value;
	}
}

function check(elem: HTMLInputElement, id: string) {
	const todoList: Array<ToDo> = JSON.parse(<string>localStorage.getItem("todoList"));
	
	for (const todo of todoList) {
		if (id === todo.id) {
			todo.checked = elem.checked;
			break;
		}
	}
	localStorage.setItem("todoList", JSON.stringify(todoList));
}

function deleteTodo() {
	const todoListElem: HTMLElement = <HTMLElement>document.getElementById("todo-list");
	const removeList: Array<ChildNode> = [];
	for (const elem of todoListElem.childNodes) {
		if (elem.firstChild && (<HTMLInputElement>elem.firstChild).checked) {
			removeList.push(elem);
		}
	}
	while (removeList.length != 0) {
		(<ChildNode>removeList.pop()).remove();
	}

	const todoList: Array<object> = [];
	for (const elem of todoListElem.childNodes) {
		if (elem.lastChild) {
			todoList.push(new ToDo(
				(<HTMLElement>elem.lastChild).id,
				(<HTMLInputElement>elem.lastChild).value,
				(<HTMLInputElement>elem.firstChild).checked
			));
		}
	}
	localStorage.setItem("todoList", JSON.stringify(todoList));
}