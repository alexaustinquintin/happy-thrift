from datetime import datetime

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime

from .user import User
from .database import Base


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey(User.id, ondelete="CASCADE"))
    title = Column(String(100))
    message = Column(String(4000))
    sent_at = Column(DateTime, default=datetime.now)
