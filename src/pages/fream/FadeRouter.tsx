import React from "react";
import { Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "../../common/style/animate.css"

import LoginPage from "../../pagesFade/login/LoginPage";

const Login = creatAniFc(LoginPage, false)
interface Store {
  /**
   * Returns the value of a base expression taken to a specified power.
   * @param store The base value of the expression.
   * @param y The exponent value of the expression.
   */
  store: any;
}
export default class FadeRouter extends React.Component<Store> {
  render() {
    return (
      <div className="FadeRouter">
        <Route path="/*/Login" children={props => <Login data={props} />} />
      </div>
    );
  }
}

interface Pro {
  data: any
}

function creatAniFc(Page: any, needAuth: boolean = true) {
  return (
    class extends React.Component<Pro>{
      render() {
        return (
          <CSSTransition
            in={this.props.data.match != null}
            appear={true}
            timeout={550}
            // fadeOutLeft
            classNames={"fadeLeft"}
            mountOnEnter={true}
            unmountOnExit={true}
          >
            {
              needAuth?window.actions.Authority(true)?<Page />:<LoginPage />:<Page/>
            }
          </CSSTransition>
        )
      }
    }
  )
}





