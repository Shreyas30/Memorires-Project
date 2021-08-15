import jwt from "jsonwebtoken";

const auth = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500; //* Length of Google Token is always > 500

        let decodedData;
        //* If Token exists and it is Custom Token
        if(token && isCustomAuth){ 
            decodedData = jwt.verify(token,"secret");

            req.userId = decodedData?.id;
        }
        //* If Token exists and it is Google Token
        else if(token && !(isCustomAuth)){
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub; //* sub is key which contains a value which an "id" unique for all users
        }

            next();

    } catch (error) {
        console.log(error);
    }
}

export default auth;
    