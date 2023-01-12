import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Dimensions,
  NativeModules,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Touch from "../../../Common/TouchOnce";

const { width, height } = Dimensions.get("window");

const circleColor = {
  MAIN: {
    color: "#BCBEC3",
  },
  SB: {
    color: "#00A6FF",
  },
  LD: {
    color: "#E91E63",
  },
  YBP: {
    color: "#99683D",
  },
  KYG: {
    color: "#99683D",
  },
  P2P: {
    color: "#99683D",
  },
  SLOT: {
    color: "#2ACB7A",
  },
  IMOPT: {
    color: "#2ACB7A",
  },
  KENO: {
    color: "#20BDAD",
  },
  LBK: {
    color: "#20BDAD",
  },
};

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutPopup: false,
    };
  }

  closePopover() {
    this.setState({
      aboutPopup: this.state.aboutPopup == false ? true : false,
    });
  }

  render() {
    const { allBalance, AccountTotalBal } = this.props;
    return (
      <View style={styles.fastBox}>
        <View style={[styles.fastList]}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={[styles.circle, { backgroundColor: "#BCBEC3" }]}/>
            <Text numberOfLines={1} style={{ fontSize: 14, color: "#222" }}>
              总余额
            </Text>
          </View>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 14,
              color: "#222",
              marginRight: 35,
            }}
          >
            ￥ {AccountTotalBal}
          </Text>
        </View>
        {allBalance != "" &&
          allBalance.map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.fastList,
                  { zIndex: item.name === "SB" ? 999 : 9 },
                ]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative",
                  }}
                >
                  <View
                    style={[
                      styles.circle,
                      {
                        backgroundColor: circleColor[item.name]
                          ? circleColor[item.name].color
                          : "#BCBEC3",
                      },
                    ]}
                  />
                  <Text
                    numberOfLines={1}
                    style={{ fontSize: 14, color: "#222" }}
                  >
                    {item.localizedName}
                  </Text>

                  {item.name === "SB" && (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          this.closePopover();
                        }}
                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                      >
                        <Image
                          resizeMode="stretch"
                          source={require("../../../../images/transfer/notice.png")}
                          style={{ width: 14, height: 14, marginLeft: 10 }}
                        />
                      </TouchableOpacity>
                      {this.state.aboutPopup && (
                        <View style={styles.Popover}>
                          <TouchableOpacity
                            onPress={() => {
                              this.closePopover();
                            }}
                            style={styles.PopoverContent}
                          >
                            <View style={styles.arrowB}/>
                            <Text
                              style={{
                                color: "#fff",
                                // paddingRight: 5,
                                fontSize: 12,
                                lineHeight: 18
                                // padding: 15,
                              }}
                            >
                              包含 V2 虚拟体育, 沙巴体育, BTI 体育，{"\n"}IM 体育和电竞
                            </Text>
                            <Image
                              resizeMode="stretch"
                              source={require("../../../../images/closeWhite.png")}
                              style={{ width: 15, height: 15 }}
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                    </>
                  )}
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 14,
                      color: item.state == "UnderMaintenance" ? "red" : "#222",
                    }}
                  >
                    {item.state == "UnderMaintenance"
                      ? "维护中"
                      : "￥" + item.balance}
                  </Text>

                  <Touch
                    style={{ marginLeft: 15 }}
                    onPress={() => {
                      PiwikEvent("Transfer", "Submit", `${item.name}_QuickTransfer`);
                      this.props.fastPayMoney(item);
                    }}
                  >
                    <Image
                      resizeMode="stretch"
                      source={require("../../../../images/transfer/onebutton.png")}
                      style={{ width: 20, height: 20 }}
                    />
                  </Touch>
                </View>
              </View>
            );
          })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fastBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    margin: 15,
    paddingHorizontal: 16,
    paddingBottom: 15,
  },
  fastList: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  PopoverContent: {
    backgroundColor: "#363636",
    borderRadius: 8,
    padding: 15,
    width: 270,
    display: "flex",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: "row",
  },
  arrowB: {
    position: "absolute",
    left: 80,
    top: -13,
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderWidth: 7,
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderBottomColor: "#363636",
    borderRightColor: "transparent",
  },
  Popover: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    width: 270,
    top: 24,
    right: -176,
  },
  circle: {
    width: 8,
    height: 8,
    marginRight: 10,
    borderRadius: 8 / 2,
  },
});
