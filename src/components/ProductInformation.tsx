// 'use client';
// import { useState } from 'react';

// const tabs = [
//   { name: 'Description', key: 'description' },
//   { name: 'Ingredients', key: 'ingredients' },
//   { name: 'Uses', key: 'uses' },
//   { name: 'Dosage', key: 'dosage' },
//   { name: 'Warning and Precautions', key: 'precautions' },
// ];

// interface Props {
//   product?: any;
// }
// const ProductInformation = ({ product }: Props) => {
//   const [activeTab, setActiveTab] = useState('description');
//   console.log(product, 'products');

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'description':
//         return (
//           <div className="transition-all duration-300">
//             <h2 className="text-xl font-medium font-robotoSlab">Description</h2>
//             <p className="text-sm font-robotoSlab mt-2">
//               {product?.description}
//             </p>
//           </div>
//         );
//       case 'ingredients':
//         return (
//           <div className="animate-fadeIn">
//             <h2 className="text-xl font-medium font-robotoSlab">Ingredients</h2>
//             <p className="text-sm font-robotoSlab mt-2">
//               {product?.ingredients}
//             </p>
//           </div>
//         );
//       case 'uses':
//         return (
//           <div className="animate-fadeIn">
//             <h2 className="text-xl font-medium font-robotoSlab">Uses</h2>
//             <ul className="list-disc pl-6 text-sm font-robotoSlab mt-2">
//               <li>{product?.uses}</li>
//             </ul>
//           </div>
//         );
//       case 'dosage':
//         return (
//           <div className="animate-fadeIn">
//             <h2 className="text-xl font-medium font-robotoSlab">Dosage</h2>
//             <p className="text-sm font-robotoSlab mt-2">
//               {product?.dosage || "To be used as per doctor's advice."}
//             </p>
//           </div>
//         );
//       case 'precautions':
//         return (
//           <div className="animate-fadeIn">
//             <h2 className="text-xl font-medium font-robotoSlab">
//               Precautions & Warnings
//             </h2>
//             <p className="text-sm font-robotoSlab mt-2">
//               {product?.warnings ||
//                 'Do not take more than recommended dose as excessive intake can lead to kidney stones or kidney failure.'}
//             </p>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="w-full">
//       <div className="max-w-3xl mx-auto p-4">
//         <h2 className="text-2xl font-bold text-center">Product Information</h2>
//         <div className="flex sm:flex-row flex-wrap justify-center mt-4 border-b border-gray-200">
//           {tabs.map((tab) => (
//             <span
//               key={tab.key}
//               className={`px-4 py-2 text-base font-semibold font-robotoSlab cursor-pointer relative ${
//                 activeTab === tab.key
//                   ? 'text-teal-500'
//                   : 'text-textColor hover:text-teal-400'
//               }`}
//               onClick={() => setActiveTab(tab.key)}
//             >
//               {tab.name}
//               {activeTab === tab.key && (
//                 <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-500"></span>
//               )}
//             </span>
//           ))}
//         </div>
//       </div>
//       <div className="w-11/12 mx-auto p-6 bg-white rounded-lg shadow-sm">
//         <div className="transition-opacity duration-300 ease-in-out">
//           {renderTabContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductInformation;


'use client';

interface Props {
  product?: any;
}

const ProductInformation = ({ product }: Props) => {
  return (
    <div className="w-full bg-white">
      <div className="p-8">
        <div className="max-w-4xl space-y-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Uses And Safety</h1>

          {/* Description Section */}
          {product?.description && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Ingredients Section */}
          {product?.ingredients && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Ingredients</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.ingredients}
              </p>
            </div>
          )}

          {/* Uses Section */}
          {product?.uses && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Uses</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.uses}
              </p>
            </div>
          )}

          {/* Dosage Section */}
          {product?.dosage && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Dosage</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.dosage}
              </p>
            </div>
          )}

          {/* Warning and Precautions Section */}
          {product?.warnings && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Warning and Precautions</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.warnings}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProductInformation;