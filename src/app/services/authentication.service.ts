import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {Platform} from '@ionic/angular';
import {BehaviorSubject, throwError} from 'rxjs';
import * as firebase from 'firebase';
import {LoadingService} from './loading.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {ToastService} from './toast.service';
import UserCredential = firebase.auth.UserCredential;


@Injectable()
export class AuthenticationService {
    authState = new BehaviorSubject(false);
    private verficationID: string = null;

    constructor(
        private router: Router,
        private storage: Storage,
        private platform: Platform,
        private loadingService: LoadingService,
        private ngFireAuth: AngularFireAuth,
        private toastService: ToastService
    ) {
        this.platform.ready().then(() => {
            this.ifLoggedIn();
        });
    }

    ifLoggedIn() {
        this.storage.get('access_token').then((response) => {
            if (response) {
                this.authState.next(true);
            }
        });
    }

    login(token) {
        this.storage.set('access_token', token).then(() => {
            this.router.navigate(['dashboard']);
            this.authState.next(true);
        });
    }

    logout() {
        this.storage.remove('access_token').then(() => {
            this.router.navigate(['login']);
            this.authState.next(false);
        });
    }

    isAuthenticated() {
        return this.authState.value;
    }

    onSendOTP(phoneNumber: string, recaptchaVerifier: firebase.auth.RecaptchaVerifier) {
        this.loadingService.present('Sending Code').catch();
        this.ngFireAuth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
            .then((confirmationResult: firebase.auth.ConfirmationResult) => {
                this.verficationID = confirmationResult.verificationId;
                this.router.navigate(['verify']);
                this.loadingService.dismiss();
                this.toastService.present('SMS has been sent to your phone', 2500).catch();
            });
    }

    onVerifyOTP(confirmationCode: string) {
        if (this.verficationID) {
            this.loadingService.present('Verify Code').catch();
            const signInCredential = firebase.auth.PhoneAuthProvider.credential(this.verficationID, confirmationCode);
            this.ngFireAuth.signInWithCredential(signInCredential).then((success: UserCredential) => {
                this.loadingService.dismiss();
                this.router.navigate(['dashboard']);
                this.login(success.user.getIdToken());
                console.log('Firebase success: ' + success.user.getIdToken());
            }).catch((error) => {
                console.log('Firebase failure: ' + JSON.stringify(error));
            });
        } else {
            return throwError(new Error('missing verficationID'));
        }
    }
}
