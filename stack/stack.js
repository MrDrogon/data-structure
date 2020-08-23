function Stack(){
    //存贮数据(this.items 会暴露)
    var items = [];
    //从栈顶添加元素，压栈
    this.push = function(item){
        items.push(item);
    }
    //弹出栈顶元素
    this.pop = function(){
        return items.pop();
    }
    //返回栈顶元素
    this.top = function(){
        return items[items.length - 1];
    }
    //判断栈是否为空
    this.isEmpty = function(){
        return items.length === 0;
    }
    //返回栈的大小
    this.size = function(){
        return items.length;
    }
    //清空栈
    this.clear = function(){
        items = [];
    }
}
//中缀转后缀表达式
var priority_map = {
    "+":1,
    "-":1,
    "*":2,
    "/":2
}
function infix_exp_2_postfix_exp(exp){
    let stack = new Stack();
    let postfix_list = [];
    for(let i = 0; i < exp.length; i++){
        let item = exp[i];
        //如果是数字，直接放入到post_list中
        if(!isNaN(item)){
            postfix_list.push(item);
        }else if(item === "("){
            //遇到左括号入栈
            stack.push(item);
        }else if(item === ")"){
            //遇到右括号，把栈顶元素弹出，直接遇到左括号
            while(stack.top() !== "("){
                postfix_list.push(stack.pop());
            }
            //去除 "（"
            stack.pop();
        }else{
            //遇到运算符号，把栈顶的运算符号弹出，直到栈顶的运算符号优先级小于当前运算符
            while(!stack.isEmpty() && ["+", "-", "*", "/"].indexOf(stack.top()) >= 0 && 
                priority_map[stack.top()] && 
                priority_map[stack.top()] >= priority_map[item] ){
                //把弹出的运算符添加到postfix_list
                postfix_list.push(stack.pop());
            }            
            //当前运算符入栈
            stack.push(item);
        }
    }
    //for循环结束后，stack中可能有元素
    while(!stack.isEmpty()){
        postfix_list.push(stack.pop());
    }
    return postfix_list;
}
console.log(infix_exp_2_postfix_exp( ["12","+", "3"]));
console.log(infix_exp_2_postfix_exp( ["12","+", "3", "*", "5"]));
console.log(infix_exp_2_postfix_exp( ["12","*", "3", "+", "5"]));
console.log(infix_exp_2_postfix_exp( ["(", 1 , "+", "(", 4, "+",
 5, "+", 3, ")", "-", 3, ")", "+", "(", 9, "+", 8, ")"]));
console.log(infix_exp_2_postfix_exp( ["(", 1 , "+", "(", 4, "+",
 5, "+", 3, ")", "/", 4, "-", 3 , ")", "+", "(", 6, "+", 8, ")" , "*", 3]));

//计算后缀表达式
function calc_exp(exp){
    var stack = new Stack();
    for(var i = 0; i < exp.length; i++){
        let item = exp[i];
        if(["+", "-", "*", "/"].indexOf(item) > -1){
            let value1 = stack.pop();
            let value2 = stack.pop();
            let exp_str = value2 + item + value1;
            console.log(exp_str)
            let res = parseInt(eval(exp_str));
            stack.push(res.toString());
        }else{
            stack.push(item);
        }
    }
    return stack.top();
}
console.log(calc_exp(["4", "13", "5", "/", "+"]))
//判断字符串里的括号是否合法
function is_leagl_bracks(string){
    var stack = new Stack();
    for(var i = 0; i < string.length; i++){
        let item = string[i];
        if(item === "("){
            stack.push(item);
        }else if(item === ")"){
            if(stack.isEmpty()){
                return false;
            }else{
                stack.pop();
            }
        }
    }
    return stack.isEmpty();
}
console.log(is_leagl_bracks("s(d(sadf)a()sdf(sd))"))
console.log(is_leagl_bracks("s(d(sadf)a()s)df(sd))"))
console.log(is_leagl_bracks(")(s(d(sadf)a()s)df(sd))"))


