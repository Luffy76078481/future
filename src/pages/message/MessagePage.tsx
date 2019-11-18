import React from 'react';
import NavBar from "components/navBar/NavBar"
import { List, Badge, ListView, Tabs } from 'antd-mobile';
import { _dispatch } from "../../store/anctions";
import { connect } from "react-redux";
import './MessagePage.scss';
import { config } from "../../config/projectConfig";
import { withRouter } from "react-router-dom";
import BaseClass from "@/baseClass";
import { setStorage, getStorage } from "tollPlugin/commonFun";
import { StatusUi } from "components/pui/Pui";


let pageIndex = 0;
let listData: any[] = [];
const dataSource = new ListView.DataSource({
    rowHasChanged: (row1: any, row2: any) => row1 !== row2,
});

interface RouterProps {
    history: any
}

class Message extends BaseClass<RouterProps> {



    render() {

        return (
            <div className="MyMessage">
                <NavBar
                    btnGoback={true}
                    btnService={true}
                    title={"优惠活动"}
                >
                </NavBar>
                奥术大师大撒所
            </div>
        )
    }

}


const mapStateToProps = (state: any, ownProps: any) => (
    {
        promoData: state.promotions.promoData,
    }
);
export default withRouter(connect(mapStateToProps)(Message));