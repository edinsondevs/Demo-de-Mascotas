
type User = {
  email: string;
  login: {
    password?: string;
  };
};

enum StateUsers {
  NOT_REGISTERED,
  LOGGED_IN,
  LOGGED_OUT,
  REGISTERED,
}

export const validateUser = async (
  { email, login: password }: User,
  user: User[]
) => {
  try {
    /**
     * Valida que el email y password existan para retornar los datos del usuario que se esta logueando
     */ 
    const validateAccess = user.filter((e) => {
        const b =  e.email === email && e.login.password === password.password 
        return b 
      })

    if(validateAccess.length > 0) {
      return validateAccess;
    }
    else{
      return StateUsers.NOT_REGISTERED;
    }    
  } catch (error) {
    console.log(error);
  }
};