import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";

@Injectable()
export class TodoService {
    constructor(public _http:Http) {

    }

    getTodos() {
        return this._http.get('/api/v1/todos');
    }

    saveTodo(todo) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/todos', JSON.stringify(todo), {headers: headers});
    }

    updateTodo(todo) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put('/api/v1/todos/' + todo._id, JSON.stringify(todo), {headers: headers});
    }

    deleteTodo(id) {
        return this._http.delete('/api/v1/todos/' + id);
    }
}
