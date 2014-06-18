
var main = $r.package("main");

main.skins(
        {skinClass:'AppSkin', skinURL:"skins/appSkin.html"},
        {skinClass:'TodoListItemRendererSkin', skinURL:"skins/todoListItemRendererSkin.html"}
);

$r.Application('todoApp', function()
{
    this.init = function(){
        this.super.init();
        this.skinClass = "main.AppSkin";
        this.todosModel =  new main.TodoModel();
        this.todoController =  new main.TodoController(this, this.todosModel);
        if(this.todosModel.todoList.length > 0)
        {
            this.currentState = "hastodoitems";
        }
    }

    this.newTodoInput = null

    this.skinParts = [{id:'todo-form', required:true},
        {id:'new-todo', required:true},
        {id:'toggle-all', required:true},
        {id:'todo-list', required:true},
        {id:'todo-count', required:true},
        {id:'filterAll', required:true},
        {id:'filterActive', required:true},
        {id:'filterCompleted', required:true},
        {id:'clear-completed', required:true}];

    this.partAdded = function(partName, instance){
        this.super.partAdded(partName, instance);

        if(partName === "todo-form")
        {
            instance.addEventListener("submit", $r.bindFunction(handleNewTodoItemAdded, this))
        }

        if(partName === "new-todo")
        {
            this.newTodoInput = instance;
        }

        if(partName === "todo-list")
        {
            instance.dataProvider = this.todosModel.todoList;
        }
    }

    function handleNewTodoItemAdded(event){

        event.stopImmediatePropagation();
        event.preventDefault();

        this.todosModel.todoList.addItem(createTodoItem(this.newTodoInput[0].value))
        if(this.currentState === "")
        {
            this.currentState = "hastodoitems";
        }
    }

    function createTodoItem(description){
       return {
           description:description,
           completed:false
       }
    }

});

