//Legacy Code - TB Refactored

export default function parseSheetAssetList(jsonElement, sectionDetails){
    var mObject = {} as any;
    mObject.name = jsonElement.gsx$name.$t.trim(); 
    var secondaryLinkPath = ""
    var awsLinkPath = jsonElement.gsx$awslinkpath.$t.trim(); 
    if(jsonElement.gsx$secondaryawslinkpath){
       secondaryLinkPath = jsonElement.gsx$secondaryawslinkpath.$t.trim();
    }
    mObject.width = jsonElement.gsx$width && jsonElement.gsx$width.$t ?  jsonElement.gsx$width.$t : sectionDetails['width'];
    mObject.height = jsonElement.gsx$height  && jsonElement.gsx$height.$t?  jsonElement.gsx$height.$t : sectionDetails['height'];
    var dimensions = calculateAssetSize(mObject.width, mObject.height); 
    mObject.thumbnailHeight = dimensions['thumbnailHeight'];
    mObject.thumbnailWidth = dimensions['thumbnailWidth'];
    mObject.canvasHeight = dimensions['canvasHeight'];
    mObject.canvasWidth = dimensions['canvasWidth'];
    if(awsLinkPath != ""){
    mObject.imageLink = "https://s3.amazonaws.com/srmd-flyer-generator/" + awsLinkPath; 
    mObject.thumbnailLink=  "http://srmd-flyer-generator.s3-website-us-east-1.amazonaws.com/" 
                + mObject.thumbnailWidth +  "x" + mObject.thumbnailHeight 
                + "/" + awsLinkPath; 
    
  }
  if(secondaryLinkPath){
    mObject.twoOptions = true; 
    mObject.secondaryImageLink = "https://s3.amazonaws.com/srmd-flyer-generator/" + secondaryLinkPath; 
    mObject.secondaryButtonDescription = jsonElement.gsx$secondarybuttondescription.$t.trim(); 
    mObject.secondaryWorksheetIndex = jsonElement.gsx$secondaryworksheetindex.$t.trim();
  }
  else{
  }
  if(jsonElement.gsx$language){
    mObject.language = jsonElement.gsx$language.$t.toLowerCase().trim();
  }
  mObject.worksheetIndex = jsonElement.gsx$worksheetindex.$t; 
  
  return mObject
}

const calculateAssetSize = (width, height) => {
  var canvasWidth, canvasHeight; 
  if(width > height){
    canvasHeight = 500;
    canvasWidth = Math.round(canvasHeight * (width/height)); 
  }
  else{ 
    canvasWidth = 500; 
    canvasHeight = Math.round(canvasWidth * (height/width));
  }
  var thumbnailWidth = 200;
  var thumbnailHeight =  Math.round(thumbnailWidth * (canvasHeight/canvasWidth)); 
  return {
    "canvasHeight": canvasHeight, 
    "canvasWidth": canvasWidth, 
    "thumbnailHeight": thumbnailHeight, 
    "thumbnailWidth": thumbnailWidth
  }
};
