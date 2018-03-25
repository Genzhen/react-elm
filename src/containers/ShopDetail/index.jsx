import React, { Component } from "react";
import { connect } from "react-redux";
// import {ShopDetailTombstone} from '../../components/Tombstone'
import ShopDetailHeader from "../../components/ShopDetailHeader";
import ShopDetailTab from "../../components/ShopDetailTab";
import ShopMenu from "../../components/ShopMenu";
import ShopRating from "../../components/ShopRating";
import ShopInfo from '../../components/ShopInfo';
import Cart from '../../components/Cart'
import {
  getMenu,
  getShopInfo,
  getRating,
  clearRating
} from "../../actions/shopDetail";
import {changeCart} from '../../actions/cart'

class ShopDetail extends Component {
  constructor() {
    super();
    this.state = { tabIndex: 0 };
    this.getRatings = this.getRatings.bind(this);
    this.setTabIndex = this.setTabIndex.bind(this);
  }
  async componentDidMount() {
    const { dispatch, longitude, latitude } = this.props;
    const shopId = this.props.match.params.id;
    dispatch(clearRating());
    dispatch(await getMenu(shopId, longitude, latitude));
    dispatch(await getShopInfo(shopId, longitude, latitude));
    this.getRatings();
    dispatch(changeCart(shopId,1234,222))
  }
  async getRatings() {
    const { dispatch, longitude, latitude, offset } = this.props;
    const shopId = this.props.match.params.id;
    dispatch(await getRating(shopId, offset, 8, longitude, latitude));
  }
  setTabIndex(index) {
    this.setState({ tabIndex: index });
  }
  render() {
    const { menu } = this.props;
    const { tabIndex } = this.state;
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <ShopDetailHeader />
        <ShopDetailTab onClick={this.setTabIndex} />
        {tabIndex === 0 && menu &&
        <div>
          <ShopMenu data={menu} />
          <Cart/>
        </div>
          
        }
        {tabIndex === 1 &&
          <ShopRating />
        }
        {tabIndex === 2 &&
          <ShopInfo />
        }
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { longitude, latitude } = state.location;
  const { shopinfo, menu, rating } = state.shopDetail;
  const { data, hasMore, offset } = rating;
  return {
    longitude,
    latitude,
    shopinfo,
    menu,
    data,
    hasMore,
    offset
  };
};

export default connect(mapStateToProps)(ShopDetail);
