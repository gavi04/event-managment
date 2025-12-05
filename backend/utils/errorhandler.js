class ErrorHandler extends Error{
    constructor(message,statusCode,){
        super(message); //constructor of Error
        this.statusCode=statusCode
        Error.captureStackTrace(this,this.constructor);
    }
}
module.exports=ErrorHandler