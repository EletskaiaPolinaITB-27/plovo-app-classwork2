import { Route, Routes } from "react-router"
import { Header } from "./components/Header/Header"
import { Home } from "./Pages/Home/Home"
import { Dish } from "./Pages/Dish/Dish"
import { AddDish } from "./Pages/Add-dish/AddDish"
import { Container } from "@mui/material"
import { EditDish } from "./Pages/edit-dish/EditDish"
import { useState } from "react"
import type { IBasketState, IDish } from "./types"
import { addDishToBasket, clearBasket, decreaseDishInBasket } from "./utils/basketHelpers"
import { Basket } from "./Pages/basket/Basket"

function App() {
  const [basket, setBasket] = useState<IBasketState>({
    items: [],
    totalCount: 0,
    totalPrice: 0
  });

  console.log(basket)

  const handleAddDish = (dish: IDish) => {
    const updatedBasket = addDishToBasket(basket, dish)
    setBasket(updatedBasket)
  }

  const handleDecreaseDish = (dishId: string) => {
    const updatedBasket = decreaseDishInBasket(basket, dishId)
    setBasket(updatedBasket)
  }

  const handleClearBasket = () => {
    setBasket(clearBasket())
  }

  return (
    <>
      <Header totalCount={basket.totalCount} totalPrice={basket.totalPrice}/>
      <Container
        style={{
          padding:'20px'
        }}
      >
        <Routes>
          <Route path="/" element={<Home addDishToBasket={handleAddDish}/>}/>
          <Route path="/dish/:id" element={<Dish/>}/>
          <Route path="/dish/create" element={<AddDish/>}/>
          <Route path="/dish/edit/:id" element={<EditDish/>}/>
          <Route
            path="/basket"
            element={
              <Basket
                basketState={basket}
                addDishToBasket={handleAddDish}
                decreaseDishInBasket={handleDecreaseDish}
                clearBasket={handleClearBasket}
              />
            }
          />
        </Routes>
      </Container>
    </>
  )
}

export default App