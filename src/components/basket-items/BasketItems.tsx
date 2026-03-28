import { Box, Button, Paper, Typography } from '@mui/material';
import type { IBasket } from '../../types';

interface Props {
  items: IBasket[];
  totalCount: number;
  totalPrice: number;
  onIncrease: (dishId: string) => void;
  onDecrease: (dishId: string) => void;
}

export const BasketItems = ({
  items,
  totalCount,
  totalPrice,
  onIncrease,
  onDecrease,
}: Props) => {
  return (
    <Paper sx={{ p: 3 }}>
      {items.map((item, index) => (
        <Box
          key={item.dish.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
            gap: 2,
          }}>
          <Typography sx={{ minWidth: 220 }}>
            {index + 1}. {item.dish.name}
          </Typography>

          <Typography sx={{ minWidth: 120 }}>
            количество: {item.count}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" onClick={() => onDecrease(item.dish.id)}>
              -
            </Button>
            <Button variant="outlined" onClick={() => onIncrease(item.dish.id)}>
              +
            </Button>
          </Box>
        </Box>
      ))}

      <Typography variant="h6" sx={{ mt: 4 }}>
        Общее количество: {totalCount}
      </Typography>

      <Typography variant="h6" sx={{ mt: 1 }}>
        Общая сумма: {totalPrice} сом
      </Typography>
    </Paper>
  )
}