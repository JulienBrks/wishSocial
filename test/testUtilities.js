describe("A suite of utility functions", function() {
    it("Change a snakeCase formed string to a camelCase formed string",function(){
        expect("testTestTest").toEqual(chgSnake2Camel("test_test_test"));
    });
    it("Change snakeCase formed object's keys to camelCase formed object's keys",function(){
        expect({testTestTest:'test',test1Test1Test1:'test1'}).toEqual(chgSnake2Camel({test_test_test:'test',test1_test1_test1:'test1'}));
    });
    it("Change snakeCase formed string-object's keys to camelCase formed string-object's keys",function(){
        var snakeArray = [{test_test_test:'test',test1_test1_test1:'test1',id:1}];
        var camelArray = [{testTestTest:'test',test1Test1Test1:'test1',id:1}];
        expect(camelArray).toEqual(chgSnake2Camel(snakeArray));
    });

});