// import React from 'react';
// import { format } from 'date-fns';
// import { Search, Book, Clock, BookMarked } from 'lucide-react';
// import Sidebar from '../components/Sidebar';

// const StudentDashboard = () => {
//   const currentDate = format(new Date(), 'MMMM d, yyyy');
//   const currentTime = format(new Date(), 'h:mm a');

//   const cards = [
//     { title: 'Lended Books', count: 2, icon: Book, color: 'bg-blue-500' },
//     { title: 'Borrowed Books', count: 3, icon: BookMarked, color: 'bg-green-500' },
//     { title: 'Reserved Books', count: 1, icon: Clock, color: 'bg-purple-500' },
//   ];

//   const newArrivals = [
//     {
//       id: 1,
//       title: 'The Psychology of Money',
//       author: 'Morgan Housel',
//       cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200',
//     },
//     {
//       id: 2,
//       title: 'Atomic Habits',
//       author: 'James Clear',
//       cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200',
//     },
//     // Add more new arrivals as needed
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Sidebar />
      
//       <div className="ml-64 p-8">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">Hello, John</h1>
//             <p className="text-gray-600">{currentDate} | {currentTime}</p>
//           </div>
          
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search books..."
//               className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
//             />
//             <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
//           </div>
//         </div>

//         <div className="grid grid-cols-3 gap-6 mb-8">{cards.map((card, index) => (
//   <div key={index} className="bg-white rounded-lg shadow-md p-6">
//     <div className={`inline-block p-3 rounded-lg ${card.color} text-white mb-4`}>
//       <card.icon className="w-6 h-6" />
//     </div>
//     <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
//     <p className="text-3xl font-bold text-gray-900 mt-2">{card.count}</p>
//   </div>
// ))}
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Library Operating Hours</h2>
//           <p className="text-gray-600">
//             Monday to Saturday: 9AM to 7PM<br />
//             Sunday: Closed
//           </p>
//         </div>

//         <div>
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">New Arrivals</h2>
//           <div className="grid grid-cols-4 gap-6">
//             {newArrivals.map((book) => (
//               <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//                 <img src={book.cover} alt={book.title} className="w-full h-48 object-cover" />
//                 <div className="p-4">
//                   <h3 className="font-semibold text-gray-800">{book.title}</h3>
//                   <p className="text-gray-600 text-sm">{book.author}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;

import React from 'react';
import { format } from 'date-fns';
import { Search, Book, Clock, BookMarked } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const StudentDashboard = () => {
  const currentDate = format(new Date(), 'MMMM d, yyyy');
  const currentTime = format(new Date(), 'h:mm a');

  const firstName = localStorage.getItem('studentFirstName') || 'Student';  // <-- Fetch name

  const cards = [
    { title: 'Lended Books', count: 0, icon: Book, color: 'bg-blue-500' },   // <-- Set to 0
    { title: 'Borrowed Books', count: 0, icon: BookMarked, color: 'bg-green-500' },  // <-- Set to 0
    { title: 'Reserved Books', count: 0, icon: Clock, color: 'bg-purple-500' }  // <-- Set to 0
  ];

  const newArrivals = [
    {
      id: 1,
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200',
    },
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Hello, {firstName}</h1>  {/* <-- Dynamic */}
            <p className="text-gray-600">{currentDate} | {currentTime}</p>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search books..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          {cards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className={`inline-block p-3 rounded-lg ${card.color} text-white mb-4`}>
                <card.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{card.count}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Library Operating Hours</h2>
          <p className="text-gray-600">
            Monday to Saturday: 9AM to 7PM<br />
            Sunday: Closed
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">New Arrivals</h2>
          <div className="grid grid-cols-4 gap-6">
            {newArrivals.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={book.cover} alt={book.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">{book.title}</h3>
                  <p className="text-gray-600 text-sm">{book.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
