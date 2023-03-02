from fastapi import Form

from pydantic import BaseModel


__all__ = (
    "OrderIn",
    "Order"
)


class OrderIn(BaseModel):
    product_id: int = Form()
    amount: int = Form()
    variation: str = Form()


class Order(OrderIn):
    id: int
    status: str

    class Config:
        orm_mode = True
