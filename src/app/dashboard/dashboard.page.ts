import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {DataService} from '../services/data.service';
import {Storage} from '@ionic/storage';
import {Client} from '../model/client';
import {Step} from '../model/step';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
    allLoaded = false;
    items: Step[] = new Array<Step>();
    stepsDates = new Array();
    userData = {
        currentStep: 1,
        firstName: null,
        lastName: null,
        phoneNumber: null,
        creationTime: null,
        tenantID: null,
        email: null
    };
    selectedItem = null;

    constructor(private authService: AuthenticationService, private dataService: DataService, private storage: Storage) {
        this.storage.get('phoneNumber').then((phoneNumber) => {
            this.dataService.getClientData(phoneNumber).subscribe((data: Client) => {
                this.userData = data;
                this.stepsDates = data.steps.split(',');

                this.dataService.getStepsData(data.tenantID).subscribe((steps: Step[]) => {
                    this.items = steps;

                    if (this.userData !== null) {
                        this.selectedItem = this.items.find(obj => {
                            return obj.id === this.userData.currentStep;
                        });
                    }

                    if (this.selectedItem === undefined || this.selectedItem === null) {
                        this.selectedItem = {
                            id: 7,
                            subtitle: 'We are done!',
                            image: 'https://cdn.pixabay.com/photo/2019/11/07/20/24/check-list-4609829__340.png',
                            title: 'We are done!',
                            content: 'Congratulations! The process has completed'
                        };
                    }
                    this.allLoaded = true;
                });
            });
        });
    }

    ngOnInit() {
    }

    logoutUser() {
        this.authService.logout();
    }

    selectStep(item) {
        this.selectedItem = item;
    }

    getStatus(item) {
        console.log('this.userData.currentStep:', this.userData.currentStep);
        console.log('this.items.length', this.items.length);
        if (this.userData.currentStep > this.items.length || this.userData.currentStep > item.id) {
            return 'past';
        } else if (this.userData.currentStep < item.id) {
            return 'future';
        } else if (this.userData.currentStep === item.id) {
            return 'now';
        }
    }

    getStepTitle(step) {
        if (step === 1) {
            return 'Step One';
        }
        if (step === 2) {
            return 'Step Two';
        }
        if (step === 3) {
            return 'Step Three';
        }
        if (step === 4) {
            return 'Step Four';
        }
        if (step === 5) {
            return 'Step Five';
        }
        if (step === 6) {
            return 'Step Six';
        }
        if (step === 7) {
            return 'Step Seven';
        }
        if (step === 8) {
            return 'Step Eight';
        }
        if (step === 9) {
            return 'Step nine';
        }
    }

    doRefresh(event: any) {
        setTimeout(() => {
            event.target.complete();
        }, 1);

        this.storage.get('phoneNumber').then((phoneNumber) => {
            this.dataService.getClientData(phoneNumber).subscribe((data: Client) => {
                this.userData = data;
                this.stepsDates = data.steps.split(',');

                this.dataService.getStepsData(data.tenantID).subscribe((steps: Step[]) => {
                    this.items = steps;

                    if (this.userData !== null) {
                        this.selectedItem = this.items.find(obj => {
                            return obj.id === this.userData.currentStep;
                        });
                    }

                    if (this.selectedItem === undefined || this.selectedItem === null) {
                        this.selectedItem = {
                            id: 7,
                            subtitle: 'We are done!',
                            image: 'https://cdn.pixabay.com/photo/2019/11/07/20/24/check-list-4609829__340.png',
                            title: 'We are done!',
                            content: 'Congratulations! The process has completed'
                        };
                    }
                    this.allLoaded = true;
                });
            });
        });
    }
}
