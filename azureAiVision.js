// Get the canvas element and the context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Set the image source and the API endpoint
var image = new Image();
image.src = "image1.jpg";
var endpoint = "";



// Set the API key and the request options
var key = "";
var options = {
  method: "POST",
  headers: {
    "Ocp-Apim-Subscription-Key": key,
    "Content-Type": "application/octet-stream"
  },
  body: image
};

// Call the API and get the response
fetch(endpoint, options)
  .then((response) => response.json())
  .then((data) => {
    // Draw the image on the canvas
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Loop through the objects in the response
    for (var i = 0; i < data.objects.length; i++) {
      // Get the object name and the bounding box coordinates
      var object = data.objects[i].object;
      var x = data.objects[i].rectangle.x;
      var y = data.objects[i].rectangle.y;
      var w = data.objects[i].rectangle.w;
      var h = data.objects[i].rectangle.h;

      // Set the stroke color and width
      ctx.strokeStyle = "cyan";
      ctx.lineWidth = 3;

      // Draw the bounding box
      ctx.strokeRect(x, y, w, h);

      // Set the font and the fill color
      ctx.font = "20px Arial";
      ctx.fillStyle = "cyan";

      // Draw the object name
      ctx.fillText(object, x, y - 10);
    }

    // Get the image data
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Do something with the image data
    // ...
  })
  .catch((error) => {
    // Handle the error
    console.error(error);
  });
