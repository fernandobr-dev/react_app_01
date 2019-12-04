import React, {Component} from 'react';
import api from '../../services/api';
import './styles.css';

export default class Main extends Component {

    state = {
        products: [],
        productInfo: {},
        page: 1,
    }

    // didMount -> assim que o componente é apresentado em tela.
    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = response.data;

        this.setState({products: docs, productInfo, page });
    }

    // página anterior
    prevPage = () => {
        const { page, productInfo } = this.state;

        if(page === 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber);
    }

    // próxima página
    nextPage = () => {
        const { page, productInfo } = this.state;

        if(page == productInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    }

    render() {

        const { products, page } = this.state;

        return (
            <div className="product-list">
                {products.map(product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>
                        
                        <a href="">Acessar</a>
                    </article>
                ))}
                <div className="actions">
                    <button onClick={this.prevPage}>Anterior</button>
                    <button onClick={this.nextPage}>Próximo</button>
                </div>
                <div className="pagination">
                    <p>Página {page}</p>
                </div>
            </div>
            
        );
    }
}