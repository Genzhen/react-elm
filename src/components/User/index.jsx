import React, {Component} from "react";
import CSSModules from "react-css-modules";
import styles from "./style.scss";

class User extends Component {
  hangleChange(e) {
    let data = new FormData();
    console.log(1111111, e.target.files[0])
    data.append('file', e.target.files[0]);
    console.log(22222222, data)
    this
      .props
      .upload(data)
  }
  render() {
    const {avatar} = this.props.userinfo;
    console.log("avatar",avatar)
    return (
      <div styleName="user">
        <div>
          <b>头像</b>
          {!!avatar
            ? <div styleName="avatar"><img src={avatar} alt=""/></div>
            : <div styleName="head-icon">
              <i className="iconfont icon-touxiang"/>
            </div>}
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            onChange={this
            .hangleChange
            .bind(this)}/>

        </div>
      </div>
    );
  }
}
export default CSSModules(User, styles, {allowMultiple: true})