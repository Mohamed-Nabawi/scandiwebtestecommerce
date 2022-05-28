import React,{Component} from "react";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { store } from '../Redux/store'
import ProductDetails from './ProductDetails'
import './styles/product.css'

class Product extends Component{
    constructor(props){
        super(props)
        this.state = {
          currency: store.getState().currency,
        }
      }

      componentDidMount(){
        this.unsubscribe = store.subscribe(()=>{
          this.setState({
            currency: store.getState().currency,
          })
        })
      }
    
      componentWillUnmount(){
        this.unsubscribe()
      }
    render(){
        const currentCurrencyPrice = this.props.data.prices.find(currency=> currency.currency.label === this.state.currency)
        return(
            <div className="container">

            <Link to={`/product/${this.props.data.id}`}>
              <img
                src={this.props.data.gallery[0]}
                height="300"
                width="auto"
                alt={this.props.data.name}
                className="productImg"
                onClick={()=>this.props.changeProductID(this.props.data.id)}
              />
            </Link>
    
            <div className="details">
    
            
                <h4>{this.props.data.name}</h4>
    
                <h5>
                  {currentCurrencyPrice.currency.symbol}
                  {currentCurrencyPrice.amount}
                </h5>
    
                <hr />
    
                <ProductDetails
                  data={this.props.data}
    
                />
    
            </div>
    
          </div>
        );
      }
    }
    
    const mapDispatchToProps = (dispatch) => {
      return{
        changeProductID: (productID)=> dispatch({type: "PRODUCT_ID_UPDATE", productID: productID}),
      }
    }
export default connect(null,mapDispatchToProps) (Product)