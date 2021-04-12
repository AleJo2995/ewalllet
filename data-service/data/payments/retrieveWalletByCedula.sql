SELECT [id]
      ,[numero_tarjeta]
      ,[nombre_tarjeta_habiente]
      ,[caducidad]
      ,[cvv]
      ,[cedula]
      ,[saldo]
  FROM [dbo].[monedero]
  WHERE [cedula]=@cedula