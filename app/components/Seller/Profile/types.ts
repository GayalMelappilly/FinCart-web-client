export interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    joinDate: string;
    avatar: string;
    bio: string;
    storeName: string;
    taxId: string;
  }
  
  export interface PasswordForm {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
  
  export interface NotificationType {
    type: 'success' | 'error' | 'info';
    message: string;
  }