from sqlalchemy.orm import Session

from core import models
from core import schemas
from core.auth import hash_pwd, verify


def validate_user(db: Session, email: str, password: str):
    user = db.query(models.User).filter(models.User.email == email).first()

    if user:
        return verify(password, user.hashed_password)

    return None


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_all_users(db: Session):
    return db.query(models.User).all()


def get_user_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def insert_user(db: Session, user: schemas.UserReg):
    user_dict = user.dict()
    pwd = hash_pwd(user_dict.pop("password"))
    db_user = models.User(**user_dict, hashed_password=pwd)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, user: schemas.UserLog, **kwargs):
    new_user = db.query(models.User).filter(models.User.email == user.email).first()

    if not new_user:
        return

    for attr, value in kwargs.items():
        setattr(new_user, attr, value)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def delete_user(db: Session, user_id: int):
    user =  db.query(models.User).filter(models.User.id == user_id)

    if not user.first():
        return False

    user.delete()
    db.commit()
    return True
