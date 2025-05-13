'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Step2QuestionsProps {
  onNext: () => void;
  onPrevious: () => void;
}

type FormData = {
  question1: string;
  question2: string;
  question3: string;
};

const correctAnswers = {
  question1: 'Pepe',
  question2: 'Reddit',
  question3: 'They make me laugh',
};

const Step2Questions: React.FC<Step2QuestionsProps> = ({ onNext, onPrevious }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const [submitted, setSubmitted] = useState(false);

  const values = watch();

  const onSubmit = (data: FormData) => {
    setSubmitted(true);
    const allCorrect = Object.entries(correctAnswers).every(
      ([key, val]) => data[key as keyof FormData] === val
    );
    setTimeout(() => {
      if (allCorrect) {
        onNext();
      }
    }, 150); // small delay
  };

  const isWrong = (name: keyof FormData) =>
    submitted && values[name] && values[name] !== correctAnswers[name];

  const Option = ({
    value,
    name,
  }: {
    value: string;
    name: keyof FormData;
  }) => {
    const isSelected = values[name] === value;
    const isCorrect = correctAnswers[name] === value;
    const showCorrect = submitted && isSelected && isCorrect;
    const showWrong = submitted && isSelected && !isCorrect;

    return (
      <label
        className={`flex items-center px-4 py-3 border rounded-lg shadow-sm cursor-pointer transition duration-150
          ${showCorrect ? 'bg-green-100 border-green-500' : ''}
          ${showWrong ? 'bg-red-100 border-red-500' : ''}
          ${!isSelected ? 'bg-white border-gray-300' : ''}
          hover:shadow-md`}
      >
        <input
          type="radio"
          value={value}
          {...register(name, { required: true })}
          className="mr-3"
        />
        <span className="text-sm">{value}</span>
      </label>
    );
  };

  return (
    <div className="text-left space-y-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4 drop-shadow-[2px_2px_0px_#000]">
        Answer a few questions
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Question 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">1. Your favorite meme?</h3>
          <div className="grid gap-3 text-black">
            <Option value="Doge" name="question1" />
            <Option value="Pepe" name="question1" />
            <Option value="Troll Face" name="question1" />
          </div>
          {errors.question1 && (
            <p className="text-gray-100 mt-2 text-sm">Please select one</p>
          )}
          {isWrong('question1') && (
            <p className="text-gray-100 mt-2 text-sm">❌ Incorrect. Please try again.</p>
          )}
        </div>

        {/* Question 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">2. Best meme platform?</h3>
          <div className="grid gap-3 text-black">
            <Option value="Reddit" name="question2" />
            <Option value="Instagram" name="question2" />
            <Option value="X (Twitter)" name="question2" />
          </div>
          {errors.question2 && (
            <p className="text-gray-100 mt-2 text-sm">Please select one</p>
          )}
          {isWrong('question2') && (
            <p className="text-gray-100 mt-2 text-sm">❌ Incorrect. Please try again.</p>
          )}
        </div>

        {/* Question 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">3. Why do you love memes?</h3>
          <div className="grid gap-3 text-black">
            <Option value="They make me laugh" name="question3" />
            <Option value="They explain emotions" name="question3" />
            <Option value="They go viral fast" name="question3" />
          </div>
          {errors.question3 && (
            <p className="text-gray-100 mt-2 text-sm">Please select one</p>
          )}
          {isWrong('question3') && (
            <p className="text-gray-100 mt-2 text-sm">❌ Incorrect. Please try again.</p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 pb-14 md:pb-6">
          <button
            onClick={onPrevious}
            type="button"
            className="bg-gray-200 hover:bg-gray-300 text-black px-6 py-2 rounded-md transition drop-shadow-[2px_2px_0px_#000]"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-white hover:bg-gray-300 text-black px-6 py-2 rounded-md transition drop-shadow-[2px_2px_0px_#000]"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step2Questions;
