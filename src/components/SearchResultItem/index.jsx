import React, { Component } from "react";
import CSSModules from 'react-css-modules';
import { Link } from "react-router-dom";
import styles from "./style.scss";
import FoodList from "../FoodList";
import getImgSrc from "../../util/getImgSrc";

class ShopItem extends Component {
  render() {
    const { data, highlights } = this.props;
    const { foods, restaurant } = data;
    const {
      name,
      id,
      distance,
      rating,
      float_delivery_fee,
      float_minimum_order_amount,
      order_lead_time,
      delivery_mode,
      image_path
    } = restaurant;
    return (
      <div styleName="search-result-item">
        <Link to={`/shop/${id}`}>
          <div styleName="result-item">
            <div styleName="result-img">
              <img src={getImgSrc(image_path)} alt="result" />
            </div>
            <div styleName="result-info">
              <div styleName="result-title">
                <h3 styleName="title">{name}</h3>
                <div styleName="top-right">
                  {delivery_mode ? (
                    <div
                      styleName="delivery"
                      style={{
                        color: `#${delivery_mode.text_color}`,
                        background: `linear-gradient(to right, #${
                          delivery_mode.gradient.rgb_from
                        }, #${delivery_mode.gradient.rgb_to})`
                      }}
                    >
                      {delivery_mode.text}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div styleName="result-rate">
                <div styleName="result-rate-left">
                  <span>评价{rating}</span>&nbsp;|&nbsp;
                  <span>起送费¥{float_minimum_order_amount}</span>&nbsp;|&nbsp;
                  <span>配送费¥{float_delivery_fee}</span>
                </div>
                <div>
                  <span>
                    {distance < 1000
                      ? `${distance}m`
                      : `${(distance / 1000).toFixed(2)}km`}
                  </span>&nbsp;|&nbsp;
                  <span>{order_lead_time}分钟</span>
                </div>
              </div>
            </div>
          </div>
          <FoodList data={foods} highlights={highlights} />
        </Link>
      </div>
    );
  }
}

export default CSSModules(ShopItem,styles,{allowMultiple:true});