import { createContext ,useState , useEffect } from "react";


export const authintication = createContext();







function AuthinticationProvider( {children}) {


    // to handle user refresh  i use use effect as a componentDidMount? to detect the refresh to set a token from the local storage because 
    // with every refresh the state become empty but the local sorage not 
    useEffect(() => { if ( localStorage.getItem("Token") != null )
    {
        setToken(localStorage.getItem("Token"))
    }
        
    }, []);


    const [Active, setActive] = useState(false);


    const [Token, setToken] = useState("");

    const [Id, setId] = useState("");

    return <authintication.Provider value={{Token,setToken , Id , setId, Active , setActive}}>
    
    {children}
    
    
    </authintication.Provider>;
}

export default AuthinticationProvider;