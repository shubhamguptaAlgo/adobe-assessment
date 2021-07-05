const departmentRoute = require('express').Router();

const resHndlr = require('../common/resHandler');
const dataPath = './json/department.json';
const writeFile = require('../common/helpers').writeFile
const readFile = require('../common/helpers').readFile

//GET
departmentRoute.route("/get-department").get((req, res)=>{
    readFile(data => {
      const hospitalName = req.query.hospitalName.replace(/_/g," ");

      // console.log("mDta:", hospitalName);
      let mdata = data.departments.filter((element,index,array) => {
        if(element.hospitalname == hospitalName){
            return element;
        }
      });
      
      resHndlr.sendSuccess(res, mdata, "Success");
    }, true,dataPath);      
});

//CREATE
departmentRoute.route("/create-department").post((req, res)=>{
  readFile(data => {
    let body = {
      ...req.body,
    }
      data.departments.push(body)
      
    writeFile(JSON.stringify(data, null , 2), () => {
      resHndlr.sendSuccess(res, data, "New Department Added");
    },dataPath);
  }, true, dataPath);
})



// UPDATE
departmentRoute.route("/update-department").put((req, res) => {
  readFile(data => {
  
    const departmentName = req.body.departmentname;


    let mdata = data.departments.filter((element,index,array) => {
      if(element.departmentname == departmentName){
          if (index > -1) {
            array.splice(index, 1);
          }
          return data;
       
      }
    });

    data.departments.push(req.body)
    writeFile(JSON.stringify(data, null, 2), () => {
      resHndlr.sendSuccess(res, data, "Department details updated");
    }, dataPath);
  }, true, dataPath);
});


//DELETE 
departmentRoute.route("/delete-department/:departmentName").delete((req, res) => {
  readFile(data => {
    // delete the department
    const departmentName = req.params.departmentName
    console.log("dpt name:", departmentName);
    let mdata = data.departments.filter((element,index,array) => {
      if(element.departmentname == departmentName){
          if (index > -1) {
            array.splice(index, 1);
          }
          return data;
      }
    });

    writeFile(JSON.stringify(data, null, 2), () => {
      resHndlr.sendSuccess(res, data, "Department deleted Successfully");
    },dataPath);
  }, true, dataPath);
});









module.exports = departmentRoute;
