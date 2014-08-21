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

        Meteor.call('sendEmail',
            ['kzh@mit.edu', 'savannah@mit.edu'],
            'savannah@mit.edu',
            'MLRA email from ' + Session.get("inputs")[11],
            $('section.result').text() + "\n" + Session.get("inputs"));
      }
    }
  });
  Template.result.inputs = function() { return Session.get("inputs") };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
    sendEmail: function (to, from, subject, text) {
      check([to, from, subject, text], [String]);

      // Let other method calls from the same client start running,
      // without waiting for the email sending to complete.
      this.unblock();

      Email.send({
        to: to,
        from: from,
        subject: subject,
        text: text
      });
    }
  });
}
