import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
    Image,
    Dimensions,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Platform,
} from "react-native";
import {
    Button,
    Carousel,
    WhiteSpace,
    WingBlank,
    Radio,
    InputItem,
    DatePicker,
    Flex,
    Toast,
    List
} from "antd-mobile-rn";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CheckBox from "react-native-check-box";
import Touch from "react-native-touch-once";

import { NavigationActions } from "react-navigation";
import { Actions } from "react-native-router-flux";
import { ACTION_UserSetting_ToggleListDisplayType } from '../../../lib/redux/actions/UserSettingAction'

import {fetchRequestSB} from "./../lib/SportRequest";
import {ApiPortSB} from "./../lib/SPORTAPI";

const { width, height } = Dimensions.get("window");



class DrawerContent extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            memberInfo: '',
            UserLogin: ApiPort.UserLogin,
            balance: '0.00',
            StatisticsAll: 0,
            message: false,
            hotGmae: false,
            setTing: false,
            tutorial: false,
        };
    }
    componentWillMount() {
        if (ApiPort.UserLogin == true) {
            this.getMessageCount()
            this.setState({
                memberInfo: JSON.parse(localStorage.getItem("memberInfo"))
            });
        }
    }
    componentDidMount() {
        let popverList = ['message', 'hotGmae', 'setTing', 'tutorial'];
        popverList.forEach((item) => {
            global.storage
                .load({
                    key: item,
                    id: item
                })
                .then(data => { })
                .catch(err => {
                    this.setState({ [item]: true });
                });
        })
    }


    componentWillUnmount() {

    }

    // 未讀訊息統計
    getMessageCount = () => {
        fetchRequestSB(ApiPortSB.UnreadMessage + "key=All&", "GET")
            .then((res) => {
                if (res && res.isSuccess && res.result) {
                    const total =
                        res.result.unreadPersonalMessageCount +
                        res.result.unreadTransactionCount;
                    this.setState({
                        StatisticsAll: total,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    closePopver(message) {
        this.setState({ [message]: false })
        global.storage.save({
            key: message,
            id: message,
            data: message,
            expires: null
        });
    }

    close() {
        // Actions.drawerClose()
        this.props.chnageModal(false)
    }
    actionPage(key) {
        this.props.chnageModal(false)
        if (!ApiPort.UserLogin) {
            Actions.Login()
            return
        }
        switch (key) {
            case 'DepositCenter':
                PiwikEvent('Deposit_Nav', 'Launch', 'Sidenav')
                Actions.DepositCenter({ from: 'GamePage' })
                break;
            case 'TransferSb':
                PiwikEvent('Transfer_Nav', 'Launch', 'Sidenav')
                Actions.TransferSb()
                break;
            case 'News':
                PiwikEvent('Notification', 'Launch', 'Sidenav')
                Actions.NewsSb()
                break;
            case 'setSystem':
                PiwikEvent('HotMatches', 'Launch', 'Sidenav')
                Actions.Setting({ setType: 'setSystem' })
                break;
            case 'setPush':
                PiwikEvent('Notification_Setting', 'Launch', 'Sidenav')
                Actions.Setting({ setType: 'setPush' })
                break;
            case 'Rules':
                Actions.Rules()
                break;
            default:
                ''
        }
    }

    logout() {
        if (window.currentRouteIndex !== 0) {
            console.log('===sb2.0 pop-out',window.currentRouteIndex);
            Actions.pop();
        } else {
            //=0則無法pop，因為沒有上層scene了，改用reset跳回首頁
            console.log('===sb2.0 reset-out',window.currentRouteIndex);
            Actions.reset('drawer');
        }
        this.props.chnageModal(false)
       // window.navigateToSceneGlobe && window.navigateToSceneGlobe()
    }

    DomainC(key) {
        if(key == 'live') {

        }
    }


    render() {
        const {
            UserLogin,
            balance,
            memberInfo,
            message,
            hotGmae,
            setTing,
            StatisticsAll,
            tutorial,
        } = this.state;

        window.GetMessageCounts = () => {
            this.getMessageCount()
        }
        const {
            userSetting,
        } = this.props
        return (
            <View style={{ flex: 1, paddingTop: DeviceInfoIos? 35: 0 }}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.logos}>
                        <Touch style={{ width: 50 }} onPress={() => { this.close() }}>
                            <Image resizeMode='stretch' source={require('../images/close.png')} style={{ width: 15, height: 15 }} />
                        </Touch>
                        <Image resizeMode='stretch' source={require('../images/logo1.png')} style={{ width: 100, height: 35 }} />
                        <Text style={{ color: '#fff' }}>123</Text>
                    </View>

                    <View>
                        {/* {
                            !UserLogin &&
                            <View style={styles.userName}>
                                <Text style={{ color: '#999999' }}>欢迎, 访客参访中...</Text>
                            </View>
                        } */}
                        {
                            UserLogin &&
                            <View style={styles.userName}>
                                <Text style={{ fontWeight: 'bold', color: '#999' }}>{
                                    memberInfo.userName && memberInfo.userName.length > 10 ? memberInfo.userName.slice(0,10) + '...': memberInfo.userName
                                }</Text>
                                <Text style={{ color: '#000' }}>￥ {this.props.userInfo.balanceSB}</Text>
                            </View>
                        }
                    </View>
                    {/* <Touch
                        onPress={() => {
                            window.GameMenus && window.GameMenus(0)
                            Actions.EuroCup()
                            PiwikEvent('Engagement Event', 'Launch', 'Enter_EUROPage')
                        }}
                        style={{paddingLeft: 20, marginBottom: 10}}
                    >
                        <Image resizeMode='stretch' source={require('../images/euroCup/evenPage.png')} style={{ width: (width * 0.8) - 40, height: ((width * 0.8) - 40) * 0.315 }} />
                    </Touch> */}

                     <View style={styles.listItem}>
                        <Touch onPress={() => { this.actionPage('DepositCenter');PiwikEvent('Deposit Nav', 'Click', 'Deposit_Sidenav_SB2.0')  }} style={styles.iconBtn}>
                            <Image resizeMode='stretch' source={require('../images/drawer/deposit.png')} style={{ width: 35, height: 35 }} />
                            <Text style={{ color: '#000' }}>存款</Text>
                        </Touch>
                    </View>

                    <View style={styles.listItem}>
                        <Touch onPress={() => { this.actionPage('TransferSb');PiwikEvent('Transfer Nav', 'Click', 'Transfer_Sidenav_SB2.0') }} style={styles.iconBtn}>
                            <Image resizeMode='stretch' source={require('../images/drawer/transfer.png')} style={{ width: 35, height: 35 }} />
                            <Text style={{ color: '#000' }}>转账</Text>
                        </Touch>
                    </View>

                    <View style={styles.listItem}>
                        <Touch onPress={() => { this.actionPage('News');PiwikEvent('Account', 'Click', 'Notification_Sidenav_SB2.0') }} style={styles.iconBtn}>
                            <Image resizeMode='stretch' source={require('../images/drawer/message.png')} style={{ width: 35, height: 35 }} />
                            <Text style={{ color: '#000' }}>通知</Text>
                        </Touch>
                        {
                            // StatisticsAll > 0 &&
                            UserLogin &&
                            <View style={styles.news}>
                                <Text style={{ color: '#fff', fontSize: 11, fontWeight: 'bold' }}>{StatisticsAll}</Text>
                            </View>
                        }
                        {
                            UserLogin && message &&
                            <View style={styles.Popover}>
                                <Touch onPress={() => { this.closePopver('message') }} style={styles.PopoverConten}>
                                    <View style={styles.arrow} />
                                    <Text style={{ color: '#fff', paddingRight: 5, fontSize: 12 }}>查看赛事通知</Text>
                                    <Image resizeMode='stretch' source={require('../images/closeWhite.png')} style={{ width: 15, height: 15 }} />
                                </Touch>
                            </View>
                        }
                    </View>

                    <View style={styles.listItem}>
                        <Touch onPress={() => { this.close(); window.ShowHotEvents && window.ShowHotEvents(1);PiwikEvent('Game Nav', 'Click', 'HotMatches_Sidenav_SB2.0') }} style={styles.iconBtn}>
                            <Image resizeMode='stretch' source={require('../images/drawer/hotGame.png')} style={{ width: 35, height: 35 }} />
                            <Text style={{ color: '#000' }}>热门赛事</Text>
                        </Touch>
                        {
                            hotGmae &&
                            <View style={[styles.Popover, { left: 130 }]}>
                                <Touch onPress={() => { this.closePopver('hotGmae') }} style={styles.PopoverConten}>
                                    <View style={styles.arrow} />
                                    <Text style={{ color: '#fff', paddingRight: 5, fontSize: 12 }}>推荐热门赛事</Text>
                                    <Image resizeMode='stretch' source={require('../images/closeWhite.png')} style={{ width: 15, height: 15 }} />
                                </Touch>
                            </View>
                        }
                    </View>

                    <View style={styles.listItem}>
                        <Touch style={styles.iconBtn}>
                            <Image resizeMode='stretch' source={require('../images/drawer/set.png')} style={{ width: 35, height: 35 }} />
                            <Text style={{ color: '#000' }}>设置</Text>
                        </Touch>
                    </View>
                    <View style={styles.listItemList}>
                        <View style={styles.iconListBtn}>
                            <Text style={{ color: '#999', fontSize: 13, }}>盘口显示</Text>
                        </View>
                        <View style={styles.horizontal}>
                            <Touch
                                onPress={() => { this.props.toggleListDisplayType(); PiwikEvent('Navigation', 'Click', 'VerticalDisplay_Sidenav_SB2.0') }}
                                style={[styles.horizontalBtn,{backgroundColor: userSetting.ListDisplayType != 2? '#00a6ff':'transparent'}]}
                            >
                                <Text style={{color: userSetting.ListDisplayType != 2? '#fff':'#999999', fontSize: 12}}>纵向</Text>
                            </Touch>
                            <Touch
                                onPress={() => { this.props.toggleListDisplayType(); PiwikEvent('Navigation', 'Click', 'HorizontalDisplay_Sidenav_ SB2.0') }}
                                style={[styles.horizontalBtn,{backgroundColor: userSetting.ListDisplayType == 2? '#00a6ff':'transparent'}]}
                            >
                                <Text style={{color: userSetting.ListDisplayType == 2? '#fff':'#999999', fontSize: 12}}>横向</Text>
                            </Touch>
                        </View>
                    </View>

                    <View style={styles.listItemList}>
                        <Touch onPress={() => { this.actionPage('setSystem') ;PiwikEvent('Account', 'Click', 'Setting_Sidenav_SB2.0') }} style={styles.iconListBtn}>
                            <Text style={{ color: '#999', fontSize: 13, }}>系统设置</Text>
                        </Touch>
                    </View>

                    <View style={styles.listItemList}>
                        <Touch onPress={() => { this.actionPage('setPush') ;PiwikEvent('Account', 'Click', 'NotificationSetting_Sidenav_ SB2.0')}} style={styles.iconListBtn}>
                            <Text style={{ color: '#999', fontSize: 13, }}>推送设置</Text>
                        </Touch>
                        {
                            UserLogin && setTing &&
                            <View style={[styles.Popover, { left: 130 }]}>
                                <Touch onPress={() => { this.closePopver('setTing') }} style={styles.PopoverConten}>
                                    <View style={styles.arrow} />
                                    <Text style={{ color: '#fff', paddingRight: 5, fontSize: 12 }}>赛事进球推送设置</Text>
                                    <Image resizeMode='stretch' source={require('../images/closeWhite.png')} style={{ width: 15, height: 15 }} />
                                </Touch>
                            </View>
                        }
                    </View>

                    <View style={styles.listItem}>
                        <Touch onPress={() => {
                            this.props.chnageModal(false)
                            Actions.Rules();PiwikEvent('Navigation', 'Click', 'BettingRules_Sidenav_SB2.0') }} style={styles.iconBtn}>
                            <Image resizeMode='stretch' source={require('../images/drawer/rules.png')} style={{ width: 35, height: 35 }} />
                            <Text style={{ color: '#000' }}>投注规则</Text>
                        </Touch>
                    </View>
                    <View style={styles.listItem}>
                        <Touch style={styles.iconBtn}>
                            <Image resizeMode='stretch' source={require('../images/drawer/tutorial.png')} style={{ width: 35, height: 35 }} />
                            <Text style={{ color: '#000' }}>新手教程</Text>
                        </Touch>
                        {
                            tutorial &&
                            <View style={[styles.Popover, { left: 130 }]}>
                                <Touch onPress={() => { this.closePopver('tutorial') }} style={styles.PopoverConten}>
                                    <View style={styles.arrow} />
                                    <Text style={{ color: '#fff', paddingRight: 5, fontSize: 12 }}>新手教程讲解</Text>
                                    <Image resizeMode='stretch' source={require('../images/closeWhite.png')} style={{ width: 15, height: 15 }} />
                                </Touch>
                            </View>
                        }
                    </View>
                    <View style={styles.listItemList}>
                        <Touch onPress={() => {  this.props.chnageModal(false);PiwikEvent('Navigation', 'Click', 'OddsTutorial_Sidenav_SB2.0')
                            Actions.BetTutorial({types: 'trends'}) }} style={styles.iconListBtn}>
                            <Text style={{ color: '#999', fontSize: 13, }}>盘口教程</Text>
                        </Touch>
                    </View>
                    <View style={styles.listItemList}>
                        <Touch onPress={() => {
                            this.props.chnageModal(false);PiwikEvent('Navigation', 'Click', 'BetTutorial_Sidenav_SB2.0')
                             Actions.BetTutorial({types: 'bet'}) }} style={styles.iconListBtn}>
                            <Text style={{ color: '#999', fontSize: 13, }}>投注教程</Text>
                        </Touch>
                    </View>
                    {
                        // ApiPort.UserLogin &&
                        <View style={styles.listItem}>
                            <Touch onPress={() => { this.logout();PiwikEvent('Navigation', 'Click', 'Back_MainSite_SB2.0_Sidenav') }} style={styles.iconBtn}>
                                <Image resizeMode='stretch' source={require('../images/drawer/loginOut.png')} style={{ width: 35, height: 35 }} />
                                <Text style={{ color: '#000' }}>返回乐天堂</Text>
                            </Touch>
                        </View>
                    }
                    {
                        // SBTDomain == 'http://sportsstaging.fun88.biz/' &&
                        // <View style={styles.listItem}>
                        //     <Touch onPress={() => { this.DomainC('live') }} style={styles.iconBtn}>
                        //         <Image resizeMode='stretch' source={require('../images/closeWhite.png')} style={{ width: 35, height: 35 }} />
                        //         <Text style={{ color: '#000' }}>切换live</Text>
                        //     </Touch>
                        // </View>
                    }



                </ScrollView>
               {
            //     <Text style={{textAlign: 'center', lineHeight: 38}}>
            //     版本号: v{Rb88Version}
            // </Text>
               }
            </View>
        );
    }
}

const mapStateToProps = state => ({
	userInfo: state.userInfo,
	maintainStatus: state.maintainStatus,
    userSetting: state.userSetting
});
const mapDispatchToProps = {
    toggleListDisplayType: () => ACTION_UserSetting_ToggleListDisplayType(),
};
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);

const styles = StyleSheet.create({
    horizontalBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: 50,
        height: 30,
    },
    horizontal: {
        position: 'absolute',
        right: 15,
        backgroundColor: '#EEEEF0',
        borderRadius: 50,
        width: 100,
        height: 30,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    logos: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
        paddingTop: 25,
    },
    userName: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
        paddingVertical: 10
    },
    listItem: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 9,
    },
    listItemList: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 6,
        paddingBottom: 6,
        backgroundColor: 'rgba(239,239,244,.3)',
    },
    iconBtn: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
    },
    iconListBtn: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 50,
        paddingTop: 5,
        paddingBottom: 5,
    },
    Popover: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        left: 100,
    },
    PopoverConten: {
        backgroundColor: '#363636',
        borderRadius: 8,
        padding: 5,
        paddingLeft: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    arrow: {
        position: 'absolute',
        left: -13,
        width: 0,
        height: 0,
        zIndex: 9,
        borderStyle: "solid",
        borderWidth: 7,
        borderTopColor: "#ffffff",
        borderLeftColor: "#ffffff",
        borderBottomColor: "#ffffff",
        borderRightColor: "#363636"
    },
    news: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 109999,
        padding: 4,
        backgroundColor: '#eb2121',
        position: 'absolute',
        width: 26,
        height: 26,
        right: 15,
    }
});








