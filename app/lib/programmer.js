import Ember from 'ember';

var Programmer = Ember.Object.extend({
    firstName: null,
    lastName: null,
    nickName: "",
    age: null,
    authorOf: "",
    conferences: [],
    email: "",
    greet: function(){
      return `Hi, My name is ${this.get("firstName")} ${this.get("lastName")}. You can call me ${this.get("nickName")}`;
    },
    fullName: Ember.computed("firstName", "lastName", function(){
      return `${this.get("firstName")} ${this.get("lastName")}`;
    }),
    isOld: Ember.computed.gte('age', 30),
    wroteRuby: Ember.computed.equal("authorOf", "Ruby"),
    addConference: function(conference){
      this.get("conferences").pushObject(conference);
    },
    conferenceTotal: Ember.computed.alias("conferences.length"),
    conferenceNames: Ember.computed.mapBy('conferences', 'name'),
    keyNoteConferences: Ember.computed("conferences.@each.keyNote", function(){
      return this.get("conferences").filterBy("keyNote", this.get("fullName"));
    }),
    itinerary: Ember.computed('nickName', 'conferenceTotal', function(){
      return `${this.get('nickName')} is speaking at ${this.get('conferenceTotal')} conferences`;
    }),
    hasValidEmail: Ember.computed('email', function(){
      let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      return re.test(this.get("email"));
    }),
    hasFirstName: Ember.computed.notEmpty("firstName"),
    hasLastName: Ember.computed.notEmpty("lastName"),
    hasAge: Ember.computed.notEmpty("age"),
    isValid: Ember.computed.and("hasAge", "hasLastName", "hasFirstName", "hasValidEmail"),
    isInvalid: Ember.computed.not("isValid"),
    hasErrors: Ember.computed.notEmpty("errors"),
    errors: Ember.computed("hasAge", "hasLastName", "hasFirstName", "hasValidEmail", function(){
      let errors = [];
      if (!this.get("hasValidEmail")) {
        errors.pushObject("email must be valid");
      }
      if (!this.get("hasFirstName")) {
        errors.pushObject("firstName cannot be blank");
      }
      if (!this.get("hasLastName")) {
        errors.pushObject("lastName cannot be blank");
      }
      if (!this.get("hasAge")) {
        errors.pushObject("age cannot be blank");
      }
      return errors;
    })
});

export default Programmer;
