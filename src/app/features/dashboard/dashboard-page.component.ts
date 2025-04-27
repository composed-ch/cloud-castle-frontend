import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VmService } from '../../core/services/vm.service';
import { VmCardComponent } from '../../shared/vm-card/vm-card.component';
import { Vm } from '../../core/models/vm.model';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    VmCardComponent,
    MatSlideToggleModule
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  vms: Vm[] = [];

  constructor(private vmService: VmService) { }

  ngOnInit() {
    this.vmService.getVms().subscribe(data => {
      this.vms = data;
    });
  }

}