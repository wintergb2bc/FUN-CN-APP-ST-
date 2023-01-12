import React from "react";
import {
  StyleSheet,
  WebView,
  Text,
  View,
  Dimensions,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import WebViewIOS from "react-native-webview";
import HTMLView from "react-native-htmlview";

const { width, height } = Dimensions.get("window");

const htmls = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge "><meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=no"><title>Document</title></head><body>`;

class NewsDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // dataList: this.props.dataList || "",
      webViewKey: 0,
    };
    console.log(props)
  }

  getImage = () => {
    const { megType, data } = this.props;
    let imgs = require("../images/news/msgOther.png");
    if (megType == "Personal") {
      imgs = require("../images/news/msgOther.png");
    } else if (megType == "Transfer") {
      if (data.messageTypeOptionID == 3) {
        imgs = require("../images/news/msg3.png");
      } else if (data.messageTypeOptionID == 4) {
        imgs = require("../images/news/msg4.png");
      } else if (data.messageTypeOptionID == 5) {
        imgs = require("../images/news/msg5.png");
      } else {
        imgs = require("../images/news/msg6.png");
      }
    } else if (megType == "Announcement") {
      if (data.newsTemplateCategory == 7) {
        imgs = require("../images/news/Announcement7.png");
      } else if (data.newsTemplateCategory == 8) {
        imgs = require("../images/news/Announcement8.png");
      } else if (data.newsTemplateCategory == 9) {
        imgs = require("../images/news/Announcement9.png");
      } else {
        imgs = require("../images/news/other.png");
      }
    }

    return imgs;
  }

  getTime = (item) => {
    let times =
      new Date(item.replace("T", " ").replace(/\-/g, "/")).getTime() +
      60 * 60 * 8 * 1000;

    let myDate = new Date(times);
    let y = myDate.getFullYear();
    let m = myDate.getMonth() + 1;
    let d = myDate.getDate();
    let h = myDate.getHours();
    let mi = myDate.getMinutes();

    if (m < 10) {
      m = "0" + m.toString();
    }
    if (d < 10) {
      d = "0" + d.toString();
    }
    if (h < 10) {
      h = "0" + h.toString();
    }
    if (mi < 10) {
      mi = "0" + mi.toString();
    }

    return `${y}-${m}-${d} ${h}:${mi}`;
  };

  contentRender = (showWebView = false) => {
    const { megType, data } = this.props;
    return (
      <>
        <View style={{ width: '100%', flexDirection: "row" }}>
          <View style={{ width: '20%', justifyContent: 'center', alignItems: "center" }}>
            <Image
              resizeMode="stretch"
              source={this.getImage()}
              style={{ width: 40, height: 40 }}
            />
          </View>
          <View style={{ width: '80%', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ flexShrink: 1, fontSize: 14, color: "#222", fontWeight: "400", lineHeight: 20 }}>
                {megType == "Announcement"
                  ? data.topic
                  : data.title}
              </Text>
            </View>
            <Text style={{
              color: "#999999",
              fontSize: 10,
              marginTop: 4
            }}>{data.sendOn != "" ? this.getTime(data.sendOn) : ""}</Text>
          </View>
        </View>


        <View style={{ height: 1, backgroundColor: "#F3F3F3", width: "90%", marginVertical: 15 }}/>

        {megType == "Announcement" && showWebView ? (
          <View style={{ flex: 1 }}>
            {Platform.OS == "ios" ? (
              <WebViewIOS
                key={this.state.webViewKey}
                originWhitelist={["*"]}
                source={{
                  html: `${htmls} ${data.content} </body></html>`,
                }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                mixedContentMode="always"
                scalesPageToFit={false}
                style={{ height: "100%", width: width - 60 }}
                onNavigationStateChange={this._onNavigationStateChange}
              />
            ) : (
              <WebView
                key={this.state.webViewKey}
                originWhitelist={["*"]}
                source={{
                  html: `${htmls} ${data.content} </body></html>`,
                }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                mixedContentMode="always"
                scalesPageToFit={false}
                style={{ height: "100%", width: width - 60 }}
                onNavigationStateChange={this._onNavigationStateChange}
              />
            )}
          </View>
        ) : (
          <View style={{ flexDirection: 'row' }}>

            <HTMLView
              style={{ width: width - 55 }}
              value={`<div>${data.content}</div>`}
              stylesheet={styleHtmls}
            />
          </View>
        )}

      </>
    )
  }

  render() {
    const { data } = this.props;
    //图片处理，HTMLView无法显示图片，WebView高度不自适应
    let showWebView = !!(data.detail && data.content && data.content.indexOf("img") > -1);

    return (
      data && showWebView ? (
        <View style={{ flex: 1, backgroundColor: "#efeff4", padding: 15 }}>
          <View style={{ flex: 1, backgroundColor: "#FFFFFF", borderRadius: 10, padding: 15 }}>
            {this.contentRender(showWebView)}
          </View>
        </View>
      ) : (
        <ScrollView style={{ flex: 1, backgroundColor: "#efeff4", padding: 15 }}>
          <View style={{ backgroundColor: "#FFFFFF", borderRadius: 10, padding: 15, marginBottom: 55 }}>
            {this.contentRender(showWebView)}
          </View>
        </ScrollView>
      )

    );
  }
}

export default NewsDetail;

const styleHtmls = StyleSheet.create({
  div: {
    fontSize: 12,
    lineHeight: 22,
  },
});
