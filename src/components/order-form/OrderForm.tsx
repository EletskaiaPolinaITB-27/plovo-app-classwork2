import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { IDeliveryDetails } from '../../types';

const INITIAL_STATE: IDeliveryDetails = {
  name: '',
  address: '',
  phone: '',
};

interface Props {
  loading: boolean;
  onSubmit: (deliveryDetails: IDeliveryDetails) => Promise<void>;
}

export const OrderForm = ({ loading, onSubmit }: Props) => {
  const [formState, setFormState] = useState<IDeliveryDetails>(INITIAL_STATE);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    await onSubmit(formState);
    setFormState(INITIAL_STATE);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" align="center" sx={{ mb: 3 }}>
        Детали доставки
      </Typography>

      <Box
        component="form"
        onSubmit={submitHandler}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Имя"
          name="name"
          value={formState.name}
          onChange={inputChangeHandler}
          required
          fullWidth />

        <TextField
          label="Адрес"
          name="address"
          value={formState.address}
          onChange={inputChangeHandler}
          required
          fullWidth/>

        <TextField
          label="Телефон"
          name="phone"
          value={formState.phone}
          onChange={inputChangeHandler}
          required
          fullWidth/>

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? 'Отправка' : 'Оформить заказ'}
        </Button>
      </Box>
    </Paper>
  );
};