import { Component } from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import { FORM_DIRECTIVES } from '@angular/forms';
import {TodoService} from './services/todo.service'
import {TodosComponent} from './components/todos/todos.component';
import {NavbarComponent} from './components/navbar/navbar.component';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    directives: [NavbarComponent, TodosComponent, FORM_DIRECTIVES],
    providers: [HTTP_PROVIDERS, TodoService]
})
export class AppComponent { }
