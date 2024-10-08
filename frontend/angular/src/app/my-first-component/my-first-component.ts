import {Component, EventEmitter, Input, Output, output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-my-first',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './my-first-component.html',
  styleUrl: './my-first-component.scss'
})
export class MyFirstComponent {

  @Input()
  inputValue: string = 'KareemAbdoSE';

  @Output()
  childClicked: EventEmitter<any> = new EventEmitter<void>();


  displayMsg = false;

  msgList: Array<string> = [];

  clickMe(): void {
    this.msgList.push(this.inputValue);
    this.inputValue = '';
    console.log(this.msgList)
    this.childClicked.emit();
  }
}
