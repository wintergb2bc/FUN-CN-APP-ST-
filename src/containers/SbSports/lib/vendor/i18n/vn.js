const languageMapping = {'HOME':'Đội nhà','AWAY':'Đội khách','TIE':'Hòa','BIG':'Trên','SMALL':'Dưới','ODD':'Trên','EVEN':'Dưới','YES':'Có','NO':'Không','NOT_HAVE':'Không','HOME_YES':'Đội nhà Có','HOME_YES2':'Đội nhà  Có','HOME_NO':'Đội nhà Không','HOME_NO2':'Đội nhà  Không','AWAY_YES':'Đội khách Có','AWAY_YES2':'Đội khách  Có','AWAY_NO':'Đội khách Không','AWAY_NO2':'Đội khách  Không','HOME_ODD':'Đội nhà Lẻ','HOME_EVEN':'Đội nhà Chẵn','AWAY_ODD':'Đội khách Lẻ','AWAY_EVEN':'Đội khách Chẵn','HOME_WIN_YES':'Đội nhà thắng Có','HOME_WIN_NO':'Đội nhà thắng Không','AWAY_WIN_YES':'Đội khách thắng Có','AWAY_WIN_NO':'Đội khách thắng Không','HOME_WIN':'Đội nhà thắng','AWAY_WIN':'Đội khách thắng','ANY_WIN_YES':'Đội Thắng bất kỳ','ANY_WIN_NO':'Đội Thắng bất kỳ','HOME_PERFECT_WIN_YES':'Đội nhà Đội thắng giữ sạch lưới Có','HOME_PERFECT_WIN_NO':'Đội nhà Đội thắng giữ sạch lưới Không','AWAY_PERFECT_WIN_YES':'Đội khách Đội thắng giữ sạch lưới Có','AWAY_PERFECT_WIN_NO':'Đội khách Đội thắng giữ sạch lưới Không','NEUTRAL_GROUND':'N','BIG_OR_SMALL':'Trên/Dưới','BIG_SMALL':'TrênDưới','WORDWIDTH':'1','HANDICAP':'Cược Chấp','BIGSMALL':'TrênDưới','VendorConfigs':{'TIMEZONE':'7','TIMEZONEFULL':'+07:00'},'VendorMarketNames':{'1':'Cược Sớm','2':'Trận Đấu Hôm Nay','3':'Trực Tiếp','4':'Trận Đấu Yêu Thích','5':'Đoán Nhà Vô Địch'},'VendorPeriodName':{'1':'Toàn Trận','2':'Hiệp 1','3':'Hiệp 2'},'VendorErrorMsg':{'10010':'Vui lòng tải lại trang và đăng nhập lại.','11010':'Lỗi nhà cung cấp, vui lòng tải lại trang và thử lại.','11020':'Nhà cung cấp đang bảo trì.','11030':'Địa chỉ IP không được cho phép truy cập bởi nhà cung cấp.','12010':'Lỗi dữ liệu từ nhà cung cấp, vui lòng tải lại trang và thử lại.','13010':'Vượt quá giới hạn lựa chọn cược.','13011':'Vui lòng chỉ chọn 1 loại cược cho 1 trận.','13020':'Lựa chọn cược không hợp lệ, vui lòng tải lại trang và thử lại.','13030':'Trận đấu hoặc cược không hợp lệ.','13040':'Lựa chọn cược không hợp lệ.','13050':'Cược Thất Bại. Vui lòng thử lại sau.','13051':'Cược đặt đang thực hiện. Vui lòng kiểm tra vé cược.','13060':'Tỉ lệ cược đang cập nhật.','13070':'Số dư không đủ.','13080':'Tiền cược vượt quá số tiền cược tối đa.','13090':'Tiền cược thấp hơn số tiền cược tối thiểu','13100':'Tổng số tiền cược cho trận đấu vượt quá giới hạn cược trận đấu cho phép.','13110':'Tỉ lệ cược đã thay đổi','13111':'Tỉ lệ cược đã thay đổi. Vui lòng thử lại sau.','13120':'Trận đấu được chọn không hỗ trợ cược xâu.','13121':'Thưởng cược xâu không được sử dụng cùng với Cược Miễn phí.','13130':'Số tiền cược không hợp lệ.','13140':'Cược thể thao ảo không được kích hoạt.','14010':'新的兑现价格','99999':'Lỗi đường truyền. Vui lòng tải lại trang và thử lại.'},'SelectionStatusNames':{'100':'Thành Công','350':'Truy xuất thông tin đặt cược gặp lỗi.','380':'Lựa chọn cược không hợp lệ.','1001':'Tỉ lệ cược đang cập nhật.','99997':'Cần phải chọn ít nhất 3 tỷ lệ cược','99998':'Vui lòng đặt cược với tỷ lệ cược Châu Âu','99999':'Lỗi không xác định.'},'IM':{'SYSTEM_PARLAY':'Hệ thống cược xâu','CORRECT_SCORE_OTHER_FILTER':'khác','BetRadar':{'LANG':'vi','TIMZONE':'Asia:Jakarta'},'IMLineGroupNames':{'1':'Cược chấp & Trên/Dưới','3':'1x2','5':'Chẵn/ Lẻ','6':'Cược Tỉ Số','7':'Tổng Bàn Thắng','8':'Cơ Hội Kép'},'IMOddsTypeName':{'1':'Tỉ lệ Malay','2':'Tỉ lệ HK','3':'Tỉ lệ Euro (Châu Âu)','4':'Tỉ lệ Indo'},'IMWagerStatusName':{'1':'Đang Xử Lý','2':'Đã Xác Nhận','3':'Từ Chối','4':'Từ Chối'},'IMWagerConfirmStatusName':{'0':'Chưa Xác Nhận','1':'Xác Nhận Bình Thường','2':'Tình Huống Nguy Hiểm Được Xác Nhận'},'IMWagerCancelStatusName':{'1':'Không Bị Hủy','2':'Cược Đã Hủy','3':'Sự Kiện Đã Hủy'},'IMWagerCancelReasonName':{'0':'Không Có Lý Do','1':'Pha Bóng Nguy Hiểm Có Thẻ Đỏ','2':'Pha Bóng Nguy Hiểm Có Bàn Thắng','101':'Đã Kết Thúc'},'IMComboTypeNames':{'0':'Cược Đơn','1':'Xâu 3x4','2':'Xâu 4x11','3':'Xâu 5x26','4':'Xâu 6x57','5':'Xâu 7x120','6':'Xâu 8x247','7':'Xâu 9x502','8':'Xâu 10x1013','9':'Xâu 2x1','10':'Xâu 3x1','11':'Xâu 4x1','12':'Xâu 5x1','13':'Xâu 6x1','14':'Xâu 7x1','15':'Xâu 8x1','16':'Xâu 9x1','17':'Xâu 10x1','18':'Cược Hỗn Hợp'},'IMRBPeriodNames':{'!LIVE':'!TRỰC TIẾP','HT':'Nghỉ Giải Lao','1H':'Hiệp 1','2H':'Hiệp 2','Q1':'Hiệp 1','Q2':'Hiệp 2','Q3':'Hiệp 3','Q4':'HIệp 4','OT':'Hiệp Phụ','S1':'Ván 1','S2':'Ván 2','S3':'Ván 3','S4':'Ván 4','S5':'Ván 5','G1':'Game 1','G2':'Game 2','G3':'Game 3','G4':'Game 4','G5':'Game 5','G6':'Game 6','G7':'Game 7'},'IMEventGroupTypeNames':{'1':'Cược Chính','2':'Cược Góc','3':'Cược Đặc Biệt','4':'Hiệp 1','5':'Hiệp 2','6':'Hiệp 3','7':'Hiệp 4','8':'Cược Chấp Ván','9':'Set 1','10':'Set 2','11':'Set 3','12':'Set 4','13':'Set 5','14':'Cược Chấp Điểm','15':'Game 1','16':'Game 2','17':'Game 3','18':'Game 4','19':'Game 5','20':'Game 6','21':'Game 7'}},'BTI':{'SEARCH_NOTICE':'Vui lòng nhập ít nhất 3 từ','PARLAY':'Xiên','CANCELLED':'Hủy','NOT_CANCELLED':'Không hủy','BTIWagerOddsTypeName':{'notset':'','Malaysian':'Malay','HongKong':'Hong Kong','Decimal':'Châu Âu','Indonesian':'Indonesian'},'BTIWagerStatusName':{'Open':'Mở','Lost':'Thua','Won':'Thắng','Placed':'Đặt cược ','WonDeadHeat':'Thắng đồng hạng','PlacedDeadHeat':'Cược đồng hạng','Draw':'Hòa','Cancelled':'Đã Hủy','NonRunner':'Cược vô hiệu','HalfLost':'Thua Nửa','HalfWon':'Thắng Nửa','CashOut':'Xả kèo','PartialCashOut':'Xả kèo một phần'},'BTIMarketGroupTypeNames':{'Main':'Cược Chính','Goals':'Bàn thắng','Halves':'Hiệp đấu','Corners':'Góc','Period':'Giai đoạn','Specials':'Cược đặc biệt','Players':'Người chơi','Cards':'Thẻ phạt','Fast markets':'Kèo nhanh','Pulse Bet':'Cược xung','Fulltime':'Hết trận','Full Time':'Toàn trận','Quarters':'Hiệp','Set':'Hiệp','Match':'Trận Đấu','Match Specials':'Cược Đặc Biệt','General':'盘口','Regular Time':'Thời gian thi đấu bình thường','Full Time [Incl. OT]':'Toàn trận (bao gồm hiệp phụ)','Totals':'Tổng cộng','1st Period':'Hiệp 1','Frames':'Khung'},'BTIComboTypeNames':{'Single':'Cược Đơn','Combo':'Cược Xiên','SystemXfromY':'Cược Xiên Hệ Thống X/Y','Lucky15':'Cược Xiên 4x15','Lucky31':'Cược Xiên 5x31','Lucky63':'Cược Xiên 6x63','Trixie':'Cược Xiên 3x4','Patent':'Cược Xiên 3x7','Yankee':'Cược Xiên 4x11','SuperYankee':'Cược Xiên 5x26','Heinz':'Cược Xiên 6x57','SuperHeinz':'Cược Xiên 7x120','Goliath':'Cược Xiên 8x247'},'BTIBetTypeNames':{'2_0':'Cược Chấp','2_1':'Cược Chấp','2_2':'Cược Chấp','2_39':'Cược Chấp','3_0':'TrênDưới','3_1':'TrênDưới','3_2':'TrênDưới','3_39':'TrênDưới'},'BTIRBPeriodNames':{'FirstHalf':'Hiệp 1','BreakAfterFirstHalf':'Nghỉ giải lao','SecondHalf':'Hiệp 2','Finished':'Kết thúc','FirstOvertime':'Hiệp phụ 1','BreakAfterFirstOvertime':'Nghỉ giải lao','SecondOvertime':'Hiệp phụ 2','BreakAfterSecondOvertime':'Nghỉ giải lao','PenaltyShootout':'Đá Penalty','FirstQuarter':'Hiệp 1','BreakAfterFirstQuarter':'Nghỉ giải lao','SecondQuarter':'Hiệp 2','BreakAfterSecondQuarter':'Nghỉ giải lao','ThirdQuarter':'Hiệp 3','BreakAfterThirdQuarter':'Nghỉ giải lao','FourthQuarter':'Hiệp 4','BreakAfterFourthQuarter':'Nghỉ','FirstSet':'Hiệp 1','SecondSet':'Hiệp 2','ThirdSet':'Hiệp 3','FourthSet':'Hiệp 4','FifthSet':'Hiệp 5','FirstInning':'Hiệp 1','SecondInning':'Hiệp 2','ThirdInning':'Hiệp 3','FourthInning':'Hiệp 4','FifthInning':'Hiệp 5','SixthInning':'Hiệp 6','SeventhInning':'Hiệp 7','EighthInning':'Hiệp 8','NinthInning':'Hiệp 9','TenthInning':'Hiệp 10','EleventhInning':'Hiệp 11','TwelfthInning':'Hiệp 12','ThirteenthInning':'Hiệp 13','FourteenthInning':'Hiệp 14','FifteenthInning':'Hiệp 15','BreakAfterFirstInning':'Nghỉ sau hiệp 1','BreakAfterSecondInning':'Nghỉ sau hiệp 2','BreakAfterThirdInning':'Nghỉ sau hiệp 3','BreakAfterFourthInning':'Nghỉ sau hiệp 4','BreakAfterFifthInning':'Nghỉ sau hiệp 5','BreakAfterSixthInning':'Nghỉ sau hiệp 6','BreakAfterSeventhInning':'Nghỉ sau hiệp 7','BreakAfterEighthInning':'Nghỉ sau hiệp 8','BreakAfterNinthInning':'Nghỉ sau hiệp 9','BreakAfterTenthInning':'Nghỉ sau hiệp 10','BreakAfterEleventhInning':'Nghỉ sau hiệp 11','BreakAfterTwelfthInning':'Nghỉ sau hiệp 12','BreakAfterThirteenthInning':'Nghỉ sau hiệp 13','BreakAfterFourteenthInning':'Nghỉ sau hiệp 14','FirstPeriod':'Hiệp 1','BreakAfterFirstPeriod':'Nghỉ sau hiệp 1','SecondPeriod':'Hiệp 2','BreakAfterSecondPeriod':'Nghỉ sau hiệp 2','ThirdPeriod':'Hiệp 3','BreakAfterThirdPeriod':'Nghỉ sau hiệp 3','Overtime':'Quá giờ'}},'SABA':{'CORRECT_SCORE_OTHER_FILTER':'AOS','ISLUCKY':'Lựa chọn từ Cược Xiên Lucky','SABARBPeriodNames':{'Delayed':'Trì Hoãn','1H':'Hiệp 1','2H':'Hiệp 2','HT':'Nghỉ Giải Lao','1Q':'Hiệp 1','2Q':'Hiệp 2','3Q':'Hiệp 3','4Q':'HIệp 4','QT':'Hiệp Phụ','1S':'Ván 1','2S':'Ván 2','3S':'Ván 3','4S':'Ván 4','5S':'Ván 5','1G':'Game 1','2G':'Game 2','3G':'Game 3','1MS':'Map 1  Đang Chờ ','1MG':'Map 1 Sắp Diễn Ra','2MS':'Map 2 Đang Chờ ','2MG':'Map 2 Sắp Diễn Ra','3MS':'Map 3 Đang Chờ ','3MG':'Map 3  Sắp Diễn Ra'},'SABALineGroupNames':{'0':'Cược Chính','1':'Toàn Trận','2':'Nửa Trận ','3':'Phạt Góc / Thẻ Phạt','4':'Cách biệt','5':'Đặc Biệt','6':'Cầu Thủ','7':'Thị trường cược nhanh','8':'Hiệp','9':'Hiệp Phụ','10':'Phạt Đền','11':'Map 1','12':'Map 2','13':'Map 3','14':'Map 4','15':'Map 5','16':'Map 6','17':'Map 7','18':'Map 8','19':'Map 9'},'SABABetTypeNames':{'1':'Cược Chấp','3':'TrênDưới','7':'Cược Chấp','8':'TrênDưới','17':'Cược Chấp','18':'TrênDưới'},'SABAComboTypeNames':{'Doubles':'Cược Xiên Hai','Trebles':'Cược Xiên Ba','Trixie':'Cược Xiên Trixie','Lucky7':'Cược Xiên Lucky7','Fold4':'Cược Gộp Bốn','Yankee':'Cược Xiên Yankee','Lucky15':'Cược Xiên Lucky15','Fold5':'Cược Gộp Năm','Canadian':'Cược Xiên Canadian','Lucky31':'Cược Xiên Lucky31','Fold6':'Cược Gộp Sáu','Heinz':'Cược Xiên Heinz','Lucky63':'Cược Xiên Lucky36','Fold7':'Cược Gộp Bảy','SuperHeinz':'Cược Xiên SuperHeinz','Lucky127':'Cược Xiên Lucky127','Fold8':'Cược Gộp Tám','Goliath':'Cược Xiên Goliath','Lucky255':'Cược Xiên Lucky255','FoldN':'Cược Gộp N'},'SABAOddsTypeName':{'1':'Tỉ lệ Malay','2':'Tỉ lệ HK','3':'Tỉ lệ Euro (Châu Âu)','4':'Tỉ lệ Indo'},'SABAWagerStatusName':{'half won':'Thắng Nửa','half lose':'Thua Nửa','won':'Thắng','lose':'Thua','void':'Hủy','running':'Trực Tiếp','draw':'Hòa','reject':'Từ Chối','refund':'Hoàn Tiền','waiting':'Chờ xác  nhận'}}};export default languageMapping;