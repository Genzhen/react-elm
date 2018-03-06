import React from 'react' 
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom'
import throttle from '../../util/throttle'
import './style.scss'

class FirstPageHeader extends React.Component {
    constructor(props){
        super(props)
        this.state={searchFixed:false}
        this.handleScroll = this.handleScroll.bind(this)
    }
    componentDidMount(){
        //节流
        this.scroll = throttle(this.handleScroll,16)
        window.addEventListener('scroll',this.scroll,false)
        
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.scroll,false)
    }
    handleScroll(){
        const node = ReactDOM.findDOMNode(this.refs.address)
        const {bottom} = node.getBoundingClientRect()
        if(bottom <= 0){
            this.setState({searchFixed:true})
        }
        else{
            this.setState({searchFixed:false})
        }
    }
   
    render(){
        const searchFixed = this.state.searchFixed
        const address = this.props.address
        return(
            <div className="first-page-header">
                <Link to={'/location'}>
                <div className="header-address" ref="address">
                    <i className="iconfont icon-coordinates_fill coordinates"></i> 
                    <span className="address">{address?address:"正在定位..."}</span>
                </div>
                </Link>
                {searchFixed
                    ?<div className="header-search">   
                    </div>
                    :""}
                <Link to={'/search'}>
                <div className={`header-search-input ${searchFixed?"search-fixed":""}`}>
                    
                    <div className="search-left"></div>
                    <div className="search-btn">
                        <i className="iconfont icon-sousuoxiao"></i>
                        <span>搜索商家、商品名称</span>
                    </div>
                    <div className="search-right"></div>
                    
                </div>
                </Link>
                
                

            </div>
        )
    }
    
}

export default FirstPageHeader ;