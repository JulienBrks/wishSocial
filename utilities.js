var util = {
  /**
   *Change snakeCase to camelCase
   *@param snakeCase formed snakeCases (array|string|object)
   *@return camelCase formed snakeCases (array|string|object) 
   */  
  chgSnake2Camel: function(snakeCases){
    if (snakeCases.constructor == String) {
      return snakeCases.replace(/(_[a-zA-Z])/g,function(m,p1){
        return p1.substring(1).toUpperCase();
      });
    } else if(typeof snakeCases == 'object'&&snakeCases.constructor != Array) {
      for(var snakeCaseKey in snakeCases) {
        var camelCaseKey = snakeCaseKey.replace(/(_[a-zA-Z])/g,function(m,p1){
          return p1.substring(1).toUpperCase();
        });
        snakeCases[camelCaseKey] = snakeCases[snakeCaseKey];
        if (camelCaseKey !== snakeCaseKey) {
          delete snakeCases[snakeCaseKey];        
        };
      }
      return snakeCases;
    } else if(snakeCases.constructor == Array){
      for(var sc in snakeCases) {
        snakeCases[sc] = arguments.callee(snakeCases[sc]);
      }
      return snakeCases;
    }
  },
  /**
   *Gather the array object's specific key to array 
   */
  arrObjsSpecificKey2Arr: function(arrObjs,key){
    var arr = [];
    arrObjs.map(function(item){
      arr.push(item[key]);
    });
    return arr;
  },
  trim: function(string){
    return string.replace(/(^\s*)|(\s*$)/g, "");
  },
  //delete the same item in the array
  delSameItem: function(arr){
    var r = [];
    label:for(var i = 0, n = arr.length; i < n; i++) {
        for(var x = 0, y = r.length; x < y; x++) {
            if(r[x] == arr[i]) {
                continue label;
            }
        }
        r[r.length] = arr[i];
    }
    return r;
  },
  //filter invalid char of the string in the array
  filterInvldChar: function (arr,char) {
    var re = new RegExp(char,"g");
    for (var i = arr.length - 1; i >= 0; i--) {
      arr[i] = arr[i].replace(re,"");
    };
    return arr;
  }
};
module.exports.util = util;