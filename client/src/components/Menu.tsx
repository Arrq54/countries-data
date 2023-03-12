import "../styles/Menu.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChartLine, faFlag, faRankingStar, faLocationDot} from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
export default function Menu(props: {chosen:string}) {
    const navigate = useNavigate();
    const [chosen, setChosen] = useState(props.chosen);
    const clicked = (option:string)=>{
        navigate(option)
    }
    return (
    <div className="menu">
        <div className="logo">
            <h2>Arkadiusz Wojdyła</h2>
        </div>
        <div className="menu-items">
            <div className={`menu-item ${chosen=="All countries"?"chosen":""}`} onClick={()=>clicked("/")}>
                <FontAwesomeIcon  icon={faFlag} />
                <p>All countries</p>
            </div>
            <div className={`menu-item ${chosen=="Charts"?"chosen":""}`} onClick={()=>clicked("/charts")}>
                <FontAwesomeIcon  icon={faChartLine} />
                <p>Charts</p>
            </div>
            <div className={`menu-item ${chosen=="Rankings"?"chosen":""}`} onClick={()=>clicked("/rankings")}>
                <FontAwesomeIcon  icon={faRankingStar} />
                <p>Rankings</p>
            </div>


        </div>
       
    </div>
  )
}
