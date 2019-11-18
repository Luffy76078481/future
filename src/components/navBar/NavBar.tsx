import React from "react";
import { connect } from "react-redux";
import BaseClass from "@/baseClass";
import { withRouter } from "react-router-dom";
import "./NavBar.scss"


class NavBar extends BaseClass {
    public state = {
        showQuery: false,
        queryVal: "",
        showQueBtn: false
    }
    render() {
        return (
            <div className="NavBar">
                <div className="NavBarLeft">
                    {this.props.btnGoback && <div className="goBank" onClick={this.goBack.bind(this)}><span className="icon iconfont icon-fanhui-" /></div>}
                </div>
                <div className="NavBarCenter">
                    <p>{this.props.title}</p>
                </div>
                <div className="NavBarRight">
                    {this.props.btnService && <div onClick={this.goService.bind(this)}><span className="icon iconfont icon-kefu1" /></div>}
                    {this.props.btnQuery && <div onClick={this.goQuery.bind(this, true)}><span className="icon iconfont icon-search" /></div>}
                    {this.props.message && <div onClick={this.goUrl.bind(this, "/My/siteLetter/mes")}> <span className="icon iconfont icon-kefuzhongxin" /></div>}
                </div>
                <div className="floatQuery" style={{ "display": this.state.showQuery ? "block" : "none" }}>
                    <div className="queryIpBox">
                        <span className="icon iconfont icon-search" />
                        <input type="text" placeholder="请输入关键字" value={this.state.queryVal} onChange={this.queryChange.bind(this, false)} />
                    </div>
                    {
                        this.state.showQueBtn ?
                            <div className="queryCancle" onClick={this.subQuery.bind(this, false)}>确认</div>
                            :
                            <div className="queryCancle" onClick={this.goQuery.bind(this, false)}>取消</div>
                    }

                </div>
            </div>
        );
    }

    goBack() {
        this.props.history.goBack();
    }
    goService() {
        window.actions.popWindowAction({ type: "serviceWindow", text: "是否联系在线客服" });
    }
    goQuery(showQuery: boolean) {
        if (!showQuery) {
            this.queryChange(true)
        }
        this.setState({ showQuery });
    }
    queryChange(clear: boolean, e?: any) {
        if (clear) {
            this.setState({
                queryVal: "",
                showQueBtn: false
            })
            this.props.getQuetyParam("clear");
        } else {
            let inputVal = e.target.value;
            if (inputVal === "") {
                this.setState({
                    queryVal: inputVal,
                    showQueBtn: false
                })
            } else {
                this.setState({
                    queryVal: inputVal,
                    showQueBtn: true
                })
            }
        }
    }
    subQuery(){
        this.props.getQuetyParam(this.state.queryVal);
    }

    goUrl(url: string) {
        this.props.history.push(url);
    }
}

const mapStateToProps = (state: any, ownProps: any) => ({
    // testAction: state.testAction
    user: state.user,
});

export default withRouter(connect(mapStateToProps)(NavBar));
