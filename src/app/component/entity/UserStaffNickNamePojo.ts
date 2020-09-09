export class UserStaffNickNamePojo {
  createUser: string;
  lastModificationUser: string;
  closeUser: string;
  currentName: string;

  constructor(createUser: string, lastModificationUser: string, closeUser: string, currentName: string) {
    this.createUser = createUser;
    this.lastModificationUser = lastModificationUser;
    this.closeUser = closeUser;
    this.currentName = currentName;
  }
}
