import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ConfigurationService } from '../../configuration.service';
import { forkJoin, delay, Observable, catchError, of, timer, zip, from, interval } from 'rxjs';
import { concatMap, map } from 'rxjs/operators'
export interface List {
  name: string;
  value: string;
  checked: boolean;
  completed: boolean;
  loader: boolean;
  status: string;
}

let operationList: List[] = [
  {
    name: 'nameplate',
    value: 'Name Plate',
    checked: true,
    completed: false,
    loader: false,
    status: ''
  },
  {
    name: 'quickentry',
    value: 'Quick Entry',
    checked: true,
    completed: false,
    loader: false,
    status: ''
  },
  {
    name: 'shopnotes',
    value: 'Shop Notes',
    checked: true,
    completed: false,
    loader: false,
    status: ''
  },
];

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  angForm!: FormGroup;
  @ViewChild('stepper') stepper!: MatStepper;
  constructor(private ApiService: ConfigurationService) {
    this.createForm();
  }

  checkboxLists: any;
  finalList: any;
  resetStarted: boolean = false;
  closeDialog: boolean = false;

  ngOnInit(): void {
    this.checkboxLists = JSON.parse(JSON.stringify(operationList));
  }

  createForm() {
    const formGroups: any[] = [];
    operationList.forEach((e) => {
      if (e.checked) {
        formGroups.push(new FormControl(e.value))
      }
    })
    this.angForm = new FormGroup({
      'processCheckbox': new FormArray(formGroups)
    });
  }

  valueChange(e: any) {
    const formArray: FormArray = this.angForm.get('processCheckbox') as FormArray;
    if (e.checked) {
      formArray.push(new FormControl(e.source.value));
    }
    else {
      let i: number = 0;
      formArray.controls.forEach((ctrl: any) => {
        if (ctrl.value == e.source.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  previousStep($event: any) {
    this.stepper.previous();
  }

  nextStep($event: any) {
    if (this.angForm.get('processCheckbox')?.value.length > 0) {
      this.finalList = JSON.parse(JSON.stringify(this.checkboxLists.filter((e: any) => e.checked == true)))
      this.stepper.next();
    }
  }

  startReset($event: any) {
    if (this.angForm.get('processCheckbox')?.value.length > 0) {
      this.resetStarted = true;
      this.resetNamePlateService(this.checkboxLists);
    }
  }


  resetNamePlateService(list: any) {
    let temp = list.findIndex((e: any) => e.checked && e.name == 'nameplate')
    if (temp >= 0) {
      list[temp].loader = true;
      this.ApiService.resetNamePlate().subscribe({
        error: () => {
          list[temp].status = 'FAIL';
          list[temp].completed = true;
          list[temp].loader = false;
          this.resetQuickEntryService(list);
        },
        next: (res) => {
          list[temp].status = 'SUCCESS';
          list[temp].completed = true;
          list[temp].loader = false;
          this.resetQuickEntryService(list);
        },
      })
    } else {
      this.resetQuickEntryService(list);
    }
  }

  resetQuickEntryService(list: any) {
    let temp = list.findIndex((e: any) => e.checked && e.name == 'quickentry')
    if (temp >= 0) {
      list[temp].loader = true;
      this.ApiService.resetQuickEntry().subscribe({
        error: () => {
          list[temp].status = 'FAIL';
          list[temp].completed = true;
          list[temp].loader = false;
          this.resetShopNotesService(list);
        },
        next: (res) => {
          list[temp].status = 'SUCCESS';
          list[temp].completed = true;
          list[temp].loader = false;
          this.resetShopNotesService(list);
        },
      })
    } else {
      this.resetShopNotesService(list);
    }
  }

  resetShopNotesService(list: any) {
    let temp = list.findIndex((e: any) => e.checked && e.name == 'shopnotes')
    if (temp >= 0) {
      list[temp].loader = true;
      this.ApiService.resetShopNotes().subscribe({
        error: () => {
          list[temp].status = 'FAIL';
          list[temp].completed = true;
          list[temp].loader = false;
          this.closeDialog = true
        },
        next: (res) => {
          list[temp].status = 'SUCCESS';
          list[temp].completed = true;
          list[temp].loader = false;
          this.closeDialog = true
        },
      })
    } else {
      this.closeDialog = true
    }
  }


}
