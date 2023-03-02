from fastapi import HTTPException
from sqlalchemy.orm import Session

from core import models
from core.crud.products import get_product


def add_cart(db: Session, user_id: int, product_id: int, amount: int):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    cart_item = db.query(models.Cart).filter(models.Cart.product_id == product_id).first()

    if not product or not cart_item:
        raise HTTPException(status_code=404, detail="Product not found.")

    if product.quantity < amount:
        raise HTTPException(status_code=400, detail="Amount is greater than stock.")

    if not cart_item:
        item = models.Cart(user_id=user_id, product_id=product_id)
        item.amount = amount
        db.add(item)
        db.commit()
    else:
        print(cart_item.amount)
        cart_item.amount = cart_item.amount + amount
        db.add(cart_item)
        db.commit()


def get_cart_items(db: Session, user_id: int):
    items = db.query(models.Cart).filter(models.Cart.user_id == user_id).all()

    ret_items = []

    for item in items:
        prod = item.product_id
        product = get_product(db, prod)
        product_dict = {
            "id": item.id,
            "item": {
            "id": product.id,
            "name": product.name,
            "price": product.price,
            "category_id": product.category_id,
            "variations": product.variations,
            "quantity": product.quantity,
            "size": product.size
            },
            "amount": item.amount
        }
        ret_items.append(product_dict)

    return ret_items


def decrease_cart_item(db: Session, user_id: int, product_id: int, amount: int):
    cart_item = db.query(models.Cart).filter(models.Cart.user_id == user_id, models.Cart.product_id == product_id).first()

    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found.")

    if cart_item.amount < amount:
        raise HTTPException(status_code=400, detail="Cart item amount less than defined amount.")

    cart_item.amount -= amount

    db.add(cart_item)
    db.commit()
    db.refresh(cart_item)
    return cart_item


def remove_cart_item(db: Session, user_id: int, product_id: int):
    item = db.query(models.Cart).filter(models.Cart.user_id == user_id, models.Cart.product_id == product_id)

    if not item.first():
        return

    item.delete()
    db.commit()

    return item
