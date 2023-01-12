/* 一般體育賽事 */

import React from "react";
// import { dataIsEqual } from '../../../utils/js/util';
import TimeBlock from "./Parts/TimeBlock";
import FavouriteStar from "./Parts/FavouriteStar";
import LinesCount from "./Parts/LinesCount";
import CornerCount from "./Parts/CornerCount";
import TeamBlock, {TeamBlockHorizontal} from "./Parts/TeamBlock";
import {connect} from "react-redux";
import OddsSwiper from "./Parts/OddsSwiper";
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
const { width, height } = Dimensions.get("window");

class NormalEvent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	componentDidMount() {
	}

	componentWillUnmount() {
	}

	//優化效能：只有指定的prop變化時才要重新渲染
	shouldComponentUpdate(nextProps, nextState) {
		const thisPropEventId = this.props.EventData ? this.props.EventData.EventId : null;
		const nextPropEventId = nextProps.EventData ? nextProps.EventData.EventId : null;
	
		return this.props.userSetting.ListDisplayType !== nextProps.userSetting.ListDisplayType
			|| (JSON.stringify(this.props.EventData) !== JSON.stringify(nextProps.EventData))
			|| this.props.OddsUpData.Events[thisPropEventId] !== nextProps.OddsUpData.Events[nextPropEventId]
			|| this.props.OddsDownData.Events[thisPropEventId] !== nextProps.OddsDownData.Events[nextPropEventId]
	}


	render() {
		const { Vendor, EventData, ToggleFavourite, ToSportsDetails, OddsUpData, OddsDownData, ClickOdds, DisplayType, EuroCup } = this.props;
		const {ListDisplayType} = this.props.userSetting;

		return (
			EuroCup ?
			<View>
				{
					DisplayType == 1 ? <VerticalEvent
					Vendor={Vendor}
					EventData={EventData}
					ToggleFavourite={ToggleFavourite}
					ToSportsDetails={ToSportsDetails}
					OddsUpData={OddsUpData}
					OddsDownData={OddsDownData}
					ClickOdds={ClickOdds}
				  /> : <HorizontalEvent
					Vendor={Vendor}
					EventData={EventData}
					ToggleFavourite={ToggleFavourite}
					ToSportsDetails={ToSportsDetails}
					OddsUpData={OddsUpData}
					OddsDownData={OddsDownData}
					ClickOdds={ClickOdds}
					ListDisplayType={ListDisplayType}
				  />
				}
			</View>
			: 
			<View>
				{
					parseInt(ListDisplayType) != 2 ? <VerticalEvent
					Vendor={Vendor}
					EventData={EventData}
					ToggleFavourite={ToggleFavourite}
					ToSportsDetails={ToSportsDetails}
					OddsUpData={OddsUpData}
					OddsDownData={OddsDownData}
					ClickOdds={ClickOdds}
				/> : <HorizontalEvent
					Vendor={Vendor}
					EventData={EventData}
					ToggleFavourite={ToggleFavourite}
					ToSportsDetails={ToSportsDetails}
					OddsUpData={OddsUpData}
					OddsDownData={OddsDownData}
					ClickOdds={ClickOdds}
					ListDisplayType={ListDisplayType}
				/>
				}
			</View>
		)
	}
}

const mapStateToProps = state => ({
	userSetting: state.userSetting,
  });
  
  export default connect(
	mapStateToProps,
	null,
  )(NormalEvent);


