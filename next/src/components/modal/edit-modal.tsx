import { useState } from 'react';
import { Products } from '@/types/products';
import { updateProductById } from '@/store/store';

interface EditModalProps {
  product: Products | null;
  onClose: () => void;
}

export const EditModal: React.FC<EditModalProps> = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    quantity: product?.quantity || '',
    price: product?.price || '',
    manufacturerId: product?.manufacturerId || '',
    image: null as File | null,
  });

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

        // Отправка обновленных данных на сервер
        await updateProductById(product.id, updatedData);
        onClose();
      } catch (error) {
        console.error('Ошибка обновления товара:', error);
      }
    }
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-semibold mb-4">Редактировать продукт</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Название</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Количество</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleFormChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Цена</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleFormChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="manufacturerId" className="block text-sm font-medium text-gray-700">Производитель ID</label>
            <input
              type="number"
              id="manufacturerId"
              name="manufacturerId"
              value={formData.manufacturerId}
              onChange={handleFormChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Изображение</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md text-gray-700"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded-md text-white"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
