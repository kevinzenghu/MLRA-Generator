Handlebars.registerHelper("debugContext", function() {
  console.log(this);
});

if (Meteor.isClient) {
  Session.set("inputs", {});
  Template.button.events({
    'click div.button': function () {
      inputs = {};
      $('div.input').each(function(i, e) {
        inputs[i] = $(e).text();
      })
      Session.set("inputs", inputs)
      console.log(inputs)
      UI.render(Template.result)
    }
  });

  Template.result.inputs = function() { return Session.get("inputs") };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
