from sqlalchemy import Integer, Column, ForeignKey, String

from .database import Base
from .user import User
from .product import Product


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey(User.id, ondelete="CASCADE"))
    product_id = Column(Integer, ForeignKey(Product.id, ondelete="CASCADE"))
    variation = Column(String(20))
    amount = Column(Integer)
    status = Column(String(10))
