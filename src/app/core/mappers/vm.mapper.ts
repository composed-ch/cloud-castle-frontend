import { Vm } from '../models/vm.model';
import { State } from '../models/state.enum';

export function mapVm(raw: any): Vm {
    return {
        id: raw.id,
        name: raw.name,
        labels: raw.labels,
        ip: raw.ip,
        state: raw.state in State ? raw.state as State : State.Error
    };
}

export function mapVms(rawArray: any[]): Vm[] {
    return rawArray.map(mapVm);
}