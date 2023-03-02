from datetime import datetime

from fastapi import Form

from pydantic import BaseModel


__all__ = (
    "NotificationIn",
    "Notification",
    "NotificationAll"
)


class NotificationIn(BaseModel):
    title: str = Form()
    message: str = Form()
    user_id: int = Form()


class NotificationAll(BaseModel):
    title: str = Form()
    message: str = Form()


class Notification(NotificationIn):
    id: int
    sent_at: datetime

    class Config:
        orm_mode = True
