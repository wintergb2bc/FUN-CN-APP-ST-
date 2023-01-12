/* 展示 球隊名 比分 紅牌  */
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
import { dataIsEqual } from '../../../../lib/utils/util';
import Touch from "react-native-touch-once";
const { width, height } = Dimensions.get("window");
import SportImage from '../../../SportImage'
import React from "react";

class TeamBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}

		//指定要監控變化的prop
		this.MonitorPropsForHOME = ['IsRB', 'HomeTeamId', 'HomeTeamName', 'HomeScore', 'HomeRedCard'];
		this.MonitorPropsForAWAY = ['IsRB', 'AwayTeamId', 'AwayTeamName', 'AwayScore', 'AwayRedCard'];
	}

	componentDidMount() {
	}

	componentWillUnmount() {
	}

	//優化效能：只有指定的prop變化時才要重新渲染
	shouldComponentUpdate(nextProps, nextState) {
	  if (this.props.Vendor !== nextProps.Vendor) {
	    return true;
	  }
	  if (this.props.HomeOrAway !== nextProps.HomeOrAway) {
	    return true;
	  }
	  return !dataIsEqual(this.props.EventData, nextProps.EventData, this['MonitorPropsFor' + this.props.HomeOrAway]);
	}

	render() {
		const { Vendor, EventData, ToSportsDetails, HomeOrAway } = this.props;

		let TeamId, TeamName, Score, RedCard;
		if (HomeOrAway === 'HOME') {
			TeamId = EventData.HomeTeamId;
			TeamName = EventData.HomeTeamName;
			Score = EventData.HomeScore;
			RedCard = EventData.HomeRedCard;
		} else if (HomeOrAway === 'AWAY') {
			TeamId = EventData.AwayTeamId;
			TeamName = EventData.AwayTeamName;
			Score = EventData.AwayScore;
			RedCard = EventData.AwayRedCard;
		}

		const HomeOrAwayIsOK = (['HOME', 'AWAY'].indexOf(HomeOrAway) !== -1)

		return EventData && HomeOrAwayIsOK ? (
			<Touch
				onPress={() => {
					ToSportsDetails(Vendor, EventData);
				}}
				style={styles.lists}
			>
				<View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
					{/* <LazyImageForTeam
						Vendor={Vendor}
						TeamId={TeamId}
						thisClassName="Game-logo"
					/> */}
					<SportImage imgsID={TeamId} />
					<Text style={{ paddingLeft: 5, width: width * 0.33 }} numberOfLines={1}>{TeamName}</Text>
				</View>
				{EventData.IsRB &&
					RedCard &&
					parseInt(RedCard) > 0 ? (
						<View style={{ backgroundColor: '#eb2121', paddingLeft: 3, paddingRight: 3, borderRadius: 5 }}>
							<Text style={{ color: '#fff', fontSize: 12 }}>
								{RedCard ?? 0}
							</Text>
						</View>
					) : null}
				<View>
					<Text
						style={{
							color:
								Score == 0
									? '#BCBEC3'
									: '#000000',
							paddingRight: 8,
						}}
					>
						{EventData.IsRB ? (Score ?? 0) : ''}
					</Text>
				</View>
			</Touch>
		) : null
	}
}

export default TeamBlock

const styles = StyleSheet.create({
	lists: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		height: 42,
		width: width * 0.5,
	},
	listsHorizontal: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		width: width * 0.5,
	},
});


export class TeamBlockHorizontal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}

		//指定要監控變化的prop
		this.MonitorPropsForHOME = ['IsRB', 'HomeTeamId', 'HomeTeamName', 'HomeScore', 'HomeRedCard'];
		this.MonitorPropsForAWAY = ['IsRB', 'AwayTeamId', 'AwayTeamName', 'AwayScore', 'AwayRedCard'];
	}

	componentDidMount() {
	}

	componentWillUnmount() {
	}

	//優化效能：只有指定的prop變化時才要重新渲染
	// shouldComponentUpdate(nextProps, nextState) {
	//   if (this.props.Vendor !== nextProps.Vendor) {
	//     return true;
	//   }
	//   if (this.props.HomeOrAway !== nextProps.HomeOrAway) {
	//     return true;
	//   }
	//   return !dataIsEqual(this.props.EventData, nextProps.EventData, this['MonitorPropsFor' + this.props.HomeOrAway]);
	// }

	render() {
		const { Vendor, EventData, ToSportsDetails, HomeOrAway } = this.props;

		let TeamId, TeamName, Score, RedCard;
		if (HomeOrAway === 'HOME') {
			TeamId = EventData.HomeTeamId;
			TeamName = EventData.HomeTeamName;
			Score = EventData.HomeScore;
			RedCard = EventData.HomeRedCard;
		} else if (HomeOrAway === 'AWAY') {
			TeamId = EventData.AwayTeamId;
			TeamName = EventData.AwayTeamName;
			Score = EventData.AwayScore;
			RedCard = EventData.AwayRedCard;
		}

		const HomeOrAwayIsOK = (['HOME', 'AWAY'].indexOf(HomeOrAway) !== -1)

		return EventData && HomeOrAwayIsOK ? (
			<Touch
				onPress={() => {
					PiwikEvent('Odds', 'Submit', 'Odds_mainpage_horizontal')
					ToSportsDetails(Vendor, EventData);
				}}
				style={styles.listsHorizontal}
			>
				<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: width * 0.45}}>
					<SportImage imgsID={TeamId} />
					<Text style={{ paddingTop: 5, width: width * 0.4, textAlign: 'center', paddingLeft: HomeOrAway === 'AWAY'? 12: 0 }} numberOfLines={1}>{TeamName}</Text>
					{EventData.IsRB &&
					RedCard &&
					parseInt(RedCard) > 0 ? (
						<View style={{ backgroundColor: '#eb2121', paddingLeft: 2, paddingRight: 2,marginTop: 8, borderRadius: 1 }}>
							<Text style={{ color: '#fff', fontSize: 12 }}>
								{RedCard ?? 0}
							</Text>
						</View>
					) : null}
				</View>
				
				<View style={HomeOrAway === 'HOME'?{} : {position: 'absolute', left: 5}}>
					<Text
						style={{
							color:
								Score == 0
									? '#BCBEC3'
									: '#000000',
							fontSize: 20,
						}}
					>
						{EventData.IsRB ? (Score ?? 0) : ''}
					</Text>
				</View>
			</Touch>
		) : null
	}
}
