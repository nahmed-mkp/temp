import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';


@Injectable()
export class NotificationService {

    constructor(private snackBar: MatSnackBar) {}

    openNotification(message?: string, time = 5000) {
        this.snackBar.open(message, 'Close', {
            duration: time,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'network-notification'
        });
    } 

    openNotification_green(message?: string, time = 5000) {
        this.snackBar.open(message, 'Close', {
            duration: time,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: 'network-notification-green'
        });
    } 


    openNotificationCenter(message?: string, time = 5000) {
        this.snackBar.open(message, 'Close', {
            duration: time,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['network-notification', 'center-notification']
        });
    }

    openNotificationCenter_green(message?: string, time = 5000) {
        this.snackBar.open(message, 'Close', {
            duration: time,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['network-notification-green', 'center-notification']
        });
    } 

    openBottomNotification(message?: string, time = 5000) {
        this.snackBar.open(message, 'Close', {
            duration: time,
            panelClass: 'grouping-notif'
            // horizontalPosition: 'right',
            // verticalPosition: 'top',
            // panelClass: 'network-notification'
        })
    }
}