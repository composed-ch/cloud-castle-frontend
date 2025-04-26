import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VmService } from '../../core/services/vm.service';
import { VmCardComponent } from '../../shared/vm-card/vm-card.component';
import { Vm } from '../../core/models/vm.model';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    VmCardComponent,
    MatSlideToggleModule
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  simulateRequest = true;
  vms: Vm[] = [];

  constructor(private vmService: VmService) { }

  ngOnInit() {
    this.loadVms();
  }

  loadVms() {
    this.vmService.getVms(this.simulateRequest).subscribe(data => {
      this.vms = data;
    });
  }

  toggleDataSource() {
    this.simulateRequest = !this.simulateRequest;
    this.loadVms();
  }
}