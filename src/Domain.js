/*
* ===============測試環境==================
*/

CodePushKeyIOS = "ADqjl69lYaSSqeNY6eUkN0wUEulAyXg1xSIoT";
CodePushKeyAndroid = "ed-vtfMfYW1Bbf38_sD8ELY1EGdUP5xszqqIz";

// window.appAndroidId = "com.F1M1P5.soexample";
// window.appIOSId = "com.F1M1P5.LIVE";
window.appAndroidId = "F1M1P5.ST.Android";
window.appIOSId = "com.FUNM1P5.ST";

// TODO 測試環境是true
window.isStaging = true;

// window.common_url = "https://native-stgf1p5.gamealiyun.com";
window.common_url = "https://gateway-idcstgf1p501.gamealiyun.com";
window.common_url_sb = 'https://gateway-idcstgf1p501.gamealiyun.com'; // sb体育域名
SBTDomain = "https://p5stag1.fun88.biz";
LIVEDomain = "http://member.stagingp4.fun88.biz/cn";

// world cup
window.WorldCup_Domain = "https://f1m1-worldcup-stage-web.fubnb.com";
// window.WorldCup_Domain = "https://f1m1-worldcup-prod-web.fubnb.com";
// cache.funlove88.com

//推送沒用了
//SignalRUrl = 'https://gatewaystagingfun88wsnotification1.gamealiyun.com';

//-----體育配置----
SportImageUrl = 'https://simg.letiyu88.com/'; //游戏icon
CacheApi = 'https://sapi.letiyu88.com'; //緩存API 測試環境
window.SmartCoachApi = 'https://betting.stage.brainanalytics.co'; //STG测试情报分析

//-----IM配置------
//测试
window.IMAccessCode = 'ca9fb2a3e194173a'; //fun測試
window.IMApi = 'https://improxy.letiyu88.com/api/mobile/'; //fun測試 proxy服


//歐洲杯相關的聯賽ID
window.seasonId = 24; // 賽季, 23 = 2016 , 24 = 2020 歐洲杯
window.EuroCup2021LeagueIds = [20161];
//歐洲杯比賽時間
window.EuroCup2021FirstEventTime = '2021-06-11T15:00:00.0000000-04:00'; //第一場
window.EuroCup2021FinalEventTime = '2021-07-11T15:00:00.0000000-04:00'; //最後一場
EuroCup2021CountDownEndTime = '2021-06-12T00:00:00.0000000+08:00'; //12 June 2021 00:00:00 GMT +8
window.EuroCupDomain = 'https://shsbwkpf.funpo.com:2041/sports-data-gateway'; //排名api

//-----BTI配置-----
//测试
window.BTIAuthApiProxy = 'https://letiyu88.com/api/sportsdata/'; //用來隱藏 bti DomainId的proxy，bti auth login/renew 用
window.BTIApi = 'https://letiyu88.com/api/sportsdata/'; //fun測試 舊版(SBT)
window.BTIRougeApi = 'https://prod213.1x2aaa.com/api/rogue/'; //bti新版api(目前僅支持cashout)
window.BTIAnnouncements = 'https://gatewayimstaging.bbentropy.com/json_announcements.aspx'; //fun測試 proxy服 用im的域名轉bti的公告

//-----沙巴配置-----
//测试
window.SABAAuthApi = 'https://sabaauth.letiyu88.com/'; //只有login有cors限制，其他不用
window.SABAApi = 'https://apistaging.wx7777.com/';


/*
* ===============線上/灰度環境==================
*/

// // LIVE
// window.common_url = "https://gateway-idcf5.gamealiyun.com";
// //灰度域名
// //window.common_url = "https://gateway-idcslf5.gamealiyun.com";
// // sb体育域名
// window.common_url_sb = window.common_url;
// SBTDomain = "https://www.fun993.com";
// LIVEDomain = "https://www.fun88asia.com/CN";
//
// //-----體育配置----
// //线上
// SportImageUrl= 'https://simg.leyouxi211.com'; //聯賽隊伍圖 線上域名
// //SportImageUrl= 'https://simg.letiyu211.com'; //聯賽隊伍圖 線上備用域名
// CacheApi= 'https://sapi.leyouxi211.com'; //緩存API 線上域名
// //CacheApi= 'https://sapi.letiyu211.com'; //緩存API 線上備用域名
// window.SmartCoachApi = 'https://api.live.smartcoach.club';	  //PRD线上情报分析
//
// //-----IM配置------
// //线上
// window.IMAccessCode = '2cc03acc80b3693c'; //fun線上
// window.IMApi = 'https://gatewayim.bbentropy.com/api/mobile/'; //fun線上  proxy
// //歐洲杯相關的聯賽ID
// window.EuroCup2021LeagueIds = [17796];
// //歐洲杯比賽時間
// window.EuroCup2021FirstEventTime = '2021-06-11T15:00:00.0000000-04:00'; //第一場
// window.EuroCup2021FinalEventTime = '2021-07-11T15:00:00.0000000-04:00'; //最後一場
// EuroCup2021CountDownEndTime = '2021-06-12T00:00:00.0000000+08:00'; //12 June 2021 00:00:00 GMT +8
//
//
// //-----BTI配置-----
// //线上
// window.BTIAuthApiProxy ='https://leyouxi211.com/api/sportsdata/';   //線上域名
// // BTIAuthApiProxy: 'https://letiyu211.com/api/sportsdata/'; //線上備用域名
// window.BTIApi ='https://prod213.1x2aaa.com/api/sportsdata/'; //fun線上
// window.BTIRougeApi = 'https://prod213.1x2aaa.com/api/rogue/'; //bti新版api(目前僅支持cashout)
// window.BTIAnnouncements= 'https://gatewayim.bbentropy.com/json_announcements.aspx'; //fun線上 proxy服 用im的域名轉bti的公告
//
// //-----沙巴配置-----
// //线上
// window.SABAAuthApi = 'https://sabaauth.leyouxi211.com/'; //只有login有cors限制，其他不用
// // window.SABAApi = 'https://api.wx7777.com/'; //沙巴 全球線 備用
// window.SABAApi = 'https://api.neo128.com/'; //沙巴 中國專用線
