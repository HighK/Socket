const set = ["▓","█","▓","█","▓"];
const set1 = ["▓","▓","▓","▓","█"];
const times = [["███","█▓█","█▓█","█▓█","███"], ["▓▓█","▓▓█","▓▓█","▓▓█","▓▓█"], ["███","▓▓█","███","█▓▓","███"], ["███","▓▓█","███","▓▓█","███"], ["█▓█","█▓█","███","▓▓█","▓▓█"], ["███","█▓▓","███","▓▓█","███"], ["███","█▓▓","███","█▓█","███"], ["███","▓▓█","▓▓█","▓▓█","▓▓█"], ["███","█▓█","███","█▓█","███"], ["███","█▓█","███","▓▓█","▓▓█"]];
const week = ['일','월', '화', '수', '목', '금', '토'];
const timeMsg = "현재 시간은 ";

function() {  
  let time = new Date();
  let day = time.getDay();
  let hour = time.getHours();
  let minute = time.getMinutes();
  let second = time.getSeconds();
  let millis = time.getMilliseconds();
  let milf = parseInt(millis/100);
  let mils = parseInt(millis/10)%10;
  let hourf, hours, minf, mins; // 선언
  let clock = "", text = "", res = ""; // 초기화
  let yoil = week[day];
  
  if(hour > 9) {
    hourf = parseInt(hour/10);
    hours = hour%10;
  } else {
    hourf = 0;
    hours = hour;
  }

  if(minute > 9) {
    minf = parseInt(minute/10);
    mins = minute%10;
  } else {
    minf = 0;
    mins = minute;
  }

  if(second > 9) {
    secf = parseInt(second/10);
    secs = second%10;
  } else {
    secf = 0;
    secs = second;
  }

  text = `${time.getFullYear()}년 ${time.getMonth()+1}월 ${time.getDate()}일 ${yoil}요일 ${hour}시 ${minute}분 ${second}.${millis}초 입니다.<br>`;
  for(i=0; i<5; i++) {
    clock = `${clock}${times[hourf][i]} ${times[hours][i]} ${set[i]} ${times[minf][i]} ${times[mins][i]} <br>`;
  }
  clock += `<br>`
  for(i=0; i<5; i++) {
    clock = `${clock}${times[secf][i]} ${times[secs][i]} ${set1[i]} ${times[milf][i]} ${times[mils][i]} <br>`;
  }
  res = timeMsg + text + "\n 디지털시계 : <br>" + clock;
  return res;
}
