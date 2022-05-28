import React,{Component} from 'react'
import {Link}from 'react-router-dom'
import logo from '../../images/logo.png'
import Bag from '../../images/Bag.png'
import './Nav.css'
import {store} from  '../../Redux/store'
import { connect } from "react-redux";
import MiniBag from './MiniBag'
 
     class Navs extends Component{

      constructor(props) {
        super(props);
        this.state = {
          currency: store.getState().currency,
          isMiniBagOpen: false,
        };
      }

      componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
          this.setState({ currency: store.getState().currency });
        });
      }
    
      showMiniBag = () => {
        this.setState({
          isMiniBagOpen: !this.state.isMiniBagOpen,
        });
    
        if (window.location.pathname.split("/")[1] === "bag") {
          this.setState({
            isMiniBagOpen: false,
          });
        }
      };
      handleCurrency = (e) => {
        localStorage.setItem("preferredCurrency", e.target.value);
        this.props.changeCurrency(e.target.value);
      };
       render(){
         console.log(this.props)
         return(
           <nav className='navcontainer'>
             <Link to='/' >
               <img src={logo} alt='logo icon' className='logo' width={38}/>
             </Link>
             <div className='catigories'>
               <span className='category'
               onClick={()=>this.props.changeCategory('all')}>
                 All
               </span>
               <span className='category'
                onClick={()=>this.props.changeCategory('tech')}>
                 Tech
               </span>
               <span className='category'
                onClick={()=>this.props.changeCategory('clothes')}>
                 Clothes
               </span>
          

             </div>
             <div className='currency'>
             <select
             value={this.state.currency}
             onChange={this.handleCurrency} >
               <option>USD</option>
               <option>GBP</option>
               <option>AUD</option>
               <option>JPY</option>
               <option>RUB</option>
             </select>
             <button  onClick={this.showMiniBag}>
             <img src={Bag} alt='cart icon' width={40}/>
             <span className='badg'>{this.props.bagItemsCount}</span>
             </button>
             </div>
             {this.state.isMiniBagOpen && <MiniBag />}
           </nav>
         )
       }
     }
     const mapStateToProps = (state) => {
      return {
        bagItemsCount: state.bag.length,
      };
    };
    const mapDispatchToProps = (dispatch) => {
      return {
        changeCategory: (category) =>
          dispatch({ type: "CATEGORY_UPDATE", category: category }),
        changeCurrency: (currency) =>
          dispatch({ type: "CURRENCY_UPDATE", currency: currency }),
      };}
     export default connect(mapStateToProps,mapDispatchToProps)(Navs)