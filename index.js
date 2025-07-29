
let todoInput = document.querySelector(".input");
let todoButton = document.querySelector(".button");
let todo;
let localData = JSON.parse(localStorage.getItem("todo"));
let todoList =localData || [];
let todoContainer = document.querySelector(".todos-container");



// todoButton.addEventListener("click",()=>{
//     console.log("Button is clicked!")
//     /*1.If we try to check this console.log then we notice that the page refreshes every time we click the button. It happens because this 
//     button is inside of the form tag and form has the default behaviour to refresh the page once submission happens. It avoid this defauly
//     behaviour we can capture the event which is refreshing and prevent it*/

// })

todoButton.addEventListener("click",(event)=>{
 event.preventDefault(); // 2.This line tells not to do the default action of form submission once this button is clicked.
  console.log("Button is clicked!")
  /* 3.Now what we want is whatever the input is written it should be shown on click of the button. So for that we created a variable todo which is kept as undefined
   and now instead of doing the console of clicked we will preint this input*/
   todo = todoInput.value;
   
   console.log(todo);
   /*4. What is happening is it is taking empty string also like on click of the button the counter is increasing without any input provided
 which shouldn't happen for that we can create a new var todoList, we will add the input in the todoList only if the length is > 0. Also 
 we need add a id to each input generated so that we can delete that particular element using the unique id. For that we will write a function
 to generate unique ids*/ 

 if(todo.length>0){
    //todoList.push({id:uuid(),todo:todo,isCompleted:false}) // These for the second param we can also write todo instead of todo:todo as the names of key and value is same.
     todoList.push({id:uuid(),todo,isCompleted:false}) // So the 1st param is ID, second is the input field and 3rd is if that task is completed or not. If not then false, if so then true.
     console.log(todoList)
     showTodo(todoList);
      //localStorage.setItem("todo",todoList); // If you do like this in the application of dev Tools you will get Object object as local Stores in terms of string.So for that:
      localStorage.setItem("todo",JSON.stringify(todoList));
     /*5. Now we don't want to console it but show it on the webpage. For that we have one todoContainer in index.html, we can target that so capture that div using doc.query and then add the input type checkBox, label and delete button to it.*/
     /* After writing the input the text doesn't disappear, to make it disappear there is below codeLine written.*/
     todoInput.value="";
    

 }

})

/* Function to generate random unique IDs*/
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { // This line means like a REGEX where it says all the global(g) x and y should be replaced with the random nos generated from the function.
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

todoContainer.addEventListener("click",(e)=>{
    //console.log("Clicked");
    let key = e.target.dataset.key;
    let deleteTodokey = e.target.dataset.todokey;
    //console.log(key)
    todoList= todoList.map(todo=>todo.id===key ? {...todo,isCompleted:!todo.isCompleted}:todo);
    todoList = todoList.filter(todo =>todo.id !== deleteTodokey);
    localStorage.setItem("todo",JSON.stringify(todoList));
    showTodo(todoList);
    
})


function showTodo(todoList){
    //todoContainer.innerHTML = todoList.map(todo =>`<div><input type="checkbox" id="item-${todo.id}"><label class="todo" for ="item-${todo.id}">${todo.todo}</label><button>Delete</button></div>`) 
    // In the above line once the checkbox is clicked it should know that its for the label, if the label is clicked then the checkbox
    //should be checked. Which means we need to establish the relation between the two for which we will use id and for.
    // We have added the for and id but we can see that todo is used at multiple places. To avoid using todo dot everywhere, we can just destructure
    //the object like instead of todoList.map(todo) we can destructure the todo object as 
    // todoList.map({id,todo,isCompleted}) so by doing this we can rewrite the above statement as:
    
    todoContainer.innerHTML = todoList.map(({id,todo,isCompleted})=>`<div class="relative"><input type="checkbox" ${isCompleted ? "checked" :""} data-key =${id} id="item-${id}"><label class="todo todo-text t-pointer ${isCompleted ? "checked-todo" :""}" data-key =${id} for ="item-${id}">${todo}</label><button class="absolute right-0 button cursor"><span class=" del-btn material-symbols-outlined" data-todokey=${id}>
delete</span></button></div>`);

}

