import React, {useContext} from "react";
import AuthContext from "../../context/AuthContext";

function Home(){
    let {user} = useContext(AuthContext)
    return (
        <div>
            hello {user?.first_name}
        </div>
    )
}

export default Home