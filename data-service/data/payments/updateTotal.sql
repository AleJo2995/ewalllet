UPDATE [dbo].[monedero]
   SET [saldo] = @balance
 WHERE id=@walletId