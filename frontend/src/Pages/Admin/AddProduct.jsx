import React from 'react'
import { useTranslation } from 'react-i18next'
import {ImagePlus} from 'lucide-react'

const AddProduct = () => {

const {t}=useTranslation();
  return (
    
    <div className=' '>
       {/*  Formulaire d ajout */}
      <form action="" className='  flex flex-row h-screen p-10 m-2 gap-2'>
{/* Image */}
      <div className='border w-1/2  rounded-2xl h-full'>
<ImagePlus />
      </div>

   <div className='flex w-1/2 border h-full rounded-2xl'>

      <div className='flex flex-col  w-full p-8 gap-6 justify-center items-center'>
        {/* Noom Produit */}
        <div className='flex '>
          <div className='flex flex-col'><label htmlFor="" className='w-80'>
          {t('Nomproduit')}:</label>
        <input type="text" className='border w-78 h-8 rounded-xl' /></div>
        </div>
        {/* Categoryyy */}
        <div className='flex '><div className='flex flex-col'><label htmlFor="" className='w-80'>{t('categoryproduit')}:</label><input type="text" className='border w-78 h-8 rounded-xl' />
        </div>
        </div>
        {/* Description */}
        <div className='flex '>
          <div className='flex flex-col'><label htmlFor="" className='w-80'>
          {t('descriptionproduit')}:</label>
        <input type="text" className='border w-78 h-8 rounded-xl' />
        </div>
        </div>
        {/* Rating */}
        <div className='flex '>
          <div className='flex flex-col'><label htmlFor="" className='w-80'>
          {t('ratingproduit')}:</label>
        <input type="text" className='border w-78  h-8 rounded-xl' />
        </div>
        </div>
        {/* Prixxx */}
        <div className='flex '>
          <div className='flex flex-col'><label htmlFor="" className='w-80'>
          {t('prixproduit')}:</label>
        <input type="text" className='border w-78  h-8 rounded-xl' />
        </div>
        </div>
        {/* Q stockkkk */}
        <div className='flex '>
          <div className='flex flex-col'><label htmlFor="" className='w-80'>
          {t('quantiteproduit')}:</label>
        <input type="text" className='border w-78  h-8 rounded-xl' />
        </div>
        </div>

      </div>
   </div>
</form>
    </div>
  )
}

export default AddProduct
