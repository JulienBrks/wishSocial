/**
 *Change snakeCase to camelCase
 *@param snakeCase formed snakeCases (array|string|object)
 *@return camelCase formed snakeCases (array|string|object) 
 */
function chgSnake2Camel(snakeCases){
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
      snakeCases[sc] = chgSnake2Camel(snakeCases[sc]);
    }
    return snakeCases;
  }
}
exports.chgSnake2Camel = chgSnake2Camel;