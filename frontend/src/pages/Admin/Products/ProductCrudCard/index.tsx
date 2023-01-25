import './styles.css';

import ProductPrice from 'components/ProductPrice';
import { Product } from 'types/product';
import CategoryBadge from '../CategoryBadge';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
};
const ProductCrudCard = ({ product }: Props) => {
  return (
    <div className="base-card product-crud-card">
      <div className="card-crud-top-container">
        <img src={product.imgUrl} alt={product.name} />
      </div>
      <div className="product-crud-card-description">
        <div className="card-crud-bottom-container">
          <h6>{product.name}</h6>
          <ProductPrice price={product.price} />
        </div>
        <div className="product-crud-categories-badges">
          {product.categories.map((category) => (
            <CategoryBadge name={category.name} key={category.id} />
          ))}
        </div>
      </div>
      <div className="product-crud-buttons-badges">
        <button className="btn btn-outline-delete">EXCLUIR</button>
        <Link to={`/admin/products/${product.id}`}>
        <button type="submit" className="btn btn-outline-edit">EDITAR</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCrudCard;
