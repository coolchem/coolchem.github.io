$r.package("main").Class("TodoModel").extends("EventDispatcher")(function(){

    var items, localStorage,removeEditingState;

    var todoList = [];


    removeEditingState = function (item) {
        return {
            description: item.description,
            completed: item.completed
        };
    };

    this.init = function(){

        localStorage = window.localStorage;
        if(localStorage)
            items = JSON.parse(localStorage.getItem('todos-rama')) || [];

        todoList = new $r.ArrayList(items);
        todoList.addEventListener($r.CollectionEvent.COLLECTION_CHANGE,handleTodoListChange)
    }

    this.applyFilter = function(filterType){


    };

    this.get("todoList", function(){

        return todoList;
    });

    function handleTodoListChange(event){

        if(localStorage)
            localStorage.setItem('todos-rama', JSON.stringify(items.map(removeEditingState)));
    }


});