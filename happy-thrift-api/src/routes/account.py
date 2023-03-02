from typing import List

from fastapi import APIRouter, Depends, Request, HTTPException, Form
from sqlalchemy.orm import Session

from core import schemas
from core.auth import decode_jwt, JWTBearer
from core.models.database import get_db
from core.crud.users import get_user_email
from core.crud.cart import get_cart_items, remove_cart_item, add_cart, decrease_cart_item
from core.crud.notifications import get_notifs
from core.crud.orders import get_user_orders


router = APIRouter(
    prefix="/account",
    tags=["Account"],
    dependencies=[Depends(JWTBearer())]
)


async def get_current_user(request: Request, db: Session):
    token  = await JWTBearer()(request)
    info = decode_jwt(token)

    if not info:
        raise HTTPException(
            status_code=401,
            detail="Authorization error."
        )

    user = get_user_email(db, info["email"])

    return user


@router.get("/me", response_model=schemas.User)
async def current_user(request: Request, db: Session = Depends(get_db)):
    return await get_current_user(request, db)


@router.get("/orders", response_model=List[schemas.Order])
async def get_orders(request: Request, db: Session = Depends(get_db)):
    user = await get_current_user(request, db)

    return get_user_orders(db, user.id)


@router.get("/notifications", response_model=List[schemas.Notification])
async def get_notifications(request: Request, db: Session = Depends(get_db)):
    user = await get_current_user(request, db)

    return get_notifs(db, user.id)


@router.get("/cart")
async def get_cart(request: Request, db: Session = Depends(get_db)):
    user = await get_current_user(request, db)

    return get_cart_items(db, user.id)


@router.post("/cart/<product_id: int>")
async def add_to_cart(product_id: int, request: Request, amount: int = Form(), db: Session = Depends(get_db)):
    if amount < 1:
        raise HTTPException(
            status_code=400,
            detail="Amount must be greater than 1."
        )

    user = await get_current_user(request, db)

    add_cart(db, user.id, product_id, amount)

    return {"message": "Success"}


@router.put("/cart/<product_id: int>")
async def decrease_cart(product_id: int, request: Request, amount: int = Form(), db: Session = Depends(get_db)):
    user = await get_current_user(request, db)

    decrease_cart_item(db, user.id, product_id, amount)
    return {"message": "Success"}


@router.delete("/cart/<product_id: int>")
async def remove_from_cart(product_id: int, request: Request, db: Session = Depends(get_db)):
    user = await get_current_user(request, db)

    result = remove_cart_item(db, user.id, product_id)

    if not result:
        raise HTTPException(
            status_code=400,
            detail="Could not remove item from cart."
        )

    return {"message": "Success"}
