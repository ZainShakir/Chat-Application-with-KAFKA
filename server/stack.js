// Stack class 
class Stack {
    // Array is used to implement stack 
    constructor() {
        this.stack = [];
    }
    // push function 
    push(element) {
        // push element into the stack
        this.stack.push(element);
    }
    // pop function 
    pop() {
        // return top most element in the stack 
        // and removes it from the stack 
        // Underflow if stack is empty 
        if (this.stack.length == 0)
            return "Underflow";
        return this.stack.pop();
    }
    // length function 
    length() {
        // return stack legth
        return this.stack.length;
    }
    // isEmpty function 
    isEmpty() {
        // return true if stack is empty 
        return this.stack.length == 0;
    }
    // printStack function
    printStack() {
        var stringBuilder = "";
        for (var item = 0; item < this.stack.length; item++)
            stringBuilder += `${item}:` + this.stack[item] + '\n';
        return stringBuilder;
    }
}
module.exports = Stack;