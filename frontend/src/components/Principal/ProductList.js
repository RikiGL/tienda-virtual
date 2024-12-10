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
    <div className="product-list">
      {Object.keys(groupedProducts).map((category) => (
        <div key={category} className="category-section">
          <h3>{category}</h3>
          {/* Contenedor para productos en fila */}
          <div className="products">
            {groupedProducts[category].map((product) => (
              <div
                key={product.id}
                className={`product-card ${product.inventario === 0 ? 'out-of-stock' : ''}`}
              >
                <img src={`./img/${product.imagen_url}`} alt={product.nombre} />
                <div className="product-info">
                  <h4>{product.nombre}</h4>
                  <p>{product.descripcion}</p>
                  </div>
                  <p className="price">${product.precio.toFixed(2)}</p>
                  {product.inventario === 0 ? (
                    <p className="out-of-stock-message">Producto agotado</p> // Mensaje si está agotado
                  ) : (
                    <div className="controls">
                      <button 
                        onClick={() => onAddToCart(product)} 
                        disabled={product.inventario === 0}
                        className={product.inventario === 0 ? 'disabled' : ''}
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