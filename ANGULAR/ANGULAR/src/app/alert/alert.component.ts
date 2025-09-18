import { Component, OnInit } from '@angular/core';
import { AlertService } from '../Shared/Service/alert.service';
//import { AlertService } from '@services/alert.service';

@Component({
    //moduleId: module.id.toString(),
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.scss']
})

export class AlertComponent {
    message: any;
    constructor(private alertService: AlertService) { }
    ngOnInit() {
       
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}
