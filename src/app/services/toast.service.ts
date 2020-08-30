import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    currentToast: HTMLIonToastElement = null;

    constructor(private toastController: ToastController) {
    }

    async present(message: string = '', duration: number = 0) {
        if (!this.currentToast) {
            await this.create(message, duration);
            return await this.currentToast.present();
        }
    }

    async dismiss() {
        if (this.currentToast != null) {
            await this.currentToast.dismiss();
        }
    }

    private async create(message: string = null, duration: number) {
        this.currentToast = await this.toastController.create({
            message,
            duration,
            cssClass: 'toastClass'
        });

        this.currentToast.onDidDismiss().then((e) => {
            this.currentToast = null;
        });
    }
}
