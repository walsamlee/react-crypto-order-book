import React, { Component } from 'react';

class Layout extends Component {
    state = {
        loading: true,
        currency: [],
        order_book: [],
        selected_currency: '',
    }

    async componentDidMount() {
        const url = "https://www.bitstamp.net/api/v2/trading-pairs-info/";
        const recieved_data = await fetch(url);
        const currency_pair = await recieved_data.json()

        currency_pair && this.setState({ 
            loading: false,
            currency: currency_pair,
        });
    }

    changeHandler = async (event) => {
        const { target: {value} } = event;
        const { currency } = this.state;
        if (value === "0") {
            alert('No selection');
        }
        else {
            for(let i = 0; i < currency.length; i++) {
                if(value === currency[i].name) {
                    const url = `https://www.bitstamp.net/api/v2/order_book/${currency[i].url_symbol}/`;
                    const recieved_data = await fetch(url);
                    const order_book = await recieved_data.json();

                    this.setState({
                        order_book,
                    })
                }
            }
        }
    }

    render() {
        const pairs = this.state.currency;
        const order_books = this.state.order_book;
        return (
            this.state.loading ? 
            <div>
                <p>Loading...</p>
            </div>
            : <div>
                <h1 className="title-header">Busha</h1>
                <h3 className="order-bookings-header">Order Books</h3>
                <select name="currency" onChange={this.changeHandler}>
                    <option value="0">select a currency pair</option>
                    {
                        pairs.map(pair => (<option value={pair.name}>{pair.name}</option>))
                    }
                </select>
                <div className="order-bookings">
                    <div className="asks">
                        <p>Asks</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Price</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    order_books.length !== 0 && order_books.asks.map(book => (
                                        <tr>
                                            <td>{book[0]}</td>
                                            <td>{book[1]}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="bids">
                        <p>Bids</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Price</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    order_books.length !== 0 && order_books.bids.map(book => (
                                        <tr>
                                            <td>{book[0]}</td>
                                            <td>{book[1]}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Layout