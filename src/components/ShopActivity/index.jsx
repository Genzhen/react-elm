import React from "react";
import CSSModules from 'react-css-modules';
import styles from "./style.scss";
import ShopActivityList from "../ShopActivityList";

class ShopActivity extends React.Component {
  constructor() {
    super();
    this.state = { showMore: false };
  }
  toggleShowMore(e) {
    e.preventDefault();
    const showMore = this.state.showMore;
    this.setState({ showMore: !showMore });
  }

  render() {
    const activityList = this.props.activities;
    const showMore = this.state.showMore;
    const recommend = this.props.recommend;
    return (
      <div styleName="shop-activity">
        <div styleName="activity-left" />
        <div styleName="activity-right">
          <div styleName="tag-line">
            {!recommend.is_ad && recommend.reason ? (
              <div styleName="tag-container">
                <img
                  src="http://fuss10.elemecdn.com/a/c1/24c767ffa7fd296d3e2d6f01798c6png.png?imageMogr/format/webp/thumbnail/!60x60r/gravity/Center/crop/60x60/"
                  alt="tag"
                />
                <span>{recommend.reason}</span>
              </div>
            ) : (
              ""
            )}
          </div>
          <div styleName="activities">
            <div styleName="activity-list">
              {showMore ? (
                <ShopActivityList data={activityList} />
              ) : (
                <ShopActivityList data={activityList.slice(0, 2)} />
              )}
            </div>
            {activityList.length > 2 ? (
              <div
                styleName="activityBtn"
                onClick={this.toggleShowMore.bind(this)}>
                  <span>{activityList.length}个活动</span>
                  <div styleName={showMore ? "rotate180" : "rotate0"}>
                    <i className="iconfont icon-sanjiao1"/>
                  </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CSSModules(ShopActivity,styles,{allowMultiple:true});
