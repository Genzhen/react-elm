import React,{Component} from 'react'
import './style.scss'

export default class FilterNav extends Component{
    constructor(props){
        super(props)
        this.state = {
            activityId:"",
            delivery:"",
            averageCosts:"",
            supportIds:[]
        }
        this.handleClearState = this.handleClearState.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentWillMount(){
        const {delivery,activity,support_ids, cost} = this.props
        this.setState({
            activityId:activity,
            delivery:delivery,
            averageCosts:cost,
            supportIds:support_ids
        })
    }
    handleClick(state,value){
        const stateValue = this.state[state]
        if(stateValue === value){
            this.setState({[state]:""})
        }else{
            this.setState({[state]:value})
        }  
    }
    handleSupportClick(value){
        const supportIds = this.state.supportIds
        const index = supportIds.indexOf(value)
        if(index !== -1){
            supportIds.splice(index,1)
        }else{
            supportIds.push(value)
        }
        this.setState({supportIds})
    }
    handleClearState(){
        this.setState({
            activityId:"",
            delivery:"",
            averageCosts:"",
            supportIds:[]
        })
        // this.props.setFilterMore("","",[],"")
    }
    handleSubmit(){
        const {activityId,delivery,averageCosts,supportIds} = this.state
        this.props.setFilterMore(delivery,activityId,supportIds,averageCosts)
    }

    render(){
        const fliterMore = this.props.fliterMore
        const {activity_types,average_costs,delivery_mode,supports} = fliterMore
        console.log(fliterMore)
        const {activityId,delivery,averageCosts,supportIds} = this.state
        return(
            <div className="filter-nav">
                <div className="filter-wrap">
                    {delivery_mode&&
                    <dl className="filter-item ">
                        <dt className="title">配送方式</dt>
                        <dd className="content">{
                            <div className={`more-filter ${delivery === delivery_mode.id&&"filter-activity"}`} 
                            onClick={this.handleClick.bind(this,"delivery",delivery_mode.id)}
                            style={{borderRight:"1px solid #e4e3e3"}}>
                                <i className={`iconfont ${delivery === delivery_mode.id?"icon-finish":"icon-birdxiaoniao"}`}></i>
                                <span>{delivery_mode.text}</span>
                            </div>
                        }</dd>
                    </dl>}
                    {activity_types.length>0&&
                    <dl className="filter-item">
                        <dt className="title">优惠活动</dt>
                        <dd className="content">{
                            activity_types.map((val,index) => (<div key={index} 
                                onClick={this.handleClick.bind(this,"activityId",val.id)}
                                style={{borderBottom:index<3&&activity_types.length>3?"1px solid #e4e3e3":"none",
                                    borderRight:index===2||index===5?"none":"1px solid #e4e3e3"}}
                                className={`more-filter ${activityId === val.id&&"filter-activity"}`}>
                                {activityId === val.id
                                    ?<i className="iconfont icon-finish"></i>
                                    :<div className="activity-icon" 
                                    style={{background:`#${val.icon_color}`,}}>
                                    {val.icon_name}
                                </div>}
                                <span>{val.name}</span>
                            </div>))
                        }</dd>
                    </dl>}
                    {average_costs.length>0&&
                    <dl className="filter-item">
                        <dt className="title">人均消费</dt>
                        <dd className="content">{average_costs.map((val,index) => (
                            <div key={index}
                            onClick={this.handleClick.bind(this,"averageCosts",val.id)}
                            style={{borderBottom:index<3&&average_costs.length>3?"1px solid #e4e3e3":"none",
                                borderRight:index===2||index===5?"none":"1px solid #e4e3e3"}}
                            className={`more-filter ${averageCosts === val.id&&"filter-activity"}`}>
                                {averageCosts === val.id&&
                                <i className="iconfont icon-finish"></i>}
                                <span className="average-costs">{val.description}</span>
                            </div>))}
                        </dd>
                    </dl>}
                    {supports.length>0&&
                    <dl className="filter-item">
                        <dt className="title">商家属性</dt>
                        <dd className="content">{supports.map((val,index) => (
                            <div key={index} 
                                onClick={this.handleSupportClick.bind(this,val.id)}
                                style={{borderBottom:index<3&&activity_types.length>3?"1px solid #e4e3e3":"none",
                                    borderRight:index===2||index===5?"none":"1px solid #e4e3e3"}}
                                className={`more-filter ${ supportIds.indexOf(val.id) !== -1&&"filter-activity"}`}>
                                {supportIds.indexOf(val.id) !== -1
                                ?<i className="iconfont icon-finish"></i>
                                :<div className="support-icon" 
                                    style={{color:`#${val.icon_color}`,borderColor:`#${val.icon_color}`}}>
                                    {val.icon_name}
                                </div>}
                                <span>{val.name}</span>
                            </div>))}
                        </dd>
                    </dl>}
                </div>
                <div className="filter-btn">
                    <div className="clear-btn"
                        onClick={this.handleClearState}
                        style={{color:activityId!==""||delivery!==""||averageCosts!==""||supportIds.length>0?"#333":"#ddd"}}
                    >清空</div>
                    <div className="submit-btn"
                        onClick={this.handleSubmit}
                    >确定</div>
                </div>
            </div>
        )
    }
}