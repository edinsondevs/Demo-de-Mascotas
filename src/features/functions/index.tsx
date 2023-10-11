import { useSelector } from "react-redux";
import { RootState } from "../../store";

/**
 * Funcion para exportar los datos de los usuarios validos segun el email
 */
export function GetDataUser(email: string) {
    
    const lastUser = useSelector(
        (state: RootState) => state.availableUsers.availableUsers
    );
    
    const result = lastUser.find((user) => user.email === email);
    return result;
}
