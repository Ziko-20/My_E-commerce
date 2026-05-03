import React from 'react';
import TechStoreremovebgpreview from '../assets/TechStoreremovebgpreview.png';
import { useTranslation } from 'react-i18next';
 
import { Languages } from 'lucide-react';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };
  return (
    
    <div className='bg-white flex justify-between h-18'>
      <nav className=''>
        {/* Logo */}
        <a href="" className=''><img src={TechStoreremovebgpreview} alt="" className='w-auto h-16 m-2 p-2 '/></a>
      </nav>


{/* Les Liens */}
      <div className="flex items-center justify-end gap-6 pr-8">

    <a href="#" class=" hover:font-medium text-gray-500 hover:text-gray-900 text-sm">{t('products')}</a> 
    <a href="#" class=" hover:font-medium text-gray-500 hover:text-gray-900 text-sm">{t('cart')}</a>
    <a href="#" class=" hover:font-medium text-gray-500 hover:text-gray-900 text-sm">{t('profil')}</a>
    <a href="#" class=" hover:font-medium text-gray-500 hover:text-gray-900 text-sm">{t('contactersupp')}</a>

    <select value={i18n.language}
            onChange={handleChange} className='text-sm text-gray-700 outline-none cursor-pointer bg-transparent'>
      <Languages />
      <option value="fr">Fr</option>
      <option value="en">En</option>
    </select>

  </div>



      
    </div>
  )
}

export default Navbar
