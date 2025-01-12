import React from 'react';

const ProductList = ({ products, onAddToCart }) => {
  // Agrupar productos por categoría
  const groupedProducts = products.reduce((groups, product) => {
    const category = product.categoria;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(product);
    return groups;
  }, {});

  // Ordenar productos dentro de cada categoría
  Object.keys(groupedProducts).forEach((category) => {
    groupedProducts[category].sort((a, b) => a.nombre.localeCompare(b.nombre));
  });

  return (
    <div className="principal-product-list">
      {Object.keys(groupedProducts).map((category) => (
        <div key={category} className="principal-category-section">
          <h3>{category}</h3>

          <div className="principal-products">
            {groupedProducts[category].map((product) => (
              <div
                key={product._id}
                className={`principal-product-card ${product.inventario === 0 ? 'principal-out-of-stock' : ''}`}
              >
                <img src={product.imagen_url && product.imagen_url.startsWith('http') ? product.imagen_url : ` /img/${product.imagen_url || 'default-image.jpg'}` } alt={product.nombre || 'Producto sin nombre'} />
              
                <div className="principal-product-info">
                  <h4>{product.nombre}</h4>
                  <p>{product.descripcion}</p>
                </div>
                <p className="principal-price">${product.precio.toFixed(2)}</p>
                {product.inventario === 0 ? (
                  <p className="principal-out-of-stock-message">Producto agotado</p> // Mensaje si está agotado
                ) : (
                  <div className="principal-controls">
                    <button 
                      onClick={() => onAddToCart(product)} 
                      disabled={product.inventario === 0}
                      className={product.inventario === 0 ? 'principal-disabled' : ''}
                    >
                      Agregar al Carrito
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
