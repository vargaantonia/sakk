import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link} from "react-router-dom";

export const ChessMod = () => {
    const params = useParams();
    const id = params.chessId;
    const navigate = useNavigate();
    const [chess, setChess] = useState({
        name: '',
        birt_date : '',
        world_ch_won: 0,
        profile_url: '',
        image_url: ''
    });
    useEffect(() => {
        const fetchChess = async() => {
            try{
                const response = await 
                axios.get(`https://chess.sulla.hu/chess/${id}`);
                setChess(response.data)
            }
            catch(error){
                console.log("Hiba a fetch-elésben: ", error)
            }
        };
        fetchChess();
}, [id]);
        const handleInPutChange = event => {
            const {name, value} = event.target;
            setChess(prevState => ({
                ...prevState,
                [name] : [value]
            }));
    }
    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`https://chess.sulla.hu/chess/${id}`, chess)
        .then(() => {
            navigate("/");
        })
        .catch(error => {
            console.log(`Hiba a sakk adatok frissítésében: ${error}`)
        })
    }
    return(
        <div className="p-5 content bg-whitesomke text-center">
        <form onSubmit={handleSubmit}>
        <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Sakkozó neve:</label>
                    <div className="col-sm-9">
                        <input type="text" name="name" className="form-control" defaultValue={chess.name} onChange={handleInPutChange}/>
                    </div>
                </div>

                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Születési éve:</label>
                    <div className="col-sm-9">
                        <input type="date" name="birth_date" className="form-control"  defaultValue={chess.birt_date} onChange={handleInPutChange}/>
                    </div>
                </div>

                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Nyert világbajnokságot:</label>
                    <div className="col-sm-9">
                        <input type="number" name="world_ch_won" className="form-control" value={chess.world_ch_won.toString()} onChange={handleInPutChange}/>
                    </div>
                </div>

                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Profil URL-je</label>
                    <div className="col-sm-9">
                        <input type="" name="" className="form-control" defaultValue={chess.profile_url} onChange={handleInPutChange}/>
                    </div>
                </div>

                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Kép URL-je</label>
                    <div className="col-sm-9">
                        <input type="text" name="profile_url" className="form-control" defaultValue={chess.image_url} onChange={handleInPutChange}/>
                    </div>
                </div>

                <button type="submit" className="btn btn-success">Küldés</button>
                <div className=" d-flex flex-row justify-content-center align-items-center">
                    <Link to="/"><i className="bi bi-backspace-fill fs-3"></i></Link>&nbsp;&nbsp;&nbsp;  
                </div>
            </form>
            </div>
    );
};