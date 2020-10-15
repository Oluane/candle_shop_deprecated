import {convertCamelToSnake, convertSnakeToCamel} from "../stringUtils";

test("convert a snake case string to camel case", ()=>{
    expect(convertSnakeToCamel("hello_world")).toEqual("helloWorld");
    expect(convertSnakeToCamel(" ")).toEqual(" ");
    expect(convertSnakeToCamel("helloWorld")).toEqual("helloWorld");
}); 

test("convert a camel case string to snake case", ()=>{
    expect(convertCamelToSnake("HelloWorld")).toEqual("hello_world");
    expect(convertCamelToSnake(" ")).toEqual(" ");
    expect(convertCamelToSnake("helloWorld2")).toEqual("hello_world2");

})
