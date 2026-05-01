import {React,useState} from 'react'
import{Mail,KeyRound} from 'lucide-react';
import logoSmall from '../assets/logoSmall.png';
import BgRemovedLogooo from '../assets/BgRemovedLogooo.jpeg';
import { useTranslation } from 'react-i18next';
import LogoAnimation from '../assets/LogoAnimation.mp4'
import { Link } from 'react-router-dom'

const Login = () => {
  const { t } = useTranslation();

    const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  return (
    <div className='w-full flex h-screen '>

       {/* left */}
<div className='hidden  w-1/2 h-full sm:block bg-white '>
   {/* <a href="#"><img src={logoSmall} alt="Logo" className='hidden md:block w-full h-full object-cover transition-transform duration-300 hover:scale-110'/></a>  */}
   <div className='flex items-center justify-center h-full '>
   <video width="420" height="360"  autoPlay muted loop className='h-48'>
      <source src={LogoAnimation} type="video/mp4" />
    </video>
    </div>
</div>

{/* right */}
      <div className='w-1/2 bg-gray-100 h-full'>
      <form action="" className='flex  flex-col items-center justify-center h-full gap-6'>

{/* EMAIL */}
<div className='flex flex-col gap-2 w-1/2 '>
  <div className='flex gap-2 items-center'><Mail  size={14} className=' text-gray-500' /><label htmlFor="" className='text-sm text-gray-500'>{t('email')}:</label></div>
        
        <input type="text" 
        className='border border-gray-300 rounded-lg hover:border-blue-600 focus:border-blue-600 outline-none pl-2 p-1'
        placeholder='exemple@gmail.com'
        /></div>

{/* Password */}
<div className='flex flex-col gap-2 w-1/2 '>
  <div className='flex gap-2 items-center'><KeyRound  size={14} className=' text-gray-500' /><label htmlFor="" className='text-sm text-gray-500'>{t('password')}:</label></div>
        
        <input type="text" 
        className='border border-gray-300 rounded-lg hover:border-blue-600 focus:border-blue-600 outline-none pl-2 p-1'
        placeholder='*********************'
        /></div>        



{/* Button */}   
<div className='w-[50%] flex flex-col justify-center'>    
        <button /* onClick={submit} */ className='border  bg-blue-600 text-white font-bold w-full rounded-lg pl-2 p-1 hover:bg-blue-400'>
        {t('login')}
        
        </button>
       
        <p className='text-sm   text-gray-500 '><Link to="/register" className='transition-colors duration-300 hover:text-gray-900'>{t('createacc')}</Link></p>
        </div> 
        </form>
        </div>



 
    </div>
  )
}

export default Login;
