export interface ToDoDetail {
  id: number;
  name: string;
  desc: string;
  isCompleted?: boolean;
}

export interface UpdateToDoDetail {
  name?: string;
  desc?: string;
  isCompleted?: boolean;
}

export interface NewToDoDetail {
  name?: string;
  desc?: string;
}
