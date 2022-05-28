import React, { Component } from 'react'
import { graphql } from '@apollo/client/react/hoc';
import { gql } from "@apollo/client";
import {store}from '../Redux/store';
import Product from './Product'
import './styles/products.css'



class Products extends Component{
  constructor(props){
    super(props)
    this.state = {
      category: store.getState().category,
      currency: store.getState().currency
    }
  }

  componentDidMount(){
    this.unsubscribe = store.subscribe(()=>{
      this.setState({category: store.getState().category, currency: store.getState().currency})
    })
  }

  componentWillUnmount(){
    this.unsubscribe()
  }
  
  productList(){
    if(!this.props.data.loading){
      const categories=this.props.data.categories;

      const {products}=categories.find(category=>category.name ===this.state.category)
      console.log(categories)
      return(
        products.map(product=>{
          const currentCurrencyPrice = product.prices.find(currency=> currency.currency.label === this.state.currency)

          return           <Product data={product} price={currentCurrencyPrice} key={product.id} />

        })
      )
      
    } else return <h1>Loading...</h1>
  }
    
    render(){
      
        console.log(this.props)
        return(
          <div className="container">
          {this.props.data.categories && (
            <>
              <h1>{this.state.category.toUpperCase()}</h1>
  
              <div className="productsList">{this.productList()}</div>
            </>
          )}
        </div>  
        )
    }
        
    
}
const GET_DATA =gql`{
  categories{
    name
    products{
      id
      name
      brand
      inStock
      gallery
      prices{
        amount
        currency{
          symbol
          label
        }
      }
      attributes{
        type
        name
        items{
          value
          displayValue
          id
        }
      }
    }
  }
}`
export default graphql(GET_DATA)(Products);