

///::::::::object.create:::::::::


var junction={
    calculate:function(){
        console.log(2018-this.yearOfBirth);
    }
};


var jane=Object.create(junction);

jane.name='Mehedi';
jane.job='Teacher';

var john=Object.create(junction,{
    name:{value:'sumon'},
    job:{value:'Doctor'}
});


var age=20;
var js = {
    city:'Dhaka',
    name:'john',
};


function change(a,b){
    a=30;
    b.city='chittagong';
}
change(age,js);
console.log(age);
console.log(js.city);


//passing function

var years=[1990,1997,2010,2005];

function arrcal(arr,fn){
    var resarr=[];
    for(var i=0;i<arr.length;i++){
        resarr.push(fn(arr[i]));
    }
    return resarr;
}
function calculAge(el){
    return 2018-el;
}

var ages=arrcal(years,calculAge);

console.log(ages);


////returning function:::::::

function interviewQuestion(job){
    if(job=='teacher'){
        return function(name){
            console.log('my teacher name is:'+name);
        }
    }
    else if(job=='doctor'){
        return function(name){
            console.log('My doctor name is:'+name);
        }
    }
    else if(job=='designer'){
        return function(name){
            console.log('Can you help you? please...'+name);
        }
    }
    else{
        return function(name){
            console.log(name+'What do you?');
        }
    }
}


var teacherQuestion=interviewQuestion('designer');
teacherQuestion('jony');

var doctorQuestion=interviewQuestion('doctor') ('sumon');


///invoke function

(function(){
    var score=Math.random()*10;
    console.log(score>=5);
})();

(function(goodluck){
    var score=Math.random()*10;
    console.log(score>=5-goodluck);
})(5);

///call method write method on different object:::::


var g={
    
    name:'sumon',
    age:20,
    display:function(){
    console.log('name is: '+this.name+' age is: '+ this.age);
}
    
};

//apply method and call method and bind method::::

var jk=['karim','hasan','rahim'];

function display3(a,b,c){
    console.log('age: '+this.age+' '+a+' '+b+' '+c);
}

display3.apply(g,jk);

var k={
    name:'karim',
    age:40
};
function display(){
    console.log('hello '+this.name);
}
var bound=display.bind(k);////bind method return function()
bound();

//call method
g.display.call(k);

