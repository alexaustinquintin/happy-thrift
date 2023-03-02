from typing import List

from fastapi import APIRouter, Depends, HTTPException, Form, Request
from sqlalchemy.orm import Session

from core import schemas
from core.auth import JWTBearerAdmin
from core.crud.categories import (
    get_category,
    delete_category,
    insert_category,
    update_category as db_update_category
)
from core.crud.products import (
    insert_product,
    get_product,
    delete_product,
    update_product
)
from core.crud.orders import (
    get_all_orders,
    get_order,
    update_order
)
from core.crud.users import (
    get_all_users,
    get_user,
    delete_user,
)
from core.crud.notifications import (
    notif_all,
    send_notif
)
from routes.account import get_current_user
from core.models.database import get_db


router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
    dependencies=[Depends(JWTBearerAdmin())]
)


@router.post("/categories", response_model=schemas.Category)
async def add_category(category: schemas.CategoryIn, db: Session = Depends(get_db)):
    return insert_category(db, category)


@router.delete("/categories/<category_id: int>")
async def remove_category(category_id: int, db: Session = Depends(get_db)):
    if not get_category(db, category_id):
        raise HTTPException(
            status_code=400,
            detail="Category doesn't exist."
        )

    delete_category(db, category_id)
    return 200


@router.put("/categories/<category_id: int>", response_model=schemas.Category)
async def update_category(category_id: int, name: str = Form(), db: Session = Depends(get_db)):
    print(name)
    new_category = db_update_category(db, category_id, name)

    if not new_category:
        raise HTTPException(
            status_code=400,
            detail="Category doesn't exist."
        )

    return new_category


@router.post("/products", response_model=schemas.Product)
async def add_product(product: schemas.ProductIn, db: Session = Depends(get_db)):
    if not get_category(db, product.category_id):
        raise HTTPException(
            status_code=400,
            detail="Category doesn't exist."
        )

    return insert_product(db, product)


@router.put("/products/<product_id: int>", response_model=schemas.Product)
async def update_product_info(product_id: int, product_info: schemas.ProductUpdate, db: Session = Depends(get_db)):
    if not get_category(db, product_info.category_id):
        raise HTTPException(
            status_code=400,
            detail="Category doesn't exist."
        )

    product_inf = {k: v for k, v in product_info.dict().items() if v}

    product = update_product(db, product_id, **product_inf)

    if not product:
        raise HTTPException(
            status_code=403,
            detail="Product does not exist."
        )

    return product


@router.delete("/products/<product_id: int>")
async def remove_product(product_id: int, db: Session = Depends(get_db)):
    if not get_product(db, product_id):
        raise HTTPException(
            status_code=400,
            detail="Product doesn't exist."
        )

    delete_product(db, product_id)
    return {"message": "Success"}


@router.get("/orders", response_model=List[schemas.Order])
async def get_orders(status: str = "all", db: Session = Depends(get_db)):
    if status not in ("pending", "cancelled", "sold", "all", "shipping"):
        raise HTTPException(
            status_code=400,
            detail="Status must be 'pending', 'cancelled', 'sold', 'shipping', or 'all'"
        )

    return get_all_orders(db, status)


@router.post("/orders/<order_id: int>")
async def update_order_status(order_id: int, request: Request, status: str = Form(), db: Session = Depends(get_db)):
    user = await get_current_user(request, db)

    order = get_order(db, order_id)

    if not order:
        raise HTTPException(
            status_code=400,
            detail="Order not found."
        )

    return update_order(db, user.id, order.product_id, order.id, status)


@router.get("/users", response_model=List[schemas.User])
async def get_users(db: Session = Depends(get_db)):
    return get_all_users(db)


@router.delete("/users/<user_id: int>")
async def remove_user(user_id: int, db: Session = Depends(get_db)):
    user = delete_user(db, user_id)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    return {"message": "Sucess"}


@router.post("/notify/all", response_model=List[schemas.Notification])
async def notify_all(notification: schemas.NotificationAll, db: Session = Depends(get_db)):
    return notif_all(db, notification)


@router.post("/notify", response_model=schemas.Notification)
async def notify_user(notification: schemas.NotificationIn, db: Session = Depends(get_db)):
    if not get_user(db, notification.user_id):
        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    return send_notif(db, notification.user_id, notification)
