import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {COUNTRIES_CODE} from '../shared/countries-code';
import {CountryCodeInterface} from '../shared/interfaces/country-code.interface';
import {ToastService} from '../services/toast.service';
import * as firebase from 'firebase';
import {Storage} from '@ionic/storage';
import {DataService} from '../services/data.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public countriesCode = COUNTRIES_CODE;
    countrySelected: CountryCodeInterface;
    phoneNumber: number;
    name: string;
    allLoaded = false;

    constructor(private authService: AuthenticationService, private toastService: ToastService, private storage: Storage,
                private dataService: DataService) {
        this.countrySelected = this.countriesCode.filter((country) => country.name === 'Israel')[0];
    }


    sendOTP() {
        if (isNaN(this.phoneNumber) ||
            this.countrySelected.dial_code.length + this.phoneNumber.toString().length < 13 ||
            this.countrySelected.dial_code.length + this.phoneNumber.toString().length > 14) {
            this.toastService.present('Invalid Phone Number - Try Again', 2500).catch();
            return;
        }
        this.sendSMS();
    }

    sendSMS() {
        const phoneNumber = this.countrySelected.dial_code + this.phoneNumber;
        const recaptchaId = 'recaptcha-container';
        let recaptchaVerifier = (window as any).recaptchaVerifier;
        if (!recaptchaVerifier) {
            const recaptcha: HTMLDivElement = document.createElement('div');
            recaptcha.setAttribute('id', recaptchaId);
            recaptcha.style.display = 'none';
            document.body.append(recaptcha);
            (window as any).recaptchaVerifier = recaptchaVerifier = new firebase.auth.RecaptchaVerifier(recaptchaId, {
                size: 'invisible',
                callback: () => {
                    // reCAPTCHA solved - will proceed with submit function
                },
                'expired-callback': () => {
                    // Reset reCAPTCHA?
                }
            });
        }
        this.storage.set('phoneNumber', this.phoneNumber).then(() => {
        });
        this.authService.onSendOTP(phoneNumber, recaptchaVerifier);
    }

    countryCodeSelected(event: CustomEvent) {
        this.countrySelected = event.detail.value;
    }

    ngOnInit() {
        this.dataService.dataLoaded$.subscribe(loaded => this.allLoaded = loaded);
    }
}
