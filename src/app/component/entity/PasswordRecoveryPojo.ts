export class PasswordRecoveryPojo {
  recoveryUserEmail: string;
  recoverySecretNumber: string;
  recoveryIdRequest: string;
  newPassword: string;


  constructor(recoveryUserEmail: string, recoverySecretNumber: string, recoveryIdRequest: string, newPassword: string) {
    this.recoveryUserEmail = recoveryUserEmail;
    this.recoverySecretNumber = recoverySecretNumber;
    this.recoveryIdRequest = recoveryIdRequest;
    this.newPassword = newPassword;
  }
}
