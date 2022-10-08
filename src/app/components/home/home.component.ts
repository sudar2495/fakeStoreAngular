import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../configuration.service'
import { MatDialog } from '@angular/material/dialog';
import { DemoComponent } from '../demo/demo.component';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private ApiService: ConfigurationService, public dialog: MatDialog, private fb: FormBuilder) {

  }

  hobbiesList: Array<any> = [
    { name: 'Pear', value: 'pear' },
    { name: 'Plum', value: 'plum' },
    { name: 'Kiwi', value: 'kiwi' },
    { name: 'Apple', value: 'apple' },
    { name: 'Lime', value: 'lime' },
  ];

  dataList: any = [];

  profileForm = this.fb.group({
    firstName: this.fb.control('', [Validators.required, Validators.minLength(4)]),
    lastName: this.fb.control('', Validators.required),
    hobby: this.fb.array([], [Validators.required])
  });

  ngOnInit() {

    this.hobbiesList.forEach((e) => {
      this.hobbies.push(this.fb.control(false, [Validators.requiredTrue]))
    })

    console.log(this.hobbies.controls)

    // this.ApiService.getAllProducts().subscribe((response) => {
    //   console.log(response);
    //   this.dataList = response;
    // }, (error) => { })

  }

  get hobbies() {
    return this.profileForm.get('hobby') as FormArray;
  }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.profileForm.get('hobby') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submitForm = () => {
    console.log(this.profileForm, this.profileForm.valid)
  }

  openDialog() {
    const dialogRef = this.dialog.open(DemoComponent, {
      height: '300px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
