import Controller, { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';
import { storageFor } from 'ember-local-storage';

export default Controller.extend({
    answers: storageFor('answers'),

    answerValue: computed('model.id', {
      get() {
        return this.get(`answers.${this.model.id}`);
      },

      set(oldValue, newValue) {
        this.set(`answers.${this.model.id}`, newValue);
        return newValue;
      }
    }),

    application: controller(),

    allQuestions: computed('application.model.[]', function() {
        return this.application.model.toArray();
    }),

    questionNumber: computed('model', 'allQuestions.[]', function() {
      return this.allQuestions.indexOf(this.model) + 1;
    }),

    prevQuestion: computed('model', 'allQuestions.[]', function (){
      let index = this.allQuestions.indexOf(this.model);
      
      if (index === 0) {
        return null;
      } else {
        return this.allQuestions[index - 1];
      }
    }), 

    nextQuestion: computed('model', 'allQuestions.[]', function (){
      let index = this.allQuestions.indexOf(this.model);
      
      if (index >= this.allQuestions.length) {
        return null;
      } else {
        return this.allQuestions[index + 1];
      }
    }), 
});
