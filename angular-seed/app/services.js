angular.module('survey', [])
.service('surveyService', function($q, $http){

    this.shuffle = function (array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

this.update_options = function(question_number, old_value, page4, available_options, questions){
        for (var q in page4){
            if(question_number != page4[q].number){
                var index = available_options[page4[q].number].indexOf(questions[question_number-1]['ranking']);
                available_options[page4[q].number].splice(index,1);
                if (old_value){
                    available_options[page4[q].number].push(parseInt(old_value));
                    available_options[page4[q].number].sort(function(a,b){return a - b});
                }
            }
        }
        return available_options;
    };

    this.validate_and_capture = function(section, check_for, questions, post_to){

    var section_questions = [];
  for (var s in section){
    section_questions.push(questions[section[s].number-1]);

    if (!questions[section[s].number-1][check_for]){
        return [false, questions];
        }
    else{
        localStorage.setItem("question_"+ s.number, questions[section[s].number-1][check_for]);
        questions[section[s].number-1]['ls_'+check_for]=localStorage.getItem("question_"+ s.number);
    }
  }

  $http.post(post_to, {questions:questions, email:''})
  return [true, questions];

};

});
