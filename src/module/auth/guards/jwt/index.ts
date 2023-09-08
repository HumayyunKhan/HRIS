import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

const saltRounds = process.env.SALT_ROUNDS // Number of salt rounds for bcrypt

export function issue(payload, expiresIn) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn || '24h',
  });
  return token;
}

export async function hashAndIssue(payload, expiresIn) {
  const hashedToken = await bcrypt.hash(issue(payload, expiresIn), saltRounds);
  return hashedToken;
}

export function verify(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return false;
  }
}

export function issueUnEncrypted(payload, expiresIn) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn || '24h',
  });
  return token;
}

export function verifyUnEncrypted(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return false;
  }
}





