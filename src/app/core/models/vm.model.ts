import { State } from './state.enum';

export interface Vm {
  name: string;
  ip: string;
  state: State;
}