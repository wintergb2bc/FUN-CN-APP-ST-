import locatData from "../../../../containers/locatData.json";

const { width, height } = Dimensions.get("window");
import ReactNative, {
	StyleSheet,
	Text,
	Image,
	View,
	Platform,
	ScrollView,
	Dimensions,
	TouchableOpacity,
	Linking,
	WebView,
	NativeModules,
	Alert,
	TextInput,
	ActivityIndicator,
	UIManager,
	Modal
} from "react-native";
import {
	Button,
	Progress,
	WhiteSpace,
	WingBlank,
	InputItem,
	Checkbox,
	Toast,
	Flex, List, Picker
} from "antd-mobile-rn";
import { Actions } from "react-native-router-flux";
import Touch from 'react-native-touch-once';


import React from 'react';
// import Service from '@/Header/Service';
import Cascader from './Cascader';
let _name = /^[\u4E00-\u9FA5]{1,4}$/;
let _phoneNumber = /^1[3-9]\d{9}$/;
let _email = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
let _address = /^[\u4E00-\u9FA5A-Za-z\d\-\_]{2,60}$/;
let _postalCode = /[1-9][0-9]{5}/;

import ListItems from "antd-mobile-rn/lib/list/style/index.native";

const newStyle = {};
for (const key in ListItems) {
	if (Object.prototype.hasOwnProperty.call(ListItems, key)) {
		newStyle[key] = { ...StyleSheet.flatten(ListItems[key]) };
		if (key == "Item") {
			newStyle[key].paddingLeft = 0;
			newStyle[key].paddingRight = 0;
			newStyle[key].height = 40;
			newStyle[key].width = '28%';
			newStyle[key].overflow = "hidden";
			// newStyle[key].borderRadius= 10;
			// 	newStyle[key].backgroundColor='#fff';
			// 	newStyle[key].borderColor= '#E6E6EB';
			// 	newStyle[key].borderWidth- 1;
		}
		newStyle[key].width = '28%';
		newStyle[key].color = "transparent";
		newStyle[key].fontSize = -999;
		newStyle[key].backgroundColor = "transparent";
		newStyle[key].borderRadius = 4;
	}
}
const ListItemstyles = newStyle;

