from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from core.settings import DBSettings


load_dotenv()

user = DBSettings().user
password = DBSettings().password
host = DBSettings().host
port = DBSettings().port
db_name = DBSettings().name

SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://u77993_aSQklHzaMr:G10%40uD2vwxmUShFi43QS.%2B3A@54.37.204.19:3306/s77993_happythrift"
# SQLALCHEMY_DATABASE_URL = f"postgresql://{user}:{password}@{host}/{db_name}"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()


def get_db():
    with SessionLocal() as db:
        yield db
