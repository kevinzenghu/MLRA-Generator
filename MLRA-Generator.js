Handlebars.registerHelper("debugContext", function() {
  console.log(this);
});

if (Meteor.isClient) {
  Session.set("inputs", {});
  Template.button.events({
    'click div.button': function () {
      var inputs = {};
      var completed = true;
      $('div.input').each(function(i, e) {
        var text = $(e).text();
        if (text == '') {
          $(e).addClass('req');
          completed = false;
        } else {
          $(e).removeClass('req');
          inputs[i] = text;                    
        }
      })
      if (completed) {
        Session.set("inputs", inputs)
        $('section.result').removeClass('hidden');
        UI.render(Template.result)
        $('section.result').removeClass('hidden');
        Madlibs.insert({"full": $('section.result').text(), "entries": Session.get("inputs")});
      }
    }
  });
  Template.result.inputs = function() { return Session.get("inputs") };
}

if (Meteor.isServer) {
  
}
