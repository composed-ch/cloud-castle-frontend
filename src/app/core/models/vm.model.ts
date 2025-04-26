import { State } from './state.enum';

export interface Vm {
  id: string;
  name: string;
  labels: {
    context: string;
    group: string;
    owner: string;
  };
  ip: string;
  state: State;
}