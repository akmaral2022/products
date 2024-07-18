import { ProductModalProps } from '@/types/products'
import DownloadIcon from '@/assets/icons/download.svg'
import Image from 'next/image'


export const AddProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  // if (!product) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='flex flex-col items-center justify-evenly bg-[#F1F5F9] w-[338px] h-fit rounded-[10px] py-[20px] gap-[30px]'>
        <h2 className='font-inter font-medium text-center leading-[29.05px] px-[30px]'>Создание товара</h2>
        <div className='flex flex-col gap-1 w-full px-[20px]'>
          <h6>Название</h6>
          <input
            type='text'
            placeholder='Название'
            autoComplete='name'
            className='p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none'
          />
        </div>
        <div className='flex flex-col gap-1 w-full px-[20px]'>
          <h6>Количество</h6>
          <input
            type='text'
            placeholder='Количество'
            autoComplete='quantity'
            className='p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none'
          />
        </div>
        <div className='flex flex-col gap-1 w-full px-[20px]'>
          <h6>Цена</h6>
          <input
            type='text'
            placeholder='Цена'
            autoComplete='price'
            className='p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none'
          />
        </div>
        <div className='flex flex-col gap-1 w-full px-[20px]'>
          <h6>Производитель</h6>
          <input
            type='text'
            placeholder='Производитель'
            autoComplete='manufacture'
            className='p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none'
          />
        </div>
        <div className='flex flex-col gap-1 w-full px-[20px]'>
          <h6>Фото</h6>
          <div>
            <div className='flex flex-col items-center justify-center gap-[10px]'>
              <p>Загрузить фото</p>
              <Image src={DownloadIcon} alt='download' width={21} height={18.75} />
            </div>
          </div>
        </div>
        <div className='flex gap-[10px]'>
          <button
            onClick={onClose}
            className='px-3 py-2 w-fit rounded-md font-medium text-[#ffffff] transition duration-200 bg-[#404040] hover:bg-slate-400'
          >
            Отмена
          </button>
          <button
            onClick={onClose}
            className='px-3 py-2 w-fit rounded-md font-medium text-base transition duration-200 bg-slate-300 hover:bg-slate-400'
          >
            Создать
          </button>
        </div>
      </div>
    </div>
  )
}