/*
	投注页面 详情内页  播放视频 动画 游戏数据
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
	ScrollView,
	ImageBackground,
	Platform,
	Modal,
	TextInput,
	KeyboardAvoidingView,
} from "react-native";
import SnapCarousel, {
	ParallaxImage,
	Pagination
} from "react-native-snap-carousel";
import Touch from "react-native-touch-once";
import Smartcoach from './Smartcoach'
import SkeletonBettingDetail from '../Skeleton/BettingDetail'
import { Flex, Toast, WingBlank, WhiteSpace, Tabs, Drawer } from "antd-mobile-rn";
import { Actions } from "react-native-router-flux";
const { width, height } = Dimensions.get("window");
import React from "react";
// import Router from 'next/router';
// import dynamic from 'next/dynamic';
// import { DataConsumer } from '@/DataProvider/';
import SelectionBox from './BetGroup/SelectionBox';
// import Collapse, { Panel } from 'rc-collapse';
// import { ReactSVG } from '@/ReactSVG';
import DetailHeader from './Detail-Header';
import Bottombetbox from '../Footer/bottombetbox';
import BetCartPopup from '../Betting/BetCartPopup';
import Bottomsheet from '../Footer/bottomsheet';
// import Skeletondetail from '@/Skeleton/detail';
// import LazyImageForTeam from '@/LazyLoad/LazyImageForTeam';
// import LazyImageForLeague from '../../LazyLoad/LazyImageForLeague';
// import { forceCheck } from 'react-lazyload';
import SelectionData from './../../containers/SbSports/lib/vendor/data/SelectionData';
import moment from 'moment';
// import FullScreen from './FullScreen';
// import Drawer from '@/Drawer';
// import Keyboard from '@/Games/Footer/Keyboard';
import { EventChangeType, SpecialUpdateType, VendorMarkets } from './../../containers/SbSports/lib/vendor/data/VendorConsts';
// import { ChangeSvg } from '$LIB/utils/util';
import EventData from "./../../containers/SbSports/lib/vendor/data/EventData";
import CryptoJS from "crypto-js";
import SportImage from '../SportImage'
import { connect } from "react-redux";
import { ACTION_BetCart_setIsComboBet, ACTION_BetCart_add, ACTION_BetCart_remove, ACTION_BetCart_clear } from '$LIB/redux/actions/BetCartAction';


class BettingDetail extends React.Component {
	constructor() {
		super();
		this.state = {
			tabactive:1,
			winHeight: height,
			winWidth: width,
			detailWidth: width,
			detailHeight: height,
			isOpen: false,
			fixedLive: false,
			LineGroupId: null, //選中的玩法分組
			PinLines: [], //置頂的玩法
			showDrawer: false,
			EventDetail: '',
			eventDatas: '' /* 顶部导航赛事 */,
			OddsUpData: '' /* 上升赔率 */,
			OddsDownData: '' /* 下降赔率 */,
			scaleStatus: false,
			defaultShowType: 0,
			//showBet: false,
			isLandscape: false,
			LineGroupBarFreeze: false, //玩法分組條 是否固定在最上方
			LineToggleStatusArray: null, //玩法展開/收起的狀態
			headerWidth: width,
			Disbandsmartcoach: true,
			headerHeight: width * 0.555,
			setIsLandscape: true,//横屏是否显示投注页
		};

		this.lineGroupMore = React.createRef();
		this.lineGroupBarRef = React.createRef();
		this.detailHeaderRef = React.createRef();
		this.detailBannerRef = React.createRef();
		this.linesContainerRef = React.createRef();
		this._onLayout = this._onLayout.bind(this)

		// 投注全屏窗口元素（全屏状态投注滑动窗口需要）
		this.bettingDrawer = React.createRef();
		this._refsShowBottom = React.createRef();
	}
	componentWillMount() {
		window.removeOrientation && window.removeOrientation()
		this.setState({defaultShowType: this.props.defaultShowType? this.props.defaultShowType : 0})
		window.MiniEventShow && window.MiniEventShow(false,0,0,0,0)
		// setTimeout(() => {
		// 	window.openOrientation && window.openOrientation()
		// },2000)
	}
	componentDidMount() {
		const { eid, sid, lid, OE } = this.props.dataList;
		this.GetIMdatadetail(sid, eid, OE === true);
		this.getLiveEventsInSameLeague(eid, sid, lid);

		//處理捲動時，玩法分組 固定在上方
		// const handleScroll = (topOffset = 0) => {
		// 	if (this.lineGroupBarRef.current && this.linesContainerRef.current) {
		// 		const lgbcr = this.lineGroupBarRef.current.getBoundingClientRect(); //玩法組橫條
		// 		var lgbcr_height = lgbcr.height || (lgbcr.bottom - lgbcr.top); //相容ie
		// 		const lcbcr = this.linesContainerRef.current.getBoundingClientRect(); //玩法列表

		// 		//凍結的條件： 玩法列表的top 小於等於  天花板 +玩法組的height)
		// 		//注意豎屏  上面有聯賽名橫條(topOffset)
		// 		//另外需要考慮 點擊pin 視頻/動畫也凍結的情況
		// 		let fixedHeaderHieght = -1;
		// 		//橫屏不用考慮Pin
		// 		if (!this.state.isLandscape && this.state.fixedLive && this.detailBannerRef.current) {
		// 			const dhcr = this.detailBannerRef.current.getBoundingClientRect() //頭部 視頻/動畫
		// 			fixedHeaderHieght = (dhcr.height || (dhcr.bottom - dhcr.top)) - 1; //相容ie
		// 			//console.log('====fixedHeaderHieght2',fixedHeaderHieght);
		// 		}

		// 		let freeze = lcbcr.top <= lgbcr_height + topOffset + fixedHeaderHieght;
		// 		if (this.state.LineGroupBarFreeze) { //固定(fixed) 之後 玩法組高度不計
		// 			freeze = lcbcr.top <= topOffset + fixedHeaderHieght;
		// 		}
		// 		//console.log('====',freeze,lcbcr.top,'<=',lgbcr_height + topOffset+ fixedHeaderHieght,lgbcr_height,topOffset,fixedHeaderHieght);
		// 		if (this.state.LineGroupBarFreeze !== freeze) {
		// 			//減少觸發render次數
		// 			this.setState({ LineGroupBarFreeze: freeze });
		// 		}
		// 	} else {
		// 		//console.log('===lineGroupRef not FOUND');
		// 	}
		// };

		let topOffset = 0;
		if (this.detailHeaderRef.current) {
			topOffset = this.detailHeaderRef.current.clientHeight;
		}

		// this.handleWindowScrollForLineGroupBar = () => handleScroll(topOffset);
		// window.addEventListener('scroll', this.handleWindowScrollForLineGroupBar);

		//橫屏時，捲動目標改成betting_list_detail
		// const detail = document.getElementById('betting_list_detail');
		// if (detail) {
		// 	this.handleDetailDivScrollForLineGroupBar = () => handleScroll();
		// 	detail.addEventListener('scroll', this.handleDetailDivScrollForLineGroupBar);
		// }
	}

	componentWillUnmount() {
		window.openOrientation && window.openOrientation()
		this.props.Vendor.deletePolling(this.eventPollingKey);
		//處理捲動時，玩法分組 固定在上方
		// if (this.handleWindowScrollForLineGroupBar) {
		// 	window.removeEventListener('scroll', this.handleWindowScrollForLineGroupBar);
		// }
		//橫屏時，捲動目標改成betting_list_detail
		// const detail = document.getElementById('betting_list_detail');
		// if (detail && this.handleDetailDivScrollForLineGroupBar) {
		// 	detail.removeEventListener('scroll', this.handleDetailDivScrollForLineGroupBar);
		// }
	}

	/* 游戏详情数据 */
	GetIMdatadetail = (sid, eid, OE) => {
		//加快速度，從緩存中獲取初始展示數據
		const cacheKey = sid + '|||' + eid;
		const cachedEventDataJSON = this.props.Vendor._cacheGet(cacheKey, null);
		let cachedEventData = null;
		if (cachedEventDataJSON) {
			const tmpObj = JSON.parse(cachedEventDataJSON);
			cachedEventData = EventData.clone(tmpObj);
		}

		if (cachedEventData) {
			this.setState({ EventDetail: cachedEventData });
		}

		//輪詢 單個比賽數據(在比賽詳情頁 使用) 返回輪詢key
		this.eventPollingKey = this.props.Vendor.getEventDetailPolling(
			(PollingResult) => {
				console.log('PollingResultPollingResultPollingResult', PollingResult)
				//處理 數據變化
				const OddsUpData = [];
				const OddsDownData = [];
				PollingResult.Changes.map((changeData) => {
					//類型：更新
					if (changeData.ChangeType === EventChangeType.Update) {
						changeData.SpecialUpdates.map((sUpdateData) => {
							const thisEventId = changeData.EventId; //比賽ID
							// 處理賠率上升動畫
							if (sUpdateData.UpdateType === SpecialUpdateType.OddsUp) {
								const thisLineId = sUpdateData.LineId; //投注線ID
								const thisSelectionId = sUpdateData.SelectionId; //投注選項ID
								OddsUpData.push({
									EventId: thisEventId,
									LineId: thisLineId,
									SelectionId: thisSelectionId,
									OldValue: sUpdateData.OldValue,
									NewValue: sUpdateData.NewValue
								});
							}
							// 處理賠率下降動畫
							if (sUpdateData.UpdateType === SpecialUpdateType.OddsDown) {
								const thisLineId = sUpdateData.LineId; //投注線ID
								const thisSelectionId = sUpdateData.SelectionId; //投注選項ID
								OddsDownData.push({
									EventId: thisEventId,
									LineId: thisLineId,
									SelectionId: thisSelectionId,
									OldValue: sUpdateData.OldValue,
									NewValue: sUpdateData.NewValue
								});
							}
						});
					}
				});

				//整理一次setState 避免多次刷新
				const newState = {
					EventDetail: PollingResult.NewData,
					OddsUpData,
					OddsDownData
				};

				this.setState(newState);
			},
			parseInt(sid),
			eid,
			OE
		); // <==查詢參數  足球 比賽ID
	};

	ShowBottomSheet = (type) => {
		if(this.props.EuroCupBet) {
			PiwikEvent('Betcart', 'Launch', 'Open_BetCart_EUROPage')
		} else {
			PiwikEvent('Betcart', 'Launch', 'MatchPage_Betcart')
		}
		this._refsShowBottom.current.ShowBottomSheet(type);
	};

	/* 存储单投数据 */
	PushBetCart = (data, type) => {
		const { VendorName } = this.props.Vendor.configs;
		this.props.betCart_add(data,VendorName)
		const isComboBet = this.props.betCartInfo['isComboBet' + VendorName];
		const betCartData = this.props.betCartInfo['betCart' + VendorName]

		if (!isComboBet) {
			this._refsShowBottom.current.ShowBottomSheet(type);
		}
	};

	/* 删除数据 */
	RemoveBetCart = async (data, type, callback) => {
		const { VendorName } = this.props.Vendor.configs;
		if (data === null) {
			//清空
			await this.props.betCart_clear(VendorName);
			await this.props.betCart_setIsComboBet(false, VendorName);
		} else {
			//刪除單個
			await this.props.betCart_remove(data, VendorName);
		}

		const betCartData = this.props.betCartInfo['betCart' + VendorName]
		// 如果刪除後購物車為空，自動關閉購物車
		if (!betCartData || betCartData.length <= 0) {
			await this.props.betCart_setIsComboBet(false, VendorName);
			this._refsShowBottom.current.CloseBottomSheet();
		}
	};

	//點擊賠率=>投注
	clickOdds = (selectionData) => {
		if (!global.localStorage.getItem('loginStatus') == 1) {
			this.state.isLandscape && window.openOrientation && window.openOrientation()
			setTimeout(() => {
				Actions.Login()
			}, this.state.isLandscape? 2000: 200);
			return;
		}

		if (!selectionData) {
			return;
		}

		if (!selectionData.DisplayOdds || selectionData.DisplayOdds == 0) return;

		PiwikEvent('Odds', 'Submit', 'Odds_matchpage')

		const { Vendor } = this.props;
		const isComboBet = this.props.betCartInfo['isComboBet' + Vendor.configs.VendorName];
		const betCartData = this.props.betCartInfo['betCart' + Vendor.configs.VendorName];

		let overMaxSelectionCount = betCartData.length >= Vendor.configs.MaxParlay; //是否超過最大限制

		if (!isComboBet) { //單投
			this.PushBetCart(selectionData, 1);
		} else {
			//串關
			//沒超過最大限制
			if (!overMaxSelectionCount) {
				//串關模式是 點擊添加，再點一次就取消
				let indexOf = betCartData.findIndex((v) => {
					return v.SelectionId == selectionData.SelectionId;
				});
				if (indexOf === -1) {
					this.PushBetCart(selectionData, 2);
					Toast.success('添加成功');
				} else {
					this.RemoveBetCart(selectionData);
				}
			} else {
				Toast.fail('哎呀，最多可投注串关' + Vendor.configs.MaxParlay + '场呦');
			}
		}
	};

	getLiveEventsInSameLeague(eid, sid, lid) {
		//參數 體育id(SportId) , 聯賽id(LeagueId) , 賽事id(EventId)
		this.props.Vendor.getLiveEventsInSameLeague(sid, lid, eid).then((eventDatas) => {
			this.setState({
				eventDatas: eventDatas
			});
		});
	}

	//投注線再分組，把類似的玩法合在一堆，返回是數組格式(適配IM同玩法會分成多線的狀況)
	getSimilarGroupedLines(LinesArray) {
		let SimilarGroupedLines = [];
		//給的投注線是已經排序過了，所以直接按順序往下找就可以
		let previousLine = null;
		let tmpLineGroup = [];
		LinesArray.map((l, index) => {
			if (previousLine) {
				if (previousLine.isSimilarTo(l)) {
					tmpLineGroup.push(l); //和前一個投注線類似 放一起
				} else {
					//不相同，保留現在的分組
					SimilarGroupedLines.push(tmpLineGroup);
					//產生一個新的分組
					tmpLineGroup = [];
					tmpLineGroup.push(l);
				}
			} else {
				//第一個執行 還沒有previousLine，直接加入分組
				tmpLineGroup.push(l);
			}

			//最後一筆 保留現在的分組
			if (index === LinesArray.length - 1) {
				SimilarGroupedLines.push(tmpLineGroup);
			} else {
				previousLine = l;
			}
		});
		return SimilarGroupedLines;
	}

	//切換玩法置頂
	togglePinLine(key) {
		let tmp = this.state.PinLines.slice();
		if (this.state.PinLines.indexOf(key) === -1) {
			//加入置頂
			tmp.push(key);
		} else {
			//移除置頂
			tmp = this.state.PinLines.filter((k) => k !== key);
		}
		this.setState({ PinLines: tmp });
	}

	//返回列表頁
	backToList() {
		//默認使用routerFilter存下的主頁面查詢參數
		const { Vendor, routerLog } = this.props;
		const EventData = this.state.EventDetail;

		let query = null;
		let log = routerLog[Vendor.configs.VendorPage];
		if (log && log.query) {
			query = log.query;
		}

		if (query === null) {
			query = {};
			//整頁刷新就會拿不到來源，使用當前的EventData做為參考
			if (EventData) {
				query.SportId = EventData.SportId;
				query.MarketId = EventData.MarketId;
				//早盤需要指定日期
				if (parseInt(EventData.MarketId) === VendorMarkets.EARLY) {
					const targetDate = EventData.getEventDateMoment().format('YYYY-MM-DD');
					query.StartDate = targetDate;
					query.EndDate = targetDate;
				}
			}
		}

		Router.push({
			pathname: Vendor.configs.VendorPage,
			query: query
		});
	}
	_onLayout(event) {
		const { winHeight, winWidth } = this.state;
		let { width, height } = event.nativeEvent.layout;
		console.log(winHeight, 'winHeightwinHeightwinHeight', height)
		if (height > width) {
			//竖屏
			this.setState({
				headerHeight: winWidth * 0.70,
				headerWidth: winWidth,
				isLandscape: false,
				setIsLandscape: true,
				detailWidth: winWidth,
				detailHeight: winHeight,
			})
			console.log('this.props.headerWidth1', height)
		} else if (height < width) {
			//横屏
			this.setState({
				headerHeight: Platform.OS == "android" ? winWidth - 25: winWidth,
				headerWidth: winHeight,
				isLandscape: true,
				tabactive: 1,
				setIsLandscape: false,
				detailWidth: winHeight * 0.4,
				detailHeight: winWidth,
				fixedLive: false,
			})
			console.log('this.props.headerWidth2', winHeight)
		}
	}
	backToListWithMinifyWindow(showMiniEvent, miniShowType) {
			//切换缩小
			const {eid, sid, lid} = this.props.dataList;
			if (this.props.EuroCupBet) {
				window.MiniEventShowEuroCup && window.MiniEventShowEuroCup(showMiniEvent, eid, sid, lid, miniShowType)
			} else {
				window.MiniEventShow && window.MiniEventShow(showMiniEvent, eid, sid, lid, miniShowType)
			}

			Actions.pop()
	}
	Disbandsmartcoach = (log) => {
		this.setState({
			Disbandsmartcoach: log == false ? false : true
		});
		window.console.log('%c情报日志======>', 'color:red;', log);
	};
	render() {
		const {
			tabactive,
			setIsLandscape,
			detailWidth,
			detailHeight,
			isLandscape,
			headerHeight,
			headerWidth,
			LineGroupId,
			PinLines,
			EventDetail,
			OddsUpData,
			OddsDownData,
			showDrawer,
			eventDatas,
			LineToggleStatusArray,
		} = this.state;
		const { Vendor } = this.props;
		const isComboBet = this.props.betCartInfo['isComboBet' + Vendor.configs.VendorName];
		const betCartData = this.props.betCartInfo['betCart' + Vendor.configs.VendorName];
		const { LineGroups, Lines } = EventDetail ? EventDetail : {};
		console.log('%c游戏详情', 'font-size:36px;color:red;', EventDetail);

		const isSmartCoachEnabled = (this.props.Vendor.configs.VendorName == 'IM'); //只有im使用smartcoach

		//處理玩法分組
		let selectedLineGroup = null;
		let sortedLineGroups = [];
		if (LineGroups && LineGroups.length > 0) {
			const selectedLineGroups = LineGroups.filter((lg) => lg.LineGroupId === LineGroupId);
			if (selectedLineGroups && selectedLineGroups.length > 0) {
				selectedLineGroup = selectedLineGroups[0];
			}
			//把選中的玩法分組移到第一個
			sortedLineGroups = LineGroups;
			if (selectedLineGroup) {
				const selectedItems = LineGroups.filter((i) => i.LineGroupId === selectedLineGroup.LineGroupId);
				const withoutSelectedItems = LineGroups.filter((i) => i.LineGroupId !== selectedLineGroup.LineGroupId);
				sortedLineGroups = selectedItems.concat(withoutSelectedItems);
			}
		}

		//處理玩法過濾 和 玩法整合
		let groupedLines = this.getSimilarGroupedLines(
			//同類的投注線放在一個數組裡
			EventDetail
				? selectedLineGroup
					? Lines.filter(
						//玩法過濾，只展示選中的玩法分組
						(item) =>
							item.LineGroupIds &&
							item.LineGroupIds.length > 0 &&
							item.LineGroupIds.indexOf(LineGroupId) !== -1
					)
					: Lines
				: []
		);

		//處理玩法展開收起
		let closedLineKeyArray = []; //收起的玩法key
		if (LineToggleStatusArray && LineToggleStatusArray.length > 0) {
			LineToggleStatusArray.map(info => {
				if (!info.isOpen) {
					closedLineKeyArray.push(info.key);
				}
			})
		}

		//console.log('===closedLineKeyArray',closedLineKeyArray);

		const allLineKeyArray = []; //全部的玩法Key
		let openLineKeyArray = []; //展開的玩法key
		groupedLines.map((lineArray) => {
			const firstLine = lineArray[0];
			const thisKey = firstLine.getKeyForCompare();
			allLineKeyArray.push(thisKey);
			if (closedLineKeyArray.indexOf(thisKey) === -1) {
				openLineKeyArray.push(thisKey); //默認展開
			}
		});

		//console.log('===openLineKeyArray',openLineKeyArray);

		//配置在key={} 用來觸發刷新
		// const openLineKeyArrayJSON = CryptoJS.MD5(JSON.stringify(openLineKeyArray));

		//把選中的置頂玩法移到第一個
		let sortedGroupedLines = groupedLines;
		if (PinLines && PinLines.length > 0) {
			//選中的
			const selectedGroupedLines = groupedLines.filter((lineArray) => {
				const firstLine = lineArray[0];
				const thisKey = firstLine.getKeyForCompare(); //玩法合併用的key
				return PinLines.indexOf(thisKey) !== -1;
			});
			//沒選中的
			const withoutSelectedGroupedLines = groupedLines.filter((lineArray) => {
				const firstLine = lineArray[0];
				const thisKey = firstLine.getKeyForCompare(); //玩法合併用的key
				return PinLines.indexOf(thisKey) === -1;
			});
			//接起來
			sortedGroupedLines = selectedGroupedLines.concat(withoutSelectedGroupedLines);
		}

		let width = detailWidth;
		return (
			<View
				onLayout={this._onLayout}
				// setHandle={(v) => {
				// 	this.handle = v;
				// }}
				// setStatus={(v) => {
				// 	this.setState({ scaleStatus: v });
				// }}
				// Vendor={this.props.Vendor}
				style={{ flex: 1, backgroundColor: '#fff' }}
			>
				<View
					id="betting_list_detail"
					// className={`Betting-list-detail ${this.props.className}`}
					ref={this.bettingDrawer}
				>
					{/* 頭部賽事點擊->下拉菜單 */}
					{eventDatas != '' &&
						eventDatas.length > 0 && (
							<View />
							// <Drawer
							// 	direction="top"
							// 	wrapDom={this.bettingDrawer}
							// 	onClose={() => {
							// 		this.setState({
							// 			showDrawer: false
							// 		});
							// 	}}
							// 	className="fullscreen-drawer detail-header-drawer"
							// 	visible={showDrawer}
							// >
							// 	<div className="detail-header-drawer-contents">
							// 		<div className="drawer-header">
							// 			<div className="drawer-header-title">
							// 				{/* {eventDatas[0].LeagueName} <ReactSVG className="back-icon" src="/svg/dow.svg" /> */}
							// 			</div>
							// 		</div>
							// 		{eventDatas.map((item, index) => {
							// 			return (
							// 				<div
							// 					className="con"
							// 					key={index}
							// 					onClick={() => {
							// 						const { Vendor } = this.props;
							// 						//用replace避免返回按鈕失效(預期應該返回列表)
							// 						this.setState(
							// 							{
							// 								showDrawer: false
							// 							},
							// 							() => {
							// 								const URL = Vendor.configs.VendorPage;
							// 								const newUrl = `${URL}/detail?sid=${item.SportId}&eid=${item.EventId}&lid=${item.LeagueId}&OE=${item.IsOutRightEvent}`;
							// 								Router.replace(newUrl);
							// 								//因為是同頁切換，所以不會刷新 也不會觸發didmount，直接複製didmount的處理函數更新數據
							// 								this.GetIMdatadetail(
							// 									item.SportId,
							// 									item.EventId,
							// 									item.IsOutRightEvent
							// 								);
							// 								this.getLiveEventsInSameLeague(
							// 									item.EventId,
							// 									item.SportId,
							// 									item.LeagueId
							// 								);
							// 							}
							// 						);
							// 					}}
							// 				>
							// 					<ul key={index} className={index == 0 ? 'active' : ''}>
							// 						<li className="name">
							// 							{/* <LazyImageForTeam Vendor={Vendor} TeamId={item.HomeTeamId} /> */}
							// 							<p>{item.HomeTeamName}</p>
							// 						</li>
							// 						<li className="center">
							// 							<p>
							// 								<b className={item.HomeScore == 0 ? 'color' : ''}>
							// 									{item.HomeScore}
							// 								</b>
							// 							&nbsp;-&nbsp;
							// 							<b className={item.AwayScore == 0 ? 'color' : ''}>
							// 									{item.AwayScore}
							// 								</b>
							// 							</p>
							// 							<span>{item.RBMinute}'</span>
							// 						</li>
							// 						<li className="name">
							// 							{/* <LazyImageForTeam Vendor={Vendor} TeamId={item.AwayTeamId} /> */}
							// 							<p>{item.AwayTeamName}</p>
							// 						</li>
							// 					</ul>
							// 				</div>
							// 			);
							// 		})}
							// 	</div>
							// </Drawer>
						)}
					{/* 橫屏的投注購物車 */}
					{
						// 	<Drawer
						// 	direction="right"
						// 	wrapDom={this.bettingDrawer}
						// 	onClose={() => {
						// 		this.setState({ showBet: false });
						// 	}}
						// 	className="fullscreen-drawer detail-minibet-drawer"
						// 	visible={this.state.showBet}
						// >
						// 	{this.state.showBet && (
						// 		<Keyboard
						// 			Vendor={this.props.Vendor}
						// 			/* 购物车 */
						// 			Betdata={BetCartdata}
						// 			URL={this.props.Vendor.configs.VendorName == 'BTI' ? '/sports-bti' : '/sports-im'}
						// 			/* 是否横屏 */
						// 			Minishow={true}
						// 			/* 串关类型 */
						// 			BetType={1}
						// 			/* 购物车删除 */
						// 			RemoveBetCart={(e, t, c) => {
						// 				this.RemoveBetCart(e, t, c);
						// 			}}
						// 			ref="CheckBetting"
						// 			/* 是否是详情页 */
						// 			DetailPage={true}
						// 			/* 关闭投注框 */
						// 			CloseBottomSheet={() => {
						// 				this.setState({ showBet: false });
						// 			}}
						// 			/* 关闭横屏投注 */
						// 			onClose={() => {
						// 				this.setState({ showBet: false });
						// 			}}
						// 			/* 关闭串关 */
						// 			PlayCloseBetCartmore={() => {
						// 				this.PlayCloseBetCartmore();
						// 			}}
						// 			/* 串关模式 */
						// 			BetCartmore={() => this.PlayBetCartmore()}
						// 		/>
						// 	)}
						// </Drawer>
					}
					{/* 頭部賽事橫條 */}
					{
						setIsLandscape &&
						<View style={isLandscape ? [styles.navRight,{right: DeviceInfoIos?8:0}] : {}}>
							<View style={[styles.topNav, { width: width, }]}>
								{
									!isLandscape &&
									<Touch onPress={() => { Actions.pop() }}>
										<Image resizeMode='stretch' source={require('../../images/icon-white.png')} style={{ width: 25, height: 25 }} />
									</Touch>
								}

								<View onPress={() => { }} style={styles.headerTitle}>
									{eventDatas && eventDatas.length > 1 ? (
										<Touch
											onPress={() => {
												this.setState(
													{
														showDrawer: !this.state.showDrawer
													},
													() => {
														// setTimeout(forceCheck, 500); //lazyload強制觸發
													}
												);
											}}
											style={styles.headerTitle}
										>
											{/* <LazyImageForLeague
									Vendor={Vendor}
									LeagueId={eventDatas[0].LeagueId}
									thisClassName="Game-logo"
								/> */}
											<SportImage imgsID={eventDatas[0].LeagueId} LeagueIcon={true} Vendor={Vendor} />
											<Text style={[styles.headerTitleTxt, { maxWidth: width * 0.7 }]} numberOfLines={1}>
												{eventDatas[0].LeagueName}
											</Text>
											<Image resizeMode='stretch' source={this.state.showDrawer ? require('../../images/ups.png') : require('../../images/dow.png')} style={{ width: 25, height: 25 }} />

											{/* <ReactSVG
									className="down-arrow"
									src={this.state.showDrawer ? '/svg/up.svg' : '/svg/dow.svg'}
								/> */}
										</Touch>
									) : (
											EventDetail != '' && EventDetail != null && (
												<View style={styles.headerTitle}>
													{/* <LazyImageForLeague
											Vendor={Vendor}
											LeagueId={EventDetail.LeagueId}
											thisClassName="Game-logo"
										/> */}
													<SportImage imgsID={EventDetail.LeagueId} LeagueIcon={true} Vendor={Vendor} />
													<Text style={[styles.headerTitleTxt, { maxWidth: width * 0.7 }]} numberOfLines={1}>{EventDetail.LeagueName}</Text>
												</View>
											)
										)}
								</View>
								<View><Text style={{ color: '#00a6ff' }}>000</Text></View>
							</View>
						</View>
					}

					<Modal
						animationType="none"
						transparent={true}
						visible={this.state.showDrawer}
						onRequestClose={() => { }}
						supportedOrientations={['portrait', 'landscape']}
					>
						<View style={isLandscape ? [styles.headerDrawerRight,{right: DeviceInfoIos?8:0}] : styles.headerDrawer}>
							<Touch onPress={() => { this.setState({ showDrawer: false }) }} style={{ height: 50, width: width, marginTop: DeviceInfoIos && !isLandscape ? 40 : 0 }}></Touch>
							<View style={[styles.headerDrawerView, { width: width, height: height / 2, }]}>
								<ScrollView
									showsHorizontalScrollIndicator={false}
									showsVerticalScrollIndicator={false}
								>
									{
										eventDatas != '' &&
										eventDatas.length > 0 &&
										eventDatas.map((item, index) => {
											return (
												<Touch onPress={() => {
													const { Vendor } = this.props;
													//用replace避免返回按鈕失效(預期應該返回列表)
													this.setState(
														{
															showDrawer: false
														},
														() => {
															const URL = Vendor.configs.VendorPage;
															// const newUrl = `${URL}/detail?sid=${item.SportId}&eid=${item.EventId}&lid=${item.LeagueId}&OE=${item.IsOutRightEvent}`;
															// Router.replace(newUrl);
															//因為是同頁切換，所以不會刷新 也不會觸發didmount，直接複製didmount的處理函數更新數據
															this.GetIMdatadetail(
																item.SportId,
																item.EventId,
																item.IsOutRightEvent
															);
															this.getLiveEventsInSameLeague(
																item.EventId,
																item.SportId,
																item.LeagueId
															);
															PiwikEvent('Match', 'Launch', 'MatchPage_ViewMore')
														}
													);
												}} key={index} style={[index == 0 ? [styles.drawerActive, { width: width - 40, }] : [styles.nodrawerActive, { width: width - 40, }]]}>
													<View style={[styles.itemTimes, { width: width * 0.3 }]}>
														{/* <LazyImageForTeam Vendor={Vendor} TeamId={item.HomeTeamId} /> */}
														<SportImage imgsID={item.HomeTeamId} Vendor={Vendor} />
														<Text style={{ color: index == 0 ? '#000' : '#fff', width: width * 0.3, textAlign: 'center' }} numberOfLines={1}>{item.HomeTeamName}</Text>
													</View>
													<View>
														<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
															<Text style={{ color: item.HomeScore == 0 ? '#7f7f7f' : '#000', fontSize: 20, fontWeight: 'bold' }}>{item.HomeScore}</Text>
															<Text>—</Text>
															<Text style={{ color: item.AwayScore == 0 ? '#7f7f7f' : '#000', fontSize: 20, fontWeight: 'bold' }}>{item.AwayScore}</Text>
														</View>
														<View style={styles.dateFen}>
															<Text style={{ color: '#fff', fontSize: 12 }}> {item.RBMinute}' </Text>
														</View>
													</View>
													<View style={[styles.itemTimes, { width: width * 0.3 }]}>
														{/* <LazyImageForTeam Vendor={Vendor} TeamId={item.AwayTeamId} /> */}
														<SportImage imgsID={item.AwayTeamId} Vendor={Vendor} />
														<Text style={{ color: index == 0 ? '#000' : '#fff', width: width * 0.3, textAlign: 'center' }} numberOfLines={1}>{item.AwayTeamName}</Text>
													</View>
												</Touch>
											)
										})
									}
								</ScrollView>
							</View>
							<Touch onPress={() => { this.setState({ showDrawer: false }) }} style={{ height: height, width: width, backgroundColor: "rgba(0, 0, 0,0.5)" }}></Touch>
						</View>
					</Modal>
					{
						// 	<View
						// 	className={'Betting-detail-header' + (EventDetail === null ? ' noEventDataLandscape' : '')}
						// 	ref={this.detailHeaderRef}
						// >
						// 	{/* <ReactSVG
						// 		className="back-icon"
						// 		src="/svg/LeftArrow.svg"
						// 		onClick={() => {
						// 			this.backToList();
						// 			if (BetMore) {
						// 				localStorage.setItem('BetMore', true);
						// 			} else {
						// 				localStorage.setItem('BetMore', false);
						// 			}
						// 		}}
						// 	/> */}
						// 	{eventDatas && eventDatas.length > 1 ? (
						// 		<Touch
						// 			onClick={() => {
						// 				this.setState(
						// 					{
						// 						showDrawer: !this.state.showDrawer
						// 					},
						// 					() => {
						// 						// setTimeout(forceCheck, 500); //lazyload強制觸發
						// 					}
						// 				);
						// 			}}
						// 		>
						// 			{/* <LazyImageForLeague
						// 				Vendor={Vendor}
						// 				LeagueId={eventDatas[0].LeagueId}
						// 				thisClassName="Game-logo"
						// 			/> */}
						// 			<Text>{eventDatas[0].LeagueName}</Text>
						// 			{/* <ReactSVG
						// 				className="down-arrow"
						// 				src={this.state.showDrawer ? '/svg/up.svg' : '/svg/dow.svg'}
						// 			/> */}
						// 		</Touch>
						// 	) : (
						// 			EventDetail != '' && (
						// 				<View>
						// 					{/* <LazyImageForLeague
						// 						Vendor={Vendor}
						// 						LeagueId={EventDetail.LeagueId}
						// 						thisClassName="Game-logo"
						// 					/> */}
						// 					<Text>{EventDetail.LeagueName}</Text>
						// 				</View>
						// 			)
						// 		)}
						// </View>
					}
					{EventDetail != '' && EventDetail != null ? EventDetail.IsOutRightEvent ? (
						/* 猜冠军详情 */
						<View className="Betting-list" style={{ backgroundColor: 'white', padding: 10 }}>
							<ScrollView
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
							>
								<View style={{ paddingBottom: 120 }}>
									<Text style={{ color: '#000', fontSize: 12 }}>{EventDetail.getEventDateMoment().format('MM/DD HH:mm')}</Text>
									<Text style={{ color: '#999', fontSize: 16, lineHeight: 45 }}>{EventDetail.OutRightEventName}</Text>
									{Lines && Lines[0] ? (
										Lines[0].Selections.map((d, k) => {
											let CheckSelect =
												isComboBet == true
													? betCartData.filter((i) => i.SelectionId == d.SelectionId)
													: [];
											return (
												<View style={styles.OddsList} key={k}>
													<View style={styles.oddTeam}>
														{/* <LazyImageForTeam Vendor={Vendor} LeagueId={d.TargetTeamId} /> */}
														<Image resizeMode='stretch' source={require('../../images/betting/fun88.png')} style={{ width: 25, height: 25 }} />
														<Text style={{ color: '#000', width: width * 0.5, paddingLeft: 8 }}>{d.SelectionName}</Text>
													</View>
													{d.Odds ? (
														<Touch
															style={CheckSelect != '' ? [styles.OddsActive, { width: width * 0.35 }] : [styles.noOddsActive, { width: width * 0.35 }]}
															// className={CheckSelect != '' ? 'Team Right active' : 'Team Right'}
															onPress={() => {
																this.clickOdds(d);
															}}
														>
															{/* <span
														dangerouslySetInnerHTML={{
															__html: ChangeSvg(d.DisplayOdds)
														}}
														className="NumberBet"
													/> */}
															<Text style={{ color: '#000', lineHeight: 35, textAlign: 'center' }}>{d.DisplayOdds}</Text>
														</Touch>
													) : (
															<View>
																<Text className="gray Team Right">-</Text>
															</View>
														)}
												</View>
											);
										})
									) : null}
								</View>
							</ScrollView>
						</View>
					) : (
							/* 常规赛事详情 */
							// <View className={`Betting-detail-content ${this.state.fixedLive.toString()}`}>
							<ScrollView
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
								stickyHeaderIndices={this.state.fixedLive ? [0] : []}
							>
								{
									isLandscape &&
									<View style={{ height: headerHeight, width: headerWidth }} />
								}
								<View style={
									isLandscape ? { height: headerHeight, width: headerWidth, position: 'absolute', top: 0, left: 0, zIndex: 9 }
										: { height: headerHeight, width: headerWidth }
								}>
									<DetailHeader
										defaultShowType={this.state.defaultShowType}
										setDefaultShowType={(defaultShowType) => {
											this.setState({defaultShowType})
										}}
										backToListWithMinifyWindow={(showMiniEvent, miniShowType) => { this.backToListWithMinifyWindow(showMiniEvent, miniShowType) }}
										setRef={(v) => { this.detailBannerRef = v }}
										handle={this.handle}
										fixedStatus={this.state.fixedLive}
										scaleStatus={this.state.scaleStatus}
										isLandscapeShow={setIsLandscape}
										setIsLandscape={(v) => {
											this.setState({ setIsLandscape: !this.state.setIsLandscape })
											// this.setState({ isLandscape: v }, () => {
											// 	//強制更新玩法組位置
											// 	if (v !== true) {
											// 		//豎屏
											// 		if (this.handleWindowScrollForLineGroupBar) {
											// 			this.handleWindowScrollForLineGroupBar();
											// 		}
											// 	} else {
											// 		if (this.handleDetailDivScrollForLineGroupBar) {
											// 			this.handleDetailDivScrollForLineGroupBar();
											// 		}
											// 	}
											// });
										}}
										setFixed={(v) => {
											this.setState({ fixedLive: v })
											// this.setState({ fixedLive: v }, () => {
											// 	//解除pin時，強制檢查
											// 	if (v === false) {
											// 		setTimeout(() => {
											// 			this.handleWindowScrollForLineGroupBar()
											// 		}, 100);
											// 	}
											// });
										}}
										Vendor={this.props.Vendor}
										EventData={EventDetail}
										isLandscape={isLandscape}
										headerWidth={this.state.headerWidth}
										headerHeight={this.state.headerHeight}
										EuroCupBet={this.props.EuroCupBet}
									/>
								</View>
								{
									!isLandscape && isSmartCoachEnabled &&
									<View style={{flexDirection:'row'}}>
										<Touch onPress={() => { this.setState({tabactive: 1}) }} style={{width: width * 0.5,backgroundColor: tabactive == 1? '#fff': '#EDF0F6'}}>
											<Text style={{color: tabactive == 1 ? '#00A6FF': '#666666',lineHeight: 40, textAlign: 'center'}}>赔率</Text>
										</Touch>
										<Touch onPress={() => {
											if(this.state.Disbandsmartcoach) { return }
											this.setState({tabactive: 2})
											PiwikEvent('Match_Feature', 'View', 'Smartcoach_MatchPage')
										 }} style={{width: width * 0.5,backgroundColor: tabactive == 2? '#fff': '#EDF0F6'}}>
											<Text style={{color: this.state.Disbandsmartcoach ? '#BCBEC3':tabactive == 2 ? '#00A6FF': '#666666',lineHeight: 40, textAlign: 'center'}}>情报</Text>
										</Touch>
									</View>
								}
								{
									isSmartCoachEnabled &&
									<View style={[tabactive == 2? {}: {height: 0, width: 0,opacity: 0}]}>
										<Smartcoach
											EventDetail={EventDetail}
											Vendor={this.props.Vendor}
											Disbandsmartcoach={(e) => {
												this.Disbandsmartcoach(e);
											}}
										/>
									</View>
								}
								{
									tabactive == 1 &&
									setIsLandscape &&
									<ScrollView
									showsHorizontalScrollIndicator={false}
									showsVerticalScrollIndicator={false}
									style={
										isLandscape ? { position: 'absolute', top: 50, right: DeviceInfoIos?8:0, zIndex: 10, height: headerHeight, backgroundColor: '#EFEFF4', width: width }
											: {}
									}
									>
										<View className={this.state.LineGroupBarFreeze ? 'Detail-menu freeze' : 'Detail-menu'}>
											<View
												// className={
												// 	(this.state.LineGroupBarFreeze ? 'Tabscontent-menu freeze' : 'Tabscontent-menu')
												// 	+ (this.state.LineGroupBarFreeze && this.state.fixedLive ? ' freeze-with-pin' : '')
												// }
												ref={this.lineGroupBarRef}

											>
												<View style={[styles.Detail_menuView, { width: width, }]}>
													<View style={[styles.Detail_menu, { width: width }]}>
														<Touch
															style={selectedLineGroup === null ? styles.list_active : styles.nolist_activ}
															onPress={() => {
																this.setState({
																	LineGroupId: null
																});
															}}
														>
															<Text style={{
																color: selectedLineGroup === null ? '#fff' : '#999', lineHeight: 30
															}}>全部 {Lines ? Lines.length : 0}</Text>
														</Touch>
														{sortedLineGroups.map((item, index) => {
															//console.log(item);
															if (item.LineCount > 0) {
																//有數據的分類才展示
																return (
																	<Touch
																		style={
																			(selectedLineGroup
																				? selectedLineGroup.LineGroupId
																				: null) === item.LineGroupId ? (
																					styles.list_active
																				) : (
																					styles.nolist_activ
																				)
																		}
																		// className={
																		// 	(selectedLineGroup
																		// 		? selectedLineGroup.LineGroupId
																		// 		: null) === item.LineGroupId ? (
																		// 			'list active'
																		// 		) : (
																		// 			'list'
																		// 		)
																		// }
																		key={index}
																		onPress={() => {
																			this.setState({
																				LineGroupId: item.LineGroupId
																			});
																			PiwikEvent('Odds_Filter', 'Click', 'Matchpage_Odds')
																		}}
																	>
																		<Text
																			style={
																				{
																					lineHeight: 30,
																					color: (selectedLineGroup
																						? selectedLineGroup.LineGroupId
																						: null) === item.LineGroupId ? (
																							'#fff'
																						) : (
																							'#999'
																						)
																				}
																			}
																		>{item.LineGroupName + ' ' + item.LineCount}</Text>
																	</Touch>
																);
															} else {
																return null;
															}
														})}
														<TouchableOpacity
															style={styles.moreBtn}
															onPress={() => {
																this.lineGroupMore.current.show();
																PiwikEvent('Odds_Filter', 'Click', 'Matchpage_Odds')
															}}
														>
															<Text style={{ lineHeight: 30, color: '#999' }}>+更多</Text>
															{/* <ReactSVG className="Betting-add-svg" src={'/svg/betting/add.svg'} />更多 */}
														</TouchableOpacity>
													</View>
												</View>
											</View>
										</View>
										{/* <View className={this.state.LineGroupBarFreeze ? 'Collapselist freeze' : 'Collapselist'} ref={this.linesContainerRef}> */}
										<View>
											<View>
												<View style={{ paddingBottom: 120 }}>
													{
														sortedGroupedLines.map((groupedLines, index) => {
															const firstItem = groupedLines[0];
															const thisKey = firstItem.getKeyForCompare();
															const isPined = PinLines.indexOf(thisKey) !== -1;
															let LeagueName = firstItem.LineDesc;
															return (
																<CollapseList changeTop={() => { this.togglePinLine(thisKey); }} isPined={isPined} LeagueName={LeagueName} detailWidth={detailWidth}>
																	{groupedLines.map((item, indexInGroupedLines) => {
																		return (
																			<SelectionBox
																				key={item.LineId}
																				Vendor={Vendor}
																				OddsUpData={OddsUpData}
																				OddsDownData={OddsDownData}
																				LineData={item}
																				IndexInArray={indexInGroupedLines}
																				ClickOdds={this.clickOdds}
																				detailWidth={detailWidth}
																			/>
																		);
																	})}

																</CollapseList>
															)
														})
													}
												</View>
											</View>
											{
												// // 	<Collapse
												// // 	defaultActiveKey={openLineKeyArray}
												// // 	accordion={false}
												// // 	onChange={(activeLineKeyArray) => {
												// // 		//console.log('===activeLineKeyArray',activeLineKeyArray);
												// // 		const LineToggleStatusArray = allLineKeyArray.map(thisKey => {
												// // 			if (activeLineKeyArray.indexOf(thisKey) !== -1) {
												// // 				return { key: thisKey, isOpen: true }
												// // 			} else {
												// // 				return { key: thisKey, isOpen: false }
												// // 			}
												// // 		})
												// // 		this.setState({ LineToggleStatusArray }) //保存展開/收起狀態
												// // 	}}
												// // 	key={openLineKeyArrayJSON}
												// // >
												// {
												// 	sortedGroupedLines.map((groupedLines, index) => {
												// 		const firstItem = groupedLines[0];
												// 		const thisKey = firstItem.getKeyForCompare();
												// 		const isPined = PinLines.indexOf(thisKey) !== -1;
												// 		return (
												// 			<Panel
												// 				key={firstItem.getKeyForCompare()}
												// 				header={
												// 					<span className="title">
												// 						{firstItem.PeriodName + firstItem.BetTypeName}
												// 						<i
												// 							className={isPined ? 'active' : ''}
												// 							onClick={(e) => {
												// 								e.stopPropagation(); //禁止穿透點擊
												// 								this.togglePinLine(thisKey);
												// 							}}
												// 						>
												// 							{/* <ReactSVG
												// 								className="public-svg"
												// 								src={
												// 									isPined ? (
												// 										'/svg/betting/goup_active.svg'
												// 									) : (
												// 											'/svg/betting/goup.svg'
												// 										)
												// 								}
												// 							/> */}
												// 						</i>
												// 					</span>
												// 				}
												// 				headerClass="my-header-class"
												// 			>
												// 				{/* {groupedLines.map((item, indexInGroupedLines) => {
												// 					return (
												// 						<SelectionBox
												// 							key={item.LineId}
												// 							PushBetCart={(data, type) => {
												// 								this.PushBetCart(data, type);
												// 							}}
												// 							PlayBetCart={PlayBetCart}
												// 							OddsUpData={OddsUpData}
												// 							OddsDownData={OddsDownData}
												// 							LineData={item}
												// 							IndexInArray={indexInGroupedLines}
												// 							BetCartdata={BetCartdata}
												// 							BetMore={BetMore}
												// 						/>
												// 					);
												// 				})} */}
												// 			</Panel>
												// 		);
												// 	})
												// }
												// // </Collapse>
											}
										</View>
									</ScrollView>
								}
							</ScrollView>
						) : EventDetail === '' ? (
							// <Skeletondetail />
							<SkeletonBettingDetail />
						) : (
								<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
									{/* <ReactSVG className="noEventData-icon" src="/svg/betting/nodata.svg" /> */}
									<Image resizeMode='stretch' source={require('../../images/betting/nodata.png')} style={{ width: 90, height: 59 }} />
									<Text style={{ color: '#000', fontSize: 16, lineHeight: 40 }}>无数据</Text>
									<Text style={{ color: '#999', fontSize: 16, lineHeight: 30 }}>本场比赛暂无数据,</Text>
									<Text style={{ color: '#999', fontSize: 16, lineHeight: 30 }}>您可以返回并查看其它赛事。</Text>
								</View>
							)}

					{/* 投注板块 */}

					<Bottombetbox
						EuroCupBetDetail={this.props.EuroCupBet || false}
						ref={this._refsShowBottom}
						RemoveBetCart={this.RemoveBetCart}
						DetailPage={true}
						Vendor={this.props.Vendor}
						isLandscape={isLandscape}
						detailWidth={detailWidth}
						detailHeight={detailHeight}
					/>

					{/* 投注购物车浮窗 */}
					{/* {BetCartdata.length != 0 && (
						<BetCartPopup
							BetCartdata={BetCartdata}
							Betdataone={Betdataone}
							ShowBottomSheet={(e, t) => this.ShowBottomSheet(e, t)}
						/>
					)} */}
					{/* 點擊菜單的「更多」出現的下浮窗 */}
					{/* 投注選項 */}
					<Bottomsheet
						ref={this.lineGroupMore}
						headerName="全部盘口"
						hasDefaultButton={true}
						defaultButtonText={'全部' + (Lines ? Lines.length : 0)}
						items={EventDetail ? EventDetail.LineGroups : []}
						selectedItem={selectedLineGroup}
						formatItem={(item) => item.LineGroupName + ' ' + item.LineCount}
						getItemKey={(item) => item.LineGroupId}
						onClickItem={(item) => {
							this.setState({ LineGroupId: item ? item.LineGroupId : null });
						}}
						isLandscape={this.state.isLandscape}
						detailWidth={detailWidth}
						detailHeight={detailHeight}
					/>
				</View>
				{/* 投注购物车浮窗 */}
				<View style={{ position: 'absolute', bottom: 50, left: 5 }}>
					{
						!isLandscape &&
						<BetCartPopup
							Vendor={this.props.Vendor}
							ShowBottomSheet={this.ShowBottomSheet}
						/>
					}

				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	navRight: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		zIndex: 11,
	},
	topNav: {
		height: 50,
		backgroundColor: '#00a6ff',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		paddingLeft:15,
		paddingRight: 15,
	},
	headerTitle: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
	},

	headerTitleTxt: {
		textAlign: 'center',
		color: '#fff',
		fontSize: 16,
		paddingLeft: 8,
		paddingRight: 8,

	},
	headerDrawer: {
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		flex: 1,
		zIndex: 9999,
		backgroundColor: "transparent",
	},
	headerDrawerRight: {
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		flex: 1,
		zIndex: 9999,
		backgroundColor: "transparent",
		position: 'absolute',
		right: 0,
		top: 0,
	},
	headerDrawerView: {
		backgroundColor: '#00a6ff',
		paddingTop: 30,
		borderBottomRightRadius: 15,
		borderBottomLeftRadius: 15,
		overflow: 'hidden',
	},
	drawerActive: {
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: '#fff',
		height: 70,

		marginLeft: 20,
		marginBottom: 15,
		borderRadius: 10,
	},
	nodrawerActive: {
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: 'rgba(0, 0, 0, 0.1)',

		borderRadius: 10,
		marginBottom: 15,
		height: 70,
		marginLeft: 20,
	},
	itemTimes: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	dateFen: {
		borderRadius: 50,
		backgroundColor: '#eb2121',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: 45,
		height: 25,
	},
	moreBtn: {
		borderRadius: 30,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: '#ecedef',
		position: 'absolute',
		right: 10,
	},
	Detail_menuView: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,

		backgroundColor: '#fff',
	},
	Detail_menu: {
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingRight: 80,
		backgroundColor: '#fff',
		height: 30,
		overflow: 'hidden',

	},
	list_active: {
		borderRadius: 30,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: '#00a6ff',
		marginRight: 10,
	},
	nolist_activ: {
		borderRadius: 30,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: '#ecedef',
		marginRight: 10,
	},
	titleView: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		padding: 10,
	},
	titles: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	OddsList: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		marginTop: 10,
	},
	oddTeam: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
	},
	OddsActive: {
		backgroundColor: '#e6f6ff',
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#00a6ff',
	},
	noOddsActive: {
		backgroundColor: '#f7f7f7',
		borderRadius: 8,
	},
})


