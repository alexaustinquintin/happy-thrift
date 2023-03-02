import os
import datetime

from dotenv import load_dotenv
from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from passlib.context import CryptContext
from jose import JWTError, jwt


load_dotenv()
SECRET_KEY = os.environ["SECRET"]
ALGORITHM = "HS256"

pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_pwd(password: str):
    return pwd_ctx.hash(password)


def verify(password: str, hashed: str):
    return pwd_ctx.verify(password, hashed)


def sign_jwt(email: str, is_admin: bool):
    payload = {
        "email": email,
        "is_admin": is_admin,
        "expires": (datetime.datetime.utcnow() + datetime.timedelta(hours=24)).timestamp()
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

    return {"Access-Token": token}


def decode_jwt(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return decoded_token if decoded_token["expires"] >= datetime.datetime.utcnow().timestamp() else None

    except JWTError:
        return {}


class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication scheme.")
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(status_code=403, detail="Invalid token or expired token.")
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")

    def verify_jwt(self, jwtoken: str) -> bool:
        isTokenValid: bool = False

        try:
            payload = decode_jwt(jwtoken)

        except JWTError:
            payload = None

        if payload:
            isTokenValid = True

        return isTokenValid


class JWTBearerAdmin(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super().__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super().__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication scheme.")
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(status_code=403, detail="Invalid token or expired token.")
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")

    def verify_jwt(self, jwtoken: str) -> bool:
        isTokenValid: bool = False

        try:
            payload = decode_jwt(jwtoken)
            payload = payload.get("is_admin", None)

        except JWTError:
            payload = None

        if payload:
            isTokenValid = True

        return isTokenValid
