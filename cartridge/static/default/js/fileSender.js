!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=3)}({3:function(e,n){$("#emailInput").on("change",(function(){var e,n,t,r;e=$(this),n=e.data(),t=e.prop("files"),(r=new FormData).append("file",t[0],t[0].name),r.append("upload_file",!0),console.log(r),$.ajax({type:"POST",url:n.url+"?data=something",xhr:function(){var n=$.ajaxSettings.xhr();return n.upload&&n.upload.addEventListener("progress",e.progressHandling,!1),n},success:function(e){console.log(e)},error:function(e){console.log(e)},async:!0,data:"formData",cache:!1,contentType:!1,processData:!1,timeout:6e4})})),console.log("working")}});