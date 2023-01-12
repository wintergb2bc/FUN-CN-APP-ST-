/* 
  修改自react-native-smart-corner-label套件
*/
import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    //transform: [{rotate: '45deg'}],
    justifyContent: "flex-end",
    zIndex: 100,
  },
  label: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    // fontFamily: '.HelveticaNeueInterface-MediumP4',
    fontSize: 12,
  },
});

export default class CornerLabel extends Component {
  static defaultProps = {
    alignment: "left",
  };

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};

    this._labelHeight = Math.sqrt(Math.pow(props.cornerRadius, 2) / 2);
    this._labelWidth = this._labelHeight * 2;
    let originOffset = Math.sqrt(Math.pow(this._labelHeight / 2, 2) / 2);
    let labelHorizontalPosition = -this._labelWidth / 2 + originOffset;
    let labelVerticalPosition = -this._labelHeight / 2 + originOffset;
    if (props.alignment == "left") {
      this._labelPosition = {
        left: labelHorizontalPosition,
        top: labelVerticalPosition,
      };
      this._labelTransform = { transform: [{ rotate: "-45deg" }] };
    } else {
      this._labelPosition = {
        right: labelHorizontalPosition,
        top: labelVerticalPosition,
      };
      this._labelTransform = { transform: [{ rotate: "45deg" }] };
    }
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          this._labelPosition,
          this._labelTransform,
          { width: this._labelWidth, height: this._labelHeight },
        ]}
      >
        {
          (this.props.linear ? (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1.0 }}
              locations={[0, 1]}
              colors={this.props.linearColor || []}
              style={[
                styles.label,
                { height: this._labelHeight },
                this.props.style,
              ]}
            >
              {this._renderChildren()}
            </LinearGradient>
          ) : (
            <View
              style={[
                styles.label,
                { height: this._labelHeight },
                this.props.style,
              ]}
            >
              {this._renderChildren()}
            </View>
          ))
        }
      </View>
    );
  }

  _renderChildren() {
    return React.Children.map(this.props.children, (child) => {
      if (!React.isValidElement(child)) {
        return <Text style={[styles.text, this.props.textStyle]}>{child}</Text>;
      }
      return child;
    });
  }
}
