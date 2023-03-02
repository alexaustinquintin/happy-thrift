from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from core import schemas
from core.auth import JWTBearer
from core.models.database import get_db
from core.crud.products import (
    get_product as get_product_db,
    get_products
)


router = APIRouter(
    prefix="/products",
    dependencies=[Depends(JWTBearer())],
    tags=["Products"]
)


@router.get("/", response_model=List[schemas.Product])
async def all_products(db: Session = Depends(get_db)):
    return get_products(db)


@router.get("/<product_id: int>", response_model=schemas.Product)
async def get_product(product_id: int, db: Session = Depends(get_db)):
    product = get_product_db(db, product_id)

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product does not exist."
        )

    return product
