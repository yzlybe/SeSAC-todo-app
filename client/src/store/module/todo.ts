import { Todo, TodoState } from "../../types/interface";

const initialState: TodoState = {
  list: [],
};

const INIT = "todo/INIT" as const;
// let CREATE = "todo/CREATE"; // string
//+ let CREATE = "todo/CREATE" as const; // todo/CREATE >> 자체가 type이 되어서 얘만 올 수 있게 된다
const CREATE = "todo/CREATE" as const;
const DONE = "todo/DONE" as const;

let count = initialState.list.length;
initialState["nextID"] = count;

export const init = (data: Todo[]) => ({
  type: INIT,
  data, // object {id, text, done}
});
export const create = (payload: { id: number; text: string }) => ({
  type: CREATE,
  payload, // object {id, text}
});
export const done = (id: number) => ({
  type: DONE,
  id, // number
});

// interface Action {
//   type: string;
//   payload: { id: number; text: string }; //+ undefined가 들어올 수도 있기에 다른 처리도 해줘야함
//   id?: number;
// }

interface Init {
  type: typeof INIT;
  data: Todo[];
}

interface Create {
  type: typeof CREATE;
  payload: { id: number; text: string };
}
interface Done {
  type: typeof DONE;
  id: number;
}

type Action = Create | Done | Init;

export function todoReducer(state = initialState, action: Action) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        list: action.data,
        nextID:
          action.data.length === 0
            ? 1
            : action.data[action.data.length - 1].id + 1,
      };
    case CREATE:
      if (action.payload.text.trim() === "") return state;
      return {
        ...state,
        list: state.list.concat({
          id: action.payload.id,
          text: action.payload.text,
          done: false,
        }),
        nextID: action.payload.id + 1,
      };
    case DONE:
      return {
        ...state,
        list: state.list.map((li: any) => {
          if (li.id === action.id) {
            return {
              ...li,
              done: true,
            };
          } else {
            return li;
          }
        }),
      };
    default:
      return state;
  }
}
