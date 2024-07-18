import { useState } from 'react';
import { ProductModalProps } from '@/types/products';
import { ConfirmModal } from './confirm-modal';
import { updateProductById } from '@/store/store';

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onDelete }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="flex flex-col items-center justify-evenly bg-[#F1F5F9] w-[338px] h-fit rounded-[10px] py-[20px] gap-[30px]">
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