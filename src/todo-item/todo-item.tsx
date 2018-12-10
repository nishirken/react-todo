import * as React from 'react';
import './todo-item.css';

interface IProps {
  name: string;
  index: number;
  deleteItem: () => void;
}

export class TodoItem extends React.PureComponent<IProps> {
  public render() {
    const { name, index, deleteItem } = this.props;

    return (
      <div className="todo-item">
        <div className="todo-item__index">{index}</div>
        <div className="todo-item__name">{name}</div>
        <button className="todo-item__delete-button" onClick={deleteItem}>delete</button>
      </div>
    );
  }
}
