

//:::::::::::To secure::::::::::::

(function(){
    function Question(question,answers,correct){
    this.question=question;
    this.answers=answers;
    this.correct=correct;
}

//:::::::question:::::::

Question.prototype.displayQuestion=function(){
    console.log(this.question);
    for(var i=0; i < this.answers.length; i++){
        console.log(i+': '+this.answers[i]);
    }
}

 //::::::checkAnswer:::::::::

Question.prototype.checkAnswer=function(ans,callback){
    var sc;
    if(ans===this.correct){
        console.log('Correct answer!');
        sc=callback(true);
    }
    else{
        console.log('Wrong Answer. Try again :');
        sc=callback(false);
    }
    this.displarScore(sc);
}

//:::::::::displayScore::::::::::::::

Question.prototype.displarScore=function(score){
    
    console.log('Your current score is:'+score);
    console.log('--------------------------');
}



//::::::::score function::::::::::::::

function score(){
    var sc=0;
    return function(correct){
        if(correct){
            sc++;
        }
        return sc;
    }
}
    
    var keepscore=score();

  //::::::questions:::::::::::::::

var q1= new Question('Is Javascript the coolest programming language in the world !', ['yes','no'],0);

var q2= new Question('What is the name of the course\'s teacher ?',['john','mikel','sumon'],2);
var q3= new Question('What does describes coding',['Boring','hard','fun','Tedious'],2);

  //::::::::::question array::::::::::

var questions=[q1,q2,q3];

///:::::::::::::::nextQuestion():::::::::::::::
    
function nextQuestion(){
    
    
//:::::::::Random num::::::::::

var n=Math.floor(Math.random()*questions.length);

questions[n].displayQuestion();

//::::::prompt::::::::::::::

var answer=prompt('Please select the correct answer.');
    if(answer!=='exit'){
        
       questions[n].checkAnswer(parseInt(answer),keepscore); 
        nextQuestion();
    }

}



nextQuestion();
})();

