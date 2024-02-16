const { ImageAnalysisClient, KeyCredential } = require("@azure-rest/ai-image-analysis");


const key = process.env.VISION_KEY;
const endpoint = process.env.VISION_ENDPOINT;
const credential = new KeyCredential(key);

const client = new ImageAnalysisClient(endpoint, credential);



const imageUrl = "http://usweb.dotomi.com/images/2262/69270D_BR_ACT_Refresh/336x280/lifestyle_img_acquistion_20220405.jpg";
const features = ["Caption", "DenseCaptions", "Objects", "People", "Read", "SmartCrops", "Tags"];

async function analyzeImageFromUrl() {
  const result = await client.path("/imageanalysis:analyze").post({
    body: {
      url: imageUrl,
    },
    queryParameters: {
      features: features,
      "smartCrops-aspect-ratios": [0.9, 1.33],
    },
    contentType: "application/json",
  });

  console.log("Image analysis result:", result.body);
}

analyzeImageFromUrl();