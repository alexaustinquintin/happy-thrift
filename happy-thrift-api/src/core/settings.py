from pydantic import BaseSettings


class DBSettings(BaseSettings):
    name: str
    password: str
    host: str
    port: int
    user: str

    class Config:
        env_prefix = "db_"
