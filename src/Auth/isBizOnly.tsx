import { useContext } from "react";
import { AppContext } from "../App";

function IsBizOnly() {
    // const admin = localStorage.getItem('admin');
    const context = useContext(AppContext);

    if( context && context.isBiz) {
        return ( 
            <h2 className="text-center">
                You've reached the Administration zone
            </h2>
         );
    }
    return (
        <div className="text-danger">
            Forbidden
        </div>
    )
  
}

export default IsBizOnly;