Movies = new Meteor.Collection("movies");

Meteor.methods({
  vote: function(movieId) {
    var movie = Movies.findOne(movieId);
    Movies.update({ _id : movieId },{$set: {votes: movie.votes + 1}});
  }
});

if (Meteor.isClient) {
    Template.header.greeting = function () {
    return "Welcome to geekmovies.";
    }
      
    Template.moviesList.movies = function() {
    return Movies.find({}, {sort: {votes:-1}});
    }
    
    Template.moviesList.events({
    "click input": function() {
    console.log("You pressed the button for element " + this._id);
	  Meteor.call("vote", this._id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
