'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface Step2QuestionsProps {
  onNext: () => void;
  onPrevious: () => void;
}

interface Option {
  id: number;
  option_text: string;
}

interface Question {
  id: number;
  question_text: string;
  options: Option[];
}

type FormData = {
  [key: string]: number; // key is question ID (as string), value is selected option ID
};

const Step2Questions: React.FC<Step2QuestionsProps> = ({ onNext, onPrevious }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [incorrectIds, setIncorrectIds] = useState<Set<number>>(new Set());

  const values = watch();

  useEffect(() => {
    fetch('https://memeforge.mooo.com/api/mcq/1/random/')
      .then(res => res.json())
      .then(setQuestions)
      .catch(console.error);
  }, []);

  const checkAnswer = async (questionId: number, selectedOptionId: number) => {
    const res = await fetch('https://memeforge.mooo.com/api/mcq/check/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question_id: questionId,
        selected_option_id: selectedOptionId,
      }),
    });
    const data = await res.json();
    return data.correct;
  };

  const onSubmit = async (data: FormData) => {
    setSubmitted(true);
    const incorrect = new Set<number>();

    await Promise.all(
      questions.map(async (q) => {
        const selected = data[q.id];
        const isCorrect = await checkAnswer(q.id, selected);
        if (!isCorrect) incorrect.add(q.id);
      })
    );

    setIncorrectIds(incorrect);

    if (incorrect.size === 0) {
      setTimeout(() => onNext(), 200);
    }
  };

  const Option = ({
    option,
    questionId,
  }: {
    option: Option;
    questionId: number;
  }) => {
    const selected = values[questionId];
    const isSelected = selected === option.id;
    const isWrong = submitted && isSelected && incorrectIds.has(questionId);
    const isCorrect = submitted && isSelected && !incorrectIds.has(questionId);

    return (
      <label
        className={`flex items-center px-4 py-3 border rounded-lg shadow-sm cursor-pointer transition duration-150
          ${isCorrect ? 'bg-green-100 border-green-500' : ''}
          ${isWrong ? 'bg-red-100 border-red-500' : ''}
          ${!isSelected ? 'bg-white border-gray-300' : ''}
          hover:shadow-md`}
      >
        <input
          type="radio"
          value={option.id}
          {...register(String(questionId), { required: true })}
          className="mr-3"
        />
        <span className="text-sm">{option.option_text}</span>
      </label>
    );
  };

  return (
    <div className="text-left space-y-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4 drop-shadow-[2px_2px_0px_#000]">
        Answer a few questions
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {questions.map((q, index) => (
          <div key={q.id}>
            <h3 className="text-lg font-semibold mb-3">
              {index + 1}. {q.question_text}
            </h3>
            <div className="grid gap-3 text-black">
              {q.options.map((opt) => (
                <Option key={opt.id} option={opt} questionId={q.id} />
              ))}
            </div>
            {errors[String(q.id)] && (
              <p className="text-gray-100 mt-2 text-sm">Please select one</p>
            )}
            {submitted && incorrectIds.has(q.id) && (
              <p className="text-gray-100 mt-2 text-sm">❌ Incorrect. Please try again.</p>
            )}
          </div>
        ))}

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
