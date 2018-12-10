export interface ITodo {
  id: number | null;
  name: string;
}

export const defaultTodo: ITodo = {
  id: null,
  name: '',
};
