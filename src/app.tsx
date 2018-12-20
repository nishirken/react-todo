import * as React from 'react';
import './app.css';
import { TodoList } from './todo-list/todo-list';
import { todoStore } from './todo-store';

export class App extends React.PureComponent {
  public render() {
    return (
      <div className="app">
        <h2 className="app__title">TODO list</h2>
        <TodoList todoStore={todoStore} />
      </div>
    );
  }
}
