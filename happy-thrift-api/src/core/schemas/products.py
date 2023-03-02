from typing import List

from fastapi import Form
from pydantic import BaseModel


class CategoryIn(BaseModel):
    name: str = Form()


class Category(CategoryIn):
    id: int

    class Config:
        orm_mode = True


class ProductIn(BaseModel):
    name: str = Form()
    price: float = Form()
    size: str = Form()
    quantity: int = Form()
    category_id: int = Form()
    variations: List[str] = Form()
    image_url: str = Form()


class ProductUpdate(ProductIn):
    # idk why i even made this
    class Config:
        orm_mode = True


class Product(ProductIn):
    id: int
    variations: List[str]

    class Config:
        orm_mode = True
