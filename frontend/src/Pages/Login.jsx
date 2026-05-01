import {React,useState} from 'react'
import{Mail,KeyRound} from 'lucide-react';
import logoSmall from '../assets/logoSmall.png';
import BgRemovedLogooo from '../assets/BgRemovedLogooo.jpeg';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();

    const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  return (
    <div className='flex h-screen w-full bg-gray-100'>
      {/* Left Side */}
      <div className='hidden sm:block  w-1/2 bg-white'>
        <img src={logoSmall} alt="Logo" className='hidden md:block w-full h-full object-cover  '/>
        </div>


        {/* Right Side */}
      <div className='sm:w-1/2 flex flex-col justify-center items-center  w-full sm:items-center sm:justify-center sm:bg-gray-100 '>

      {/* Logo Mobile */}
{/* <img src={BgRemovedLogooo} alt="logoMobile" className=' sm:hidden'/>
 */}
<form className='flex flex-col items-center gap-6 bg-white p-10 rounded-2xl shadow-md sm:w-full sm:max-w-sm '>



  {/* EMAIL */}
  <div className='flex flex-col   gap-2 w-full'>
    <div className='flex items-center gap-2 w-[350px]'>
      <Mail size={12} className='text-gray-500'/><label className='text-sm text-gray-500'>{t('email')}:</label>
    </div>
    <div className='flex-1'>
      <input type="text" className='w-full border  rounded-lg px-3 py-2 text-sm border-gray-200  focus:border-blue-600 outline-none'
        placeholder="exemple@email.com"/>
    </div>
  </div>



  {/* Password */}
  <div className='flex flex-col   gap-2 w-full'>
    <div className='flex items-center gap-2 w-[350px]'>
      <KeyRound size={12} className='text-gray-500'/><label  className='text-sm text-gray-500'>{t('password')}:</label>
    </div>
    <div className='flex-1'>
      <input type="text" className='w-full border rounded-lg px-3 py-2 text-sm    border-gray-200  focus:border-blue-600 outline-none'
        placeholder="••••••••"/>
    </div>
  </div>



  {/* Button */}
  <button className='w-full bg-blue-400 hover:bg-blue-700 text-white font-medium py-2 rounded-lg '>
    {t('login')}
  </button>

</form>
      </div>
    </div>
  )
}

export default Login;
