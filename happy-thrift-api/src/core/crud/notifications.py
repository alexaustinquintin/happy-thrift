from sqlalchemy.orm import Session

from .users import get_user, get_all_users
from core import models
from core import schemas


def send_notif(db: Session, user_id: int, notif: schemas.NotificationIn):
    user = get_user(db, user_id)

    if not user:
        return

    notif = models.Notification(user_id=user.id, title=notif.title, message=notif.message)
    db.add(notif)
    db.commit()
    db.refresh(notif)
    return notif


def notif_all(db: Session, notif: schemas.NotificationAll):
    users = get_all_users(db)

    notifs = []

    for user in users:
        notif = models.Notification(user_id=user.id, title=notif.title, message=notif.message)
        db.add(notif)
        db.commit()
        db.refresh(notif)
        notifs.append(notif)

    return notifs


def get_notifs(db: Session, user_id: int):
    return db.query(models.Notification).filter(models.Notification.user_id == user_id).all()


def get_all_notifs(db: Session):
    return db.query(models.Notification).all()


def delete_notif(db: Session, notif_id: int):
    notif = db.query(models.Notification).filter(models.Notification.id == notif_id)
    notif.delete()
    db.commit()
    return


def notify_admins(db: Session, notif: schemas.NotificationAll):
    admins = db.query(models.User).filter(models.User.is_admin == 1).all()

    for admin in admins:
        notification = models.Notification(user_id=admin.id, title=notif.title, message=notif.message)
        db.add(notification)
        db.commit()
        db.refresh(notification)
