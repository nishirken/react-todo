import * as React from 'react';
import './todo-item.css';

export interface IProps {
  name: string;
  index: number;
  deleteItem: () => void;
  editItem: (newName: string) => void;
}

export interface IState {
  isEditable: boolean;
  newName: string;
}

export class TodoItem extends React.PureComponent<IProps, IState> {
  public state: IState = {
    isEditable: false,
    newName: '',
  };

  public render() {
    const { name, index, deleteItem } = this.props;

    return (
      <div className="todo-item">
        <div className="todo-item__index">{index}</div>
        <div className="todo-item__content">
          {!this.state.isEditable ? (
            <React.Fragment>
              <div className="todo-item__name">{name}</div>
              <button className="todo-item__edit-button button" onClick={this.startEdit}>edit</button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <input
                className="todo-item__name-input"
                type="text"
                onChange={this.onInputChange}
                value={this.state.newName}
              />
              <button className="todo-item__save-button button" onClick={this.saveName}>save</button>
            </React.Fragment>
            )}
          </div>
        <button className="todo-item__delete-button button" onClick={deleteItem}>delete</button>
      </div>
    );
  }

  private onInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ newName: event.currentTarget.value, });
  }

  private startEdit = (): void => {
    this.setState({ isEditable: true, newName: this.props.name, });
  }

  private saveName = (): void => {
    this.props.editItem(this.state.newName);
    this.setState({ isEditable: false, newName: '', });
  }
}
