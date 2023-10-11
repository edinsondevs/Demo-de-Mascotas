export interface InterfaceNavbarPage {
  title: string;
  path?: string;
  icon: React.ReactNode; // * React.ReactNode es un tipo que representa cualquier cosa que pueda ser renderizada por React, como elementos JSX, strings, números, null, undefined, etc.
  onClick?: () => void; //* es una propiedad opcional que acepta una función sin argumentos y sin valor de retorno (() => void)
}

export interface LoggedUser {
  success: boolean;
  userLogged: [
    {
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
    }
  ];
}
