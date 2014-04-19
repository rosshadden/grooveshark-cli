#!/usr/bin/env node

function formatTime(time) {
    // convert miliseconds to seconds
    time = Math.round(time/1000);
    var sec_num = parseInt(time, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) hours = "0"+hours;
    if (minutes < 10) minutes = "0"+minutes;
    if (seconds < 10) seconds = "0"+seconds;
    if (hours > 0) time = hours+':'+minutes+':'+seconds;
    else time = minutes+':'+seconds;
    return time;
}

function is() {
  for (var i = 0, j = arguments.length; i < j; i++) {
    if (arguments[i] == this)
      return true;
  }
  return false;
};

exports.formatTime = formatTime;
exports.is = is;
