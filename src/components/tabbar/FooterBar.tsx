import React from "react";
import { NavLink } from "react-router-dom";
import "./FooterBar.scss";

const FooterBar: React.FC = () => {
  return (
    <nav className="FooterBar">
      <NavLink to="/Home">
        <span className="icon iconfont icon-shouye" />
        <p>首页</p>
      </NavLink>
      <NavLink to="/Money">
        <span className="icon iconfont icon-qianbao" />
        <p>存款</p>
      </NavLink>
      <NavLink to="/Message">
        <span className="icon iconfont icon-liwulipinjiangpin-xianxing" />
        <p>优惠</p>
      </NavLink>
      <a href="#" onClick={openService}>
        <span className="icon iconfont icon-kefu1" />
        <p>客服</p>
      </a>
      <NavLink to="/My">
        <span className="icon iconfont icon-wode" />
        <p>我的</p>
      </NavLink>
      {/* 新的 我的页面 备用 */}
      {/* <NavLink to="/NewMy">
        <span className="icon iconfont icon-wode" />
        <p>新我</p>
      </NavLink> */}
    </nav>
  );

  
};

const openService = ()=>{
  window.actions.popWindowAction({type:"serviceWindow",text:"是否联系在线客服"});
}

export default FooterBar;
