import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export const ChessSingle = () => {
    const { chessId } = useParams();
    const [ chess, setChess] = useState([]);
    const [ isPending, setPending ] = useState(false);

useEffect(() => {
    setPending(true);
    (async () => {
        try {
            const valasz = await axios.get(`https://chess.sulla.hu/chess/${chessId}`)
            setChess(valasz.data);
        }
        catch (hiba) {
            console.log(hiba);
        }
        finally{
            setPending(false);
        }
    })();
        
}, [chessId]);
    return (
        <div className="container mt-auto">
            <h2 className="text-center">Sakkozó {chess.name}</h2>
        { isPending || !chessId ? (<div className="spinner-border"></div>) : (
            <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center align-content-center">
                
                    <div className="col">
                        <div className="card h-200">
                        <h3 className="text-dark text-center">Sakkozó neve: {chess.name}</h3>
                        <h4 className="text-dark text-center">Születési éve: {chess.birth_date}</h4>
                        <h4 className="text-dark text-center">Megnyert világbajnokságai: {chess.world_ch_won}</h4>
                            <div className="card-body d-flex flex-column align-items-center">
                                <Link to={chess.profile_url} className="fs-6" target="_blank">Profil link</Link>
                                <br />
                                <img src={chess.image_url ? chess.image_url : "https://via.placeholder.com/400x800"} alt={chess.name} className="img-fluid" style={{width: "250px"}}/>
                            </div>
                        </div>
                        <div  className="align-items-center d-flex flex-column flex-md-row  justify-content-center align-content-center"> 
                        <Link to="/"> <i className="bi bi-backspace fs-3"></i></Link>&nbsp; &nbsp; &nbsp;
                        <Link to={"/mod/chess" + chessId}> <i className="bi bi-pencil-square fs-3"></i></Link>
                        </div>
                    </div>
            </div>
        )}
        </div>
    );
}