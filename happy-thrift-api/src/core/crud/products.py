from sqlalchemy.orm import Session

from core import models
from core import schemas


def get_product(db: Session, product_id: int):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()

    if not product:
        return

    vars = []

    for var in db.query(models.ProductVariations).filter(models.ProductVariations.product_id == product_id).all():
        vars.append(var.name)

    product.variations = vars
    return product


def product_by_category(db: Session, category_id: int):
    return db.query(models.Product).filter(models.Product.category_id == category_id).all()


def get_products(db: Session):
    products = db.query(models.Product).all()
    new_products = []

    for prod in products:
        new_products.append(get_product(db, prod.id))

    return new_products


def insert_product(db: Session, product: schemas.ProductIn):
    prod = product.dict()
    variations = prod.pop("variations")
    product_db = models.Product(**prod)
    vrs = []

    db.add(product_db)
    db.commit()
    db.refresh(product_db)

    for var in variations:
        product_var = models.ProductVariations(name=var, product_id=product_db.id)
        vrs.append(product_var.name)
        db.add(product_var)
        db.commit()

    product_db.variations = vrs
    return product_db


def delete_product(db: Session, product_id: int):
    db.query(models.Product).filter(models.Product.id == product_id).delete()
    db.commit()


def update_product(db: Session, product_id: int, **kwargs):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()

    if not product:
        return

    for attr, value in kwargs.items():
        setattr(product, attr, value)

    db.add(product)
    db.commit()
    db.refresh(product)
    return product