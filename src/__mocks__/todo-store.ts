import { TodoStore } from 'src/todo-store';

export const todoStore: TodoStore = {
	addItem: jest.fn(),
	changeDone: jest.fn(),
	changeName: jest.fn(),
	deleteItem: jest.fn(),
	errorMessage: '',
	loadTodos: jest.fn(() => Promise.resolve()),
	requestState: 'initial',
	todos: [],
};
