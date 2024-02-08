import { useNavigate } from 'react-router-dom';
import './components.css'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.ts';

function Navbar(){

    const navigate = useNavigate();

    return <div className='navbar'>
            <div className='floatLeft libutton' onClick={ () => navigate("/stinfo")}> STINFO</div>
            <div className='floatLeft libutton' onClick={ () => navigate("/nofear")}> No Fear Act</div>
            <div className='floatLeft libutton' onClick={ () => navigate("/records")}> Records Management</div>
            <div className='floatLeft libutton' onClick={ () => navigate("/management")}> Management</div>
            <div className='floatRight libutton'onClick={ () => { signOut(auth); navigate("/signin");} }> Signout</div>
        </div>;
}

export default Navbar;