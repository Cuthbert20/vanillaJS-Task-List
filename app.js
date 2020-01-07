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
  //Add task event
  form.addEventListener("submit", addTask);
  //Remove Task event
  taskList.addEventListener("click", removeTask);
}

//Add Task function
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a Task");
  }

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

  //Clear input
  taskInput.value = "";

  e.preventDefault();
}

//Remove Task function
function removeTask(e) {
  //   console.log(e.target);
  const delItem = document.querySelector(".delete-item");
  //because when we click the a tag it gives us the i tag we need to select the parent Element.
  //Try inspecting remove btn in browser to understand better
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you Sure?")) {
      //Materializecss toast similar to sweetAlert2 just not as cool
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
