from sqlalchemy import Column, Integer, String, Boolean

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    full_name = Column(String(70), nullable=False)
    email = Column(String(120), nullable=False)
    hashed_password = Column(String(200), nullable=False)
    shipping_address = Column(String(200), nullable=False)
    is_admin = Column(Boolean, default=False)