export class VerticalEvent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	componentDidMount() {
	}

	componentWillUnmount() {
	}

	//優化效能：只有指定的prop變化時才要重新渲染
	shouldComponentUpdate(nextProps, nextState) {
		const thisPropEventId = this.props.EventData ? this.props.EventData.EventId : null;
		const nextPropEventId = nextProps.EventData ? nextProps.EventData.EventId : null;

		return (
			JSON.stringify(this.props.EventData) !== JSON.stringify(nextProps.EventData)
			|| this.props.OddsUpData.Events[thisPropEventId] !== nextProps.OddsUpData.Events[nextPropEventId]
			|| this.props.OddsDownData.Events[thisPropEventId] !== nextProps.OddsDownData.Events[nextPropEventId]
		)
	}

	render() {
		const { Vendor, EventData, ToggleFavourite, ToSportsDetails, OddsUpData, OddsDownData, ClickOdds} = this.props;
		//console.log('asssssssssssssssssssssssssss')
		//console.log('===Event rendered', EventData ? EventData.EventId : 'NULL Event');

		return (
			<View style={{ flex: 1, width: width, borderBottomColor: '#EFEFF4', borderBottomWidth: 1, }}>
				<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
					<View style={{ width: width * 0.5, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
						<View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', height: 38 }}>
							{/* 時間 直播等圖示 */}
							<TimeBlock EventData={EventData} />
							{/* 關注(收藏)星 */}
							<FavouriteStar EventData={EventData} ToggleFavourite={ToggleFavourite} />
							{/* 投注線(玩法)總數 */}
							<LinesCount EventData={EventData} />
							{/* 角球 總數 */}
							<CornerCount EventData={EventData} />
						</View>
						{/* 主队 球隊名 比分 紅牌 */}
						<TeamBlock
							Vendor={Vendor}
							EventData={EventData}
							ToSportsDetails={ToSportsDetails}
							HomeOrAway="HOME"
						/>
						{/* 客队 球隊名 比分 紅牌 */}
						<TeamBlock
							Vendor={Vendor}
							EventData={EventData}
							ToSportsDetails={ToSportsDetails}
							HomeOrAway="AWAY"
						/>
					</View>
					<View style={{ width: width * 0.5 }}>
						<OddsSwiper
							Vendor={Vendor}
							/* 盘口数据 */
							EventData={EventData}
							/* 上升赔率 */
							OddsUpData={OddsUpData}
							/* 下降赔率 */
							OddsDownData={OddsDownData}
							/* 點擊賠率 */
							ClickOdds={ClickOdds}
						/>
					</View>
				</View>
			</View>
		)
	}
}

export class HorizontalEvent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	componentDidMount() {
	}

	componentWillUnmount() {
	}

	//優化效能：只有指定的prop變化時才要重新渲染
	shouldComponentUpdate(nextProps, nextState) {
		const thisPropEventId = this.props.EventData ? this.props.EventData.EventId : null;
		const nextPropEventId = nextProps.EventData ? nextProps.EventData.EventId : null;

		return (
			JSON.stringify(this.props.EventData) !== JSON.stringify(nextProps.EventData)
			|| this.props.OddsUpData.Events[thisPropEventId] !== nextProps.OddsUpData.Events[nextPropEventId]
			|| this.props.OddsDownData.Events[thisPropEventId] !== nextProps.OddsDownData.Events[nextPropEventId]
		)
	}

	render() {
		const { Vendor, EventData, ToggleFavourite, ToSportsDetails } = this.props;
		//console.log('===Event rendered', EventData ? EventData.EventId : 'NULL Event');

		return (
			<View style={{ flex: 1, width: width, borderBottomWidth: 1,borderBottomColor: '#efeff4' }}>
				<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
					<View style={{ width: width, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
						<View style={{ width: width, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', height: 38 }}>
							<View style={{width: width * 0.33, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
								{/* 時間 直播等圖示 */}
								<TimeBlock EventData={EventData} />
								{/* 關注(收藏)星 */}
								<FavouriteStar EventData={EventData} ToggleFavourite={ToggleFavourite} />
							</View>
							{/* 投注線(玩法)總數 */}
							<View style={{width: width * 0.33}}>
								<CornerCount EventData={EventData} />
							</View>
							{/* 角球 總數 */}
							<View style={{width: width * 0.33, alignItems: 'flex-end', paddingRight: 20}}>
								<LinesCount ListDisplayType={2} EventData={EventData} ToSportsDetails={ToSportsDetails} Vendor={Vendor} />
							</View>
						</View>
						<View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingTop: 20,paddingBottom: 20}}>
							{/* 主队 球隊名 比分 紅牌 */}
							<TeamBlockHorizontal
								Vendor={Vendor}
								EventData={EventData}
								ToSportsDetails={ToSportsDetails}
								HomeOrAway="HOME"
							/>
							{/* 中間的 vs 或 - 字樣 */}
							{EventData &&
								(EventData.IsRB ? (
									<Text style={{color: '#BCBEC3', fontSize: 25,paddingLeft: 5}}>-</Text>
								) : (
								<Text style={{color: '#BCBEC3', fontSize: 25,paddingLeft: 5}} >VS</Text>
							))}
							{/* 客队 球隊名 比分 紅牌 */}
							<TeamBlockHorizontal
								Vendor={Vendor}
								EventData={EventData}
								ToSportsDetails={ToSportsDetails}
								HomeOrAway="AWAY"
							/>
						</View>
					</View>
				</View>
			</View>
		)
	}
}
