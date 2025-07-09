// Ambil elemen dari DOM
const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const filterBtn = document.getElementById("filter-btn");
const deleteAllBtn = document.getElementById("delete-all-btn");
const tableBody = document.getElementById("todo-table-body");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Tampilkan data di awal
renderTodos();

// Fungsi render todos
function renderTodos() {
  tableBody.innerHTML = "";

  if (todos.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="4" class="no-task">No task found</td></tr>`;
    return;
  }

  todos.forEach((todo, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${todo.text}</td>
      <td>${todo.date}</td>
      <td>${todo.done ? "Done" : "Pending"}</td>
      <td>
        <button class="btn edit" onclick="editTodo(${index})"><i class="fas fa-pen"></i></button>
        <button class="btn done" onclick="markDone(${index})"><i class="fas fa-check"></i></button>
        <button class="btn delete" onclick="deleteTodo(${index})"><i class="fas fa-trash"></i></button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// Tambah todo
addBtn.addEventListener("click", () => {
  const text = todoInput.value.trim();
  const date = dateInput.value;

  if (!text || !date) {
    alert("Please enter task and due date!");
    return;
  }

  todos.push({ text, date, done: false });
  saveTodos();
  renderTodos();
  todoInput.value = "";
  dateInput.value = "";
});

// Hapus 1 todo
function deleteTodo(index) {
  if (confirm("Delete this task?")) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
  }
}

// Tandai selesai
function markDone(index) {
  todos[index].done = !todos[index].done;
  saveTodos();
  renderTodos();
}

// Edit todo
function editTodo(index) {
  const newText = prompt("Edit task:", todos[index].text);
  if (newText !== null && newText.trim() !== "") {
    todos[index].text = newText.trim();
    saveTodos();
    renderTodos();
  }
}

// Hapus semua
deleteAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all tasks?")) {
    todos = [];
    saveTodos();
    renderTodos();
  }
});

// Simpan ke localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// (Bonus) Fitur filter (misalnya nanti bisa dibuat berdasarkan tanggal atau status)
filterBtn.addEventListener("click", () => {
  alert("Filter feature belum diimplementasikan 😅");
});
