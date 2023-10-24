import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
    providedIn: 'root'
})
export class ModalService  {

    constructor(private _snackBar: MatSnackBar) {}

    showModal(message: string, buttonText: string, buttonColour: string) {
        this._snackBar.open(message, 'ok', {
            duration: 2500,
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            panelClass: ['my-snackbar']
        });
    }
}
