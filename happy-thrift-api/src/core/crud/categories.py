from sqlalchemy.orm import Session

from core import models
from core import schemas


def get_category(db: Session, category_id: int):
    return db.query(models.Category).filter(models.Category.id == category_id).first()


def get_categories(db: Session):
    return db.query(models.Category).all()


def insert_category(db: Session, category: schemas.Category):
    category = models.Category(name=category.name)
    db.add(category)
    db.commit()
    db.refresh(category)
    return category


def delete_category(db: Session, category_id: int):
    db.query(models.Category).filter(models.Category.id == category_id).delete()
    db.commit()


def update_category(db: Session, category_id: int, name: str):
    if get_category(db, category_id):
        category = db.query(models.Category).filter(models.Category.id == category_id).first()
        category.name = name
        db.add(category)
        db.commit()
        db.refresh(category)
        return category

    return None
