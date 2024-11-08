// ==UserScript==
// @name         動態系統外掛
// @namespace    http://tampermonkey.net/
// @version      0.8
// @description  動態系統外掛
// @author       Tsai,Tsunghan
// @match        https://web.taiwanbus.tw/eBUS/
// @icon         https://www.google.com/s2/favicons?domain=taiwanbus.tw

// @require https://cdn.jsdelivr.net/npm/jquery@latest/dist/jquery.min.js

// ==/UserScript==
console.log("外掛啟動中...");
(function () {
    'use strict';
    //unsafeWindow.SYS_IDLE_COUNT = -864000*31*12;
    unsafeWindow.SYS_IDLE_COUNT--  ;
    unsafeWindow.SYS_MAX_TIME = 864000*31*12*50;

    unsafeWindow.INTERVAL_CHECK_LOGIN = 864000*31*12*50;

    $( document ).ready(function() {
        unsafeWindow.GLOBAL._maxTime = 864000;
        let btn2 = '<input type="button" style="font-size:1.2em;background-color:red;color:white;" id="uneditDisable" value="解除編輯停用"></input>';
        //$('.ui-tabs-nav').append(btn2);
        $('#banner').append(btn2);

        $('body').on('click', '#uneditDisable', function () {
            let frames1 =  window.frames[1].document;

            $("#form1 #gv_schedule",frames1).find("tr").each( function(index, tr) {
                $(tr).find('td input').each (function (index, td) {
                    if (td.value == '編輯') {
                        td.disabled = "";
                    };
                });
            });
        });
    });

    function wait(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                //console.log( $('#span_datetime').html() );
                resolve(ms)
            }, ms)
        })
    }

    (async () => {
        while (1) {
            console.log("SYS_IDLE_COUNT =  " + unsafeWindow.SYS_IDLE_COUNT );
            console.log("SYS_MAX_TIME =  " + unsafeWindow.SYS_MAX_TIME );
            console.log("INTERVAL_CHECK_LOGIN =  " + unsafeWindow.INTERVAL_CHECK_LOGIN );
            console.log("-----------");
            //console.log(unsafeWindow);
            //unsafeWindow.SYS_IDLE_COUNT = 0;
            //unsafeWindow.GLOBAL._maxTime = -1;
            //console.log(unsafeWindow.GLOBAL._maxTime );
            await wait(5000);
        }
    })();

})();
