'use client'
import StrokeIcon from '@/assets/icons/Stroke.svg'
import CardIcon from '@/assets/icons/Card.svg'
import prevIcon from '@/assets/icons/prev.svg'
import nextIcon from '@/assets/icons/next.svg'

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { deleteProductById, fetchProductById, fetchProducts } from '@/store/store';
import { Products } from '@/types/products';
import { ProductModal } from '@/components/modal/more-modal';
import { AddProductModal } from '@/components/modal/add-modal';
import { ProductsTable } from '@/components/products-view/table';
import { ProductsCard } from '@/components/products-view/cards';


const ProductsPage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Products | null>(null);
  const [isTableDisplay, setIsTableDisplay] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>('');
  const [addProductModal, setAddProductModal] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);

  useEffect(() => {
    getProducts();
  }, [page, limit, searchValue]);

  const getProducts = async () => {
    try {
      const { data, total } = await fetchProducts(limit, page, searchValue);
      setProducts(data);
      setTotalCount(total);
      setTotalPages(Math.ceil(total / limit));
    } catch (error) {
      console.error('Ошибка получения продуктов:', error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setPage(1);
  };

  const handleShowMore = async (id: number) => {
    try {
      const showProduct = await fetchProductById(id);
      if (showProduct) {
        setSelectedProduct(showProduct);
        setShowModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddProduct = () => {
    setAddProductModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProductById(id);
      getProducts();
    } catch (error) {
      console.error('Ошибка удаления продукта:', error);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className='mt-[30px] flex justify-between w-full'>
        <input
          type="text"
          value={searchValue}
          onChange={handleSearch}
          placeholder="Поиск"
          className='p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] w-[240px] block rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none'
        />
        <div className='flex items-center justify-center h-fit'>
          <button
            type='button'
            onClick={() => setIsTableDisplay(true)}
            className='px-3 py-2 w-fit rounded-tl-lg rounded-bl-lg font-medium text-base transition duration-200 bg-slate-300 hover:bg-slate-400'
          >
            <Image src={StrokeIcon} alt="Stroke Icon" width={20} height={20} />
          </button>
          <button
            type='button'
            onClick={() => setIsTableDisplay(false)}
            className='px-3 py-2 w-fit rounded-tr-lg rounded-br-lg font-medium text-base transition duration-200 bg-slate-300 hover:bg-slate-400'
          >
            <Image src={CardIcon} alt="Card Icon" width={20} height={20} />
          </button>
          <div>
            <button
              type='button'
              className='mx-1 px-6 py-2 rounded-md font-medium text-base transition duration-200 bg-slate-300 hover:bg-slate-400'
              onClick={handleAddProduct}
            >
              Добавить
            </button>
          </div>
        </div>
      </div>

      {isTableDisplay ?
        <ProductsTable products={products} onShowMore={handleShowMore} />
        :
        <ProductsCard products={products} onShowMore={handleShowMore} />
      }

      <div className='flex justify-center mt-[20px] mb-[50px]'>
        <button
          type='button'
          onClick={handlePrevPage}
          disabled={page === 1}
          className='mr-2 px-2 py-1 rounded-md bg-slate-300 hover:bg-slate-400'
        >
          <Image src={prevIcon} alt='prev' width={16} height={16} />
        </button>
        <span className='px-2'>{page} / {totalPages}</span>
        <button
          type='button'
          onClick={handleNextPage}
          disabled={page === totalPages}
          className='ml-2 px-2 py-1 rounded-md bg-slate-300 hover:bg-slate-400'
        >
          <Image src={nextIcon} alt='next' width={16} height={16} />
        </button>
      </div>

      {addProductModal &&
        <AddProductModal product={selectedProduct} onClose={() => setAddProductModal(false)} />
      }
      {showModal &&
        <ProductModal product={selectedProduct} onClose={handleCloseModal} onDelete={handleDeleteProduct} />}
    </div>
  );
};

export default ProductsPage