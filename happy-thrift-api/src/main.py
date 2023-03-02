from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import (
    categories,
    auth,
    products,
    account,
    orders
)

from admin import admin


def create_tables():
    from core.models import user, product, cart, orders
    from core.models.database import Base, engine
    Base.metadata.create_all(bind=engine)


create_tables()

app = FastAPI(title="Happy Thrift")

app.include_router(categories.router)
app.include_router(auth.router)
app.include_router(products.router)
app.include_router(admin.router)
app.include_router(account.router)
app.include_router(orders.router)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port="10000")

# ADMINS.
