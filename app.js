//Define UI Variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event Listeners
loadEventListeners();

//Creating load all event listeners function invoked above
function loadEventListeners() {
  //DOM Load event, ie added tasks that are stored to localStorage on to DOM
  document.addEventListener("DOMContentLoaded", getTasks);
  //Add task event
  form.addEventListener("submit", addTask);
  //Remove Task event
  taskList.addEventListener("click", removeTask);
  //Clear task event
  clearBtn.addEventListener("click", clearTasks);
  //Filter through Tasks event
  filter.addEventListener("keyup", filterTasks);
}

//Get Tasks stored on localStorage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(task => {
    //Create li element
    const li = document.createElement("li");
    //Add class to li
    li.className = "collection-item";
    //Create Text Node and append to li
    li.appendChild(document.createTextNode(task));
    //Create new link element
    const link = document.createElement("a");
    //Add class to a tag
    link.className = "delete-item secondary-content";
    //Add icon html element
    link.innerHTML = "<i class='fad fa-trash-alt fa-lg'></i>";
    //Append the link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
  });
}

//Add Task function
function addTask(e) {
  if (taskInput.value === "") {
    M.toast({
      html: "Add a Task",
      displayLength: 1000,
      inDuration: 500,
      outDuration: 750,
      classes: "rounded"
    });
  } else if (taskInput.value !== "") {
    //Create li element
    const li = document.createElement("li");
    //Add class to li
    li.className = "collection-item";
    //Create text node and appened to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link = document.createElement("a");
    //add class to link
    link.className = "delete-item secondary-content";
    //Add icon html
    link.innerHTML = "<i class='fad fa-trash-alt fa-lg'></i>";
    //Append the link to the li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    //Store in LocalStorage function invoked with task input value
    storeTaskInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value = "";
  }
  e.preventDefault();
}

//Store Task to local Storage Function
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove Task function
function removeTask(e) {
  //   console.log(e.target);

  //because when we click the a tag it gives us the i tag we need to select the parent Element.
  //Try inspecting remove btn in browser to understand better
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you Sure?")) {
      //Materializecss toast similar to sweetAlert2 just not quite as cool
      M.toast({
        html: "Task is Deleted",
        displayLength: 1500,
        inDuration: 500,
        outDuration: 750,
        classes: "rounded"
      });
      e.target.parentElement.parentElement.remove();
    }
  }
}

//Clear All Tasks
function clearTasks() {
  //Two ways to remove all tasks ie li's

  //First way, slower way
  //   taskList.innerHTML = "";

  //Second way, faster way, firstChild gives you the firstChild in the taskList so we are saying while there is a first child, do this...
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

//Filter Tasks Function
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  //to convert NodeList or HTML Collection use Array.from()
  document.querySelectorAll(".collection-item").forEach(task => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
