import { Component, OnInit } from '@angular/core';
import {AlertController, NavController, ToastController} from "@ionic/angular";
import {CardDetailsPage} from "../card-details/card-details.page";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-paymnet1',
  templateUrl: './paymnet1.page.html',
  styleUrls: ['./paymnet1.page.scss'],
})
export class Paymnet1Page implements OnInit {
  seats: Array<{'seatNo': Number, 'IsSeatChecked': boolean, 'seatName': String, 'seatMobile': any, 'seatNIC': String}>;
  journeyDetails: {
    'source': string,
    'destination': string,
    'arrivalTime': string,
    'departureTime': string,
    'amount': Number
  };

  passengerDetails: {
    'name': String,
    'phone': String,
    'nic': String,
    'email': String
  };

  showSeats: boolean;
  icon: String;
  IsArrowDown: boolean;
  styleObj: {'transition': String};
  IsAgreed: boolean;
  name: String;
  phone: any;
  nic: String;
  email: String;
  IsEmptyName: boolean;
  IsEmptyPhone: boolean;
  IsSeatChecked: boolean;
  seatName: String;
  seatMobile: String;
  seatNIC: String;
  checkedSeatNo: Number;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public toastCtrl: ToastController, private router: Router) {
    this.seats = [];
    this.showSeats = false;
    this.icon = 'arrow-dropdown';
    this.IsArrowDown = true;
    this.styleObj = {
      transition: '0.29s all linear'
    };
    this.IsAgreed = false;
    this.name = '';
    this.nic = '';
    this.email = '';
    this.IsEmptyName = false;
    this.IsEmptyPhone = false;
    this.IsSeatChecked = false;
    this.seatName = '';
    this.seatMobile = '';
    this.seatNIC = '';

    for (let i = 0; i < 3; i++) {
      this.seats.push({
        seatNo: i + 20,
        IsSeatChecked: false,
        seatName: '',
        seatMobile: '',
        seatNIC: ''
      });
    }

    this.journeyDetails = {
      source: 'Colombo',
      destination: 'Kandy',
      departureTime: '12:00 pm',
      arrivalTime: '15:00 pm',
      amount: 1000
    };
  }

  ngOnInit() {
  }

  changeIcon() {
    if (this.IsArrowDown) {
      this.IsArrowDown = false;
      this.icon = 'arrow-dropup';
    }
    else {
      this.IsArrowDown = true;
      this.icon = 'arrow-dropdown';
    }
  }

  agreeTermsandConditions() {
    this.IsAgreed = !this.IsAgreed;
  }

  async validateName() {
    if (this.name === '') {
      this.IsEmptyName = true;
      const toast = await this.toastCtrl.create({
        message: 'Please enter your name',
        duration: 3000,
        position: 'bottom',
        showCloseButton: true
      });

      await toast.present();
      return false;
    }
    else {
      this.IsEmptyName = false;
      return true;
    }
  }

  async validateMobile() {
    if (this.phone === undefined) {
      this.IsEmptyPhone = true;
      const toast = await this.toastCtrl.create({
        message: 'Please enter your phone number',
        duration: 3000,
        position: 'bottom',
        showCloseButton: true
      });

      await toast.present();
      return false;
    }
    else {
      this.IsEmptyPhone = false;
      return true;
    }

  }

  async validateNIC() {
    if (this.nic.length !== 10) {
      const toast = await this.toastCtrl.create({
        message: 'Your nic number should contain 10 characters',
        duration: 3000,
        position: 'bottom',
        showCloseButton: true
      });

      await toast.present();
      return false;
    }
    else {
      if (this.nic.charAt(this.nic.length - 1) !== 'V') {
        return false;
      }
      else {
        return true;
      }
    }
  }

  checkSubmit() {
    var IsValidName = this.validateName();
    var IsValidMobile = this.validateMobile();
    var IsValidNIC = this.validateNIC();

    if (IsValidName && IsValidMobile && IsValidNIC) {
      this.passengerDetails = {
        name: this.name,
        phone: this.phone,
        nic: this.nic,
        email: this.email
      };

      const parameterData = {
          journeyDetails: this.journeyDetails,
          passengerDetails: this.passengerDetails
      };

      let navigationExtras: NavigationExtras = {
          state: {
              data1: this.journeyDetails,
              data2: this.passengerDetails
          }
      };

      this.router.navigate(['card-details'], navigationExtras);
      // var ctrl = this.navCtrl.push(CardDetailsPage, {
      //   journeyDetails: this.journeyDetails,
      //   passengerDetails: this.passengerDetails
      // });

    }
  }

  checkSeat(seatNo) {

    this.seats.filter(value => {
      if (value.seatNo === seatNo) {
        value.IsSeatChecked = !value.IsSeatChecked;

        if (value.IsSeatChecked) {
          value.seatName = this.name;
          value.seatMobile = this.phone;
          value.seatNIC = this.nic;
        }
        else {
          value.IsSeatChecked = false;
          value.seatName = '';
          value.seatMobile = '';
          value.seatNIC = '';
        }

      }
      else {
        value.IsSeatChecked = false;
        value.seatName = '';
        value.seatMobile = '';
        value.seatNIC = '';
      }
    });

  }

  goToSeats() {
    this.router.navigate(['home']);
  }

}
