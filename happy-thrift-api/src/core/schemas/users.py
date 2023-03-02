from typing import Union

from pydantic import BaseModel
from fastapi import Form


__all__ = (
    "UserBase",
    "UserReg",
    "UserLog",
    "User"
)


class UserBase(BaseModel):
    email: str = Form()


class UserReg(UserBase):
    full_name: str = Form()
    password: str = Form()
    shipping_address: str = Form()


class UserLog(UserBase):
    password: str = Form()


class User(UserBase):
    id: int
    shipping_address: str

    class Config:
        orm_mode = True
