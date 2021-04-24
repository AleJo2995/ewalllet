INSERT INTO [dbo].[monedero]
           ([numero_tarjeta]
      ,[nombre_tarjeta_habiente]
      ,[caducidad]
      ,[cvv]
      ,[cedula]
      ,[saldo])
     VALUES
           (@numeroTarjeta
           ,@tarjetaHabiente
           ,@caducidad
           ,@cvv
           ,@cedula
           ,@saldo)