import { ReactComponent as ArrowImage } from 'assets/images/arrow.svg';
import axios from 'axios';
import ProductPrice from 'components/ProductPrice';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Product } from 'types/product';
import { BASE_URL } from 'util/requests';
import ProductDetailsLoader from './ProductDetailsLoader';
import ProductInfoLoader from './ProductInfoLoader';
import './styles.css';

type UrlParams = {
  productId: string;
};
const ProductDetails = () => {
  const { productId } = useParams<UrlParams>();

  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  return (
    <>
      <div className="product-details-container">
        <div className="base-card product-details-card">
          <Link to="/products/">
            <div className="goback-container">
              <ArrowImage />
              <h2>VOLTAR</h2>
            </div>
          </Link>
          <div className="row">
            <div className="col-xl-6">
              {isLoading ? (
                <ProductInfoLoader />
              ) : (
                <>
                  <div className="img-container">
                    <img src={product?.imgUrl} alt={product?.name} />
                  </div>
                  <div className="name-price-container">
                    <h1>{product?.name}</h1>
                    {product && <ProductPrice price={product?.price} />}
                  </div>
                </>
              )}
            </div>
            <div className="col-xl-6">
              {isLoading ? (
                <ProductDetailsLoader />
              ) : (
                <>
                  <div className="description-container">
                    <h2>Descrição do produto</h2>
                    <p>{product?.description}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