class PromotionsAddressform extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			defaultAddress: true,
			ShowDeletPopup: false,
			recipientFirstName: '',
			recipientLastName: '',
			county: '',
			city: '',
			postalCode: '',
			contactNo: '',
			email: '',
			address: '',
			selectData: '',
			NameError: '',
			PhoneNumberError: '',
			EmailError: '',
			AddressError: '',
			PostalCodeError: '',
			Fetchtype: 'POST',
			promoid: '',
			addressid: 0,
			province: '',
			provinceID: '',
			districtID: '',
			townID: '',
		};
	}

	componentWillMount() {
		this.props.navigation.setParams({
			title: this.props.types == 'readOnly' ? '????????????' : '??????????????????'
		})

		const { types, addresskey, id, addressReadOnly } = this.props;
		this.setState({
			pagetype: types,
			promoid: id
		});
		/* ---------------------????????????????????? ????????????---------------------- */
		let Addressdata = JSON.parse(localStorage.getItem('Address'));
		if (types == 'edit' && Addressdata && Addressdata != '') {
			let selectData = Addressdata.find((item) => item.recordNo == addresskey);
			const {
				address,
				defaultAddress,
				email,
				firstName,
				recordNo,
				lastName,
				cellphoneNo,
				postalCode,
				provinceID,
				districtID,
				townID
			} = selectData
			this.setState({
				selectData,
				Fetchtype: 'PUT',
				address: address,
				defaultAddress: defaultAddress,
				email: email,
				recipientFirstName: firstName,
				addressid: recordNo,
				recipientLastName: lastName,
				contactNo: cellphoneNo,
				postalCode: postalCode,
				provinceID: provinceID,
				districtID: districtID,
				townID: townID,
				houseNumber: '',
				village: '',
				zone: ''
			});
		}
		if(types == 'readOnly') {
			const {
				address,
				defaultAddress,
				email,
				firstName,
				lastName,
				contactNumber,
				zipCode,
			} = addressReadOnly
			this.setState({
				selectData: addressReadOnly,
				Fetchtype: 'PUT',
				address: address,
				defaultAddress: defaultAddress,
				email: email,
				recipientFirstName: firstName,
				recipientLastName: lastName,
				contactNo: contactNumber,
				postalCode: zipCode,
				houseNumber: '',
				village: '',
				zone: ''
			});
		}
	}

	/**
	 * @description:  ?????????????????????????????????????????????????????????
	 * @param {String}  recipientFirstName ??????
	 * @param {String}  recipientLastName  ??????
	   * @param {String}  address            ????????????
	 * @param {String}  email			   ??????
	 * @param {Number}  postalCode		   ??????
	 * @param {Number}  contactNo          ?????????
	 * @param {Number}  provinceId		   ??????
	 * @param {Number}  districtId         ??????
	 * @param {Number}  townId             ???
	 * @param {Boolean}  defaultAddress	   ?????????????????????
	 * @return {Object}
	*/

	NewShippingAddress = (msg) => {
		/* ----------???????????? ??? ??? ???------------ */
		const {
			defaultAddress,
			recipientFirstName,
			recipientLastName,
			postalCode,
			contactNo,
			email,
			address,
			Fetchtype,
			province,
			city,
			county,
			promoid,
			addressid,
			provinceID,
			districtID,
			townID
		} = this.state;

		if (!this.CheckUserData()) return;

		// let postData = {
		// 	id: addressid,
		// 	recipientFirstName: recipientFirstName,
		// 	recipientLastName: recipientLastName,
		// 	postalCode: postalCode,
		// 	contactNo: contactNo,
		// 	email: email,
		// 	provinceId: province,
		// 	districtId: city,
		// 	townId: county,
		// 	address: address,
		// 	defaultAddress: defaultAddress,
		// 	villageId: 0,
		// 	houseNumber: '---',
		// 	zone: '---',
		// 	village: '---'
		// };
		let postData = {
			recipientFirstName: recipientFirstName,
			recipientLastName: recipientLastName,
			postalCode: postalCode,
			contactNo: contactNo,
			email: email,
			provinceId: provinceID,
			districtId: districtID,
			townId: townID,
			villageId: "",
			houseNumber: "",
			zone: "",
			address: address,
			defaultAddress: defaultAddress,
			recordNo: addressid
		}
		Toast.loading('?????????...');
		fetchRequest(ApiPort.ShippingAddress, Fetchtype, postData)
			.then((res) => {
				Toast.hide()
				if (res) {
					if (res.isSuccess) {
						this.props.ShippingAddress();
						Toast.success(msg, 2, () => { Actions.pop() })

						// setTimeout(() => {
						// 	Router.push(
						// 		{
						// 			pathname: `/promotions/[details]?id=${promoid}`,
						// 			query: {
						// 				details: 'addresslist',
						// 				id: promoid
						// 			}
						// 		},
						// 		`/promotions/addresslist?id=${promoid}`
						// 	);
						// }, 1000);
					} else {
						Toast.fail(res.result.message);
					}
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	/**
	 * @description: ????????????
	 * @param {Number} id ???????????????id
	 * @return {Object}
	*/

	DeleteAddress = (id) => {
		Toast.loading('?????????...');
		fetchRequest(ApiPort.DeleteShippingAddress + `/${id}?`, 'DELETE')
			.then((res) => {
				Toast.hide()
				if (res) {
					if (res.isSuccess) {
						this.props.ShippingAddress();
						Toast.success('????????????', 2, () => { Actions.pop() })
						// setTimeout(() => {
						// 	Router.push(
						// 		{
						// 			pathname: `/promotions/[details]?id=${this.state.promoid}`,
						// 			query: {
						// 				details: 'addresslist',
						// 				id: this.state.promoid
						// 			}
						// 		},
						// 		`/promotions/addresslist?id=${this.state.promoid}`
						// 	);
						// });
					} else {
						Toast.fail(res.message);
					}
				}
				hide();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	AddressState(data) {
		const {
			province,
			city,
			county,
		} = data
		this.setState({
			province,
			city,
			county,
		})
	}
	render() {
		const {
			defaultAddress,
			ShowDeletPopup,
			recipientFirstName,
			recipientLastName,
			postalCode,
			contactNo,
			email,
			address,
			NameError,
			PhoneNumberError,
			EmailError,
			AddressError,
			PostalCodeError,
			addressid,
			pagetype,
			provinceID,
			districtID,
			townID
		} = this.state;
		let ErrorCheckPass =
			NameError == '' &&
			PhoneNumberError == '' &&
			EmailError == '' &&
			AddressError == '' &&
			PostalCodeError == '';
		let CheckdataFail =
			recipientFirstName == '' ||
			recipientLastName == '' ||
			postalCode == '' ||
			contactNo == '' ||
			email == '' ||
			address == '';

		let noreadOnly = pagetype != 'readOnly';
		console.log('pagetypepagetypepagetype11',pagetype)
		return (
			<View style={{ flex: 1, backgroundColor: '#fff', padding: 15 }}>
				<ScrollView
					showsHorizontalScrollIndicator={false}
					showsVerticalScrollIndicator={false}
				>
					{
						noreadOnly ?
						<View style={styles.mass}>
							<Text style={{ color: '#83630B', fontSize: 12 }}>?????????????????????????????????????????????</Text>
						</View>
						:
						<Touch style={styles.mass} onPress={() => { LiveChatOpenGlobe() }}>
							<Text style={{ color: '#83630B', fontSize: 12 }}>??????????????????????????????????????????????????????????????????????????? ?????????<Text style={{color: '#00A6FF'}}>????????????</Text></Text>
						</Touch>
					}
					{/* -------------------?????????----------------- */}
					<Text style={styles.titles}>?????????</Text>
					<View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: width - 30 }}>
						<View style={styles.inputViewName}>
							<TextInput
								style={styles.inputName}
								editable={noreadOnly}
								underlineColorAndroid="transparent"
								value={recipientFirstName}
								placeholder="??????"
								placeholderTextColor="#BCBEC3"
								textContentType="username"
								onChangeText={(e) => {
									this.setState({
										recipientFirstName: e
									});
									if (!!_name.test(e) && !!_name.test(recipientLastName)) {
										this.setState({
											NameError: ''
										});
									}
								}}
							/>
						</View>
						<View style={styles.inputViewName}>
							<TextInput
								style={styles.inputName}
								editable={noreadOnly}
								underlineColorAndroid="transparent"
								value={recipientLastName}
								placeholder="??????"
								placeholderTextColor="#BCBEC3"
								textContentType="username"
								onChangeText={(e) => {
									this.setState({
										recipientLastName: e
									});
									if (!!_name.test(recipientFirstName) && !!_name.test(e)) {
										this.setState({
											NameError: ''
										});
									}
								}}
							/>
						</View>
					</View>
					{NameError != '' && <Text style={{ fontSize: 11, color: 'red' }}>{NameError}</Text>}
					{/* -------------------????????????----------------- */}
					<Text style={styles.titles}>????????????</Text>
					<View >
						<View style={styles.inputView}>
							<Text style={{fontSize: 14, color: '#000000', paddingLeft: 10,}}>+86</Text>
							<TextInput
								style={[styles.input,{width: width * 0.7}]}
								underlineColorAndroid="transparent"
								value={contactNo}
								editable={noreadOnly}
								placeholder="????????????"
								placeholderTextColor="#BCBEC3"
								textContentType="username"
								onChangeText={(e) => {
									this.setState({
										contactNo: e
									});
									if (!!_phoneNumber.test(e)) {
										this.setState({
											PhoneNumberError: ''
										});
									}
								}}
							/>
						</View>
						{PhoneNumberError != '' && <Text style={{ fontSize: 11, color: 'red' }}>{PhoneNumberError}</Text>}
					</View>
					{/* -------------------????????????----------------- */}
					<Text style={styles.titles}>????????????</Text>
					<View >
						<View style={styles.inputView}>
							<TextInput
								style={styles.input}
								underlineColorAndroid="transparent"
								value={email}
								editable={noreadOnly}
								placeholder="??????xiaomin123@gmail.com"
								placeholderTextColor="#BCBEC3"
								textContentType="username"
								onChangeText={(e) => {
									this.setState({
										email: e
									});
									if (!!_email.test(e)) {
										this.setState({
											EmailError: ''
										});
									}
								}}
							/>
						</View>
						{EmailError != '' && <Text style={{ fontSize: 11, color: 'red' }}>{EmailError}</Text>}
					</View>
					{/* -------------------????????????----------------- */}
					<Text style={styles.titles}>????????????</Text>
					<View>
						<View style={styles.inputView}>
							<TextInput
								style={styles.input}
								underlineColorAndroid="transparent"
								value={address}
								editable={noreadOnly}
								placeholder="????????????"
								placeholderTextColor="#BCBEC3"
								textContentType="username"
								onChangeText={(e) => {
									this.setState({
										address: e
									});
									if (!!_address.test(e)) {
										this.setState({
											AddressError: ''
										});
									}
								}}
							/>
						</View>
						{AddressError != '' && <Text style={{ fontSize: 11, color: 'red' }}>{AddressError}</Text>}
						{/* --------??????????????????-------- */}
						{
							<Cascader AddressState={(data) => {this.AddressState(data)}} pagetype={this.props.types} selectData={this.state.selectData}  />
						}
					</View>
					{/* -------------------????????????----------------- */}
					<Text style={styles.titles}>????????????</Text>
					<View >
						<View style={styles.inputView}>
							<TextInput
								style={styles.input}
								underlineColorAndroid="transparent"
								value={postalCode}
								editable={noreadOnly}
								placeholder="????????????"
								placeholderTextColor="#BCBEC3"
								textContentType="username"
								onChangeText={(e) => {
									this.setState({
										postalCode: e
									});
									if (!!_postalCode.test(e)) {
										this.setState({
											PostalCodeError: ''
										});
									}
								}}
							/>
						</View>
						{PostalCodeError != '' && <Text style={{ fontSize: 11, color: 'red' }}>{PostalCodeError}</Text>}

					</View>
					{/* -------------------????????????????????????----------------- */}

					{noreadOnly && (
						<View style={{display: 'flex',justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', height: 22}}>
							{!defaultAddress ? (
								<Touch
									style={styles.checked}
									onPress={() => {
										this.setState({
											defaultAddress: true
										});
									}}
								/>
							) : (
								<Touch
								style={styles.checkedActive}
								onPress={() => {
									this.setState({
										defaultAddress: false
									});
								}}>
									<Image style={{ width: 15, height: 15 }} source={require('../../../../images/euroCup/checkw.png')} />
								</Touch>

							)}
							<Text
							onPress={() => {
								this.setState({
									defaultAddress: !this.state.defaultAddress
								});
							}}
							style={{color: '#00A6FF', fontSize: 12,paddingLeft: 8}}>????????????????????????????????????</Text>
						</View>
					)}

					{pagetype == 'edit' ? (
						<View style={styles.BtnEnd}>
							<Touch
								style={styles.delet}
								onPress={() => {
									this.setState({
										ShowDeletPopup: true
									});
								}}
							>
								<Text style={{ color: '#00A6FF', lineHeight: 40, textAlign: 'center' }}>??????</Text>
							</Touch>
							<Touch
								style={styles.done}
								onPress={() => {
									this.NewShippingAddress('????????????');
								}}
							>
								<Text style={{ color: '#fff', lineHeight: 42, textAlign: 'center' }}>????????????</Text>
							</Touch>
						</View>
					) : (
						noreadOnly && (
							<Touch
								style={[ErrorCheckPass && !CheckdataFail ? styles.doneActive : styles.nodoneActive]}
								onPress={() => {
									this.NewShippingAddress('????????????');
								}}
							>
								<Text style={{ color: ErrorCheckPass && !CheckdataFail ? '#fff' : '#BCBEC3', lineHeight: 40, textAlign: 'center' }}>??????</Text>
							</Touch>
						)
					)}
					{/* ------------------??????????????????----------------- */}

					<Modal
						animationType="none"
						transparent={true}
						visible={ShowDeletPopup}
						onRequestClose={() => { }}
					>
						<View style={styles.modalMaster}>
							<View style={styles.modalView}>
								<View style={styles.modalTitle}>
									<Text style={styles.modalTitleTxt}>????????????</Text>
								</View>
								<Text style={{ lineHeight: 70, textAlign: 'center', color: '#666' }}>????????????????????????????????????</Text>
								<View style={styles.modalBtn}>
									<Touch onPress={() => { this.setState({ ShowDeletPopup: false }, () => { this.DeleteAddress(addressid); }) }} style={styles.modalBtnL}>
										<Text style={{ color: '#00A6FF' }}>??????</Text>
									</Touch>
									<Touch onPress={() => {
										this.setState({ ShowDeletPopup: false }, () => { Actions.pop() })
									}} style={styles.modalBtnR}>
										<Text style={{ color: '#fff' }}>??????</Text>
									</Touch>
								</View>
							</View>
						</View>
					</Modal>
				</ScrollView>
			</View>
		);
	}
	/* ----------------------------????????????????????????----------------------- */
	CheckUserData = () => {
		const { recipientFirstName, recipientLastName, contactNo, email, address, postalCode, province, city, county, } = this.state;
		if (!_name.test(recipientFirstName) || !_name.test(recipientLastName)) {
			this.setState({
				NameError: '?????????????????????'
			});
			return false;
		} else {
			this.setState({
				NameError: ''
			});
		}
		if (!_phoneNumber.test(contactNo)) {
			this.setState({
				PhoneNumberError: '????????????????????????'
			});
			return false;
		} else {
			this.setState({
				PhoneNumberError: ''
			});
		}
		if (!_email.test(email)) {
			this.setState({
				EmailError: '????????????????????????'
			});
			return false;
		} else {
			this.setState({
				EmailError: ''
			});
		}
		if (!_address.test(address)) {
			this.setState({
				AddressError: '????????????????????????'
			});
			return false;
		} else {
			this.setState({
				AddressError: ''
			});
		}
		if (!_postalCode.test(postalCode)) {
			this.setState({
				PostalCodeError: '????????????????????????'
			});
			return false;
		} else {
			this.setState({
				PostalCodeError: ''
			});
		}
		this.setState({
			PassCheck: true
		});
		return true;
	};
}
const styles = StyleSheet.create({
	checked: {
		width: 18,
		height: 18,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#D1D1D1'
	},
	checkedActive: {
		width: 18,
		height: 18,
		borderRadius: 5,
		backgroundColor: '#00A6FF',
		display: 'flex',
		justifyContent:'center',
		alignItems: 'center',
	},
	doneActive: {
		width: width - 30,
		backgroundColor: '#00A6FF',
		borderRadius: 10
	},
	nodoneActive: {
		width: width - 30,
		backgroundColor: '#EFEFF4',
		borderRadius: 10
	},
	delet: {
		width: width * 0.4,
		borderWidth: 1,
		borderColor: '#00A6FF',
		borderRadius: 10
	},
	done: {
		width: width * 0.4,
		backgroundColor: '#00A6FF',
		borderRadius: 10
	},
	BtnEnd: {
		display: 'flex',
		justifyContent: 'space-around',
		width: width - 30,
		alignItems: 'center',
		flexDirection: 'row',
		marginTop: 15,
		marginBottom: 15,
	},
	titles: {
		lineHeight: 23,
		color: '#666666',
		fontSize: 12,
	},
	mass: {
		backgroundColor: '#FFF5BF',
		width: width - 30,
		borderRadius: 10,
		padding: 10,
	},
	inputViewName: {
		borderRadius: 10,
		backgroundColor: '#fff',
		borderColor: '#E6E6EB',
		borderWidth: 1,
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: (width - 45) * 0.5,
		marginBottom: 15,
		marginBottom: 10,
	},
	inputName: {
		width: width * 0.4,
		height: 40,
		color: '#000000',
		textAlign: 'left',
		paddingLeft: 10,
		fontSize: 14,
	},
	inputView: {
		borderRadius: 10,
		backgroundColor: '#fff',
		borderColor: '#E6E6EB',
		borderWidth: 1,
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
		marginBottom: 10,
		width: width - 30,
	},
	inputAddressView: {
		borderRadius: 10,
		backgroundColor: '#fff',
		borderColor: '#E6E6EB',
		borderWidth: 1,
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
		marginBottom: 10,
		width: '32%',
	},
	input: {
		width: width - 30,
		height: 40,
		color: '#000000',
		textAlign: 'left',
		paddingLeft: 10,
		fontSize: 14,
	},
	inputAddress: { height: 40,
		color: '#000000',
		textAlign: 'left',
		paddingLeft: 10,
		fontSize: 14,
	},



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
	},
	modalBtn: {
		width: width * 0.9,
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
	limitListsInput: {
		borderWidth: 1,
		paddingLeft: 10,
		paddingRight: 10,
		fontSize: 14,
		height: 40,
		width: width - 20,
		borderRadius: 4,
		justifyContent: "center",
	},
})

export default PromotionsAddressform;
