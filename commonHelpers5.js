import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{a as e}from"./assets/vendor-09d7c26e.js";const s=async()=>(await e.get("https://jsonplaceholder.typicode.com/users")).data;s().then(o=>console.log(o));console.log("Before try...catch");try{console.log(1/0)}catch(o){console.error(o.message)}console.log("After try...catch");
//# sourceMappingURL=commonHelpers5.js.map