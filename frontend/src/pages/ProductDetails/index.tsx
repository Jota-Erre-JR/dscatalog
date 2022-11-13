import { ReactComponent as ArrowImage } from 'assets/images/arrow.svg';
import ProductPrice from 'components/ProductPrice';
import './styles.css';

const ProductDetails = () => {
  return (
    <div className="product-details-container">
      <div className="base-card product-details-card">
        <div className="goback-container">
          <ArrowImage />
          <h2>VOLTAR</h2>
        </div>
        <div className="row">
          <div className="col-xl-6">
            <div className="img-container">
              <img
                src="https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/2-big.jpg"
                alt="Nome do produto"
              />
            </div>
            <div className="name-price-container">
              <h1>Nome do Produto</h1>
              <ProductPrice price={1234.56} />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="description-container">
              <h2>Descrição do produto</h2>
              <p>
                Decrição do Produto Projetado para garantir a produtividade no
                seu dia a dia O desempenho que você precisa para uma jornada
                eficiente é garantido pelos processadores Intel da família Core
                -
                Conectividade ao seu alcance
                Saídas de áudio com qualidade HD e conexões USB estão dipooníveis na frontal do seu CorPc
                -
                Baixo consumo
                Mesmo trabalhando todos os dias, você não tera sustos na
                conta de energia. Fizemos tudo bem feito, para o seu CorPC seja
                eficiente, silencioso e econômico no consumo de energia elétrica
                -
                Multitarefas Seja um mestre em multitarefas com a capacidade
                para exibir quatro aplicativos simultâneos na tela. A tela está
                ficando abarrotada? Crie áreas de trabalho virtuais para obter
                mais espaço e trabalhar com os itens que você deseja. Além
                disso, todas as notificações e principais configurações são
                reunidas em uma única tela de fácil acesso. Sistema operacional
                completo com super pacote de programas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
