import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from 'react-router-dom';
import Carousel from 'components/carousel/Carousel'
import HomeMain from 'components/homeMain/HomeMain'
import NoticeBar from 'components/homeMain/NoticeBar'
import BaseClass from '@/baseClass';
import { Icon } from "antd-mobile";
import "./HomePage.scss";
interface State {
    user: []
}
class HomePage extends BaseClass {
    public state = {
        login: false,
        user: [],
        refreshing: false
    };
    constructor(props: any) {
        super(props, [])
    }

    static getDerivedStateFromProps(props: any, state: State) {
        if (props.user && props.user.Token) {
            return {
                login: true
            }
        } else if (!props.user.Token) {
            return {
                login: false
            }
        }
        return null;
    }
    render() {
        return (
            <div className="HomePage">
                <Carousel />
                <NoticeBar />
                <div className={'handle'}>
                    <div className={'title'}>
                        {
                            !this.state.login ?
                                <div className={'welcomeTxt'}>欢迎你，请登录</div>
                                :
                                <span className={'welcomeTxt'}>会员:{this.props.user.username}</span>
                        }

                        {/*<div className={'img'}>333</div>*/}
                        <Link to={this.state.login ? "/My" : "/Home/Login"} className={'personalCenter'}><p className={'publicTxtStyle'}>个人中心</p></Link>
                    </div>
                    <div className={'content'}>
                        <div className={'left'}>
                            <div className="leftbar" onClick={this.goWhere.bind(this)}>
                                <div className={'balance'}>账户余额</div>
                                <div className={'login'}>
                                    {
                                        !this.state.login ?
                                            <span className={'publicTxtStyle2'}>请登录</span>
                                            :
                                            this.showRe()
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={'right'}>
                            <Link to={"/Money"} className={'topUp'}>
                                <i className={'icon iconfont icon-cunkuan'} />
                                <p>存款</p>
                            </Link>
                            <Link to={"/Home/Withdraw"} className={'cashWithdraw'}>
                                <i className={'icon iconfont icon-qukuan'} />
                                <p>取款</p>
                            </Link>
                            <Link to={"/Message"} className={'promo'}>
                                <i className={'icon iconfont icon-liwulipinjiangpin'} />
                                <p>优惠</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <HomeMain />
            </div>
        );
    }

    goWhere() {
        if (this.state.login) {
            this.setState({ refreshing: true });
            new window.actions.ApiGamePlatformAllBalanceAction().fly(() => {
                this.setState({ refreshing: false });
            });
        } else {
            this.props.history.push('/Home/Login');
        }
    }

    showRe() {
        if (this.state.refreshing || !!!this.props.user.userBalance) {
            return (
                <Icon type='loading' />
            )
        } else {
            return (
                <span className={'publicTxtStyle2'}>{this.props.user.userBalance}</span>
                // <span className={'publicTxtStyle2'}>{this.props.user.amount}</span>


            )
        }

    }

}


const mapStateToProps = (state: any, ownProps: any) => ({
    // testAction: state.testAction,
    user: state.user
});

export default withRouter(connect(mapStateToProps)(HomePage));
