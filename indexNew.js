// documentation can be found on:
// https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs#confirm-intent-directive
// https://github.com/alexa/skill-sample-nodejs-fact/blob/en-US/lambda/custom/index.js

const Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.e915ff40-2010-476f-a846-7ad7e540795c';
const APP_NAME = 'Crypto Finder';

const STOP_MESSAGE = 'Happy to help, till next time!';

const defaultHandlers = {
  LaunchRequest: function() {
    // pass intent to other intent
    this.emit('LaunchIntent');
  },
  LaunchIntent: function() {
    const cardTitle = 'Welcome';
    const speechOutput = `Welcome to ${APP_NAME}, how can I help you today?
    I can check your portfolio balance, the price of coins, etc`;
    const imageObj = undefined;

    // emit response directly
    this.emit(':tellWithCard', speechOutput, cardTitle, speechOutput, imageObj);
  },
  'AMAZON.HelpIntent': function() {
    this.emit('LaunchIntent');
  },
  'AMAZON.CancelIntent': function() {
    this.response.speak(STOP_MESSAGE).cardRenderer('Session Ended', STOP_MESSAGE, undefined);
    this.emit(':responseReady');
  },
  'AMAZON.StopIntent': function() {
    this.response.speak(STOP_MESSAGE).cardRenderer('Session Ended', STOP_MESSAGE, undefined);
    this.emit(':responseReady');
  },
};

const finderHandlers = {
  CheapestExchange: function() {
    const cardTitle = 'Cheapest Exchange';
    const speechOutput = 'Bittrex has eth for $901.8, compared to average of 21 exchanges sitting on $905.10';
    this.emit(':tellWithCard', speechOutput, cardTitle, speechOutput, undefined);
  },

  CheckPrice: function() {
    const cardTitle = 'Performing check coin price';
    const intent = this.event.request.intent;

    let speechOutput;    
    try {
      const slots = intent.slots;
      const coin = slots.Coin && slots.Coin.value;
      const coinComparison = slots.CoinComparison && slots.CoinComparison.value;
      const quantity = slots.Quantity && slots.Quantity.value;

      if (!coin) {
        speechOutput = `Sorry you need to provide what coin you want to check`;
      } else {
        speechOutput = `${quantity || 1} ${coin} is equal to ${Math.random() * 1000 + 100} ${coinComparison || 'USD'}`;
      }
    } catch (e) {
      speechOutput = `Oops, looks like checking price failed, error: ${JSON.stringify(intent.slots, null, 2)}`;
    }

    this.emit(':tellWithCard', speechOutput, cardTitle, speechOutput, undefined);
  },

  ListCoin: function() {
    const cardTitle = 'Performing check coin portfolio';
    const speechOutput = 'You have 1.253 BitCoin, 10.2534 Ethereum, and 81.342 NEO';

    this.emit(':tellWithCard', speechOutput, cardTitle, speechOutput, undefined);
  },

  News: function() {
    const cardTitle = 'Performing news check';
    const speechOutput = `The latest crypto news. Nano Goes Giga in Down Week for Crypto Prices. Bitcoin Is Back Over $10K, but Rally Looks Weak`;

    this.emit(':tellWithCard', speechOutput, cardTitle, speechOutput, undefined);
  },

  PortfolioBalance: function() {
    const cardTitle = 'Performing portfolio balance check';
    const speechOutput = 'Your portfolio worths 1.253 bitcoin increasing by 5.24% in the last 24 hours';

    this.emit(':tellWithCard', speechOutput, cardTitle, speechOutput, undefined);
  },
};

exports.handler = function(event, context, callback) {
  const alexa = Alexa.handler(event, context, callback);
  const handlers = Object.assign({}, defaultHandlers, finderHandlers);
  alexa.registerHandlers(handlers);
  alexa.appId = APP_ID; // APP_ID is your skill id which can be found in the Amazon developer console where you create the skill.
  alexa.execute();
};
