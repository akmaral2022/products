'use client'
import { AuthResponse } from '@/types/auth';
import axios from 'axios';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function Auth() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<AuthResponse>('http://localhost:3002/login', {
        email: emailValue,
        password: passwordValue
      });

      const data = response.data;
      if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = '/pages/main-maket';
      }
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      setErrorMessage('Ошибка авторизации. Проверьте почту и пароль.');
    }
  };

  return (
    <div>
      <div className='flex justify-center items-center min-h-screen bg-slate-100 text-zinc-900'>
        <div className='absolute inset-0 flex flex-col'>
          <div className='h-2/5 bg-slate-800' />
        </div>
        <div className='relative flex justify-center items-center min-h-screen'>
          <form className='bg-slate-200 px-8 py-7 rounded-[10px] shadow-md w-[360px] flex flex-col gap-10' onSubmit={handleSubmit}>
            <h2 className='text-center'>Авторизация</h2>
            {errorMessage && <div className='text-red-500 text-center'>{errorMessage}</div>}
            <div className='flex flex-col gap-9 pt-8 pb-[10px]'>
              <div className='flex flex-col gap-1'>
                <h6>Почта</h6>
                <input
                  type='email'
                  placeholder='Почта'
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  autoComplete='email'
                  className='p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none'
                />
              </div>
              <div className='flex flex-col gap-1'>
                <h6>Пароль</h6>
                <input
                  type='password'
                  placeholder='Пароль'
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  autoComplete='password'
                  className='p-text bg-[#C9CFD8] placeholder:text-[#888F99] pl-[10px] py-[6px] block w-full rounded-md border focus:border-[#C9CFD8] focus:bg-transparent outline-none'
                />
              </div>
            </div>
            <div className='block mx-auto'>
              <button type='submit' className='px-6 py-2 rounded-md font-medium text-base transition duration-200 bg-slate-300 hover:bg-slate-400'>
                Войти
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
