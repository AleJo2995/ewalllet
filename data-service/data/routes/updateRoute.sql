UPDATE [dbo].[monedero]
   SET [saldo] = @balance
 WHERE id=@walletId


 UPDATE [dbo].[ruta]
   SET [codigo] = <codigo, nvarchar(50),>
      ,[costo] = <costo, numeric(5,0),>
      ,[descripcion] = <descripcion, nvarchar(500),>
      ,[nombre] = <nombre, nvarchar(50),>
      ,[empresa] = <empresa, nvarchar(50),>
      ,[provincia] = <provincia, nvarchar(25),>
 WHERE <Search Conditions,,>