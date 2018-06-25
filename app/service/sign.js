const Service = require('egg').Service;
const crypto = require('crypto');

class SignService extends Service {
  async getReqSign(params, appkey) {
    let obj = ksort(params);
    let str = '';
    for (let key in obj) {
      var value = urlencode1(obj[key]);
      if(obj[key] !== '') {
        str += `${key}=${value}&`
      }
    }
    str += `app_key=${appkey}`
    return md5(str).toUpperCase();
  }
  
}
function md5 (text) {
  return crypto.createHash('md5').update(text).digest('hex');
}
function ksort(inputArr, sort_flags) {  
  //  discuss at: http://phpjs.org/functions/ksort/  
  // original by: GeekFG (http://geekfg.blogspot.com)  
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)  
  // improved by: Brett Zamir (http://brett-zamir.me)  
  //        note: The examples are correct, this is a new way  
  //        note: This function deviates from PHP in returning a copy of the array instead  
  //        note: of acting by reference and returning true; this was necessary because  
  //        note: IE does not allow deleting and re-adding of properties without caching  
  //        note: of property position; you can set the ini of "phpjs.strictForIn" to true to  
  //        note: get the PHP behavior, but use this only if you are in an environment  
  //        note: such as Firefox extensions where for-in iteration order is fixed and true  
  //        note: property deletion is supported. Note that we intend to implement the PHP  
  //        note: behavior by default if IE ever does allow it; only gives shallow copy since  
  //        note: is by reference in PHP anyways  
  //        note: Since JS objects' keys are always strings, and (the  
  //        note: default) SORT_REGULAR flag distinguishes by key type,  
  //        note: if the content is a numeric string, we treat the  
  //        note: "original type" as numeric.  
  //  depends on: i18n_loc_get_default  
  //  depends on: strnatcmp  
  //   example 1: data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};  
  //   example 1: data = ksort(data);  
  //   example 1: $result = data  
  //   returns 1: {a: 'orange', b: 'banana', c: 'apple', d: 'lemon'}  
  //   example 2: ini_set('phpjs.strictForIn', true);  
  //   example 2: data = {2: 'van', 3: 'Zonneveld', 1: 'Kevin'};  
  //   example 2: ksort(data);  
  //   example 2: $result = data  
  //   returns 2: {1: 'Kevin', 2: 'van', 3: 'Zonneveld'}  
  
  var tmp_arr = {},  
    keys = [],  
    sorter, i, k, that = this,  
    strictForIn = false,  
    populateArr = {};  
  
  switch (sort_flags) {  
  case 'SORT_STRING':  
    // compare items as strings  
    sorter = function (a, b) {  
      return that.strnatcmp(a, b);  
    };  
    break;  
  case 'SORT_LOCALE_STRING':  
    // compare items as strings, original by the current locale (set with  i18n_loc_set_default() as of PHP6)  
    var loc = this.i18n_loc_get_default();  
    sorter = this.php_js.i18nLocales[loc].sorting;  
    break;  
  case 'SORT_NUMERIC':  
    // compare items numerically  
    sorter = function (a, b) {  
      return ((a + 0) - (b + 0));  
    };  
    break;  
    // case 'SORT_REGULAR': // compare items normally (don't change types)  
  default:  
    sorter = function (a, b) {  
      var aFloat = parseFloat(a),  
        bFloat = parseFloat(b),  
        aNumeric = aFloat + '' === a,  
        bNumeric = bFloat + '' === b;  
      if (aNumeric && bNumeric) {  
        return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;  
      } else if (aNumeric && !bNumeric) {  
        return 1;  
      } else if (!aNumeric && bNumeric) {  
        return -1;  
      }  
      return a > b ? 1 : a < b ? -1 : 0;  
    };  
    break;  
  }  
  
  // Make a list of key names  
  for (k in inputArr) {  
    if (inputArr.hasOwnProperty(k)) {  
      keys.push(k);  
    }  
  }  
  keys.sort(sorter);  
  
  // BEGIN REDUNDANT  
  this.php_js = this.php_js || {};  
  this.php_js.ini = this.php_js.ini || {};  
  // END REDUNDANT  
  strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js  
    .ini['phpjs.strictForIn'].local_value !== 'off';  
  populateArr = strictForIn ? inputArr : populateArr;  
  
  // Rebuild array with sorted key names  
  for (i = 0; i < keys.length; i++) {  
    k = keys[i];  
    tmp_arr[k] = inputArr[k];  
    if (strictForIn) {  
      delete inputArr[k];  
    }  
  }  
  for (i in tmp_arr) {  
    if (tmp_arr.hasOwnProperty(i)) {  
      populateArr[i] = tmp_arr[i];  
    }  
  }  
  
  return strictForIn || populateArr;  
}  
function urlencode1(clearString) 
{
	var output = '';
	var x = 0;
	
	clearString = utf16to8(clearString.toString());
	var regex = /(^[a-zA-Z0-9-_.]*)/;

	while (x < clearString.length) 
	{
		var match = regex.exec(clearString.substr(x));
		if (match != null && match.length > 1 && match[1] != '') 
		{
			output += match[1];
			x += match[1].length;
		} 
		else 
		{
			if (clearString[x] == ' ')
				output += '+';
			else 
			{
				var charCode = clearString.charCodeAt(x);
				var hexVal = charCode.toString(16);
				output += '%' + ( hexVal.length < 2 ? '0' : '' ) + hexVal.toUpperCase();
			}
			x++;
		}
	}

	function utf16to8(str) 
	{
		var out, i, len, c;

		out = "";
		len = str.length;
		for(i = 0; i < len; i++) 
		{
			c = str.charCodeAt(i);
			if ((c >= 0x0001) && (c <= 0x007F)) 
			{
				out += str.charAt(i);
			} 
			else if (c > 0x07FF) 
			{
				out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
				out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
				out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
			} 
			else 
			{
				out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
				out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
			}
		}
		return out;
	}

	return output;
}

module.exports = SignService;