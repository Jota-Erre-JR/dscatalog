import './styles.css';

const Form = () => {
  return (
    <>
      <div className="product-crud-container">
        <div className="base-card product-crud-form-card">
          <h1 className="product-crud-form-title">DADOS DO PRODUTO</h1>
          <form>
            <div className="row product-crud-input-container">
              <div className="col-lg-6 product-crud-input-left-container">
                <div className="margin-bottom-30">
                  <input type="text" className="base-input form-control" />
                </div>
                <div className="margin-bottom-30">
                  <input
                    type="text"
                    list="genre"
                    className="base-input form-control"
                  />
                  <datalist id="genre"></datalist>
                </div>
                <div>
                  <input type="text" className="base-input form-control" />
                </div>
              </div>
              <div className="col-lg-6">
                <div>
                  <textarea
                    name=""
                    rows={10}
                    className="form-control base-input h-auto"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="product-crud-buttons-container">
              <button className="btn btn-cancel">CANCELAR</button>
              <button className="btn btn-save">SALVAR</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
