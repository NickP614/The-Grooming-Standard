angular.module('vendor', [])
.controller('vendorController', function($scope, $rootScope, $location, $anchorScroll, $http, $routeParams, surveyService, vendorService) {
$rootScope.showCarousel = false
$scope.validation = true;
$scope.vendor_page = 0;
$scope.become_vendor = 1;
$scope.validate_capture = surveyService.validate_and_capture
$scope.update_options = surveyService.update_options

$scope.vendor_email_funct = function(){
vendorService.vendor_email($scope.vendor_email_id).then(function(data){

        $scope.vendor_page = data[0];
        $scope.validation = data[1];
        if (data[2]){$scope.shop_info = data[2]}

    });
}

$scope.vendor_email_id = $routeParams.email

$scope.go_to_vendor = function(){
$location.path('/vendor');
}

$scope.questions = [
    {
    'number': 1,
    'text': 'Indicate the average years of experience of barbers at this shop.',
    'options':['0-5 years', '6-10 years', '10+ years']},
    {
    'number': 2,
    'text': 'Highlight the personality of this shop from below.',
    'options':['Loud/fun', 'Family oriented', 'Trendy', 'Down to business']},
    {
    'number': 3,
    'text': 'Are appointments required ath this shop?',
    'options':['Yes', 'No']},
    {
    'number': 4,
    'text': 'Are complimentary hot towel or straight razor neck shave offered?',
    'options':['Yes', 'No']},
    {
    'number': 5,
    'text': 'Are beard trimming services offered?',
    'options':['Yes', 'No']},
    {
    'number': 6,
    'text': 'Choose the top 3 haircuts your shop performs from the images below.',
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
    ],
    'answer':{}},
    {
    'number': 7,
    'text': 'Identify your shop.',
    'options':['Male Barbers', 'Female Barbers', 'Both']},
    {
    'number': 8,
    'text': 'How much is the standard haircut at your shop?',
    'options':['$12 and under', '$13-20', '$21+']},
    {'number': 9,
    'text': 'Indicate the proximity you are willing to travel.',
    'options':['Less than 5 miles', '6 to 15 miles', 'Over 15 miles'],
    'answer':1},
    {
    'number': 10,
    'text': 'Is the barbers advice on your cut/style significant?',
    'options':['Yes', 'No']},
    {
    'number': 11,
    'text': 'How many barbers consistently operate at a given time?',
    'options':['2 or less', '3-4', '5+']}
    ];

    $scope.page1 = $scope.questions.slice(0,5);
    $scope.page2 = $scope.questions.slice(5,6);
    $scope.page3 = $scope.questions.slice(6,11);
    $scope.page3.splice(2, 1);
    $scope.page4 = $scope.questions.slice(0,11);

$scope.haircuts = surveyService.shuffle($scope.questions[5]['options']);
$scope.haircuts_list = [$scope.haircuts.slice(0,3), $scope.haircuts.slice(3,6), $scope.haircuts.slice(6,9), [$scope.haircuts[9]]];


    $scope.scrollTop = function() {
    $location.hash('top');
    //console.log($location.hash());
    $anchorScroll();
  };
  $scope.scrollTop();

  $scope.navigate = function(page){
  $scope.validation = $scope.result

  var count = 0;
var i;

for (i in $scope.questions[5]['answer']) {
    if ($scope.questions[5]['answer'][i] == true) {
        count++;
    }
}
console.log(count);
  if ($scope.vendor_page == 2 && page == 'admin' && count != 3){$scope.validation = false;}

  if ($scope.validation && page == 'admin'){
  $scope.vendor_page += 1
  return
  }
  else if ($scope.validation && page == 'vendor'){$scope.become_vendor += 1}
  $scope.scrollTop();
  }

  $scope.vendor_info = [['Barbershop Name'], ['Address'], ['Phone'], ['Contact Name'], ['Email'], ['Website']];
  $scope.submit_vendor_info = vendorService.submit_vendor_info

  $scope.return_home=function(){
    $location.path('/home')
    }

});