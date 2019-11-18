import React from "react";
import BaseClass from "@/baseClass";
import {Toast,InputItem,List} from 'antd-mobile';
import {copyCode} from "tollPlugin/commonFun";

interface RouterProps {
    history: any;
  }
export default class AtmBox extends BaseClass<RouterProps>{
    constructor(props:any){
        super(props,[],true);
        this.state = {
            hide:false,    // 控制显示隐藏        
            realName:""    // 持卡姓名
        }
    }
    hide(){
        let _this = this;
        this.setState({
            hide:true
        },()=>{
            setTimeout(()=>{
                _this.props.hide();
            },500)
        })
    }
    offlinePay(e:any){
        e.preventDefault();
        let _this = this;
        let depositMoney = this.props.depositMoney;
        let offline_accountName = this.state.realName || this.props.user.realName
        let TransType;
        if(this.props.offPay.Bank.BankCode.indexOf('ALIPAY')>-1){//如果是支付宝
            TransType=6;
        }else if(this.props.offPay.Bank.BankCode.indexOf('WECHAT')>-1){//如果是微信
            TransType=7;
        }else{
            TransType=1;
        }
        Toast.loading('支付申请中,请稍后...');   
        let filter = {
            BankId:this.props.offPay.Id,
            TransType,
            Amount:depositMoney,
            AccountName:offline_accountName
        };      
        new window.actions.ApiOfflineDepositAction(filter).fly((resp:any)=>{
            Toast.hide();
            if(resp.StatusCode===0) {
                window.actions.popWindowAction(
                    {
                        type: "DefiPop",
                        title: "线下支付申请成功",
                        text:[
                            `支付单号 ${resp.OrderNo}`,
                            `帐户名 ${this.props.offPay.AccountName}`,
                            `银行卡号 ${this.props.offPay.AccountNo}`,
                            `银行 ${this.props.offPay.Bank.BankName}`,
                            `支行 ${this.props.offPay.OpeningBank}`
                        ],
                        leftBtn:{
                            text: "前往查看",
                            fc:()=>{
                                window.actions.popWindowAction({type:""})
                                _this.hide();
                                _this.props.push("/My/history/record/chongzhi")
                            }                    
                        }
                    }
                )
            }else{
                window.actions.popWindowAction({type:"Hint",text:resp.Message})
            }
        });
    }
    render() {
        let className = this.state.hide?"atmbox slideOutDown":"atmbox slideInUp";
        return(
            <div className={className}>
                <div className="mask"></div>
                <div className="dom">
                    <div className="title">
                        <i className="icon iconfont icon-iconclose" onClick={this.hide.bind(this)}></i>
                        银行转账
                    </div>
                    <div className="overflow">
                        <div className="amount">
                            请向下面账号转账:<span>￥{this.props.depositMoney}</span>
                        </div>
                        <div className="con">
                        <div className="am-list UserBankInfo">
                            <div className="am-list-body">
                                <div className="am-list-item am-input-item am-list-item-middle">
                                    <div className="am-list-line">
                                        <div className="am-input-label am-input-label-5">收款姓名:</div>
                                        <div className="am-input-control">
                                            <input type="text" id='account_name' defaultValue={this.props.offPay.AccountName}/>
                                            <button onClick={copyCode.bind(this,'account_name')} >复制</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="am-list-item am-input-item am-list-item-middle">
                                    <div className="am-list-line">
                                        <div className="am-input-label am-input-label-5">收款账号:</div>
                                        <div className="am-input-control">
                                            <input type="text" id='account_no' defaultValue={this.props.offPay.AccountNo}/>
                                            <button onClick={copyCode.bind(this,'account_no')} >复制</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="am-list-item am-input-item am-list-item-middle">
                                    <div className="am-list-line">
                                        <div className="am-input-label am-input-label-5">收款银行:</div>
                                        <div className="am-input-control">
                                            <input type="text" id='account_BankName' defaultValue={this.props.offPay.Bank.BankName}/>
                                            <button onClick={copyCode.bind(this,'account_BankName')} >复制</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="am-list-item am-input-item am-list-item-middle">
                                    <div className="am-list-line">
                                        <div className="am-input-label am-input-label-5">银行支行:</div>
                                        <div className="am-input-control">
                                            <input type="text" id='account_OpeningBank' defaultValue={this.props.offPay.OpeningBank}/>
                                            <button onClick={copyCode.bind(this,'account_OpeningBank')} >复制</button>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                        </div>
                        <h3>转账信息</h3>
                        <List>
                            <InputItem
                                defaultValue={this.props.user.realName}
                                onChange={val=>this.setState({realName:val})}
                                ref="offline_accountName"
                                placeholder="请输入付款银行卡开户姓名"
                            >持卡姓名:</InputItem>
                        </List>
                        <a onClick={this.offlinePay.bind(this)} className="btn FinishAddMoneyBtn">转账完成点这里</a>
                    </div>
                    </div>
                </div>
            </div>
        )   
    }
}



