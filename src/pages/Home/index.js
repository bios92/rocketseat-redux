import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { bindActionCreators } from 'redux';
import api from '../../services/api';
import { ProductList } from './styles';
import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';

class Home extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('products');

    // formantando o preco pra pt-br
    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

  handleAddProduct = product => {
    // todo component recebe essa funcao por meio da props quando se conecta com o redux
    const { addToCart } = this.props;

    addToCart(product);
  };

  // É interessante fazer as tratativas antes de chegar no render para manter a performance
  render() {
    const { products } = this.state;

    return (
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>

            <button
              type="button"
              onClick={() => this.handleAddProduct(product)}
            >
              <div>
                <MdAddShoppingCart size={16} color="#fff" />
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}

// possibilita o acesso das actions por meio de props
const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

// O primeiro parametro eh para o mapStateToProps
export default connect(null, mapDispatchToProps)(Home);
