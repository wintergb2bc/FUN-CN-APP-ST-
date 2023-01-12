


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
    TextInput,
    KeyboardAvoidingView,
} from "react-native";
import SnapCarousel, {
    ParallaxImage,
    Pagination
} from "react-native-snap-carousel";
import Touch from "react-native-touch-once";
const { width, height } = Dimensions.get("window");
import React from "react";

class SportImage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() { }

    componentWillUnmount() { }

    render() {
        // https://simg.leyouxi211.com/bti-icon/CompetitionImageFile/41090.png
        // https://simg.leyouxi211.com/im-icon/CompetitionImageFile/230.png
        let selectedVendor = lowerV; //默認使用全局lowerV
        //如果傳入Vendor 則以傳入的Vendor為主
        if (this.props.Vendor && this.props.Vendor.configs && this.props.Vendor.configs.VendorName) {
            selectedVendor = this.props.Vendor.configs.VendorName;
        }

        let lowerImg = selectedVendor == 'BTI' ? '/bti-icon' : '/im-icon'
        let LeagueTeam = this.props.LeagueIcon ? '/CompetitionImageFile/': '/TeamImageFile/'
        let urls = SportImageUrl + lowerImg + LeagueTeam + this.props.imgsID + '.png'
        let defaultImg = selectedVendor == 'BTI' ? require('../images/betting/fun88.png') : require('../images/betting/IM.png')
        let imgSize = this.props.imgSize ? this.props.imgSize : 23
        return (
            <Image defaultSource={defaultImg} resizeMode='stretch' source={{ uri: urls }} style={{ width: imgSize, height: imgSize }} />
        )
    }
}

export default SportImage

const styles = StyleSheet.create({
})
