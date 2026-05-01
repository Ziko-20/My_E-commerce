import {React,useState} from 'react'
import{Mail,KeyRound} from 'lucide-react';
import logoSmall from '../assets/logoSmall.png';
const Login = () => {
    const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  return (
    <div className='flex h-screen w-full bg-gray-100'>
      {/* Left Side */}
      <div className='w-1/2'>
        <img src={logoSmall} alt="Logo" className='hidden md:block w-full h-full object-cover'/>
        </div>


        {/* Right Side */}
      <div className='w-1/2 flex flex-col justify-center items-center'>

<form className='flex flex-col items-center gap-6 bg-white p-10 rounded-2xl shadow-md  '>

  {/* EMAIL */}
  <div className='flex items-center gap-2 w-full'>
    <div className='flex items-center gap-2 w-[128px]'>
      <Mail size={16}/><label>Email:</label>
    </div>
    <div className='flex-1'>
      <input type="text" className='w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
        placeholder="exemple@email.com"/>
    </div>
  </div>

  {/* Password */}
  <div className='flex items-center gap-2 w-full'>
    <div className='flex items-center gap-2 w-[128px]'>
      <KeyRound size={16}/><label>Mot de passe:</label>
    </div>
    <div className='flex-1'>
      <input type="text" className='w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
        placeholder="••••••••"/>
    </div>
  </div>

  {/* Button */}
  <button className='w-full bg-blue-400 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors'>
    S'enregistrer
  </button>

</form>
      </div>
    </div>
  )
}

export default Login;
