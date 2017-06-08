import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Cat} from "./cat";

@Component({
    selector: 'cats',
    templateUrl: './cats.component.html',
    styleUrls: ['./cats.component.css']
})
export class CatsComponent {

    selectedCat: Cat;

    myCats: Cat[] = [
        new Cat('Anni', [
            '/assets/images/katzen/Anni_01.jpg',
            '/assets/images/katzen/Anni_02.jpg',
            '/assets/images/katzen/Anni_03.jpg',
            '/assets/images/katzen/Anni_04.jpg']),
        new Cat('Cappo', [
            '/assets/images/katzen/Cappo_01.jpg',
            '/assets/images/katzen/Cappo_02.jpg',
            '/assets/images/katzen/Cappo_03.jpg']),
        new Cat('Eiko', [
            '/assets/images/katzen/Eiko_01.jpg',
            '/assets/images/katzen/Eiko_02.jpg',
            '/assets/images/katzen/Eiko_03.jpg',
            '/assets/images/katzen/Eiko_04.jpg']),
        new Cat('Jojo', [
            '/assets/images/katzen/Jojo_01.jpg',
            '/assets/images/katzen/Jojo_02.jpg',
            '/assets/images/katzen/Jojo_03.jpg',
            '/assets/images/katzen/Jojo_04.jpg'])];

    constructor(private modalService: NgbModal) {
        console.log('ctor');
        this.selectedCat = this.myCats[0];
    }

    showCat(index: number, content) {
        this.selectedCat = this.myCats[index];
        this.open(content);
    }


    open(content) {
        this.modalService.open(content).result.then((result) => {
            // this.modalService.openDialog(content, {size: 'lg'}).result.then((result) => {
            console.log(result);
            if (result === 'Ok') {
//                this.noteSave(this.selectedNote);
            }
        }, (reason) => {
            //      this.noteSave(this.selectedNote);
            //      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            //      console.log(this.closeResult);
        });
    }
}
