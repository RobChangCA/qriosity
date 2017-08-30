var quiz = {}
//Category ajax call
quiz.category = function(category){
	$.ajax({
		url: `https://opentdb.com/api_category.php`,
		method: "GET",
		dataType: "json"
	}).then(function(res){
		let categoryNames = res.trivia_categories;
		categoryNames.forEach(function(categoryName){
			// quiz.injectCategory(categoryName);
			$('.categories').append($('<option>').text(categoryName.name).val(categoryName.id));
			// console.log(categoryName);
		});
	});
}

quiz.questionNumber = function(){
	$('.categories').on('change', function(){
		var catId = $('.categories').val();
		$.ajax({
			url: `https://opentdb.com/api_count.php?category=${catId}`,
			method:'GET',
			dataType:'json'
		}).then(function(res){
			if ($('.difficulty').val() == 1){
				console.log(res.category_question_count.total_easy_question_count);
				if (res.category_question_count.total_easy_question_count >50){
					$('.numberOfQuestions').attr({"max" : 50});
				} else{
					$('.numberOfQuestions').attr({"max" : res.category_question_count.total_easy_question_count});
				}
			}else if($('.difficulty').val() == 2){
				console.log(res.category_question_count.total_medium_question_count);
				if (res.category_question_count.total_medium_question_count >50){
					$('.numberOfQuestions').attr({"max" : 50});
				} else{
				$('.numberOfQuestions').attr({"max" : res.category_question_count.total_medium_question_count});
				}
			}else if($('.difficulty').val() == 3){
				console.log(res.category_question_count.total_hard_question_count);
				if (res.category_question_count.total_hard_question_count >50){
					$('.numberOfQuestions').attr({"max" : 50});
				} else{
				$('.numberOfQuestions').attr({"max" : res.category_question_count.total_hard_question_count});
				}
			}
		});
	});
};
quiz.get = function(){
	$('.startQuiz').on('click', function(e){
		e.preventDefault();
		let category = $('.categories').val();
		let difficulty = "";
		let numberOfQuestions = $('.numberOfQuestions').val();

		if($('.difficulty').val() == 1){
			difficulty = "easy";
		}else if($('.difficulty').val() == 2){
			difficulty = 'medium';
		}else if($('.difficulty').val() == 3){
			difficulty = "hard";
		}
		console.log(`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`);
		$.ajax({
			url: `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`,
			method: "GET",
			dataType: "json"
		}).then(function(res){
			console.log(res);
			});
		});
}





//Init and document ready
quiz.init = function(){
	quiz.category();
	quiz.questionNumber();
	quiz.get();
}
$(function(){
	quiz.init();
});

