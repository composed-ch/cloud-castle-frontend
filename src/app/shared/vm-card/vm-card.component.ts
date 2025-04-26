import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

import { VmService } from '../../core/services/vm.service';
import { Vm } from '../../core/models/vm.model';
import { mapVm } from '../../core/mappers/vm.mapper';

@Component({
  selector: 'app-vm-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './vm-card.component.html',
  styleUrls: ['./vm-card.component.css']
})
export class VmCardComponent {
  @Input() vm!: Vm;

  constructor(private vmService: VmService) { }

  start() {
    this.vmService.start(this.vm.id).subscribe(() => {
      this.sync();
    });
  }

  stop() {
    this.vmService.stop(this.vm.id).subscribe(() => {
      this.sync();
    });
  }

  sync() {
    this.vmService.sync(this.vm.id).subscribe((response) => {
      this.vm.state = response.state;
    });
  }
}