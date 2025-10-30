
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
              <div className="max-h-60 overflow-y-auto overflow-x-hidden pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          )}

          {/* Ingredients Section */}
          {product?.ingredients && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Ingredients</h2>
              <div className="max-h-60 overflow-y-auto overflow-x-hidden pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {product.ingredients}
                </p>
              </div>
            </div>
          )}

          {/* Uses Section */}
          {product?.uses && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Uses</h2>
              <div className="max-h-60 overflow-y-auto overflow-x-hidden pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {product.uses}
                </p>
              </div>
            </div>
          )}

          {/* Dosage Section */}
          {product?.dosage && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Dosage</h2>
              <div className="max-h-60 overflow-y-auto overflow-x-hidden pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {product.dosage}
                </p>
              </div>
            </div>
          )}

          {/* Warning and Precautions Section */}
          {product?.warnings && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Warning and Precautions</h2>
              <div className="max-h-60 overflow-y-auto overflow-x-hidden pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {product.warnings}
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProductInformation;