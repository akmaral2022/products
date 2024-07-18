import React from 'react';

interface ConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="flex flex-col items-center justify-evenly bg-[#F1F5F9] w-[338px] h-fit rounded-[10px] py-[20px] gap-[30px]">
        <h2 className="font-inter font-medium text-center leading-[29.05px] px-[30px]">Вы действительно хотите удалить товар?</h2>
        <div className='flex gap-[10px]'>
          <button
            onClick={onConfirm}
            className="px-3 py-2 w-fit rounded-md font-medium text-[#ffffff] transition duration-200 bg-[#404040] hover:bg-slate-400"
          >
            Удалить
          </button>
          <button
            onClick={onCancel}
            className="px-3 py-2 w-fit rounded-md font-medium text-base transition duration-200 bg-серый-300 hover:bg-серый-400"
          >
            Назад
          </button>
        </div>
      </div>
    </div>
  );
};
