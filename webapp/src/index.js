
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import UsersList from './components/UsersList';
import AddUser from './components/AddUser';
import ProductsList from './components/ProductsList';
import AddProduct from './components/AddProduct';

class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      products:[],
      username: '',
      email: '',
      productname: ''
    }
 }
  componentDidMount() {
    this.getUsers();
    this.getProducts();
  }
  getUsers() {
    axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
    .then((res) => {this.setState({users:res.data.data.users}) })
    .catch((err) => { console.log(err); })
  }
  addUser(event) {
    event.preventDefault();
    const data = {
      username: this.state.username,
      email: this.state.email
    }
    axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
    .then((res) => {
      this.getUsers();
      this.setState({ username: '', email: '' });
    })
    .catch((err) => { console.log(err); })
  }
  getProducts() {
    axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/products`)
    .then((res) => {this.setState({products:res.data}) })
    .catch((err) => { console.log(err); })
  }
  addProduct(event) {
    event.preventDefault();
    const data = {
      productname: this.state.productname,
    }
    axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/products`, data)
    .then((res) => {
      this.getProducts();
      this.setState({ productname: ''});
    })
    .catch((err) => { console.log(err); })
  }
  handleChange(event) {
    const obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <br/>
            <h1>All Users</h1>
            <hr/><br/>
            <AddUser
              username={this.state.username}
              email={this.state.email}
              handleChange={this.handleChange.bind(this)}
              addUser={this.addUser.bind(this)}
            />
            <br />
            <UsersList users={this.state.users} />
            <br />
            <h1>All Products</h1>
            <hr/><br/>
            <AddProduct
              productname={this.state.productname}
              handleChange={this.handleChange.bind(this)}
              addProduct={this.addProduct.bind(this)}
            />
          <hr/><br/>
            <ProductsList products={this.state.products} />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
