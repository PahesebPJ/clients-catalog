import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() display: boolean = false;
  @Input() title = '';


  constructor() { }

  ngOnInit() {
  }

  toggleModal() {
    this.display = !this.display;
  }
}
