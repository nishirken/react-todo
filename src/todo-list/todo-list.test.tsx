import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { defaultTodo } from '../common';
import { IProps as ChildProps, TodoItem } from '../todo-item/todo-item';
import { IState, TodoList } from './todo-list';
import { testTodos } from './todo-list.fixtures';
 
Enzyme.configure({ adapter: new Adapter() });

describe('Todo list component', () => {
  let component: Enzyme.ShallowWrapper<{}, IState, TodoList>;

  beforeEach(() => {
    component = Enzyme.shallow<TodoList, {}, IState>(<TodoList />);
    component.setState({ items: testTodos, });
  });

  it('Выводит элементы списка дел', () => {
    expect(component.find(TodoItem)).toHaveLength(testTodos.length);
  });

  it('Убирает из списка удаленный элемент', () => {
    const testIndex = 0;
    const hasTestName = (c: Enzyme.ShallowWrapper<ChildProps>) => c.props().name === testTodos[testIndex].name;

    component.find(TodoItem).at(testIndex).props().deleteItem();
    expect(component.find(TodoItem)).toHaveLength(testTodos.length - 1);
    expect(component.findWhere(hasTestName).exists()).toBeFalsy();
  });

  it('Дочерний компонент добавляет новый элемент в список', () => {
    component.find('.todo-list__add-button').simulate('click');
    expect(component.find(TodoItem)).toHaveLength(testTodos.length + 1);
    expect(component.find(TodoItem).last().props().name).toBe(defaultTodo.name);
  });

  it('Обновляет имя в списке по editItem', () => {
    const newName = 'wash dishes'; 
    const firstProps = () => component.find<ChildProps>(TodoItem).first().props();
    firstProps().editItem(newName);
    expect(firstProps().name).toBe(newName);
    expect(component.find(TodoItem)).toHaveLength(testTodos.length);
  });
});
