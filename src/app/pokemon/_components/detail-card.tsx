import Link from "next/link";
import { ReactNode } from "react";

interface DetailCardProps {
  icon: ReactNode;
  title: string;
  content: ReactNode;
}

export const DetailCard: React.FC<DetailCardProps> = ({ icon, title, content }) => (
  <div className="bg-white border border-gray-100 rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center mb-3">
      {icon}
      <h2 className="text-xl font-bold ml-3 text-gray-800">{title}</h2>
    </div>
    {content}
  </div>
);


interface ErrorMessageProps {
    message: string;
  }
  
  export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
        <p className="text-2xl text-red-500 font-bold">{message}</p>
        <Link 
          href="/pokemon" 
          className="mt-4 inline-block bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors"
        >
          Return to Pokémon List
        </Link>
      </div>
    </div>
  );