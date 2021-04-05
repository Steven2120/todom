// =============================================================================

// Remember that our list is called `todos`, and it's in `todos.js`. It's not in this file, nor is it being `require`-d in, but it's available globally because its file is loaded in BEFORE this one in `index.html`.

// Write each function below its comment and you'll be doing pretty well.  The printTodo function has been declared for you so that we can drill down in the comments on its individual steps. Add the code for each part below its comment as well.

// Doing our code under its pre-written comment in this way will self-document your code and, more importantly, make it easier to follow along with the assignment!

// Remember that each function below is a helper function or an event listener function that runs when the user interacts with our page. So we should NOT be calling any functions or doing anything in the global scope. Just functions functions functions!
// (With one big exception, which you'll see in the comments when we get there.)

// And now: code away!

// =============================================================================
// A function that, given a todo object, adds an item to our todo list array.
function addTodo(item) {
  todos.push(item);
}

// A function that removes an item at a given index from our todo list array. You can use splice!
function removeTodo(item) {
  todos.splice();
}

// A function that takes in a todo object and displays it on the DOM. This is a pretty big function, so we'll walk through the different parts of it.

const printTodo = function (item) {
  // Use `document.createElement` to make an <li>.
  const newLi = document.createElement("li");

  // Set its text (preferably using `.innerText`) to be our given object's text field. Check out what a todo object looks like in `todos.js` if you need to!
  newLi.innerText = item.text;

  // Give our new li a `todo-item` class using `classList`. This will allow us to style it later if we want.
  newLi.classList.add("todo-item");

  // // Give our new li an id that is the object's id. This is so that we have a matching relationship between todo _html elements_ and their corresponding _array objects_. Now we'll be able to find the corresponding array object when they click to toggle the completeness on a DOM element.
  newLi.id = item.id;
  console.log(newLi);

  // Give the li a `complete` class if the todo object indicates it was complete already. (Again, check the `todos.js` to see what the objects look like!)
  if (item.complete) {
    newLi.classList.add("complete");
  }

  // Query the todo list <ol> and store it in a variable
  // Append the li we made to the ol as the last child using `.appendChild`. If this isn't working for you, check what is being appended to what!
  const todoOl = document.querySelector(".todo-list");
  todoOl.appendChild(newLi);
};

const todoOl = document.querySelectorAll(".todo-list");

// A function that prints ALL todos. It should loop through our todos array and call the above print-one-todo function on each one.
function print(item) {
  for (const item of todos) {
    printTodo(item);
  }
}

// Now here in the global code, call the above function, so our todos array gets printed out on page load (which is when global code is run). This is the only time we're calling a function ourselves; the rest is event listeners and helper functions that run when the user interacts with the DOM!
print();

// A function that clears all todos from the DOM. This is a great helper function for refreshing our todos.
function clear() {
  const olList = document.querySelector(".todo-list");
  olList.innerHTML = "";
}

// Test it in the console and see if your list disappears!;

// A function that refreshes our page by calling each of the two above functions. Since printing all todos onto the DOM is based on our todos array, if we make a change to our todos array, we can simply call this function, which will make our DOM match our todos array by simply clearing the page and repopulating it according to our todos' new state.
function refresh() {
  print();
  clear();
}

// Let's wire it all together. Add an event listener for the add todo button that will:
// 1. Queries the input box. We will need that node element again, so save it to a variable!
// 2. Create a todo object. Its text should be the text that was in the input box (you might have to research this!), its priority should be set to 2, and its completeness should be false, as we definitely haven't completed the todo yet.
// 3. Pass that object to your adding todos function to put it in our array.
// 4. Pass the object as well to your adding todos function to put it on the DOM.
const addButton = document.querySelector(".add-todo");

addButton.addEventListener("click", function () {
  const input = document.querySelector(".todo-input");
  let todoObj = {};
  todoObj.text = input.value;
  todoObj.priority = 2;
  todoObj.complete = false;
  //sets id of any todo item that's added to our list a new id that increments
  todoObj.id = todos.length;
  addTodo(todoObj);
  printTodo(todoObj);
  input.value = "";
});

const clearButton = document.querySelector(".clear-todo");
clearButton.addEventListener("click", () => {
  //allows to reset id count if we clear
  todos.splice(0, todos.length);
  clear();
});

//queries ol tag
const olList = document.querySelector(".todo-list");

//add event listener to ol tag and targets any li tag inside. sets conditional that if we click any li tag inside of our ol it will toggle between .complete class which has line-through styling.
olList.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("complete");
  }
});

// 5. Stretch goal: remove all text from the input box. Try adding multiple todos without this first, you'll see why we should do it!

//  Run over to the HTML and add a button for CLEAR TODOS or REMOVE TODOS or some such, giving it a class or id of your choice. Now let's wire up that button, giving it a click event listener that clears all todos from the DOM (we have a function for that!) and removes all todo objects from the todos array as well.
