class ApiFeatures{
    constructor(query,queryStr){
        this.query=query;    //--query in the url after?"http:...events?keyword=samosa"
        this.queryStr=queryStr;
        
    }
    //making search for any event and  filter for price..
    search(){
        const keyword=this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,//->regular expression
                $options:"i"   //->case insensitive gives lowercase otherwise uppercase 
            }
        }:{};
       // console.log(keyword);
        this.query= this.query.find({...keyword});
        return this;//->calling class
    }
    filter(){
        const queryCopy={...this.queryStr}//->no refrence actual copy
       // console.log(queryCopy);
        //Removing some fields for category
        const removeFields=["keyword","page","limit"];
        removeFields.forEach((key)=>delete queryCopy[key]);
       // console.log(queryCopy);
        //Filter for price and Rating
        let queryStr=JSON.stringify(queryCopy);//->convert into string
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);
        
        this.query=this.query.find(JSON.parse(queryStr));
        //console.log(queryStr);
        return this;

    }
    pagination(resultPerPage){
        const currentPage=Number(this.queryStr.page)||1;
        const skip=(currentPage-1)*resultPerPage;
        this.query=this.query.limit(resultPerPage).skip(skip);
        return this;
    }
  
}
module.exports=ApiFeatures