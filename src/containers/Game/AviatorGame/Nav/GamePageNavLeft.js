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
import { Actions } from "react-native-router-flux";
import actions from "$LIB/redux/actions/index";

class GamePageNavLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() { }

  componentWillUnmount() { }


  render() {
    return (
      <View>
        {
          this.props.gameInfo && this.props.gameInfo.result && this.props.gameInfo.result.provider == 'SPR' ? (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => { Actions.pop() }}
                style={{ marginLeft: 15 }}
              >
                <Image
                  resizeMode="contain"
                  source={require("@/images/icon-white.png")}
                  style={{ width: 26, height: 26 }}
                />
              </TouchableOpacity>

              <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>小游戏</Text>

              <TouchableOpacity
                onPress={() => { window.reloadParticularGame && window.reloadParticularGame() }}
                style={{ marginLeft: 15 }}
              >
                <Image
                  resizeMode="contain"
                  source={require("@/images/icon/refreshWhite.png")}
                  style={{ width: 26, height: 26 }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => Actions.pop()}
              style={{ marginLeft: 15 }}
            >
              <Image
                resizeMode="contain"
                source={require("@/images/icon/home.png")}
                style={{ width: 26, height: 26 }}
              />
            </TouchableOpacity>
          )

        }
      </View>

    )
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  gameInfo: state.gameInfo,
});
const mapDispatchToProps = (dispatch) => ({
  gameInfo_clear: (gameObj) =>
    dispatch(actions.ACTION_InitialGameInfo(gameObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePageNavLeft);