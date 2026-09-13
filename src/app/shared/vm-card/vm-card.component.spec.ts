import { VmCardComponent } from './vm-card.component';
import { Vm } from '../../core/models/vm.model';
import { State } from '../../core/models/state.enum';

describe('VmCardComponent.getLabelsTooltip', () => {
  const component = new VmCardComponent(null as any);

  const baseVm: Vm = {
    id: 'vm-1',
    name: 'sv-01',
    ip: '10.0.0.1',
    state: State.Running,
    labels: { context: 'ict-101', group: 'class-a', owner: 'alice' }
  };

  it('includes all labels when none are missing', () => {
    expect(component.getLabelsTooltip(baseVm)).toBe('Context: ict‑101\nGroup: class‑a\nOwner: alice');
  });

  it('omits only the missing ones when some labels are missing', () => {
    const vm = { ...baseVm, labels: { owner: 'alice' } as Vm['labels'] };

    expect(() => component.getLabelsTooltip(vm)).not.toThrow();
    expect(component.getLabelsTooltip(vm)).toBe('Owner: alice');
  });

  it('returns an empty string, without throwing, when all labels are missing', () => {
    const vm = { ...baseVm, labels: {} as Vm['labels'] };

    expect(() => component.getLabelsTooltip(vm)).not.toThrow();
    expect(component.getLabelsTooltip(vm)).toBe('');
  });
});
