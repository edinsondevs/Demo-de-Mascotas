/**
 ** INTERFACE GENERAL DE USUARIO
 */
export interface AllUsers {
    cell: string;
    phone: string;
    gender: string;
    email: string;
    location: {
        city?: string;
        country: string;
    };
    login: {
        username?: string;
        password?: string;
    };
    name: {
        first: string;
        last: string;
    };
    picture: {
        medium: string;
    };
    adoptedPets: number;
}

export interface AllUsersApp {
  availableUsers: AllUsers[];
}
/**
 ** INTERFACE PARA REGISTRO DE USUARIO
 */
export interface NewUserRegistration {
  users: AllUsers[];
}

export interface RegisteredSuccess {
    value: boolean
}


/**
 ** INTERFACE PARA LOGIN DE USUARIO
 */
export interface LoginState {
  dataUserLogged: {
    success: boolean;
    userLogged: [
      {
        cell: string;
        phone: string;
        email: string;
        gender: string;
        location: {
          city: string;
          country: string;
        };
        login: {
          username: string;
          password: string;
        };
        name: {
          first: string;
          last: string;
        };
        picture: {
          medium: string;
        };
        adoptedPets: number;
      }
    ];
  };
}

export interface UserConnected {
    email: string;
}

export interface ValidUserStore {
    email: string;
  }
  