var memberCountConTxt= 296842;
  
$({ val : 0 }).animate({ val : memberCountConTxt }, {
 duration: 2000,
step: function() {
  var num = numberWithCommas(Math.floor(this.val));
  $(".memberCountCon").text(num);
},
complete: function() {
  var num = numberWithCommas(Math.floor(this.val));
  $(".memberCountCon").text(num);
}
});

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(function() {
    var count0 = count1 = count2 = 0;
  
    timeCounter();
  
    function timeCounter() {
  
      id0 = setInterval(count0Fn, 12.738853);
  
      function count0Fn() {
        count0++;
        if (count0 > 785) {
          clearInterval(id0);
        } else {
          $(".number").eq(0).text(count0);
        }
  
      }
  
      id1 = setInterval(count1Fn, 10.13171226);
  
      function count1Fn() {
        count1++;
        if (count1 > 987) {
          clearInterval(id1);
        } else {
          $(".number").eq(1).text(count1);
        }
      }
  
      id2 = setInterval(count2Fn, 28.57142857);
  
      function count2Fn() {
        count2++;
        if (count2 > 350) {
          clearInterval(id2);
        } else {
          $(".number").eq(2).text(count2);
        }
      }
    }
  });