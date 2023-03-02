from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from core.auth import JWTBearer
from core import schemas
from core.models.database import get_db
from core.crud.categories import (
    get_categories as db_categories,
    get_category as db_category
)


router = APIRouter(
    prefix="/categories",
    tags=["Categories"],
    dependencies=[Depends(JWTBearer())]
)

@router.get("/", response_model=List[schemas.Category])
async def get_categories(db: Session = Depends(get_db)):
    return db_categories(db)


@router.get("/<category_id: int>", response_model=schemas.Category)
async def get_category(category_id: int, db: Session = Depends(get_db)):
    category = db_category(db, category_id)

    if not category:
        raise HTTPException(
            status_code=404,
            detail="Category doesn't exist."
        )

    return category
