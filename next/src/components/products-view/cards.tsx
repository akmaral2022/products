import { DisplayTypes } from "@/types/products"
import React from "react"

export const ProductsCard: React.FC<DisplayTypes> = ({ products, onShowMore }) => {
  return (
    <div>
      <div className="grid min-h-screen w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-[70px] mx-auto">
          {products.map((product) => (
            <div key={product.id}
              className="rounded-lg p-4 flex flex-col justify-between w-[244px] gap-[12px]"
              onClick={() => onShowMore(product.id)}>
              <div className="flex flex-col items-center justify-around h-full gap-[12px]">
                <img src={product.photoUrl} alt={product.name} width={224} height={224} className="rounded-md" />
                <h2 className="font-inter font-medium text-center text-base leading-[23.05px] px-[30px]">{product.name}</h2>
                <div className='px-[20px] font-inter font-normal text-xs leading-4 text-gray-800 gap-[20px]'>
                  <h6 >Производитель: {product.manufacturerId}</h6>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>{product.quantity} шт</div>
                <div>{product.price} р</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}