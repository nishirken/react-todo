import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { IProps, IState, TodoItem } from './todo-item';

Enzyme.configure({ adapter: new Adapter() });

describe('Todo item component', () => {
  let component: Enzyme.ShallowWrapper<IProps, IState, TodoItem>;

  beforeEach(() => {
    component = Enzyme.shallow<TodoItem, IProps, IState>(
      <TodoItem
        name="call boss"
        index={0}
        deleteItem={jest.fn()}
        editItem={jest.fn()}
      />
    );
  });

  it('Выводит имя изначально', () => {
    expect(component.find('.todo-item__name').text()).toBe('call boss');
  });

  test('Имя редактируется', () => {
    const newName = 'call wife';

    component.find('.todo-item__edit-button').simulate('click');
    component.find('.todo-item__name-input').simulate('change', { currentTarget: { value: newName } });
    component.find('.todo-item__save-button').simulate('click');
    expect(component.instance().props.editItem).toHaveBeenCalledWith(newName);
  });

  it('Вызывает delete по клику на кнопку', () => {
    component.find('.todo-item__delete-button').simulate('click');
    expect(component.instance().props.deleteItem).toHaveBeenCalled();
  });
});
