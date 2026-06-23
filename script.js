let tasks = [];
let currentFilter = "all";

function addTask() {

const title = document.getElementById("taskTitle").value;
const course = document.getElementById("taskCourse").value;
const date = document.getElementById("taskDate").value;
const priority = document.getElementById("taskPriority").value;
const note = document.getElementById("taskNote").value;

if(title.trim() === ""){
    alert("Please enter a task title.");
    return;
}

const task = {
    id: Date.now(),
    title,
    course,
    date,
    priority,
    note,
    completed: false
};

tasks.push(task);

clearForm();

renderTasks();
}

function clearForm(){

document.getElementById("taskTitle").value = "";
document.getElementById("taskCourse").value = "";
document.getElementById("taskDate").value = "";
document.getElementById("taskPriority").value = "Medium";
document.getElementById("taskNote").value = "";
}

function renderTasks(){

const taskList = document.getElementById("taskList");

taskList.innerHTML = "";

let filteredTasks = tasks;

if(currentFilter === "pending"){
    filteredTasks = tasks.filter(task => !task.completed);
}

if(currentFilter === "completed"){
    filteredTasks = tasks.filter(task => task.completed);
}

filteredTasks.forEach(task => {

    const taskDiv = document.createElement("div");

    taskDiv.className =
        task.completed
        ? "task-item completed"
        : "task-item";

    taskDiv.innerHTML = `
        <h3>${task.title}</h3>

        <p><strong>Course:</strong> ${task.course}</p>

        <p><strong>Due Date:</strong> ${task.date}</p>

        <p><strong>Priority:</strong> ${task.priority}</p>

        <p>${task.note}</p>

        <div class="task-actions">

            <button
                class="complete-btn"
                onclick="toggleComplete(${task.id})">
                ${task.completed ? "Undo" : "Complete"}
            </button>

            <button
                class="delete-btn"
                onclick="deleteTask(${task.id})">
                Delete
            </button>

        </div>
    `;

    taskList.appendChild(taskDiv);

});

updateStats();
}

function toggleComplete(id){

tasks = tasks.map(task => {

    if(task.id === id){
        task.completed = !task.completed;
    }

    return task;
});

renderTasks();
}

function deleteTask(id){

tasks = tasks.filter(task => task.id !== id);

renderTasks();
}

function filterTasks(type){

currentFilter = type;

renderTasks();
}

function updateStats(){

const total = tasks.length;

const completed =
    tasks.filter(task => task.completed).length;

const pending = total - completed;

document.getElementById("totalTasks").textContent = total;

document.getElementById("completedTasks").textContent = completed;

document.getElementById("pendingTasks").textContent = pending;
}

renderTasks();
emailjs.init({
    publicKey: "AMprSX2soFZIK1Zrd",
});

const contactForm = document.getElementById("contactForm");

if(contactForm){

contactForm.addEventListener("submit", function(e){

e.preventDefault();
alert("Button Clicked");

emailjs.sendForm(
    "service_djde8hg",
    "template_z1z89qo",
    this
)
.then(function(response){

    console.log("SUCCESS!", response);
    alert("Success");

})
.catch(function(error){

    console.log("ERROR:", error);
    alert("Failed");

});    });
}
