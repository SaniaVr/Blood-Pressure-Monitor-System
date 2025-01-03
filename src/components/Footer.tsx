import React from 'react';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-indigo-600 border-t mt-8">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center">
          <p className="flex items-center text-sm text-white">
            Created with <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" /> by Sania Verma
          </p>
          <p className="text-sm mt-1 text-yellow-300">
            (Dedicated to my father)
          </p>
          <p className="text-sm mt-1 text-white font-bold">
            Connect with me:
            <a
              href="https://www.linkedin.com/in/sania-verma-21a642291/" className='ml-2 underline' >
              LinkedIn
            </a>
            &emsp;
            <a
              href="https://www.github.com/SaniaVr" className='ml-2 underline' >
              Github
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}