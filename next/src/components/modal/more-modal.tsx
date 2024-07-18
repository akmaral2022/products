import { useState } from 'react';
import { ProductModalProps } from '@/types/products';
import { ConfirmModal } from './confirm-modal';
import { updateProductById } from '@/store/store';

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onDelete }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: product?.name || '',
    quantity: product?.quantity || '',
    price: product?.price || '',
    manufacturerId: product?.manufacturerId || '',
    image: null as File | null,
  });

  if (!product) return null;

  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete && product) {
      onDelete(product.id);
    }
    setShowConfirmModal(false);
    onClose();
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFormData(prevData => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (product) {
      try {
        const updatedData = {
          name: formData.name,
          quantity: Number(formData.quantity),
          price: formData.price,
          manufacturerId: Number(formData.manufacturerId),
          image: formData.image,
        };
        await updateProductById(product.id, updatedData);
        onClose();
      } catch (error) {
        console.error('Ошибка обновления товара:', error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="flex flex-col items-center justify-evenly bg-[#F1F5F9] w-[338px] h-fit rounded-[10px] py-[20px] gap-[30px]">
        {isEditing ? (
          <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full px-[20px]'>
            <div className='flex flex-col gap-1'>
              <h6>Название</h6>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleFormChange}
                className='p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <h6>Количество</h6>
              <input
                type='number'
                name='quantity'
                value={formData.quantity}
                onChange={handleFormChange}
                className='p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <h6>Цена</h6>
              <input
                type='text'
                name='price'
                value={formData.price}
                onChange={handleFormChange}
                className='p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <h6>Производитель</h6>
              <input
                type='number'
                name='manufacturerId'
                value={formData.manufacturerId}
                onChange={handleFormChange}
                className='p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <h6>Фото</h6>
              <input
                type='file'
                onChange={handleFileChange}
                className='p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none'
              />
            </div>
            <div className='flex gap-[10px]'>
              <button
                type='button'
                onClick={() => setIsEditing(false)}
                className='px-3 py-2 w-fit rounded-md font-medium text-[#ffffff] transition duration-200 bg-[#404040] hover:bg-slate-400'
              >
                Отмена
              </button>
              <button
                type='submit'
                className='px-3 py-2 w-fit rounded-md font-medium text-base transition duration-200 bg-slate-300 hover:bg-slate-400'
                onClick={handleEditClick}
              >
                Сохранить
              </button>
            </div>
          </form>
        ) : (
          <>
            <img src={product.photoUrl || ''} alt={product.name} width={224} height={224} className='rounded-md' />
            <h2 className="font-inter font-medium text-center leading-[29.05px] px-[30px]">{product.name}</h2>
            <div className='flex flex-col items-start w-full px-[20px] font-inter font-normal text-sm leading-4 text-gray-800 gap-[20px]'>
              <h6>Количество: {product.quantity}</h6>
              <h6>Производитель: {product.manufacturerId}</h6>
              <h6>Цена: {product.price}</h6>
            </div>
            <div className='flex gap-[10px]'>
              <button
                onClick={handleDeleteClick}
                className="px-3 py-2 w-fit rounded-md font-medium text-[#ffffff] transition duration-200 bg-[#404040] hover:bg-slate-400"
              >
                Удалить
              </button>
              <button
                onClick={onClose}
                className="px-3 py-2 w-fit rounded-md font-medium text-base transition duration-200 bg-slate-300 hover:bg-slate-400"
              >
                Назад
              </button>
            </div>
          </>
        )}
      </div>

      {showConfirmModal && (
        <ConfirmModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};