crow.controller('TweetController', ['$http', 'AuthFactory', 'DraftFactory', '$location', function($http, AuthFactory, DraftFactory, $location){
  if(verbose){console.log( 'TweetController is running' )};
  var self = this;
  self.authFactory = AuthFactory;
  self.draftFactory = DraftFactory;

  self.postTweet = function(){
    if(verbose){console.log( 'entered post tweet function' )};

    if(self.draftFactory.text.length > 140){
      alert("Hold your horses bucko.\nThat's more than 140 characters!");
    } else {
      var youSure = confirm('Take one more look and make sure you want to tweet this:\n\n"' + self.draftFactory.text + '"');

      if (youSure === true){
        $http.post('/twitter/postTweet/' + self.draftFactory.text, self.authFactory)
          .then(function(){
            deleteDraft();
          });
      }
    }
  };

  self.saveDraft = function(){
    if(verbose){console.log( 'entered save draft function' )};

    if(self.draftFactory.text.length === 0){
      deleteDraft();
    } else {
      $http.post('/db/draft/saveDraft/' + self.draftFactory.text, self.draftFactory)
        .then(function(){
          $location.path('/drafts');
        });
    }
  };

  self.deleteDraft = function(){
    if(verbose){console.log( 'entered delete draft function' )};
    var youSure = confirm('Are you sure you want to delete this draft?');
    
    if (youSure === true){
      deleteDraft();
    }
  }

  function deleteDraft(){
    $http({
      method: 'DELETE',
      url: '/db/draft/deleteDraft/' + self.draftFactory._id,
      headers: {
        uid: self.authFactory.uid
      }
    })
      .then(function(){
        $location.path('/drafts');
      });
  }

}]);

/*
-- useful variables from twitter:

res.data.created_at: date posted string
res.data.id_str: tweet id string
res.data.retweet_count: number
res.data.favorite_count: number

*/