import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../_services/http.service';
import {DataService} from '../../_services/data.service';
import {ActionSheetController} from '@ionic/angular';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {AuthenticationService} from '../../_services/authentication.service';
import {CurrentUser, CustomResponse} from '../../_models/entities';
import {ToastService} from '../../_services/toast.service';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-dashboard-home',
    templateUrl: './dashboard-home.component.html',
    styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent implements OnInit {

    constructor(private httpService: HttpService,
                private dataService: DataService,
                private actionSheetController: ActionSheetController,
                private authenticationService: AuthenticationService,
                private toastService: ToastService,
                private iab: InAppBrowser) {
    }

    ngOnInit() {
        this.httpService.getCurrentCourse().subscribe(res =>  {
            console.log(res);
            this.checkResponseCourse(res);

            this.httpService.getGroup(this.dataService.course.id).subscribe(res => this.checkResponseGroup(res));
        });
    }

    checkResponseCourse(data: any) {

        const response: CustomResponse = new CustomResponse();

        Object.assign(response, data);

        switch (response.typ) {
            case 'hint':
                console.log(response.message)
                //this.toastService.presentHintToast(response.message);
                break;
            case 'data':
                console.log(response.data);
                this.dataService.course = JSON.parse(JSON.stringify(response.data[0]));
                break;
        }
    }

    checkResponseGroup(data: any) {

        const response: CustomResponse = new CustomResponse();

        Object.assign(response, data);

        switch (response.typ) {
            case 'hint':
                console.log(response.message)
                //this.toastService.presentHintToast(response.message);
                break;
            case 'data':
                console.log(response.data);
                this.dataService.group = JSON.parse(JSON.stringify(response.data[0]));
                break;
        }
    }

    onClickActionSheet() {
        this.presentActionSheet();
    }

    async presentActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            buttons: [{
                text: 'Settings',
                //icon: 'settings',
                handler: () => {
                    console.log('Settings clicked');
                }
            }, {
                text: 'Search People',
                //icon: 'contacts',
                handler: () => {
                    console.log('Search People clicked');
                }
            }, {
                text: 'Profile',
                //icon: 'contact',
                handler: () => {
                    this.openInAppBrowser('https://scharez.at')
                }
            }, {
                text: 'Family',
                //icon: 'people',
                handler: () => {
                    this.openInAppBrowser('https://scharez.at')
                }
            }, {
                text: 'Log out',
                //icon: 'log-out',
                role: 'destructive',
                handler: () => {
                    this.authenticationService.logout();
                }
            }, {
                text: 'Cancel',
                //icon: 'close',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }
            ]
        });
        await actionSheet.present();
    }

    openInAppBrowser(url: string) {
        const browser = this.iab.create(url, '_blank');
    }
}
