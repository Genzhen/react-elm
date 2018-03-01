import React, { Component } from 'react'
import {connect} from 'react-redux'
import FirstPageHeader from '../../components/FirstPageHeader'
import Swiper from '../../components/Swiper'
import ShopList from '../../components/ShopList'
import Footer from '../../components/Footer'
import {setLongitudeAndLatitude,getLocationInfo} from '../../actions/locationInfo'

class Home extends Component {
  constructor(){
    super()
    this.state = {location:"正在定位"}
    this.getLocation = this.getLocation.bind(this)
    this.showPosition = this.showPosition.bind(this)
  }
  async componentDidMount(){
    const {longitude,latitude} = this.props
    if(longitude === 0 && latitude===0){
      this.getLocation()
    }  
  }
  getLocation(){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.showPosition);
    }
    else{
      this.setState({location:"无法获得定位"})
    }
  }
  async showPosition(position){
    const { dispatch } = this.props;
    const {longitude,latitude} = position.coords
    dispatch(setLongitudeAndLatitude(longitude,latitude))
    dispatch(await getLocationInfo(longitude,latitude))
  }
  render() {
    const address = this.props.name
    console.log(address)
    return (
      <div className="App">
        <FirstPageHeader address={address}/>
        <Swiper/>
        <ShopList/>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  const {longitude,latitude,name} = state.home
  return {
    longitude,
    latitude,
    name:name
  }
}

export default connect(mapStateToProps)(Home)
