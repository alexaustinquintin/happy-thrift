from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from core import schemas
from core.crud.users import insert_user, get_user_email, validate_user
from core.models.database import get_db
from core.auth import sign_jwt


router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login")
async def login(user: schemas.UserLog, db: Session = Depends(get_db)):

    if validate_user(db, user.email, user.password):
        db_user = get_user_email(db, user.email)

        return sign_jwt(user.email, db_user.is_admin)

    raise HTTPException(
        400,
        detail="Invalid credentials."
    )


@router.post("/register", response_model=schemas.User)
async def signup(user: schemas.UserReg, db: Session = Depends(get_db)):
    db_user = get_user_email(db, user.email)

    if db_user:
        raise HTTPException(400, detail="User with this email already exists.")

    user = insert_user(db, user)
    return user
