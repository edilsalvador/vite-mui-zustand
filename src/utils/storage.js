import { EncryptStorage } from 'encrypt-storage';

export const encryptStorage = new EncryptStorage(__APP_KEY__, {
  stateManagementUse: true,
});
