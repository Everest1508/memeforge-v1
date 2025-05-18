'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';

interface Step3UserInfoProps {
  onNext: () => void;
  onPrevious: () => void;
  handleUserInfoChange: (info: { name: string; username: string }) => void;
}

type FormData = {
  name: string;
  username: string;
};

const Step3UserInfo: React.FC<Step3UserInfoProps> = ({
  onNext,
  onPrevious,
  handleUserInfoChange,
}) => {
  const { data: session } = useSession();
  const { register, handleSubmit, setValue, getValues } = useForm<FormData>();

  useEffect(() => {
    if (session?.user) {
      setValue('name', session.user.name || '');
      setValue(
        'username',
        session.user.name?.toLowerCase().replace(/\s+/g, '') || ''
      );
    }
  }, [session, setValue]);

  const onSubmit = (data: FormData) => {
    handleUserInfoChange(data);
    onNext();
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">User Information</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name">Name</label>
          <input
            {...register('name', { required: true })}
            type="text"
            id="name"
            className="w-full p-2 text-gray-600 rounded-xl drop-shadow-[2px_2px_0px_#000]"
          />
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <input
            {...register('username', { required: true })}
            type="text"
            id="username"
            className="w-full p-2 text-gray-600 rounded-xl drop-shadow-[2px_2px_0px_#000]"
          />
        </div>

        <div className="flex justify-between pt-6">
          <button
            onClick={onPrevious}
            type="button"
            className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-md transition drop-shadow-[2px_2px_0px_#000]"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-md transition drop-shadow-[2px_2px_0px_#000]"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step3UserInfo;
