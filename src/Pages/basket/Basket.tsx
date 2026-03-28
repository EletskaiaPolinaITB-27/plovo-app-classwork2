import { Container, Grid, Typography } from "@mui/material"
import type { IBasketState, IDeliveryDetails, IDish } from "../../types"
import { Link } from "@mui/icons-material"
import { useState } from "react"
import { axiosApi } from "../../axiosApi"
import { BasketItems } from "../../components/basket-items/BasketItems"
import { OrderForm } from "../../components/order-form/OrderForm"

interface Props {
    basketState: IBasketState,
    addDishToBasket: (dish: IDish) => void,
    decreaseDishInBasket: (dishId: string) => void,
    clearBasket: () => void,
}

export const Basket = ({basketState, addDishToBasket, decreaseDishInBasket, clearBasket,}:Props) => {
    const {items,totalCount,totalPrice} = basketState
    const [loading, setLoading] = useState(false);


    const submitOrder = async (deliveryDetails: IDeliveryDetails) => {
    setLoading(true);
    try {
      const orderData = {
        items,
        totalCount,
        totalPrice,
        deliveryDetails,
      };

      await axiosApi.post('/orders.json', orderData);
      clearBasket();
    } finally {
      setLoading(false);
    }
  };


    if (items.length === 0){
        return(
            <Container>
                <Typography variant="h5" align="center">
                    your basket is empty
                </Typography>
                <Link to='/'>
                <Typography>
                    go to home
                </Typography>
                </Link>
            </Container>
        )
    }


    return(
        <Container sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 7 }}>
          <BasketItems
            items={items}
            totalCount={totalCount}
            totalPrice={totalPrice}
            onIncrease={(dishId) => {
              const basketItem = items.find((item) => item.dish.id === dishId);
              if (basketItem) {
                addDishToBasket(basketItem.dish);
              }
            }}
            onDecrease={decreaseDishInBasket}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <OrderForm loading={loading} onSubmit={submitOrder} />
        </Grid>
      </Grid>
    </Container>
    )
}