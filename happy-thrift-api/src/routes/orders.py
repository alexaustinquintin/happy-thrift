from typing import List

from fastapi import APIRouter, Depends, Request, Form, HTTPException
from sqlalchemy.orm import Session

from core import schemas, models
from core.auth import JWTBearer
from core.crud.orders import (
    add_order,
    update_order,
    get_user_orders,
    get_order
)
from core.crud.products import get_product
from core.crud.notifications import notify_admins
from core.models.database import get_db
from .account import get_current_user


router = APIRouter(
    prefix="/orders",
    tags=["Orders"],
    dependencies=[Depends(JWTBearer())]
)



@router.get("/", response_model=List[schemas.Order])
async def get_orders(request: Request, db: Session = Depends(get_db)):
    user = await get_current_user(request, db)
    return get_user_orders(db, user.id)


@router.post("/place/<product_id: int>", response_model=schemas.Order)
async def place_order(product_id: int, request: Request, order: schemas.OrderIn, db: Session = Depends(get_db)):
    user = await get_current_user(request, db)

    if not get_product(db, product_id):
        raise HTTPException(
            status_code=400,
            detail="Product not found."
        )

    order = add_order(db, user.id, product_id, order.amount, order.variation)
    product = get_product(db, product_id)

    messg = (
        f"New order!\nOrder ID: {order.id}\n"
        f"Product ID: {order.product_id}\n"
        f"Product Name: {product.name}\n"
        f"Variation: {order.variation}\n"
        f"Quantity: {order.amount}"
    )

    notify_admins(db, notif=schemas.NotificationAll(title="New order", message=messg))

    return order


@router.post("/cancel/<order_id: int>")
async def cancel_order(order_id: int, request: Request, db: Session = Depends(get_db)):
    user = await get_current_user(request, db)
    order = get_order(db, order_id)

    if not order:
        raise HTTPException(
            status_code=400,
            detail="Order not found."
        )
    notify_admins(db, notif=schemas.NotificationAll(title=f"Order {order_id} cancelled.", message="Order has been cancelled."))
    update_order(db, user.id, order.product_id, order.id, "cancelled")
    return {"message": "Success"}
