import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {from} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    currentLoading: HTMLIonLoadingElement = null;

    constructor(private loadingController: LoadingController) {
    }

    async present(message: string = null, duration: number = 0) {
        if (!this.currentLoading) {
            await this.create(message, duration);
            await this.currentLoading.present();
        }
    }

    dismiss() {
        if (this.currentLoading != null) {
            return from(this.currentLoading.dismiss());
        }
    }

    private async create(message: string = null, duration: number) {
        this.currentLoading = await this.loadingController.create({
            spinner: 'dots',
            translucent: true,
            message,
            duration
        });

        this.currentLoading.onDidDismiss().then(() => {
            this.currentLoading = null;
        });
    }
}
