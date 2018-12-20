import { observer } from 'mobx-react';
import * as React from 'react';
import { TodoItem } from 'src/todo-item/todo-item';
import { TodoStore } from '../todo-store';
import './todo-list.css';

export interface IProps {
  todoStore: TodoStore;
}

@observer
export class TodoList extends React.Component<IProps> {
  public async componentDidMount(): Promise<void> {
    this.props.todoStore.loadTodos();
  }

  public render() {
    const { todoStore } = this.props;

    return (
      <div className="todo-list">
        {todoStore.requestState === 'request' && 'Loading...'}
        {todoStore.requestState === 'success' && (
          <React.Fragment>
            <header className="todo-list__header">
              <div className="todo-list__number">№</div>
              <button className="todo-list__add-button button" onClick={todoStore.addItem}>Add</button>
            </header>
            <div className="todo-list__todos">
              {todoStore.todos.map(({ name, done }, i) => (
                <TodoItem
                  deleteItem={todoStore.deleteItem.bind(todoStore, i)}
                  changeName={todoStore.changeName.bind(todoStore, i)}
                  changeDone={todoStore.changeDone.bind(todoStore, i)}
                  key={i}
                  name={name}
                  index={i}
                  done={done}
                />
              ))}
            </div>
          </React.Fragment>
        )}
        {todoStore.requestState === 'error' && todoStore.errorMessage}
      </div>
    );
  }
}
