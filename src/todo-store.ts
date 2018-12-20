import { observable } from 'mobx';
import { defaultTodo, ITodo } from 'src/common';
import { api } from 'src/utils';

export class TodoStore {
	@observable public todos: ITodo[] = [];
	@observable public requestState: 'request' | 'success' | 'error' | 'initial' = 'initial';
	@observable public errorMessage: string = '';

	public async loadTodos(): Promise<void> {
		try {
			this.errorMessage = '';
			this.requestState = 'request';
			this.todos = await api<ITodo[]>('/notes', 'GET');
			this.requestState = 'success';
		} catch (error) {
			this.requestState = 'error';
			this.errorMessage = error.toString();
		}
	}

	public addItem = async (): Promise<void> => {
		try {
			const res = await api<ITodo>('/notes', 'POST', { name: defaultTodo.name, done: false, });
			this.todos.push(res);
		} catch (error) {
			this.requestState = 'error';
			this.errorMessage = error.toString();
		}
	}

	public changeName(index: number, newName: string): void {
		const { done, id } = this.todos[index];
		const newItem = { name: newName, id, done };
		this.todos[index] = newItem;
		api('/notes/' + id, 'PUT', newItem);
	}

	public changeDone(index: number, newDone: boolean): void {
		const { name, id } = this.todos[index];
		const newItem = { done: newDone, id, name };
		api('/notes/' + id, 'PUT', newItem);
		this.todos[index] = newItem;
	}

	public deleteItem(index: number): void {
		api('/notes/' + this.todos[index].id, 'DELETE');
		this.todos = this.todos.filter((_, i) => i !== index);
	}
}

export const todoStore = new TodoStore();
