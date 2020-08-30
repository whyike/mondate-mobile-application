import {Component, OnInit} from '@angular/core';
import {ToastService} from '../services/toast.service';
import {IonInput} from '@ionic/angular';
import {whichSubstitute} from '../shared/helper';
import {AuthenticationService} from '../services/authentication.service';

@Component({
    selector: 'app-verify',
    templateUrl: './verify.page.html',
    styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {
    pinCode: string[] = [];

    constructor(private toastService: ToastService, private authService: AuthenticationService) {
    }

    async moveFocus(event: KeyboardEvent, nextElement: IonInput | boolean, previousElement: IonInput | boolean) {
        const keyCode = whichSubstitute(event.key);
        if (keyCode === 8 && previousElement) {
            (previousElement as IonInput).setFocus().catch();
        } else if (nextElement && keyCode !== 8) {
            await (nextElement as IonInput).setFocus().catch();
        }

        if (keyCode === 13) {
            this.verifyOTP();
        }
    }

    verifyOTP() {
        if (this.pinCode.join('').length !== 6) {
            this.toastService.present('OTP Length Is 6 Digits - Try Again', 2500).catch();
            return;
        }
        this.authService.onVerifyOTP(this.pinCode.join(''));
    }

    ngOnInit(): void {
    }
}
