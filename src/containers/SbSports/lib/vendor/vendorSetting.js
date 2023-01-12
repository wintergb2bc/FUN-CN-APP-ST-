/*
* vendor設置，單獨分離 token,語言等 環境配置
*
* 在各產品/語言端，視實際狀況修改
*/

//默認用戶配置，用於VendorBase
export const defaultMemberSetting = {
  amount1: 99999,
  amount2: 1000,
  amount3: 100,
  oddsType: 'HK',
  alwaysAcceptBetterOdds: true,
  betSlipVibration: false,
  betSlipSound: false,
  goalNotification: true,
  goalMyFavorite: true,
  goalIBet: true,
  goalAllRB: false,
  goalSound: true,
  goalSoundType: 1,
  goalVibration: true,
  listDisplayType: 1,
};

//環境設定，用於判斷當前環境
export const envSettings = {
  isApp: true, //是否app
}

//投注記錄 投注線描述
export function getWagerLineDesc(wagerItemData) {
  return wagerItemData.getLineDescDefault(); //使用默認方式
}
