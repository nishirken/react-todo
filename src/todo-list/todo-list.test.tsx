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
    component = Enzyme.shallow<TodoList, {}, IState>(
      <TodoList api={jest.fn(() => Promise.resolve(testTodos))} />
    );
  });

  it('Выводит элементы списка дел', () => {
    expect(component.instance().props.api).toHaveBeenCalled();
    expect(component.find(TodoItem)).toHaveLength(testTodos.length);
  });

  it('Убирает из списка удаленный элемент', () => {
    const testIndex = 0;
    const hasTestName = (c: Enzyme.ShallowWrapper<ChildProps>) => c.props().name === testTodos[testIndex].name;

    component.find(TodoItem).at(testIndex).props().deleteItem();
    expect(component.find(TodoItem)).toHaveLength(testTodos.length - 1);
    expect(component.findWhere(hasTestName).exists()).toBeFalsy();
  });

  it('Дочерний компонент добавляет новый элемент в список',async () => {
    const testItem = { name: 'todo', done: false };
    const response = { ...testItem, id: 0, };
    component.setProps({ api: jest.fn(() => Promise.resolve(response)) });
    component.find('.todo-list__add-button').simulate('click');
    await expect(component.instance().props.api('', 'POST')).resolves.toEqual(response);
    expect(component.find(TodoItem)).toHaveLength(testTodos.length + 1);
    expect(component.find(TodoItem).last().props().name).toBe(defaultTodo.name);
  });

  const firstProps = () => component.find<ChildProps>(TodoItem).first().props();

  it('Обновляет имя в списке по changeName', () => {
    const newName = 'wash dishes';

    firstProps().changeName(newName);
    expect(firstProps().name).toBe(newName);
    expect(component.find(TodoItem)).toHaveLength(testTodos.length);
  });

  it('Обновляет done в списке по changeDone', () => {
    firstProps().changeDone(!testTodos[0].done);
    expect(firstProps().done).toBeTruthy();
    expect(component.find(TodoItem)).toHaveLength(testTodos.length);
  });
});
