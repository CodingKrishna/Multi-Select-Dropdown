// Code goes here
var wrapupApp = angular.module('wrapupApp', []);
wrapupApp.controller('wrapupCtrl', function ($scope) {

  $scope.showPopover = false;
  $scope.selectedReasons = [];

  $scope.filter_categories_subcategories = '';
  $scope.categories = [
      {categoryId:1, name: "Male", subcategories: [{id:1,name: 'ravi'}, {id:2,name: 'rma'},{id:3,name: 'krishna'}]}, 
      {categoryId:2, name: "Female",subcategories: [{id:4,name: 'sita'}, {id:5,name: 'ramya'},{id:6,name: 'sri'}]},
      {categoryId:3, name: "Other",subcategories: [{id:7,name: 'other'}, {id:8,name: 'unknown'},{id:9,name: 'not-know'}]}
      ];

    $scope.displayCategory = function(category) {
      if (category.name.indexOf($scope.filter_categories_subcategories) !== -1) {
        // if we display a category, then force the display of its subcategories
        for(var i = 0; i < category.subcategories.length; i++) {
          category.subcategories[i].forceDisplay = true;
        }
        return true;
      }
      var hasOneDisplayedSubcategory = false;
      for(var i = 0; i < category.subcategories.length; i++) {
        // reset the forceDisplay variable before checking if categories should be displayed
        var subcategory = category.subcategories[i];
        subcategory.forceDisplay = false;
        if (!hasOneDisplayedSubcategory && $scope.displaySubcategory(subcategory)) {
          hasOneDisplayedSubcategory = true;
        }
      }
      return hasOneDisplayedSubcategory;
    };

    $scope.displaySubcategory = function(subcategory) {
      // if the forceDisplay variable is set, it means we're in a subcategory
      if (subcategory.forceDisplay) {
        return true;
      }
      if (subcategory.name.indexOf($scope.filter_categories_subcategories) !== -1) {
        return true;
      }
      return false;
    };


  $scope.toggleDropdown = function() {
        if ($scope.showPopover) {
            $scope.showPopover = false;
        } else { 
          $scope.showPopover = true; 
        }
    };
   
   $scope.selectedReason = function(subcategory){
      console.log(subcategory);
      
      var found = $scope.checkItSelectedModelContains(subcategory);

      if ($scope.selectedReasons.length >=5) { 
          return;
      };

      if(!found){
        $scope.selectedReasons.push(subcategory);
      }

   };

   $scope.removeTag = function(subcategory){
      var found = $scope.checkItSelectedModelContains(subcategory);
   };

   $scope.checkItSelectedModelContains = function(subcategory){
    var found = false;
      for(var i = 0; i < $scope.selectedReasons.length; i++) {
          if ($scope.selectedReasons[i].id == subcategory.id) {
              found = true;
              $scope.selectedReasons.splice(i,1);
              break;
          }
      }
      return found;
   };

   $scope.isSelectedItem = function(subcategory){
    var found = false;
      for(var i = 0; i < $scope.selectedReasons.length; i++) {
          if ($scope.selectedReasons[i].id == subcategory.id) {
              found = true;
              break;
          }
      }
      return found;
   } 



  
});


