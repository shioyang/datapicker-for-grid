
$(function(){
  console.log("START content script")

  function addDatepicker() {
    console.log("[addDatepicker]")

    $("div.list-grid div.x-toolbar div.x-box-target")
      .each(function(index){
        $(this).append(
          "<div class='x-box-item datepicker-for-grid datepicker-area'>" +
            "<img src='" + chrome.extension.getURL('resource/icon_x128.png') + "' alt='datepicker' width='16px' height='16px' />" +
            "<div>" +
              "<input id='datepicker-for-grid-input-" + index + "' type='text' disabled />" +
            "</div>" +
          "</div>"
        )

        $(this).find("div.datepicker-for-grid.datepicker-area img")
          .on("click", function() {
            $(this).parent().find("input").datepicker("show")
          })

        $("input#datepicker-for-grid-input-" + index).datepicker({
          dateFormat: "yy/mm/dd",
          onSelect: function(){
            var dateObj = $(this).datepicker("getDate")
            var value = $.datepicker.formatDate("yy/mm/dd", dateObj)
            // Copy it to clipboard
            chrome.runtime.sendMessage({
                text: value.slice(2)
            })
            // Set it to innerHTML of the input tab.
            $(this).val(value.slice(2))
          }
        })

      })

  }


  $("body")
    .append("<button id='datepicker-for-grid-button01' class='datepicker-for-grid trigger-button'>Date Picker</button>")

  $("#datepicker-for-grid-button01").on("click", function(){
    addDatepicker()
  })

  console.log("END content script")
})

// http://dotnsf.blog.jp/archives/1058669933.html
// https://qiita.com/ororog/items/146b7cdac85a48690c1e

