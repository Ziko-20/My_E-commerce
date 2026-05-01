import React, { useState } from 'react';
import{User,Mail,MapPinHouse,Phone} from 'lucide-react';
const Register = () => {

  const [email,setEmail]=useState('');
  const [telephone,setTelephone]=useState('');
  const [nom,setNom]=useState('');
  const [adresse,setAdresse]=useState('');
 

  return (
    <div>
      <form action="">
 {/* NOM */}
 <div>
 <User/>
        <label htmlFor="">Nom:</label>
        <input type="text" 
        />
    </div>
{/* EMAIL */}
<div>
  <Mail />
        <label htmlFor="">Email</label>
        <input type="text" 
        /></div>
{/* TELEPHONE */}
<div>
  <Phone />
        <label htmlFor="">Telephone</label>
        <input type="text" 
        /></div>
{/* ADRESSE */}
<div>
  <MapPinHouse />
        <label htmlFor="">Aresse</label>
        <input type="text" 
        /></div>

{/* Button */}   
<div>    
        <button /* onClick={submit} */>S'enregistrer</button>
        </div> 
        </form>
    </div>
  )
}

export default Register;
