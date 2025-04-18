import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Vm } from '../../core/models/vm.model';

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

  start() {
    console.log(`Start ${this.vm.name}`);
  }

  stop() {
    console.log(`Stop ${this.vm.name}`);
  }

  sync() {
    console.log(`Sync ${this.vm.name}`);
  }
}