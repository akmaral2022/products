import { DisplayTypes } from "@/types/products";
import React from "react";
import editIcon from '@/assets/icons/refresh.svg';
import deleteIcon from '@/assets/icons/Delete.svg';
import Image from "next/image";

export const ProductsTable: React.FC<DisplayTypes> = ({ products, onShowMore, onEdit }) => {
  const handleEdit = (id: number) => {
    if (onEdit) {
      onEdit(id);
    }
  };
  return (
    <div className="flex justify-start items-start mt-[50px] w-full">
      <div className="w-full mx-auto">
        <table className="min-w-full shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-[#E2E8F0] text-left text-sm font-medium text-[#0F172A] tracking-wider">Фото</th>
              <th className="py-3 px-6 bg-[#E2E8F0] text-left text-sm font-medium text-[#0F172A] tracking-wider">Название</th>
              <th className="py-3 px-6 bg-[#E2E8F0] text-left text-sm font-medium text-[#0F172A] tracking-wider">Количество</th>
              <th className="py-3 px-6 bg-[#E2E8F0] text-left text-sm font-medium text-[#0F172A] tracking-wider">Производитель</th>
              <th className="py-3 px-6 bg-[#E2E8F0] text-left text-sm font-medium text-[#0F172A] tracking-wider">Цена</th>
              <th className="py-3 px-6 bg-[#E2E8F0] text-left text-sm font-medium text-[#0F172A] tracking-wider">Действия</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b hover:bg-[#CBD5E1]"
              >
                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                  <img src={product.photoUrl} alt={product.name} width={56} height={56} />
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">{product.name}</td>
                <td className="py-4 px-6 text-sm text-gray-700">{product.quantity}</td>
                <td className="py-4 px-6 text-sm text-gray-700">{product.manufacturerId}</td>
                <td className="py-4 px-6 text-sm text-gray-700">{product.price}</td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  <div className="flex gap-[10px]">
                    <Image src={editIcon} alt='edit' width={20} height={20}
                      onClick={() => handleEdit(product.id)}
                    />
                    <Image src={deleteIcon} alt='delete' width={20} height={20}
                      onClick={() => onShowMore(product.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
