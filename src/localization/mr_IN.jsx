import dayjs from 'dayjs';

const marathiLocale = {
  name: 'mr',
  weekdays: ['रविवार', 'सोमवार', 'मंगळवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],
  weekdaysShort: ['रवि', 'सोम', 'मंगळ', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
  weekdaysMin: ['र', 'सो', 'मं', 'बु', 'गु', 'शु', 'श'],
  months: ['जानेवारी', 'फेब्रुवारी', 'मार्च', 'एप्रिल', 'मे', 'जून', 'जुलै', 'ऑगस्ट', 'सेप्टेंबर', 'ऑक्टोबर', 'नोव्हेंबर', 'डिसेंबर'],
  monthsShort: ['जाने', 'फेब्रु', 'मार्च', 'एप्रि', 'मे', 'जून', 'जुलै', 'ऑग', 'सेप्टे', 'ऑक्टो', 'नोव्हे', 'डिसे'],
  weekStart: 1,
  yearStart: 4,
  formats: {
    LT: 'A h:mm',
    LTS: 'A h:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, A h:mm',
    LLLL: 'dddd, D MMMM YYYY, A h:mm'
  },
  ordinal: (n) => `${n}वा`,
  meridiem: (hour, minute) => {
    if (hour < 12) {
      return 'रात्री';
    } else if (hour < 17) {
      return 'दुपार';
    } else {
      return 'संध्याकाळ';
    }
  }
};

dayjs.locale(marathiLocale, null, true);

export default marathiLocale;
