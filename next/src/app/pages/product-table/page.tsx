
import StrokeIcon from '@/assets/icons/Stroke.svg'
import CardIcon from '@/assets/icons/Card.svg'

import Image from 'next/image';
const ProductsTable = () => {
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Moderator' },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className='mt-20 flex justify-between w-full'>
        <input type="text"
          placeholder="Поиск"
          className='p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] py-[3px] w-[240px] block rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none '
        />
        <div className='flex items-center justify-center h-fit'>
          <button
            type='submit'
            className='px-3 py-2 w-fit rounded-tl-lg rounded-bl-lg font-medium text-base transition duration-200 bg-slate-300 hover:bg-slate-400'>
            <Image src={StrokeIcon} alt="Stroke Icon" width={20} height={20} />
          </button>
          <button
            type='submit'
            className='px-3 py-2 w-fit rounded-tr-lg rounded-br-lg font-medium text-base transition duration-200 bg-slate-300 hover:bg-slate-400'>
            <Image src={CardIcon} alt="Stroke Icon" width={20} height={20} />
          </button>
          <div>
            <button type='submit' className='mx-1 px-6 py-2 rounded-md font-medium text-base transition duration-200 bg-slate-300 hover:bg-slate-400'>
              Добавить
            </button>
          </div>
        </div>
      </div>


      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-4xl mx-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Фото</th>
                <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Название</th>
                <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Количество</th>
                <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Производитель</th>
                <th className="py-3 px-6 bg-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Цена</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="bg-white border-b hover:bg-gray-100">
                  <td className="py-4 px-6 text-sm font-medium text-gray-900">{item.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{item.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{item.email}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">{item.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
export default ProductsTable