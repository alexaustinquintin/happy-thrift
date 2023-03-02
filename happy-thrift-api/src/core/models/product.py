from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

from .database import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(30), nullable=False)
    product = relationship("Product", back_populates="category")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    price = Column(Float, nullable=False)
    category = relationship("Category", back_populates="product")
    category_id = Column(Integer, ForeignKey(Category.id, ondelete="CASCADE"))
    size = Column(String(5), nullable=False)
    quantity = Column(Integer, nullable=False)
    image_url = Column(String(200), nullable=True)


class ProductVariations(Base):
    __tablename__ = "product_variations"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50))
    product_id = Column(Integer, ForeignKey(Product.id, ondelete="CASCADE"))


class ProductTransactionStatus(Base):
    __tablename__ = "product_transactions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    product_id = Column(Integer, ForeignKey(Product.id))
    status = Column(String(20))
