import dayjs from "dayjs";

export const compareDay = (a: any, b: any) => {
  if (a.get("date") !== b.get("date")) return false;
  if (a.get("month") !== b.get("month")) return false;
  if (a.get("year") !== b.get("year")) return false;
  return true;
};
export const compareDayByString = (a: any, b: any) => {
  const dataA = dayjs(a);
  const dataB = dayjs(b);
  if (dataA.get("date") !== dataB.get("date")) return false;
  if (dataA.get("month") !== dataB.get("month")) return false;
  if (dataA.get("year") !== dataB.get("year")) return false;
  return true;
};
export const emailValidate = (value: string) => {
  const isEmail = value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  return isEmail;
};

export const containLine = (time_start: string, time_end: string, time_current: string) => {
  const [hour_s, minute_s] = time_start.split(":");
  const [hour_e, minute_e] = time_end.split(":");
  const [hour_c, minute_c] = time_current.split(":");

  const start = parseInt(hour_s) * 60 + parseInt(minute_s);
  const end = parseInt(hour_e) * 60 + parseInt(minute_e);
  const current = parseInt(hour_c) * 60 + parseInt(minute_c);

  if (current <= end && current >= start) {
    const percent = Math.floor(((current - start) / (end - start)) * 100 * 10) / 10;
    return { percent: percent };
  }
};
export const diffDate = (start: any, end: any) => {
  var startTime = new Date(start);
  var endTime = new Date(end);
  var difference = endTime.getTime() - startTime.getTime();
  var resultInMinutes = Math.round(difference / 60000);
  return resultInMinutes;
};
export const convertMinsToHrsMins = (minutes: number) => {
  if (minutes) {
    var h = Math.floor(minutes / 60);
    var m = minutes % 60;
    h = h < 10 ? 0 + h : h;
    m = m < 10 ? 0 + m : m;
    if (h == 0o0) {
      return m + " phút";
    }
    if (m == 0o0) {
      return h + " giờ";
    } else {
      return h + " giờ " + m + " phút";
    }
  }
};
export const convertSecondToMinsSecond = (minutes: number) => {
  if (minutes) {
    var sec_num = parseInt(minutes as any, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  }
};

export const listImageError: any[] = [];
export const addImageError = (url: string) => {
  listImageError.push(url);
};
export const renderImageById = (id: String, imageDefault?: string) => {
  if (!id) return imageDefault || "/images/bean.png";
  const domain = import.meta.env.VITE_CMS;
  return domain + "/assets/" + id;
};
export const imageDefault = "/images/bean.png";
export const getAlphabetIndex = (number: number) => {
  switch (number) {
    case 0:
      return "A";
    case 1:
      return "B";
      break;
    case 2:
      return "C";
      break;
    case 3:
      return "D";
      break;
    case 4:
      return "E";
      break;
    case 5:
      return "F";
      break;
    case 6:
      return "G";
      break;
    case 7:
      return "H";
      break;
    case 8:
      return "I";
      break;
    case 9:
      return "K";
      break;
    case 10:
      return "L";
      break;
    case 11:
      return "M";
      break;
    case 12:
      return "N";
      break;
    default:
      return "";
      break;
  }
};

export const regexFillBlank = (content: any) => {
  if (content) {
    var regex = /{\[([^[\]]+)\]\[(\d+)\]}/g;
    var matches = [...content.matchAll(regex)];
    matches.map((elm: any, index: any) => {
      var words = elm[1].split("|");
      var number = elm[2];
    });
    return matches;
  }
};
export const wordCountFunc = (content: any) => {
  const trimmedText = content?.trim();
  const words = trimmedText?.split(" ");
  const count = words?.length;
  return content ? count : 0;
};

export const domainCMS = import.meta.env.VITE_CMS;

// create function conver time second to time format
export const convertSecondToTime = (seconds: number) => {
  if (seconds === 0) return "00:00";
  if (seconds) {
    const hour = Math.floor(seconds / 3600);
    const minute = Math.floor((seconds - hour * 3600) / 60);
    const second = seconds - hour * 3600 - minute * 60;
    return `${minute >= 10 ? minute : "0" + minute}:${second >= 10 ? second : "0" + second}`;
  }
};

export function removeVietnameseTones(str: string) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
  return str;
}

export const convertTimeToFormat = (time: any) => {
  const seconds = time * 60;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = (seconds % 60).toString().padStart(2, "0");
  const countdownOutput = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  if (countdownOutput !== "NaN:NaN:NaN") {
    return countdownOutput;
  } else {
    return "00:00:00";
  }
};
