import jwt from 'jsonwebtoken';


export const middleware = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, 'access_secret', (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};


export const wsAuth = (req: any) => {
    try {
    
    const fullUrl = "http://localhost" + (req.url || "");
    const url = new URL(fullUrl);

    const token = url.searchParams.get("token");

    if (!token) return null;


    const decoded = jwt.verify(token, "access_secret");

    return decoded;
  } catch (err) {
    
    return null;
  }
};