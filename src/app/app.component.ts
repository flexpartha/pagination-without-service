import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

const apiUrl ="https://jsonplaceholder.typicode.com/posts?userId=";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  selectedTopings = ['Mushroom', 'Onion'];
  toppingList = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  toppings = new FormControl();
  dropdownList:any[] = [];
  selectedItems:any[]=[];
  dropdownSettings:IDropdownSettings={};
  dropDownForm:FormGroup = new FormGroup({
    myItems: new FormControl('')
  });
  title = 'pagination-without-service';

  loadData1:any;
  number:any = 1;
  constructor(private httpSrv:HttpClient,private fb: FormBuilder){}

  ngOnInit() {
    this.getAllData(this.number);
    this.dropdownList = [
      { item_id: 1, item_text: 'Item1' },
      { item_id: 2, item_text: 'Item2' },
      { item_id: 3, item_text: 'Item3' },
      { item_id: 4, item_text: 'Item4' },
      { item_id: 5, item_text: 'Item5' }
    ];
    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
    };

    this.selectedItems = [
      { item_id: 3, item_text: 'Item3'  },
      { item_id: 4,item_text: 'Item4' }
    ];

    this.dropDownForm = this.fb.group({
      myItems: [this.selectedItems]
    });

    this.getSelected();
  }

  getAllData(value:any){
    return this.httpSrv.get(apiUrl + value).subscribe((res)=>{
      console.log(res);
      this.loadData1 = res;
      console.log("Get Res::-",this.loadData1);
    });
  }

  getFirstPage(){
    this.number =1;
    let finalApi = apiUrl + this.number;
    return this.httpSrv.get(finalApi).subscribe((res)=>{
      this.loadData1 = res;
      console.log("Get FirstPage Res::-",this.loadData1);
    });
  } 
  getNextPage(){
    this.number +=1;
    let finalApi = apiUrl + this.number;
    return this.httpSrv.get(finalApi).subscribe((res)=>{
      this.loadData1 = res;
      console.log("Get Next Res::-",this.loadData1);
    });
  }
  getPreviousPage(){
    this.number -=1;
    let finalApi = apiUrl + this.number;
    return this.httpSrv.get(finalApi).subscribe((res)=>{
      this.loadData1 = res;
      console.log("Get Previous Res::-",this.loadData1);
    });
  }
  getLastPage(){
    this.number = 11;
    let finalApi = apiUrl + this.number;
    return this.httpSrv.get(finalApi).subscribe((res)=>{
      this.loadData1 = res;
      console.log("Get Last Page Res::-",this.loadData1);
    })
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }

  submit(){
    console.log(this.dropDownForm.value);
  }

  getSelected(){
    this.toppings.setValue(this.selectedTopings);
  }
}
