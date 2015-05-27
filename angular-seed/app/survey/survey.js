angular.module('survey')
.controller('surveyController', function($scope, $rootScope, $location, $anchorScroll, $http, surveyService) {
$rootScope.showCarousel = false
$scope.validation = true;
$scope.survey_page = 1;
$scope.validate_capture = surveyService.validate_and_capture
$scope.update_options = surveyService.update_options

$scope.questions = [
    {
    'number': 1,
    'text': 'Indicate the years of experience (practicing/apprentice/training/incorporated) your ideal barber has.',
    'options':['0-5 years', '6-10 years', '10+ years']},
    {
    'number': 2,
    'text': 'What is the personality of your ideal barbershop?',
    'options':['Loud/fun', 'Family oriented', 'Trendy', 'Down to business']},
    {
    'number': 3,
    'text': 'Do you prefer an appointment?',
    'options':['Yes', 'No']},
    {
    'number': 4,
    'text': 'Is a complimentary hot towel and straight razor neck shave important to you?',
    'options':['Yes', 'No']},
    {
    'number': 5,
    'text': 'Is a beard trim service important? (Choose no if no beard)',
    'options':['Yes', 'No']},
    {
    'number': 6,
    'text': 'Specify your preferred haircut/style from the images below.',
    'options':[
    ['1729642-urban-grunge-portrait.jpg', 1],
    ['9377769-hair-styled-man.jpg', 2],
    ['15414914-african-man-portrait.jpg', 3],
    ['18623773-bespectacled-young-male-on-off-white-background.jpg', 4],
    ['29765448-portrait-of-a-young-man.jpg', 5],
    ['42365852-man-wearing-sunglasses-and-suit-dreadlocks.jpg', 6],
    ['49328610-cheerful-young-man-portrait.jpg', 7],
    ['55326536-sculptural-face-and-mohican-hairstyle.jpg', 8],
    ['58450262-turkish-thoughtful-young-man.jpg', 9],
    ['58954580-i-ve-got-a-reason-to-smile.jpg', 10]
    ]},
    {
    'number': 7,
    'text': 'Indicate your preference.',
    'options':['Male Barber', 'Female Barber']},
    {
    'number': 8,
    'text': 'Indicate your ideal price range for a haircut.',
    'options':['$12 and under', '$13-20', '$21+']},
    {'number': 9,
    'text': 'Indicate the proximity you are willing to travel.',
    'options':['Less than 5 miles', '6 to 15 miles', 'Over 15 miles']},
    {
    'number': 10,
    'text': 'Is the barbers advice on your cut/style significant?',
    'options':['Yes', 'No']},
    {
    'number': 11,
    'text': 'How many barbers operate at a time in your ideal barbershop?',
    'options':['2 or less', '3-4', '5+']},
    {
    'number': 12,
    'text': 'How often do you get your haircut?',
    'options':['Once a month or less', 'More than once a month']},
    {
    'number': 13,
    'text': 'Rank the questions from most important to least important.',
    'options':[1,2,3,4,5,6,7,8,9,10,11]}
    ];

    $scope.page1 = $scope.questions.slice(0,5);
    $scope.page2 = $scope.questions.slice(5,6);
    $scope.page3 = $scope.questions.slice(6,12);
    $scope.page4 = $scope.questions.slice(0,11);

$scope.haircuts = surveyService.shuffle($scope.questions[5]['options']);
$scope.haircuts_list = [$scope.haircuts.slice(0,3), $scope.haircuts.slice(3,6), $scope.haircuts.slice(6,9), [$scope.haircuts[9]]];

    $scope.available_options = {};

    for (var q in $scope.page4){
        $scope.available_options[$scope.page4[q].number] = $scope.questions[12]['options'].slice();
    }

    $scope.shops = [
    ['21268029-old-western-town.jpg'],
    ['6060043-hanging-sign.jpg'],
    ['55534146-barbershop-shack.jpg']
    ]

    $scope.shops = surveyService.shuffle($scope.shops);

    $scope.shop_select = function(selected_shop){
    $scope.selected_shop = selected_shop;
    $scope.survey_page=6;
    $http.post('/selected_shop',{selected_shop:selected_shop, email:''})

    $scope.scrollTop();
    }

    $scope.scrollTop = function() {
    $location.hash('top');
    //console.log($location.hash());
    $anchorScroll();
  };
  $scope.scrollTop();

  $scope.navigate = function(){
  $scope.validation = $scope.result
  if ($scope.validation){$scope.survey_page += 1}
  if ($scope.survey_page == 5){
  $scope.loading = true;
  surveyService.find_matches($scope.questions, '').then(function(shop_matches){

  $scope.shops[0].push(shop_matches[0]);
  $scope.shops[1].push(shop_matches[1]);
  $scope.shops[2].push(shop_matches[2]);

  console.log($scope.shops)
  });

  }

  $scope.scrollTop();
  }
});