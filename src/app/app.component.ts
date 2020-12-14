import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal/modal.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'pb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'personal-budget-project';
  constructor(
    public authService: AuthService,
    public modalService: ModalService
  ) {
    this.authService.getAuthModalStatus().subscribe((status) => {
      if (status) {
        this.openModal('modelId');
      }else{
        this.closeModal('modelId');
      }
    });
}
  ngOnInit(): void {
  }
openModal(id: string) {
  this.modalService.open(id);
}

refreshToken() {
  this.closeModal('modelId');
  const uid = this.authService.currentUser.id;
  if (uid){
    this.authService.refreshToken(uid);
  }
}
closeModal(id: string) {
  this.modalService.close(id);
}
}
