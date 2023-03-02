from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from .database import Base
from .user import User
from .product import Product


class Cart(Base):
    __tablename__ = "cart"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey(User.id, ondelete="CASCADE"), )
    product_id = Column(Integer, ForeignKey(Product.id, ondelete="CASCADE"))
    amount = Column(Integer)
