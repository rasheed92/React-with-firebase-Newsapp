
    

function getSalary() {
    return new Promise(resolve => {
          resolve(5000);
      });
    }
    
    function subTax(salary) {
      return new Promise(resolve => {
            resolve(salary * 0.05);
        });
    }
    
    function subRent(salary) {
      return new Promise(resolve => {
            resolve(salary - 150);
        });
    }
    
    function getSalaryAfter() {
    
    return getSalary().then(subTax).then(subRent);
    
      // getSalary(function (salary) {
      //   subTax(salary,(salary) => {
      //     subRent(salary,(salary) => {
      //       console.log(salary);
      //     });
      //   });
      // });
    }
    
    getSalaryAfter().then(subTax).then((res)=>{
      console.log(res);
    });