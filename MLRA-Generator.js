if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to MLRA-Generator.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");

      Meteor.call('sendEmail',
            ['kzh@mit.edu', 'savannah@mit.edu'],
            'savannah@mit.edu',
            'MLRA email from ',
            'Test!');
    }
  });
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