const mapStateToProps = state => ({
	routerLog: state.routerLog,
	betCartInfo: state.betCartInfo,
});

const mapDispatchToProps = {
	betCart_setIsComboBet: ACTION_BetCart_setIsComboBet,
	betCart_add: ACTION_BetCart_add,
	betCart_remove: ACTION_BetCart_remove,
	betCart_clear: ACTION_BetCart_clear,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(BettingDetail)

export class CollapseList extends React.Component {
	state = {
		shows: true,
	};
	shows() {
		this.setState({ shows: !this.state.shows })
	}
	render() {

		return (
			<View style={{ backgroundColor: '#fff', width: this.props.detailWidth, borderRadius: 5, flex: 1, }}>
				<View>
					<View style={styles.titleView}>
						<TouchableOpacity style={styles.titles} onPress={() => { this.shows() }}>
							<Image resizeMode='stretch' source={this.state.shows ? require('../../images/up.png') : require('../../images/down.png')} style={{ width: 18, height: 18 }} />
							<Text style={{ color: '#999', paddingLeft: 10, width: this.props.detailWidth - 80 }}>{this.props.LeagueName}</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => { this.props.changeTop() }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 32, height: 30, borderRadius: 32, backgroundColor: this.props.isPined ? '#00a6ff' : '#f7f7f7' }}>
							<Image resizeMode='stretch' source={this.props.isPined ? require('../../images/goup_active.png') : require('../../images/goup.png')} style={{ width: 20, height: 20 }} />
						</TouchableOpacity>
					</View>
				</View>
				<View>
					{
						<View style={this.state.shows ? {} : { height: 0, overflow: 'hidden' }}>
							{this.props.children}
						</View>
					}
				</View>
			</View>
		);
	}
}
