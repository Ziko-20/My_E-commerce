import React, { useState } from 'react'
import{Mail,KeyRound} from 'lucide-react';
import logoSmall from '../../assets/logoSmall.png';
import BgRemovedLogooo from '../../assets/BgRemovedLogooo.jpeg';
import { useTranslation } from 'react-i18next';
/* import LogoVidV2 from '../../assets/LogoVidV2.mp4'
 */import { Link } from 'react-router-dom'
import{login} from '../../services/authService';
import logoCadree from '../../assets/logoCadree.png';
const Login = () => {
  const { t } = useTranslation();

    const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  //login 
    const handleSubmit=async(e)=>{
      e.preventDefault();
      const response=await login({email,password});
      console.log(response.data);
    }

  return (
  <div className='w-full flex items-center justify-center min-h-screen bg-slate-100'>

    <div className='bg-white rounded-2xl shadow-lg p-12 w-full max-w-md flex flex-col gap-6'>
<div className='flex justify-center items-center'>
      <img src={logoCadree} alt="logoEcomm" className='w-44 ' />
</div>
      {/* EMAIL */}
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 items-center'>
          <Mail size={14} className='text-gray-500' />
          <label htmlFor="" className='text-sm text-gray-500'>{t('email')}:</label>
        </div>
        <input
          type="text"
          className='border border-gray-200 rounded-xl hover:border-green-600 focus:border-green-600 outline-none px-3 py-2'
          placeholder='exemple@gmail.com'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 items-center'>
          <KeyRound size={14} className='text-gray-500' />
          <label htmlFor="" className='text-sm text-gray-500'>{t('password')}:</label>
        </div>
        <input
          type="password"
          className='border border-gray-200 rounded-xl hover:border-green-600 focus:border-green-600 outline-none px-3 py-2'
          onChange={(e) => setPassword(e.target.value)}
          placeholder='*********************'
        />
      </div>

      {/* Button */}
      <div className='flex flex-col gap-3'>
        <button
          type='submit'
          className='bg-green-600 text-white font-bold w-full rounded-xl py-2 hover:bg-green-500 transition-colors duration-200'
          onClick={handleSubmit}
        >
          {t('login')}
        </button>

        <p className='text-sm text-gray-400 text-center'>
          <Link to="/register" className='transition-colors duration-300 hover:text-gray-900'>
            {t('createacc')}
          </Link>
        </p>
      </div>

    </div>

  </div>
)
}

export default Login;
