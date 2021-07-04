function setCors(res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    return res;
  }
   
  
  //**************************************************************************************************** */  
  module.exports = {
    setCors
  };
  