import { Controller, useForm } from 'react-hook-form';
import './styles.css';
import { Product } from 'types/product';
import { requestBackend } from 'util/requests';
import { AxiosRequestConfig } from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { Category } from 'types/category';
import CurrencyInput from 'react-currency-input-field';
import { toast } from 'react-toastify';

type UrlParams = {
  productId: string;
};

const Form = () => {
  const { productId } = useParams<UrlParams>();

  const isEditing = productId !== 'create';

  const history = useHistory();

  const [selectCategories, setSelectCategories] = useState<Category[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Product>();

  useEffect(() => {
    requestBackend({ url: '/categories' }).then((response) => {
      setSelectCategories(response.data.content);
    });
  }, []);

  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/products/${productId}` }).then((response) => {
        const product = response.data as Product;

        setValue('name', product.name);
        setValue('price', product.price);
        setValue('description', product.description);
        setValue('imgUrl', product.imgUrl);
        setValue('categories', product.categories);
      });
    }
  }, [isEditing, productId, setValue]);

  const onSubmit = (formData: Product) => {
    const data = {
      ...formData,
      price: String(formData.price).replace(',', '.'),
    };

    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/products/${productId}` : '/products',
      data,
      withCredentials: true,
    };
    requestBackend(config)
      .then(() => {
        toast.info('Produto cadastrado com sucesso!');
        history.push('/admin/products');
      })
      .catch(() => {
        toast.error('Erro ao cadastrar produto!');
      });
  };

  const handleCancel = () => {
    history.push('/admin/products');
  };

  return (
    <>
      <div className="product-crud-container">
        <div className="base-card product-crud-form-card">
          <h1 className="product-crud-form-title">DADOS DO PRODUTO</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row product-crud-input-container">
              <div className="col-lg-6 product-crud-input-left-container">
                <div className="margin-bottom-30">
                  <input
                    {...register('name', {
                      required: 'Campo obrigatório!',
                    })}
                    type="text"
                    className={`form-control base-input ${
                      errors.name ? `is-invalid` : ''
                    }`}
                    placeholder="Nome do produto"
                    name="name"
                    data-testid="name"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.name?.message}
                  </div>
                </div>

                <div className="margin-bottom-30">
                  <label htmlFor="categories" className="d-none">
                    Categorias
                  </label>
                  <Controller
                    name="categories"
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        classNamePrefix="product-crud-select"
                        options={selectCategories}
                        isMulti
                        getOptionLabel={(category: Category) => category.name}
                        getOptionValue={(category: Category) =>
                          String(category.id)
                        }
                        inputId="categories"
                      />
                    )}
                  />
                  {errors.categories && (
                    <div className="invalid-feedback d-block">
                      Campo obrigatório!
                    </div>
                  )}
                </div>

                <div className="margin-bottom-30">
                  <Controller
                    name="price"
                    rules={{ required: 'Campo obrigatório!' }}
                    control={control}
                    render={({ field }) => (
                      <CurrencyInput
                        className={`form-control base-input ${
                          errors.price ? `is-invalid` : ''
                        }`}
                        placeholder="Preço"
                        name="price"
                        data-testid="price"
                        disableGroupSeparators={true}
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    )}
                  />
                  <div className="invalid-feedback d-block">
                    {errors.price?.message}
                  </div>
                </div>

                <div className="margin-bottom-30">
                  <input
                    {...register('imgUrl', {
                      required: 'Campo obrigatório!',
                      pattern: {
                        value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                        message: 'Deve ser uma URL válida!',
                      },
                    })}
                    type="text"
                    className={`form-control base-input ${
                      errors.imgUrl ? `is-invalid` : ''
                    }`}
                    placeholder="Imagem do produto"
                    name="imgUrl"
                    data-testid="imgUrl"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.imgUrl?.message}
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div>
                  <textarea
                    rows={10}
                    {...register('description', {
                      required: 'Campo obrigatório!',
                    })}
                    className={`form-control base-input h-auto ${
                      errors.price ? `is-invalid` : ''
                    }`}
                    placeholder="Descrição"
                    name="description"
                    data-testid="description"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.description?.message}
                  </div>
                </div>
              </div>
            </div>
            <div className="product-crud-buttons-container">
              <button className="btn btn-cancel" onClick={handleCancel}>
                CANCELAR
              </button>
              <button className="btn btn-save">SALVAR</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
