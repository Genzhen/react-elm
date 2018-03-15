import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../containers/Home"
import Discover from '../containers/Discover'
import Order from '../containers/Order'
import My from '../containers/My'
import Search from '../containers/Search'
import Location from '../containers/Location'
import Shop from '../containers/Shop'
import Footer from '../components/Footer'
import SearchResult from '../containers/SearchResult'

export default class RouterMap extends React.Component {
  render() {
    return (
        <div>
            <Router>
                <div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/discover" component={Discover} />
                    <Route path="/order" component={Order} />
                    <Route path="/my" component={My} />
                </Switch>
                <Switch>
                    <Route exact path="/search" component={Search} />
                    <Route exact path="/search/shop" component={SearchResult} />
                    <Route path="/location" component={Location} />
                    <Route path="/shop" component={Shop} />
                    <Footer/>
                </Switch>
               
                </div>
            </Router>
        </div>
    );
  }
}
