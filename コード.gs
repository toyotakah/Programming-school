function shiftReminder() {
  // LINEで自動通知する内容。
  
  var now = new Date();
  var nextDate = new Date(now.getYear(), now.getMonth(), now.getDate()+1);
  var sheet = SpreadsheetApp.getActiveSheet();
  var cols = sheet.getLastColumn();
  var rg = sheet.getDataRange();
  var content = "\n\n今週のシフトが確定しました\n\n";
      content += "皆さん、確認をよろしくお願いします！\n";
  for(var i=2; i<=cols; i+=3){
    var col_date = rg.getCell(1, i).getValue();
    var shift_day = Utilities.formatDate(col_date, "JST", "yyyy/MM/dd");
    if(col_date.getFullYear() === nextDate.getFullYear() && col_date.getMonth() === nextDate.getMonth() && col_date.getDate() === nextDate.getDate()){
        for(var k=0; k<=2; k++){
          switch(k){
            case 0:
              content += "\n【ロボット】\n";
              break;
            case 1:
              content += "\n【PG午前】\n";
              break;
            case 2:
              content += "\n【PG午後】\n";
              break;
          }
          for(var j=3; j<=11; j++){
          var gp = rg.getCell(j, i+k).getValue();
          if(gp === "◎"){
            var member = rg.getCell(j, 1).getValue();
            content += member;
            content += "\n";
          }else{
          }
        }
      }
    }
  }
  sendHttpPost_shiftReminder(content);
}
 
// LINE Notifyを利用するための関数
function sendHttpPost_shiftReminder(content){
  var token = ['T5SHrOZ6PrOE0FlF2sFgX4xS6KImXOmhjlhBLwbUMBv']; //LINEで自動通知をする宛先のトークン。
  var options =
   {
     "method"  : "post",
     "payload" : {"message": content,
                  }, 
     "headers" : {"Authorization" : "Bearer "+ token}
 
   };
 
   UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}
