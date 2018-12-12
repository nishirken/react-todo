import * as React from 'react';
import { defaultTodo, ITodo } from '../common';
import { TodoItem } from '../todo-item/todo-item';
import './todo-list.css';

export interface IState {
  items: ITodo[];
}

export class TodoList extends React.PureComponent<{}, IState> {
  public state: IState = {
    items: [],
  };

  public render() {
    return (
      <div className="todo-list">
        <header className="todo-list__header">
          <div className="todo-list__number">№</div>
          <button className="todo-list__add-button button" onClick={this.addItem}>Add</button>
        </header>
        <div className="todo-list__todos">
          {this.state.items.map(({ name, }, i) => (
            <TodoItem
              deleteItem={this.deleteItem.bind(this, i)}
              editItem={this.editItem.bind(this, i)}
              key={i}
              name={name}
              index={i}
            />
          ))}
        </div>
      </div>
    );
  }

  private editItem = (index: number, newName: string): void => {
    this.setState(({ items }) => {
      const newItem = { name: newName, id: items[index].id };
      return {
        items: [...items.slice(0, index), newItem, ...items.slice(index + 1)],
      };
    });
  }

  private addItem = (): void => {
    this.setState(prevState => ({ items: [...prevState.items, defaultTodo] }));
  }

  private deleteItem = (index: number): void => {
    this.setState(prevState => ({ items: prevState.items.filter((_, i) => i !== index) }));
  }
}
