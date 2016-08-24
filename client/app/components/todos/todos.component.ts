import {Component, OnInit} from "@angular/core";
import "rxjs/add/operator/map";
import {TodoService} from "../../services/todo.service";
import {Todo} from "../../models/Todo";

@Component({
    moduleId: module.id,
    selector: 'todos',
    templateUrl: 'todos.component.html'
})
export class TodosComponent implements OnInit {
    todos:Todo[];

    constructor(private _todoService:TodoService) {
    }

    ngOnInit() {
        this.todos = [];
        this._todoService.getTodos()
            .map(res => res.json())
            .subscribe(todos => this.todos = todos)
    }

    addTodo($event, todoText) {
        if ($event.which === 1) {
            let result;
            let newTodo = new Todo();
            newTodo.text = todoText.value;
            newTodo.completed = false;
            result = this._todoService.saveTodo(newTodo)
                .map(res => res.json());
            result.subscribe(data => {
                this.todos.push(newTodo);
                todoText.value = '';
            });
        }
    }

    deleteTodo(todo) {
        let todos = this.todos;
        this._todoService.deleteTodo(todo._id)
            .map(res => res.json())
            .subscribe(data => {
                if (data.n == 1) {
                    for (let i = 0; i < todos.length; i++) {
                        //noinspection TypeScriptUnresolvedVariable
                        if (todos[i]._id == todo._id) {
                            todos.splice(i, 1);
                            break;
                        }
                    }
                }
            });
    }

    updateTodoText($event, todo) {
        if ($event.which === 13) {
            todo.text = $event.target.value;
            let _todo = {
                _id: todo._id,
                text: todo.text,
                completed: !todo.completed
            };

            this._todoService.updateTodo(_todo)
                .map(res => res.json())
                .subscribe(data => {
                    this.setEditState(todo, false);
                });
        }
    }

    updateStatus(todo) {
        let _todo = {
            _id: todo._id,
            text: todo.text,
            completed: !todo.completed
        };

        this._todoService.updateTodo(_todo)
            .map(res => res.json())
            .subscribe(data => {
                todo.completed = !todo.completed;
            });
    }

    setEditState(todo, state) {
        if (state) {
            todo.isEditMode = state
        } else {
            delete todo.isEditMode;
        }
    }
}
