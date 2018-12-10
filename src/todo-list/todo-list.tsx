import * as React from 'react';
import { defaultTodo, ITodo } from 'src/app.types';
import { TodoItem } from 'src/todo-item/todo-item';
import './todo-list.css';

interface IState {
  items: ITodo[];
}

export class TodoList extends React.PureComponent<{}, IState> {
  public state: IState = {
    items: [],
  };

  public render() {
    return (
      <div className="todo-list">
        <button className="todo-list__add-button" onClick={this.addItem}>Add +</button>
        {this.state.items.map(({ name, id }, i) => (
          <TodoItem
            deleteItem={this.deleteItem.bind(this, id)}
            key={i}
            name={name}
            index={i}
          />
        ))}
      </div>
    );
  }

  private addItem = (): void => {
    this.setState(prevState => ({ items: [...prevState.items, defaultTodo] }));
  }

  private deleteItem = (index: number): void => {
    this.setState(prevState => ({ items: prevState.items.filter((_, i) => i !== index) }));
  }
}
