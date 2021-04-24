  SELECT [dbo].[ruta_x_usuario].[codigo_ruta]
      ,[dbo].[ruta].[nombre] as 'nombreRuta'
      ,[dbo].[ruta].[costo]
      ,[dbo].[ruta_x_usuario].[cedual]
      ,[dbo].[usuario].[nombre]
      ,[fecha_de_uso]
  FROM [dbo].[ruta_x_usuario]
  INNER JOIN [dbo].[ruta]
    ON [dbo].[ruta_x_usuario].[codigo_ruta] = [dbo].[ruta].[codigo]
  INNER JOIN [dbo].[usuario]
    ON [dbo].[ruta_x_usuario].[cedual] = [dbo].[usuario].[cedula]
  WHERE [dbo].[ruta_x_usuario].[cedual] = @cedula