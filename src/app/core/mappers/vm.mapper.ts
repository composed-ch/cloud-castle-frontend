import { Vm } from '../models/vm.model';
import { State } from '../models/state.enum';

function isState(value: any): value is State {
    return Object.values(State).includes(value);
}


export function mapVm(raw: any): Vm {
    return {
        id: raw.id,
        name: raw.name,
        labels: raw.labels,
        ip: raw.ip,
        state: isState(raw.state) ? raw.state : State.Error
    };
}

export function mapVms(rawArray: any[]): Vm[] {
    return rawArray.map(mapVm);
}