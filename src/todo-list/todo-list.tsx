import * as React from 'react';
import { defaultTodo, ITodo } from '../common';
import { TodoItem } from '../todo-item/todo-item';
import { api } from '../utils';
import './todo-list.css';

export interface IState {
  items: ITodo[];
}

export interface IProps {
  api: typeof api;
}

export class TodoList extends React.PureComponent<IProps, IState> {
  public state: IState = {
    items: [],
  };

  public async componentDidMount(): Promise<void> {
    const items = await this.props.api<ITodo[]>('/notes', 'GET');
    this.setState({ items });
  }

  public render() {
    return (
      <div className="todo-list">
        <header className="todo-list__header">
          <div className="todo-list__number">№</div>
          <button className="todo-list__add-button button" onClick={this.addItem}>Add</button>
        </header>
        <div className="todo-list__todos">
          {this.state.items.map(({ name, done }, i) => (
            <TodoItem
              deleteItem={this.deleteItem.bind(this, i)}
              changeName={this.changeName.bind(this, i)}
              changeDone={this.changeDone.bind(this, i)}
              key={i}
              name={name}
              index={i}
              done={done}
            />
          ))}
        </div>
      </div>
    );
  }

  private setNew(x: ITodo, index: number): void {
    this.setState(({ items }) => ({
      items: [...items.slice(0, index), x, ...items.slice(index + 1)],
    }));
  }

  private changeName = (index: number, newName: string): void => {
    const { items } = this.state;
    const newItem = { name: newName, id: items[index].id, done: items[index].done };
    this.props.api('/notes/' + items[index].id, 'PUT', { name: newName, done: items[index].done, });
    this.setNew(newItem, index);
  }

  private changeDone = (index: number, done: boolean): void => {
    const { items } = this.state;
    const newItem = { done, id: items[index].id, name: items[index].name };
    this.props.api('/notes/' + items[index].id, 'PUT', { name: items[index].name, done });
    this.setNew(newItem, index);
  }

  private addItem = async (): Promise<void> => {
    const res = await this.props.api<ITodo>('/notes', 'POST', { name: defaultTodo.name, done: false, });
    this.setState(prevState => ({ items: [...prevState.items, res] }));
  }

  private deleteItem = (index: number): void => {
    this.setState(prevState => ({ items: prevState.items.filter((_, i) => i !== index) }));
    this.props.api('/notes/' + this.state.items[index].id, 'DELETE');
  }
}
