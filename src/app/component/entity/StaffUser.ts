export class StaffUser {
  email: string;
  fullName: string;
  enabled: boolean;
  confirmEmail: boolean;
  roles_users: string[];
  technicName: string;


  constructor(email: string, fullName: string, enabled: boolean,
              confirmEmail: boolean, roles_users: string[], technicName: string) {
    this.email = email;
    this.fullName = fullName;
    this.enabled = enabled;
    this.confirmEmail = confirmEmail;
    this.roles_users = roles_users;
    this.technicName = technicName;
  }
}
