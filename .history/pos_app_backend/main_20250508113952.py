from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime

app = FastAPI()

# CORSミドルウェアの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # フロントエンドのURL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 仮のデータ（後でデータベースに置き換え）
products = [
    {
        "id": 1,
        "name": "コーヒー",
        "price": 350,
        "image": "/coffee.jpg"
    },
    {
        "id": 2,
        "name": "紅茶",
        "price": 300,
        "image": "/tea.jpg"
    },
    {
        "id": 3,
        "name": "サンドイッチ",
        "price": 450,
        "image": "/sandwich.jpg"
    }
]

orders = []

class OrderItem(BaseModel):
    product_id: int
    quantity: int

class OrderCreate(BaseModel):
    items: List[OrderItem]

@app.get("/products")
async def get_products():
    return products

@app.get("/orders")
async def get_orders():
    return orders

@app.post("/orders")
async def create_order(order: OrderCreate):
    # 注文の合計金額を計算
    total_amount = 0
    for item in order.items:
        product = next((p for p in products if p["id"] == item.product_id), None)
        if product:
            total_amount += product["price"] * item.quantity

    # 新しい注文を作成
    new_order = {
        "id": len(orders) + 1,
        "items": [item.dict() for item in order.items],
        "total_amount": total_amount,
        "created_at": datetime.now().isoformat()
    }
    orders.append(new_order)
    return new_order 