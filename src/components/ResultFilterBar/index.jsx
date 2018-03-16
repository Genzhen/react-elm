import React,{Component} from 'react'
import FilterNav from '../FilterNav'
import AllCategory from '../AllCategory'
import './style.scss'

export default class ResultFilterBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            showFliter:false,
            orderText:"综合排序",
            categoryText:"分类",
            order:0
        }
        this.handleSetFilterMore = this.handleSetFilterMore.bind(this)
        this.handleHiddenFilter = this.handleHiddenFilter.bind(this)
        this.handleClickCategory = this.handleClickCategory.bind(this)
    }

    handleHiddenFilter(){
        this.setState({showFliter:false})
        document.body.style.overflow = "visible"
        document.getElementsByTagName('body')[0].style.height = "auto"
    }

    handleCilck(show){
        const showFliter = this.state.showFliter
        if(!!showFliter && showFliter === show){
            this.handleHiddenFilter()
        }else{
            this.setState({showFliter:show})
            document.body.style.overflow = "hidden"
            document.getElementsByTagName('body')[0].style.height = window.innerHeight+'px'
        }
    }

    handleSortClick(index){
        const {onClick} = this.props
        const orderArr = ["综合排序","销量最高","起送价最低","配送最快"]
        const order = this.state.order
        if(order === index) return
        this.setState({orderText:orderArr[index],order:index})
        this.handleHiddenFilter()
        onClick&&onClick(index)
    }

    handleSetFilterMore(delivery,activity,support_ids,cost){
        this.handleHiddenFilter()
        this.props.setFilterMore(delivery,activity,support_ids,cost)
    }

    handleClickCategory(id,subcategory){
        // const text = subcategory
        this.handleHiddenFilter()    
        // this.setState({categoryText:value})
        this.props.setSubMenuId(id)
    }

    render(){
        const {showFliter,orderText,order,categoryText} = this.state
        const orderArr = ["综合排序","销量最高","起送价最低","配送最快"]
        const {delivery,activity,support_ids, cost, category,setMainMenuId,mainCategoryId,subCategoryId} = this.props
        const fliterMore = this.props.filterMore
        console.log("11111111",category)
        return(
            <div className="result-filter-bar">
                <ul className="filter">
                    <li style={{color:showFliter==="category"?"#3190e8":"#333"}} onClick={this.handleCilck.bind(this,"category")}>
                        <span>{categoryText}</span>
                        <i className="iconfont icon-sanjiao1"></i>
                    </li>
                    <li style={{color:showFliter==="sort"?"#3190e8":"#333"}} onClick={this.handleCilck.bind(this,"sort")}>
                        <span>{order===4?"综合排序":orderText}</span>
                        <i className="iconfont icon-sanjiao1"></i>
                    </li>
                    <li style={{color:showFliter==="filter"?"#3190e8":"#333",fontWeight:showFliter==="filter"?"bold":"normal"}} 
                    onClick={this.handleCilck.bind(this,"filter")}>
                        <span>筛选</span>
                        <i className="iconfont icon-shaixuan"></i>
                    </li>
                </ul>
                {
                    !!showFliter&&<div className="filter-extend">
                    {
                        showFliter === "sort"
                        ? <ul className="sort-list">
                            {orderArr.map((val,index) => (
                                <li key={index} 
                                    style={{color:index===order?"#3190e8":"#333",
                                    fontWeight:index===order?"bold":"normal"}} 
                                    onClick={this.handleSortClick.bind(this,index)}>
                                    <span>{val}</span>
                                </li>))}
                        </ul>
                        :showFliter === "filter"?<FilterNav 
                            fliterMore={fliterMore} 
                            setFilterMore={this.handleSetFilterMore}
                            delivery={delivery}
                            activity={activity}
                            support_ids={support_ids}
                            cost={cost}/>
                        :<AllCategory category={category}
                            setMainMenuId={setMainMenuId}
                            setSubMenuId={this.handleClickCategory}
                            mainMenuId={mainCategoryId}
                            subMenuId={subCategoryId}
                        />
                    }
                    <div className="shade" 
                        onClick={this.handleHiddenFilter}>
                    </div>
                </div>
                }
            </div>
        )
    }
}