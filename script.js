


$(function(){
  console.log("START content script");

  function addDatepicker() {
    console.log("[addDatepicker]")

    $("div.list-grid div.x-toolbar div.x-box-target")
      .each(function(index){
        $(this).append("<div class='x-box-item' style='right:auto; left:80px; top:2px;'><input id='chrome-ext-01-input-" + index + "' type='text' style='height:18px;' /></div>");

        $("input#chrome-ext-01-input-" + index).datepicker({
          dateFormat: "yy/mm/dd",
          onSelect: function(){
            var dateObj = $(this).datepicker("getDate");
            var value = $.datepicker.formatDate("yy/mm/dd", dateObj);
            chrome.runtime.sendMessage({
                text: value.slice(2)
            });
          }
        });

      });

  }


  $("ul.menu").append("<button id='chrome-ext-01-button01'>Yeah!</button>");
  $("#chrome-ext-01-button01").on("click", function(){
    addDatepicker();
  });

  console.log("END content script");
});

// http://dotnsf.blog.jp/archives/1058669933.html
// https://qiita.com/ororog/items/146b7cdac85a48690c1e
