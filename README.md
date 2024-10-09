# Installation Instructions 

For ease of installation, it is best to remove any previous project files and start with a fresh clone of the repo. If that is not the case, please delete the `node_modules` folder as well as the `package-lock.json` file before continuing. 

## Environmental Prerequisites 

 #### `nodejs` version 16.13.0 ####
 
  To install a second version of node onto a Windows machine (while also retaining the first version) use Node Version Manager (NVM). Reference article [here](https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/).
  
  After installing NVM we can use the following commands:
   
     `nvm install 16.13.0`
     `nvm use 16.13.0`
     
  Note: Might require admin privileges. Once prizm-web also gets migrated, we can consolidate onto one version of Node and eliminate the need for NVM altogether.
  
 #### `npm` version 9.8.1 ####

  To install the aforementioned npm version, run the following command: `npm install -g npm@9.8.1` 


  ## Installing project dependencies 
  
  Due to the fact that not all packages have been updated (yet), it is required to run `npm install --legacy-peer-deps` as opposed to the normal `npm install`. This will ensure all required internal package dependencies are installed. 
  
  Note: Angular and TS versions should auto-download at this step
  
  ## Running the Local Build 
  
  Run the following command: `npm start` 
  