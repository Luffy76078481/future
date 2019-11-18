/*

      存款页-业务逻辑难度：★★★★★
*/

import React from "react";
import BaseClass from "@/baseClass";
import NavBar from "components/navBar/NavBar"
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import "./MoneyPage.scss";

class MoneyPage extends BaseClass{
   
    render() {
        return (
            <div className="MoneyPage">
              {/* 头部 */}
              <NavBar btnGoback={true} title={"存款"}></NavBar>
            </div>
        );
    }
}

const mapStateToProps = (state: ReducerState, ownProps: any) => ({
  pay: state.getAllPay.PayList,
  quickPrice:state.getAllPay.QuickPrice,
  user:state.user,
});

export default withRouter(connect(mapStateToProps)(MoneyPage));

