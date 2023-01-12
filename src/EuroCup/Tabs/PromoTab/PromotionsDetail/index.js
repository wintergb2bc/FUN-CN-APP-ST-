const { width, height } = Dimensions.get("window");
import { Dimensions, Modal, Platform, StyleSheet, Text, View, WebView } from "react-native";
import { Toast } from "antd-mobile-rn";
import { Actions } from "react-native-router-flux";
import Touch from 'react-native-touch-once';
import React from 'react';
// import Router from 'next/router';
// import Toast from '@/Toast';
// import Modal from '@/Modal';
import WebViewIOS from "react-native-webview";
import { ACTION_UserInfo_getBalanceAll, ACTION_UserInfo_getBalanceSB } from '$LIB/redux/actions/UserInfoAction';
import { connect } from 'react-redux';
import { Toasts } from "../../../../containers/Toast";


class PromotionsDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /* 优惠详细网址URL */
      modalHtml: this.props.Detail && this.props.Detail.body || '',
      /* 默认优惠类型 */
      type: 'Bonus',
      /* 默认优惠状态 */
      status: 'Available',
      /* 显示余额不足 */
      Todeposit: false,
      htmlcontent: ''
    };
  }

  componentDidMount() {
  }


  /**
   * @description: 领取红利
   * @param {*} id 优惠ID
   */

  ClaimBonus = (ID) => {
    console.log('ClaimBonus')
    console.log(ID)
    let postData = {
      playerBonusId: ID*1
    };
    Toast.loading('请稍候...');
    fetchRequest(ApiPort.ClaimBonus, 'POST', postData)
      .then((data) => {
        console.log(data);
        const res = data.result;
        if (res) {
          if (res.isClaimSuccess) {
            Toast.success(res.message);
          } else {
            Toast.fail(res.message);
          }
          setTimeout(() => {
            this.props.userInfo_getBalanceAll(true)
          }, 2000);
        }
        // Toast.destroy();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  _onNavigationStateChange = (e) => {
    // if (e.url == 'http://livechat.tlc808.com/') {
    // 	LiveChatOpenGlobe()
    // 	this.setState({ onNavigation: false })
    // 	setTimeout(() => {
    // 		//切换回去优惠详情
    // 		this.setState({ onNavigation: true })
    // 	}, 1000);
    // }
  }

  onLoadStart(e) {
    this.setState({ loading: true });
  }

  onLoadEnd(e) {
    this.setState({ loading: false });
  }

  onError(e) {
    this._webView.reload();
  }

  getBalance = () => {
    const allBalance = this.props.userInfo.allBalance;
    if (allBalance.length > 0) {
      this.checkBalance();
    } else {

    }
  }


  checkBalance = () => {
    const { bonusProduct, bonusMinAmount, promoType, bonusId, bonusProductList } = this.props.Detail;
    console.log(this.props)
    const allBalance = this.props.userInfo.allBalance;
    console.log('this.props.Detail')
    console.log(this.props.Detail)
    if (allBalance.length === 0) {
      this.props.userInfo_getBalanceAll();
      return;
    }

    const memberInfo = this.props.userInfo.memberInfo;

    const totalBalance = this.props.userInfo.balanceTotal;
    const mainBalance = allBalance.find(v => v.name === "MAIN").balance;
    const otherBalance = allBalance.some(v => v.balance > 0);

    console.log('totalBalance ', totalBalance)
    console.log('mainBalance ', mainBalance)
    console.log('otherBalance ', otherBalance)
    console.log('bonusMinAmount ', bonusMinAmount)
    if (
      !memberInfo.firstName
    ) {
      Toasts.error('资料不完整，请至个人资料完善！', 3);
      Actions.userInfor()
      return
    }

    if (promoType === "Bonus") {
      // Total balance < 最小申請優惠金額 -> 存款page
      if (totalBalance < bonusMinAmount) {
        this.setState({
          Todeposit: true
        });
        return;
      }

      // 主錢包<=最小申請優惠金額  && 其他的產品錢包>=最小申請優惠金額 -> 轉帳 + one click button
      if ((mainBalance <= bonusMinAmount) && (otherBalance >= bonusMinAmount)) {
        Actions.pop();
        Actions.Transfer({ froms: 'promotions', promotionsDetail: this.props.Detail, oneClick: true })
        return;
      } else {
        Actions.pop();
        Actions.Transfer({ froms: 'promotions', promotionsDetail: this.props.Detail })
        return;
      }
    } else {
      Actions.PromotionsForm({Detail: this.props.Detail })
    }

  }

  /**
   * 申请优惠按钮的动作状态:
   * ------------------------------------------------------------------------------------------------------------------------------
   * @data            PromotionsData
   * @description:
   * ------------------------------------------------------------------------------------------------------------------------------
   * @type  {Bonus}        立即申请
   * @type  {Manual}        立即申请 打开奖金申请表页面
   * @type  {Other}        不做任何状态 隐藏按钮
   * -------------------------------------------------------------------------------------------------------------------------------
   * @param {Pending}      @type  {Bonus}  显示待处理按钮
   * @param {Processing}      @type  {Bonus}  显示待处理按钮
   * -------------------------------------------------------------------------------------------------------------------------------
   * @param {Serving}      @type  {Bonus}  显示进度条 => 百分比 => 进度完成率 => 显示所需的营业额
   * -------------------------------------------------------------------------------------------------------------------------------
   * @param {Waiting for release} @type  {Bonus}  显示待派发按钮
   * -------------------------------------------------------------------------------------------------------------------------------
   * @param {Release}        @type  {Bonus}  显示领取按钮  when [ isClaimable = true ]  call POST /api/Bonus/Claim
   * -------------------------------------------------------------------------------------------------------------------------------
   * @param {Available}      @type  {Bonus}  显示立即申请按钮 如果钱包有足够的金额重定向到转账页面，否则重定向到存款页面与选定的奖金
   * @param {Available}      @type  {Manual} 显示立即申请按钮 打开优惠申请表页面
   * -------------------------------------------------------------------------------------------------------------------------------
   * @param {Served}        @type  {Bonus}  显示已领取按钮
   * @param {Force to served}  @type  {Bonus}  显示已领取按钮
   * -------------------------------------------------------------------------------------------------------------------------------
   */

  render() {
    const { Todeposit, modalHtml } = this.state;
    const { promoType, actionType } = this.props.Detail;
    const { history } = this.props;
    console.log(this.props)
    return (
      <View style={{ flex: 1, backgroundColor: '#EFEFF4' }}>
        {/* -----优惠HTML容器---- */}
        {modalHtml != '' && Platform.OS == "ios" ?

          <WebViewIOS
            ref={ref => {
              this._webView = ref;
            }}
            onLoadStart={e => this.onLoadStart(e)}
            onLoadEnd={e => this.onLoadEnd(e)}
            onError={(e) => this.onError(e)}
            //source={{ html: body }}
            //<meta>  防止字體縮小 ,只有ios需要這樣處裡
            source={{ html: '<meta name="viewport" content="width=device-width, initial-scale=1.0">' + modalHtml }}
            scalesPageToFit={Platform.OS === "ios" ? false : true}
            originWhitelist={["*"]}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            thirdPartyCookiesEnabled={true}
            style={styles.webViewStyle}
            // onNavigationStateChange={this._onNavigationStateChange}
          />

          : modalHtml != '' && Platform.OS == "android" &&
          <WebView
            ref={ref => {
              this._webView = ref;
            }}
            onLoadStart={e => this.onLoadStart(e)}
            onLoadEnd={e => this.onLoadEnd(e)}
            onError={(e) => this.onError(e)}
            source={{ html: modalHtml }}
            scalesPageToFit={Platform.OS === "ios" ? false : true}
            originWhitelist={["*"]}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            thirdPartyCookiesEnabled={true}
            style={styles.webViewStyle}
            // onNavigationStateChange={this._onNavigationStateChange}
          />
        }
        {/* ---------END--------- */}
        <View style={[styles.activeBtn,{paddingBottom: actionType && actionType === "NO_ACTION" ? 10 : 30}]}>
          {(() => {
            if(actionType && actionType === "NO_ACTION"){
              return null
            }
            if (promoType === "Bonus" && history) {
              switch (history.status) {
                case "Serving":
                  return (
                    <View>
                      <View style={styles.progressBar}>
                        <View
                          style={[styles.Progress, { width: (parseInt(history.percentage) / 100) * (width - 30) }]}/>
                      </View>
                      <Text style={{ textAlign: 'center', fontSize: 13, color: '#111' }}>还需<Text
                        style={{ fontWeight: 'bold' }}>{history.turnoverNeeded}</Text>流水,可得<Text
                        style={{ fontWeight: 'bold' }}>{history.bonusAmount}</Text>元红利</Text>
                    </View>
                  );
                  break;
                case 'Release':
                  return (
                    /* ****** 先检查 isClaimable 为 true *******/
                    history.isClaimable && (
                      <Touch
                        style={styles.bonusBtnOk}
                        onPress={() => {
                          /***********检查是否已经登录 ********/
                          if (!ApiPort.UserLogin) {
                            Toasts.error('请先登陆');
                            Actions.Login()
                            return
                          }
                          // PiwikEvent('Promo Nav', 'Click', `Claim_(${this.props.Detail.contentId})_EUROPage`)
                          this.ClaimBonus(history.playerBonusId);
                        }}
                      >

                        <Text style={styles.bonusBtnTxt}>领取红利</Text>
                      </Touch>
                    )
                  );
                case 'Served':
                case 'Force to served':
                  return (
                    <View
                      style={styles.bonusBtnNull}
                    >

                      <Text style={styles.bonusBtnTxtNull}>已领取</Text>
                    </View>
                  );
                  break;
                case 'Waiting for release':
                  return (
                    <View
                      style={styles.bonusBtnNull}
                    >

                      <Text style={styles.bonusBtnTxtNull}>待派发</Text>
                    </View>
                  );
                default:
                  return null;
              }
            } else {
              return (
                <Touch
                  style={styles.bonusBtn}
                  onPress={() => {
                    console.log(this.props)
                    PiwikEvent("Promo Application", "Submit", `Apply_${this.props.Detail.promoId}_PromoPage`);
                    /***********检查是否已经登录 ********/
                    if (!ApiPort.UserLogin) {
                      Toasts.error('请先登陆');
                      Actions.Login()
                      return
                    }
                    if (this.props.from === "myPromoProcessing") {
                      if(!this.props.item){
                        console.log('缺少資料')
                        return;
                      }
                      Actions.PromotionsForm({ Detail: this.props.Detail, myPromoItem: this.props.item })
                      return;
                    }
                    if (this.props.from === "freeBet") {
                      Actions.FreebetSetting({
                        promotionsDetail: this.props.item,
                        getPromotionsApplications: () => {
                          this.props.getFreePromotions()
                        }
                      })
                      return
                    }
                    if (promoType == 'Bonus') {
                      this.checkBalance();
                      return
                    } else if (promoType == 'Manual') {
                      // Actions.pop();
                      this.checkBalance();
                    }
                  }}
                >
    
                  <Text style={styles.bonusBtnTxt}>
                    {this.props.from === "freeBet" ? "立即领取" : this.props.from === "myPromoProcessing"? "查看已提交资料" : "立即申请"}
                  </Text>
                </Touch>
              )
            }
          })()}
        </View>
        {/*-------------------------------取消优惠弹窗 选择取消的原因 -----------------------------------*/}

        <Modal
          animationType="none"
          transparent={true}
          visible={Todeposit}
          onRequestClose={() => {
          }}
        >
          <View style={styles.modalMaster}>
            <View style={styles.modalView}>
              <View style={styles.modalTitle}>
                <Text style={styles.modalTitleTxt}>余额不足</Text>
              </View>
              <Text style={{ lineHeight: 70, textAlign: 'center', color: '#000' }}>您的余额不足，请马上存款。</Text>
              <View style={styles.modalBtn}>
                <Touch onPress={() => {
                  this.setState({ Todeposit: false })
                }} style={styles.modalBtnL}>
                  <Text style={{ color: '#00A6FF' }}>关闭</Text>
                </Touch>
                <Touch onPress={() => {
                  this.setState({ Todeposit: false }, () => {
                    Actions.pop();
                    Actions.DepositCenter({ froms: 'promotions', promotionsDetail: this.props.Detail });
                    // PiwikEvent('Promo Application', 'Submit', `Apply_(${this.props.Detail.contentId})_EUROPage`)
                  })
                }} style={styles.modalBtnR}>
                  <Text style={{ color: '#fff' }}>存款</Text>
                </Touch>
              </View>
            </View>
          </View>
        </Modal>
        {/* <Modal closable={false} className="Proms" title="余额不足" visible={Todeposit}>
					<p className="txt">您的余额不足，请马上存款。</p>
					<div className="flex justify-around">
						<div
							className="Btn-Common"
							onClick={() => {
								this.setState({
									Todeposit: false
								});
							}}
						>
							关闭
						</div>
						<div
							className="Btn-Common active"
							onClick={() => {
								window.location.href = `${window.location
									.origin}/deposit?origin=ec2021&id=${bonusProductList[0]
										.bonusID}&wallet=${bonusProductList[0].bonusProduct}`;
							}}
						>
							存款
						</div>
					</div>
				</Modal> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalMaster: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0,0.5)',
  },
  modalView: {
    width: width * 0.9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingBottom: 15,
  },
  modalTitle: {
    width: width * 0.9,
    backgroundColor: '#00A6FF',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  modalTitleTxt: {
    lineHeight: 40,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  modalBtn: {
    width: width * 0.8,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalBtnL: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#00A6FF',
    width: width * 0.35,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBtnR: {
    borderRadius: 5,
    backgroundColor: '#00A6FF',
    width: width * 0.35,
    height: 42,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  webViewStyle: {
    flex: 1,
    // backgroundColor: "#EFEFF4",
    backgroundColor: 'transparent',
    borderWidth: 0
    // width: width,
    // height: height,
  },
  activeBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    padding: 15,
    // paddingBottom: 30,
    backgroundColor: "#fff"
  },
  bonusBtnTxt: {
    textAlign: 'center',
    lineHeight: 44,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  bonusBtnTxtNull: {
    textAlign: 'center',
    lineHeight: 44,
    color: '#BCBEC3',
    fontWeight: 'bold',
    fontSize: 16
  },
  bonusBtn: {
    backgroundColor: '#00A6FF',
    width: width - 30,
    borderRadius: 5,
  },
  bonusBtnOk: {
    backgroundColor: '#0CCC3C',
    width: width - 30,
    borderRadius: 10,
    height: 44
  },
  bonusBtnNull: {
    backgroundColor: '#EFEFF4',
    width: width - 30,
    borderRadius: 5,
    height: 44
  },
  progressBar: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#E0E0E0',
    height: 10,
    width: width - 30,
    borderRadius: 50,
  },
  Progress: {
    backgroundColor: '#00A6FF',
    height: 10,
    borderRadius: 50,
  },
  progressTxt: {
    width: width - 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const mapStateToProps = (state) => ({
  userInfo: state.userInfo
});
const mapDispatchToProps = {
  userInfo_getBalanceAll: (forceUpdate = false) => ACTION_UserInfo_getBalanceAll(forceUpdate)
};

export default connect(mapStateToProps, mapDispatchToProps)(PromotionsDetail);
