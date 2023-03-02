from sqlalchemy.orm import Session

from core import models


def get_order(db: Session, order_id: int):
    return db.query(models.Order).filter(models.Order.id == order_id).first()


def get_user_orders(db: Session, user_id: int):
    return db.query(models.Order).filter(models.Order.user_id == user_id).all()


def get_all_orders(db: Session, status: str):
    if status == "all" or not status:
        return db.query(models.Order).all()
    return db.query(models.Order).filter(models.Order.status == status).all()


def add_order(db: Session, user_id: int, product_id: int, amount: int, variation: str):
    order = models.Order(
        user_id=user_id,
        product_id=product_id,
        amount=amount,
        variation=variation,
        status="pending")
    db.add(order)
    db.commit()
    db.refresh(order)

    return order


def update_order(db: Session, user_id: int, product_id: int, order_id: int, status: str):
    order = db.query(models.Order).filter(
        models.Order.product_id == product_id,
        models.Order.user_id == user_id,
        models.Order.id == order_id
    ).first()

    if not order:
        return

    if status == "sold":
        prd = db.query(models.Product).filter(models.Product.id == product_id).first()
        prd.quantity -= order.amount
        db.add(prd)
        db.commit()

    order.status = status
    db.add(order)
    db.commit()
    db.refresh(order)
    return order
