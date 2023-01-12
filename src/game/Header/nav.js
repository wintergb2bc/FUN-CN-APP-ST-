/*
	投注页面 导航菜单  所有游戏种类
*/


import {
	StyleSheet,
	WebView,
	Text,
	View,
	Animated,
	TouchableOpacity,
	Dimensions,
	Image,
	NativeModules,
	ScrollView,
	ImageBackground,
	Platform,
	TextInput,
	KeyboardAvoidingView,
} from "react-native";
import SnapCarousel, {
	ParallaxImage,
	Pagination
} from "react-native-snap-carousel";
import Touch from "react-native-touch-once";
const { width, height } = Dimensions.get("window");
import React from 'react'

import moment from 'moment';
import { VendorMarkets } from "./../../containers/SbSports/lib/vendor/data/VendorConsts";
import HeaderMenu from './menu'
import Bottomtime from '../Footer/bottomtime'
import Bottomsheet from '../Footer/bottomsheet'



const theDayAfterTenDays = moment().add(10, 'days').format('YYYY-MM-DD');
const theDaytoday = moment().format('YYYY-MM-DD');

class Bettingnav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chosegame: '-1',
			isopen: false,
			isExpandAll: true, //默認全展開
			SportId: this.props.BetType ? this.props.BetType.SportId : 1,
			// MarketId: VendorMarkets.RUNNING, //默認選3滾球，數據比較少
			MarketId: this.props.BetType ? this.props.BetType.MarketId : 2, //默認選3滾球，數據比較少
			SortWay: this.props.BetType ? this.props.BetType.SortWay : 1 /*排序 1联赛 2时间 0不指定排序  */,
			Selectdate: theDayAfterTenDays,
			currentMenu: null,
			navBarFreeze: false,
			menuName: '',
			GuideTop: 0,
			GuideLeft: 0,
		};

		// this.navRef = React.createRef();
		this.sportsMore = React.createRef();
		this.marketsMore = React.createRef();

		this.clickMenu = this.clickMenu.bind(this);
		this.clickSport = this.clickSport.bind(this);
		this.clickMarket = this.clickMarket.bind(this);
	}

	componentDidMount() {
		this.props.NavRef && this.props.NavRef(this);

		// const {query} = this.props.router; //從鏈接獲取要加載的參數

		// if(!(JSON.stringify(query) === "{}" || !query)) {
		// 	//有傳入參數
		// 	const {SportId,MarketId,SortWay,Selectdate} = this.state;
		// 	let cloneQuery = Object.assign({SportId,MarketId,SortWay},query);

		// 	//處理一下數據格式，要用int型態
		// 	cloneQuery.SportId = parseInt(cloneQuery.SportId);
		// 	cloneQuery.MarketId = parseInt(cloneQuery.MarketId);
		// 	cloneQuery.SortWay = parseInt(cloneQuery.SortWay);

		// 	//特別處理日期，實際上只會選一天
		// 	cloneQuery.Selectdate = query.EndDate ?? Selectdate;

		// 	//從路由更新 下拉菜單 選中項目
		// 	this.setState({ SportId:cloneQuery.SportId, MarketId: cloneQuery.MarketId, SortWay: cloneQuery.SortWay, Selectdate: cloneQuery.Selectdate })

		// 	//更新banner
		// 	this.props.MenuChange(cloneQuery.SportId);
		// }

		//處理捲動時，navbar固定在上方
		// const handleScroll = (topOffset = 0) => {
		// 	const bettingList = document.getElementById("Betting-list");

		// 	if (this.navRef.current && bettingList) {
		// 		const lgbcr = this.navRef.current.getBoundingClientRect(); //玩法組橫條
		// 		var lgbcr_height = lgbcr.height||(lgbcr.bottom - lgbcr.top); //相容ie
		// 		const lcbcr = bettingList.getBoundingClientRect(); //玩法列表

		// 		//凍結的條件： 玩法列表的top 小於等於  天花板 +玩法組的height)
		// 		//注意上面有header(topOffset)
		// 		const freeze = lcbcr.top <= lgbcr_height + topOffset;
		// 		//console.log('===',freeze,lcbcr.top,'<=',lgbcr_height + topOffset,lgbcr_height);
		// 		if (this.state.navBarFreeze !== freeze) { //減少觸發render次數
		// 			this.setState({navBarFreeze: freeze});
		// 		}
		// 	} else {
		// 		//console.log('===navRefs not FOUND');
		// 	}
		// }

		// const headerBar = document.getElementById("header-bar");
		// let topOffset = 0;
		// if(headerBar) {
		// 	topOffset = headerBar.clientHeight;
		// }

		// this.handleScrollForNavbar = () => handleScroll(topOffset);

		// window.addEventListener("scroll", this.handleScrollForNavbar);
	}

	componentWillUnmount() {
		// if (this.handleScrollForNavbar) {
		// 	window.removeEventListener("scroll", this.handleScrollForNavbar)
		// }
	}

	clickMenu(menuName) {
		let newMenuName = menuName;
		if (this.state.currentMenu === newMenuName) {
			newMenuName = null; //如果已經選中，再點一次就是取消
		}
		PiwikEvent('Odds_Filter', 'Click', 'MainPage_ViewMore')
		this.setState({ currentMenu: newMenuName });
	}
	clickSport(sportData) {
		const sportId = sportData.SportId;
		// console.log('sportIdsportIdsportId', sportId)
		this.setState(
			{
				SportId: sportId,
				menuName: '',
			},
			() => {
				this.ChangeGame();
				this.props.MenuChange(sportId); //banner刷新
			}
		);
	}
	clickMarket(marketData) {
		const marketId = marketData.MarketId;
		this.setState(
			{
				menuName: '',
				MarketId: marketId
			},
			() => {
				this.ChangeGame();
			}
		);
	}

	/* 选择游戏 */
	ChangeGame = (date) => {
		const { SportId, MarketId, SortWay } = this.state;
		let StartDate = date ? moment(new Date(date)).format('YYYY-MM-DD') : theDaytoday; /* 今天 */
		let EndDate = date ? moment(new Date(date)).format('YYYY-MM-DD') : theDayAfterTenDays; /* 10天後 */
		const type = {
			SportId: SportId /* 体育类型 */,
			MarketId: MarketId /* 市场类型 */,
			SortWay: SortWay /* 排序 */,
			StartDate: StartDate /* 开始日期 */,
			EndDate: EndDate /* 结束日期 */
		};
		this.props.GetEvents(type);
		this.setState({
			Selectdate: date,
			isExpandAll: true, //選擇變化之後  要重置(全展開)
		}, () => {
			this.props.onToggleButtonClicked(true)
		});
		PiwikEvent('Odds_Filter', 'Click', 'MainPage_ViewMore')
	};

	changeToggleButtonStatus = (isExpandAll) => {
		this.setState({ isExpandAll });
	}
	changeSelect(SortWay) {
		this.setState({
			SortWay,
		}, () => {
			this.ChangeGame();
		})
	}

	getGuide = (e) => {
		NativeModules.UIManager.measure(e.target, (x, y, width, height, px, py) => {
			this.setState({
				GuideTop: py,
				GuideLeft: px,
			});
		});
	}
	getGuideReturn() {
		const {GuideTop,GuideLeft} = this.state;
		return {GuideTop,GuideLeft}
	}
	render() {
		const { SportId, MarketId, Selectdate, menuName, SortWay, isExpandAll } = this.state;
		const { SportDatas, Loading } = this.props;
		let selectedSport, selectedMarket;
		if (SportDatas) {
			const targetSports = SportDatas.filter(s => parseInt(s.SportId) === parseInt(SportId));
			if (targetSports && targetSports.length > 0) {
				selectedSport = targetSports[0];
			} else {
				selectedSport = SportDatas[0]; //找不到就默認用第一個
			}
			if (selectedSport) {
				const targetMarkets = selectedSport.Markets.filter(m => parseInt(m.MarketId) === parseInt(MarketId));
				if (targetMarkets && targetMarkets.length > 0) {
					selectedMarket = targetMarkets[0];
				}
			}
		}
		// console.log(SportId, 'selectedSportselectedSport', SportDatas)
		return (
			<View>
				{SportDatas.length > 0 &&
					<View>
						<View style={styles.nav}>
							<View style={styles.menuList}>
								<TouchableOpacity style={[styles.navBtn, { backgroundColor: menuName == 'sport' ? '#fff' : 'transparent' }]} onPress={() => { this.setState({ menuName: menuName != 'sport' ? 'sport' : '' }) }}  onLayout={(e) => this.getGuide(e)}>
									<Text>{selectedSport.SportName + ' ' + selectedSport.Count}</Text>
									<Image resizeMode='stretch' source={menuName == 'sport' ? require('../../images/icon-Up.png') : require('../../images/icon-Down.png')} style={{ width: 20, height: 20 }} />
								</TouchableOpacity>
								<TouchableOpacity style={[styles.navBtn, { backgroundColor: menuName == 'market' ? '#fff' : 'transparent' }]} onPress={() => { this.setState({ menuName: menuName != 'market' ? 'market' : '' }) }}>
									<Text>{selectedMarket.MarketName + ' ' + selectedMarket.Count}</Text>
									<Image resizeMode='stretch' source={menuName == 'market' ? require('../../images/icon-Up.png') : require('../../images/icon-Down.png')} style={{ width: 20, height: 20 }} />
								</TouchableOpacity>
							</View>
							<View style={styles.menuList}>
								<View style={styles.btnType}>
									<Touch style={[styles.btnList, { backgroundColor: SortWay == 1 ? '#00A6FF' : 'transparent' }]} onPress={() => { this.changeSelect(1) }}>
										<Text style={[styles.btnTxt, { color: SortWay == 1 ? '#fff' : '#666666' }]}>联赛</Text>
									</Touch>
									<Touch style={[styles.btnList, { backgroundColor: SortWay == 2 ? '#00A6FF' : 'transparent' }]} onPress={() => { this.changeSelect(2) }}>
										<Text style={[styles.btnTxt, { color: SortWay == 2 ? '#fff' : '#666666' }]}>时间</Text>
									</Touch>
								</View>
								<Touch style={{ marginLeft: 12, backgroundColor: '#DEDEE3', borderRadius: 50, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
									this.setState({
										isExpandAll: !this.state.isExpandAll
									}, () => {
										this.props.onToggleButtonClicked(this.state.isExpandAll)
									});
								}}>
									<Image resizeMode='stretch' source={isExpandAll? require('../../images/all-up.png'): require('../../images/all-down.png')} style={{ width: 16, height: 16 }} />
								</Touch>
							</View>
						</View>
						<View style={{ display: 'flex', flexDirection: 'row', zIndex: -1, backgroundColor: this.props.navTop ?'#fff': 'rgba(233,233,238,1)' }}>
							{/* <View> </View> */}
							{/* 體育菜單 */}
							{
								menuName == 'sport' && SportDatas.length > 0 &&
								<HeaderMenu
									menuName="sport"
									currentMenuName={this.state.currentMenu}
									items={SportDatas}
									selectedItem={selectedSport}
									formatItem={(item) => item.SportName + ' ' + item.Count}
									getItemKey={(item) => item.SportId}
									onClickMenu={this.clickMenu}
									onClickItem={this.clickSport}
									onClickMoreButton={() => { this.sportsMore.current.show() }}
								/>
							}
							{/* <View style={{ position: 'absolute', zIndex: 99 }}> */}
							{/* 市場菜單 */}
							{
								menuName == 'market' && SportDatas.length > 0 &&
								<HeaderMenu
									menuName="market"
									currentMenuName={this.state.currentMenu}
									items={selectedSport ? selectedSport.Markets : []}
									selectedItem={selectedMarket}
									formatItem={(item) => item.MarketName + ' ' + item.Count}
									getItemKey={(item) => item.MarketId}
									onClickMenu={this.clickMenu}
									onClickItem={this.clickMarket}
									onClickMoreButton={() => { this.marketsMore.current.show() }}
								/>
							}
							{/* </View> */}
						</View>
						{/* 日期动作面板 */}
						{selectedMarket && parseInt(selectedMarket.MarketId) === VendorMarkets.EARLY &&  //早盤才可以選日期
							!Loading && (
								<Bottomtime ChangeGame={(e) => this.ChangeGame(e)} Selectdate={Selectdate} SportId={SportId} />
							)}

						{/* 點擊菜單的「更多」出現的下浮窗 */}
						{/* 體育 */}
						<Bottomsheet
							ref={this.sportsMore}
							headerName="全部体育"
							items={SportDatas}
							selectedItem={selectedSport}
							formatItem={(item) => item.SportName + ' ' + item.Count}
							getItemKey={(item) => item.SportId}
							onClickItem={this.clickSport}
						/>
						{/* 市場 */}
						<Bottomsheet
							ref={this.marketsMore}
							headerName="选择日期"
							items={selectedSport ? selectedSport.Markets : []}
							selectedItem={selectedMarket}
							formatItem={(item) => item.MarketName + ' ' + item.Count}
							getItemKey={(item) => item.MarketId}
							onClickItem={this.clickMarket}
						/>
					</View>
				}
			</View>
		);
	}
}
export default Bettingnav;


const styles = StyleSheet.create({
	nav: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		paddingLeft: 15,
		paddingRight: 15,
		// borderBottomColor: '#ccc',
		// borderBottomWidth: 1,
		backgroundColor: '#efeff4',
		height: 55,
	},
	btnType: {
		backgroundColor: '#dedee3',
		borderRadius: 50,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	navBtn: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		width: width * 0.25,
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		height: 45,
	},
	btnList: {
		width: 50,
		backgroundColor: '#00A6FF',
		borderRadius: 50,
	},
	btnTxt: {
		textAlign: 'center',
		lineHeight: 30,
	},
	menuList: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		height: 55,
		paddingTop: 10,
	},
});
