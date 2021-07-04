const hospitalRoute = require('express').Router();

const resHndlr = require('../common/resHandler');
const dataPath = './json/hospital.json';
const writeFile = require('../common/helpers').writeFile
const readFile = require('../common/helpers').readFile

//get hospital 
hospitalRoute.route("/get-hospitals").get((req, res)=>{
    readFile(data => {
              resHndlr.sendSuccess(res, data, "Success");
    }, true, dataPath);      
});

//create hospital
hospitalRoute.route("/create-hospital").post((req, res)=>{
  readFile(data => {
    let body = {
      ...req.body,
    }
     
      data.hospitals.push(body)
      
    writeFile(JSON.stringify(data, null , 2), () => {
      resHndlr.sendSuccess(res, data, "New Hospital Added");
    },dataPath);
  }, true , dataPath);
})



// UPDATE
hospitalRoute.route("/update-hospital").put((req, res) => {
  readFile(data => {
  
    const hospitalName = req.body.hospitalname;

    let mdata = data.hospitals.filter((element,index,array) => {
      if(element.hospitalname == hospitalName){
          if (index > -1) {
            array.splice(index, 1);
          }
          return data;
       
      }
    });

    data.hospitals.push(req.body)

    writeFile(JSON.stringify(data, null, 2), () => {
      resHndlr.sendSuccess(res, data, "Hospital details updated");
    },dataPath);
  }, true, dataPath);
});


//DELETE 
hospitalRoute.route("/delete-hospital/:hospitalName").delete((req, res) => {
  readFile(data => {
    // delete the hospital
    const hospitalName = req.params.hospitalName;
    let mdata = data.hospitals.filter((element,index,array) => {
      if(element.hospitalname == hospitalName){
          if (index > -1) {
            array.splice(index, 1);
          }
          return data;
      }
    });

    writeFile(JSON.stringify(data, null, 2), () => {
      resHndlr.sendSuccess(res, data, "Hospital deleted Successfully");
    }, dataPath);
  }, true,dataPath);
});




module.exports = hospitalRoute;
