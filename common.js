Date.prototype.getInfo = function(){
    const hour = this.getHours();
    const min = this.getMinutes();
    const sec = this.getSeconds();
    return {hour, min, sec};
}

String.prototype.zeroFormat = function(){
    let temp = "00" + this;
    return temp.slice(temp.length-2);
}

