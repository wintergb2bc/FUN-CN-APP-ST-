import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
  WebView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { connect } from "react-redux";
import Touch from "react-native-touch-once";

import actions from "$LIB/redux/actions/index";
import { getMoneyFormat } from '@/containers/Common/CommonFnData'

class GamePageNavRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openBalInfo: false,
    };
  }

  componentWillMount() {
    this.props.userInfo_getBalance(true)
    // console.log('this.props.userInfo', this.props.userInfo)
  }

  openBalInfoHandler() {

    window.openBalanceInform && window.openBalanceInform()
    this.setState({ openBalInfo: !this.state.openBalInfo })
  }

  render() {
    const { openBalInfo } = this.state
    const { allBalance } = this.props.userInfo

    const balance = allBalance.filter((item, index) => {
      return item.name == "P2P"
    })[0]

    const Reload = () => {
      return (
        <View style={{ right: 15 }}>
          <TouchableOpacity
            hitSlop={{ top: 20, bottom: 20, left: 40, right: 20 }}
            onPress={() => {
              window.openmenuX && window.openmenuX();
            }}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 0,
            }}
          >
            <Image
              resizeMode="stretch"
              source={require("@/images/icon/more.png")}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <View>
        {
          this.props.gameInfo && this.props.gameInfo.result && this.props.gameInfo.result.provider == 'SPR' ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Touch
                onPress={this.openBalInfoHandler.bind(this)}
                style={{ backgroundColor: '#fff', padding: 10, borderRadius: 10, marginRight: 10, paddingVertical: 5, flexDirection: 'row', alignItems: 'center' }}
              >
                <View style={{ alignItems: "flex-end", marginRight: 5, }}>
                  <Text style={{ fontSize: 10 }}>双赢棋牌/小游戏</Text>
                  <Text style={{ fontSize: 12, fontWeight: 'bold' }}>¥ {getMoneyFormat(balance.balance)}</Text>
                </View>
                <Image
                  resizeMode="stretch"
                  source={openBalInfo ? require("@/images/icon/icon-Up.png") : require("@/images/icon/icon-Down.png")}
                  style={{ width: 16, height: 16 }}
                />
              </Touch>

              <Touch
                onPress={() => {
                  LiveChatOpenGlobe();
                  PiwikEvent("CS", "Launch", "CS_GameNavigation");
                }}
                style={{ marginRight: 10, }}
              >
                <Image
                  resizeMode="stretch"
                  source={require("@/images/cs.png")}
                  style={{ width: 30, height: 30 }}
                />
              </Touch>
            </View>
          ) : (
            <Reload />
          )
        }
      </View>

    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  gameInfo: state.gameInfo,
});
const mapDispatchToProps = (dispatch) => ({
  userInfo_getBalance: (forceUpdate = false) =>
    dispatch(actions.ACTION_UserInfo_getBalanceAll(forceUpdate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePageNavRight);
