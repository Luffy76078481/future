import * as React from "react";
import "./MyPage.scss";
import NavBar from "components/navBar/NavBar"
import { connect } from "react-redux";
import BaseClass from "@/baseClass";
import { NavLink, Link, withRouter } from "react-router-dom";
class MyPage extends BaseClass {
  public state = {
    checkAuth: true
  }
  constructor(props: any) {
    super(props, []);
  }

  // 跳转APP下载页
  downLoad() {
    window.open(this.props.remoteSysConfs.channel_push_url, "_blank");
} 
  render() {
    return (
      <div className="MyPage">
        <NavBar
          message={true}
          title={"我的"}
        ></NavBar>
         啊 啊 啊 啊 啊 啊 啊 啊 啊 啊 啊 啊 啊 啊 啊 啊
      </div >
    );
  }

}
const mapStateToProps = (state: any, ownProps: any) => ({
    user: state.user,
});

export default withRouter(connect(mapStateToProps)(MyPage));
