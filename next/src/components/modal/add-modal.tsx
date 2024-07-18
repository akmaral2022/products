import { useState } from 'react';
import { ProductModalProps } from '@/types/products';
import DownloadIcon from '@/assets/icons/download.svg';
import Image from 'next/image';
import axiosStore from '@/store/store';

export const AddProductModal: React.FC<ProductModalProps> = ({ onClose }) => {
  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [manufacturer, setManufacturer] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !quantity || !price || !manufacturer) {
      setError('Пожалуйста, заполните все обязательные поля.');
      return;
    }

    setError(null);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('manufacturerId', manufacturer);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axiosStore.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      onClose();
    } catch (error) {
      console.error('Ошибка при добавлении продукта:', error);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='flex flex-col items-center justify-evenly bg-[#F1F5F9] w-[338px] h-fit rounded-[10px] py-[20px] gap-[30px]'>
        <h2 className='font-inter font-medium text-center leading-[29.05px] px-[30px]'>Создание товара</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full px-[20px]'>
          {error && (
            <div className='text-red-600 p-2 rounded-md mb-4'>
              {error}
            </div>
          )}
          <div className='flex flex-col gap-1'>
            <h6>Название <span className='text-red-500'>*</span></h6>
            <input
              type='text'
              placeholder='Название'
              autoComplete='name'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <h6>Количество <span className='text-red-500'>*</span></h6>
            <input
              type='text'
              placeholder='Количество'
              autoComplete='quantity'
              name='quantity'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className='p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <h6>Цена <span className='text-red-500'>*</span></h6>
            <input
              type='text'
              placeholder='Цена'
              autoComplete='price'
              name='price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <h6>Производитель <span className='text-red-500'>*</span></h6>
            <input
              type='text'
              placeholder='Производитель'
              autoComplete='manufacturer'
              name='manufacturer'
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              className='p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <h6>Фото</h6>
            <div className='flex flex-col items-center justify-center gap-[10px]'>
              <p>Загрузить фото</p>
              <input
                type='file'
                onChange={handleFileChange}
                className='hidden'
                id='file-input'
              />
              <label htmlFor='file-input'>
                <Image src={DownloadIcon} alt='download' width={21} height={18.75} />
              </label>
            </div>
          </div>
          <div className='flex gap-[10px]'>
            <button
              type='button'
              onClick={onClose}
              className='px-3 py-2 w-fit rounded-md font-medium text-[#ffffff] transition duration-200 bg-[#404040] hover:bg-slate-400'
            >
              Отмена
            </button>
            <button
              type='submit'
              className='px-3 py-2 w-fit rounded-md font-medium text-base transition duration-200 bg-slate-300 hover:bg-slate-400'
            >
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
