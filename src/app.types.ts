export interface ITodo {
  id: number | null;
  name: string;
  done: boolean;
}

export const defaultTodo: ITodo = {
  done: false,
  id: null,
  name: '',
};
