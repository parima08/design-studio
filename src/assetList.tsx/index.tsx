import React, { useState, useEffect } from 'react';
import {
  useParams
} from "react-router-dom";
import subpageDetails from '../subpageJson';
import SheetsApi from '../SheetsApi';
import { isFor } from '@babel/types';

//import { createUseStyles } from 'react-jss';

//const useStyles = createUseStyles({});

interface AssetListProps {}

export default function AssetList({
}: AssetListProps) {  
  const [assets, setAssets] = useState([]);
  const params = useParams();
  const assetName = params.assetName;
  const assetDetails = subpageDetails[assetName];
  useEffect( () => {
    SheetsApi.shared.loadAsyncData(assetDetails.spreadsheetId, assetDetails).then(res => {
      setAssets(res);
    })
  }, [])
  //show loader... 

  if(!assetDetails){
    return (
      <h1>Sorry! Does not exist!</h1>
    )
  }

  if(assets.length === 0){
    return (
      <h1>loading</h1>
    )
  }

  const renderThumbnail = (asset) => (
    <a className = "material-link">
      <div className = "material-element">
        <div className = "object-container">
          <div className = "image-container">
          <div className = "hover-overlay"></div>
          <img src = {asset.thumbnailLink} />
        </div>
        <div className= "name-container">
          <h4>{asset.name}</h4>
        </div>
      </div>
      </div>
    </a>
  );

  return (
    <>
      <h1>{assetName}</h1>
      {assets.map( asset => renderThumbnail(asset))}
    </>
  );
}