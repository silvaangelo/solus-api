import * as jwt from 'jsonwebtoken';

export const verifyJWTToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err);
      }

      resolve(decodedToken);
    })
  })
}

export const createJWToken = async user => {
  const age = 86400;

  return jwt.sign(
    { data: user },
    process.env.JWT_SECRET,
    {
      expiresIn: age,
      algorithm: 'HS256'
    }
  );
}