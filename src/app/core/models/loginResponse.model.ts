export interface LoginResponse {
    data: {
      age: number;
      createdTs: string;
      email: string;
      id: string;
      lastOnline: string;
      pwdHash: string;
      updatedTs: string;
      userType: string;
    };
    status: string;
    description: string | null;
    errorMessage: string | null;
  }