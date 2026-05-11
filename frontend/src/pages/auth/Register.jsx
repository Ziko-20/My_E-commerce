import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import{User,Mail,MapPinHouse,Phone,Lock} from 'lucide-react';
import logoSmall from '../../assets/logoSmall.png'
import { register } from '../../services/authService';

import LogoAnimation from '../../assets/LogoVid.mp4'

/* import LogoAnimation from '../assets/LogoVid.mp4'
 */const Register = () => {

const{t}=useTranslation();

  const [email,setEmail]=useState('');
  const [telephone,setTelephone]=useState('');
  const [nom,setNom]=useState('');
  const [adresse,setAdresse]=useState('');
  const [password,setPassword]=useState('');

  const [indicatif, setIndicatif] = useState('+212');

  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response=await register({email,password,adresse,nom,telephone:indicatif+telephone});
    console.log(response.data);

  };

  /* Indicatifs Telephone */
  const countries = [
  { code: "+212", flag: "🇲🇦", name: "Maroc" },{ code: "+1",   flag: "🇺🇸", name: "États-Unis" },{ code: "+33",  flag: "🇫🇷", name: "France" },{ code: "+44",  flag: "🇬🇧", name: "Royaume-Uni" },{ code: "+49",  flag: "🇩🇪", name: "Allemagne" },{ code: "+34",  flag: "🇪🇸", name: "Espagne" },{ code: "+39",  flag: "🇮🇹", name: "Italie" },{ code: "+32",  flag: "🇧🇪", name: "Belgique" },{ code: "+41",  flag: "🇨🇭", name: "Suisse" },{ code: "+31",  flag: "🇳🇱", name: "Pays-Bas" },{ code: "+351", flag: "🇵🇹", name: "Portugal" },{ code: "+216", flag: "🇹🇳", name: "Tunisie" },{ code: "+213", flag: "🇩🇿", name: "Algérie" },{ code: "+20",  flag: "🇪🇬", name: "Égypte" },{ code: "+221", flag: "🇸🇳", name: "Sénégal" },{ code: "+225", flag: "🇨🇮", name: "Côte d'Ivoire" },{ code: "+237", flag: "🇨🇲", name: "Cameroun" },{ code: "+966", flag: "🇸🇦", name: "Arabie Saoudite" },{ code: "+971", flag: "🇦🇪", name: "Émirats Arabes Unis" },{ code: "+974", flag: "🇶🇦", name: "Qatar" },{ code: "+965", flag: "🇰🇼", name: "Koweït" },{ code: "+962", flag: "🇯🇴", name: "Jordanie" },{ code: "+961", flag: "🇱🇧", name: "Liban" },{ code: "+90",  flag: "🇹🇷", name: "Turquie" },{ code: "+91",  flag: "🇮🇳", name: "Inde" },{ code: "+86",  flag: "🇨🇳", name: "Chine" },{ code: "+81",  flag: "🇯🇵", name: "Japon" },{ code: "+82",  flag: "🇰🇷", name: "Corée du Sud" },{ code: "+55",  flag: "🇧🇷", name: "Brésil" },{ code: "+52",  flag: "🇲🇽", name: "Mexique" },{ code: "+27",  flag: "🇿🇦", name: "Afrique du Sud" },{ code: "+234", flag: "🇳🇬", name: "Nigeria" },{ code: "+254", flag: "🇰🇪", name: "Kenya" },{ code: "+7",   flag: "🇷🇺", name: "Russie" },{ code: "+380", flag: "🇺🇦", name: "Ukraine" },{ code: "+48",  flag: "🇵🇱", name: "Pologne" },{ code: "+46",  flag: "🇸🇪", name: "Suède" },{ code: "+47",  flag: "🇳🇴", name: "Norvège" },{ code: "+45",  flag: "🇩🇰", name: "Danemark" },{ code: "+358", flag: "🇫🇮", name: "Finlande" },{ code: "+61",  flag: "🇦🇺", name: "Australie" },{ code: "+64",  flag: "🇳🇿", name: "Nouvelle-Zélande" },{ code: "+54",  flag: "🇦🇷", name: "Argentine" },{ code: "+56",  flag: "🇨🇱", name: "Chili" },{ code: "+57",  flag: "🇨🇴", name: "Colombie" },{ code: "+58",  flag: "🇻🇪", name: "Venezuela" },{ code: "+51",  flag: "🇵🇪", name: "Pérou" },
];

  return (
    <div className='w-full flex h-screen '>


{/* LeftSide */}
      <div className='w-1/2 bg-gray-100 h-full'>
      <form onSubmit={handleSubmit} className='flex  flex-col items-center justify-center h-full gap-6'>
 {/* NOM */}
 <div className='flex flex-col gap-2 w-1/2 '>
  <div className='flex gap-2 items-center'><User  size={14} className=' text-gray-500'/><label htmlFor="" className='text-sm text-gray-500'>{t('name')}:</label></div>
        
        <input type="text" 
        placeholder='Verrill Duclos'
        className='border border-gray-300 rounded-lg hover:border-blue-600 focus:border-blue-600 outline-none pl-2 p-1'
        onChange={(e)=>{setNom(e.target.value)}}
        />
    </div>
{/* EMAIL */}
<div className='flex flex-col gap-2 w-1/2 '>
  <div className='flex gap-2 items-center'><Mail  size={14} className=' text-gray-500' /><label htmlFor="" className='text-sm text-gray-500'>{t('email')}:</label></div>
        
        <input type="text" 
        className='border border-gray-300 rounded-lg hover:border-blue-600 focus:border-blue-600 outline-none pl-2 p-1'
        placeholder='exemple@gmail.com'
        onChange={(e)=>{setEmail(e.target.value)}}

        /></div>
{/* TELEPHONE */}

         <div className="flex w-[50%]">
<div className='flex flex-col '>
   <div><Phone  size={14} className=' text-gray-500' /> <label htmlFor="" className='text-sm text-gray-500'>{t('phone')}:</label> </div>

    <div className='flex flex-row w-full'>
  <select
    name="indicatif"
    className='border border-gray-300 rounded-lg hover:border-blue-600 focus:border-blue-600 outline-none pl-2 p-1'
    defaultValue="+212"
      onChange={(e) => setIndicatif(e.target.value)}

  >
    {countries.map((c) => (
      <option key={c.code} value={c.code}>
        {c.flag} {c.code}
      </option>
    ))}
  </select>

    
  <input
    type="tel"
    name="telephone"
    placeholder="6 12 34 56 78"
        onChange={(e)=>{setTelephone(e.target.value)}}
    
    className='border border-gray-300 rounded-lg hover:border-blue-600 focus:border-blue-600 outline-none w-full pl-2 p-1'
  /></div></div>
</div>
        
{/* ADRESSE */}
<div className='flex flex-col gap-2 w-1/2 '>
  <div className='flex gap-2 items-center'><MapPinHouse  size={14} className=' text-gray-500' /><label htmlFor="" className='text-sm text-gray-500'>{t('adress')}:</label></div>
        
        <input type="text" 
        className='border border-gray-300 rounded-lg  hover:border-blue-600 focus:border-blue-600 outline-none pl-2 p-1'
        placeholder='12 Rue Al Atlas, Appartement 5 , Rabat'
        onChange={(e)=>{setAdresse(e.target.value)}}

        /></div>
  {/* password */}
<div className='flex flex-col gap-2 w-1/2 '>
  <div className='flex gap-2 items-center'><Lock  size={14} className=' text-gray-500' /><label htmlFor="" className='text-sm text-gray-500'>{t('password')}:</label></div>
        
        <input type="password" 
        className='border border-gray-300 rounded-lg  hover:border-blue-600 focus:border-blue-600 outline-none pl-2 p-1'
        placeholder='*********************'
        onChange={(e)=>{setPassword(e.target.value)}}

        /></div>      

{/* Button */}   
<div className='w-[50%] flex justify-center'>    
        <button  type="submit"  className='border  bg-blue-600 text-white font-bold w-full rounded-lg pl-2 p-1 hover:bg-blue-400'>{t('Register')}</button>
        </div> 
        </form>
        </div>

    

        {/* Right Side */}
<div className='hidden  w-1/2 h-full sm:block bg-white '>
   {/* <a href="#"><img src={logoSmall} alt="Logo" className='hidden md:block w-full h-full object-cover transition-transform duration-300 hover:scale-110'/></a>  */}
   <div className='flex items-center justify-center h-full '>
   <video width="420" height="360"  autoPlay muted loop className='h-48'>
      <source src={LogoAnimation} type="video/mp4" />
    </video>
    </div>
</div>
    </div>
  )
}

export default Register;
