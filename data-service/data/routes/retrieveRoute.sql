SELECT [codigo]
      ,[costo]
      ,[descripcion]
      ,[nombre]
      ,[empresa]
      ,[provincia]
  FROM [dbo].[ruta]
  WHERE [codigo]=@routeCode