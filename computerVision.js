'use strict';

const async = require('async');
const fs = require('fs');
const https = require('https');
const path = require("path");
const createReadStream = require('fs').createReadStream
const sleep = require('util').promisify(setTimeout);
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;

/**
 * AUTHENTICATE
 * This single client is used for all examples.
 */
const key = process.env.VISION_KEY;
const endpoint = process.env.VISION_ENDPOINT;


const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);
/**
 * END - Authenticate
 */


function computerVision(imagePath) {

  async.series([
    async function () {

      /**
       * DETECT TAGS  
       * Detects tags for an image, which returns:
       *     all objects in image and confidence score.
       */
      console.log('-------------------------------------------------');
      console.log('DETECT TAGS');
      console.log();

      // Image of different kind of dog.
      //const tagsURL = 'https://moderatorsampleimages.blob.core.windows.net/samples/sample16.png';
      const tagsURL = imagePath;
     
      // Analyze URL image
      console.log('Analyzing tags in image...', tagsURL.split('/').pop());
      const features = (await computerVisionClient.analyzeImage(tagsURL, { visualFeatures: ['ImageType','Faces','Adult','Categories' ,'Color','Tags', 'Description', 'Objects', 'Brands'] }));
      
      console.log(features.imageType);
      console.log(features.faces);
      console.log(features.adult);
      console.log(features.categories);
      console.log(features.color);
      console.log(features.tags);
      console.log(features.description);
      console.log(features.objects);
      console.log(features.brands);
      console.log(features.tags);

      console.log(`Tags: ${formatTags(features.tags)}`);


      // Format tags for display
      function formatTags(tags) {
        return tags.map(tag => (`${tag.name} (${tag.confidence.toFixed(2)})`)).join(', ');
      }
      /**
       * END - Detect Tags
       */
      console.log();
      console.log('-------------------------------------------------');
      console.log('End of quickstart.');

    },
    function () {
      return new Promise((resolve) => {
        resolve();
      })
    }
  ], (err) => {
    throw (err);
  });
}

const imageInput = () => {
  if (process.argv.length < 3) {
    console.log('please pass an image  url to process. ex:');
    console.log('node computerVision.js https://moderatorsampleimages.blob.core.windows.net/samples/sample16.png')
  } else {
    // e.g., /path/to/image.jpg
    let imagePath = process.argv[2];
  
    computerVision(imagePath);
  }
}


imageInput();
