import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: "Not authorized, login again!" })
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: token_decode.id };
        next();
    } catch (error) {
        console.log(error);
         res.json({ success: false, message: "Something went wrong!" })

    }

}

export default authMiddleware;