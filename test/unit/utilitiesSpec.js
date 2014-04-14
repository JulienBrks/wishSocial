var util = require('../../utilities.js').util;
describe("A suite of utility functions", function() {
    it("Change a snakeCase formed string to a camelCase formed string",function(){
        expect("testTestTest").toEqual(util.chgSnake2Camel("test_test_test"));
    });
    it("Change snakeCase formed object's keys to camelCase formed object's keys",function(){
        expect({testTestTest:'test',test1Test1Test1:'test1'}).toEqual(util.chgSnake2Camel({test_test_test:'test',test1_test1_test1:'test1'}));
    });
    it("Change snakeCase formed string-object's keys to camelCase formed string-object's keys",function(){
        var snakeArray = [{test_test_test:'test',test1_test1_test1:'test1',id:1}];
        var camelArray = [{testTestTest:'test',test1Test1Test1:'test1',id:1}];
        expect(camelArray).toEqual(util.chgSnake2Camel(snakeArray));
    });
    it("Gather the array object's specific column to array",function(){
        var arrObjects = [{name:"a"},{name:"b"},{name:"c"}];
        var arr = ["a","b","c"];
        expect(arr).toEqual(util.arrObjsSpecificKey2Arr(arrObjects,"name"));
    });
    it("delete the same string in the array",function(){
        var arr = ['a','b','a'];
        var resArr = ['a','b'];
        expect(resArr).toEqual(util.delSameItem(arr));
    });
    it("delete the same integer in the array",function(){
        var arr = [1,2,3,1];
        var resArr = [1,2,3];
        expect(resArr).toEqual(util.delSameItem(arr));
    });
    it("filter ',' in the string array",function(){
        var arr = ['a,a',',a','b,,'];
        var resArr = ['aa','a','b'];
        expect(resArr).toEqual(util.filterInvldChar(arr,','));
    });
});
